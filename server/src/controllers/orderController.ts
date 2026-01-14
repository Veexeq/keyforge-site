import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export const createOrder = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let userId: number | null = null;

  if (token) {
    try {
      const verified: any = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key-change-me");
      userId = verified.userId;
    } catch (err) { console.log("Guest checkout"); }
  }

  const { items, address, email } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: "Cart is empty" });
  if (!address || !email) return res.status(400).json({ error: "Address and email are required" });

  try {
    await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
          include: { product: true }
        });
        if (!variant) throw new Error(`Variant ID ${item.variantId} not found`);
        if (variant.stockQuantity < item.quantity) throw new Error(`Not enough stock for ${variant.product.name}`);

        const finalUnitPrice = Number(variant.product.discountPrice || variant.product.basePrice) + Number(variant.priceModifier);
        totalAmount += finalUnitPrice * item.quantity;

        orderItemsData.push({ variantId: variant.id, quantity: item.quantity, unitPrice: finalUnitPrice });

        await tx.productVariant.update({ where: { id: variant.id }, data: { stockQuantity: { decrement: item.quantity } } });
        await tx.product.update({ where: { id: variant.product.id }, data: { boughtCount: { increment: item.quantity } } });
      }

      await tx.order.create({
        data: {
          userId, email, status: 'PENDING', totalAmount,
          country: address.country || "Poland", city: address.city, street: address.street, postalCode: address.postalCode, houseNumber: address.houseNumber,
          items: { create: orderItemsData }
        }
      });
    });
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to place order" });
  }
};

// Admin
export const getAdminOrders = async (_: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        items: { include: { variant: { include: { product: true } } } }
      },
      orderBy: { orderDate: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status }
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
