import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';

export const getProfile = async (req: any, res: Response) => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true, addresses: true,
        orders: { orderBy: { orderDate: 'desc' }, include: { items: { include: { variant: true } } } }
      }
    });
    if (!userProfile) return res.status(404).json({ error: 'User not found' });
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  const { firstName, lastName } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: { firstName, lastName },
      select: { id: true, email: true, firstName: true, lastName: true, role: true }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile." });
  }
};

export const changePassword = async (req: any, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (newPassword.length < 6) return res.status(400).json({ error: "New password must be at least 6 characters." });

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) return res.status(400).json({ error: "Incorrect current password." });

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: req.user.userId }, data: { passwordHash: newPasswordHash } });

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update password." });
  }
};

export const addAddress = async (req: any, res: Response) => {
  const { country, city, street, postalCode, houseNumber } = req.body;
  if (!city || !street || !postalCode || !houseNumber) return res.status(400).json({ error: "Fields required." });

  try {
    const newAddress = await prisma.savedAddress.create({
      data: { userId: req.user.userId, country: country || "Poland", city, street, postalCode, houseNumber }
    });
    res.json(newAddress);
  } catch (error) {
    res.status(500).json({ error: "Failed to add address." });
  }
};

export const deleteAddress = async (req: any, res: Response) => {
  try {
    const result = await prisma.savedAddress.deleteMany({
      where: { id: Number(req.params.id), userId: req.user.userId }
    });
    if (result.count === 0) return res.status(404).json({ error: "Address not found." });
    res.json({ message: "Address deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address." });
  }
};

// Admin
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  const userIdToDelete = Number(req.params.id);
  if (userIdToDelete === req.user.userId) return res.status(400).json({ error: "Cannot delete your own admin account." });

  try {
    const userOrders = await prisma.order.count({ where: { userId: userIdToDelete } });
    if (userOrders > 0) return res.status(400).json({ error: "Cannot delete user with existing orders." });

    await prisma.user.delete({ where: { id: userIdToDelete } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
