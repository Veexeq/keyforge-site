# ⌨️ KeyForge - Artisan Mechanical Keyboard Shop

![KeyForge Banner](https://via.placeholder.com/1200x300?text=KeyForge+Store+Banner)

> **Crafting unique typing experiences. Artisan keycaps, premium switches, and ergonomic accessories designed in Poland.**

**KeyForge** is a modern, full-stack e-commerce application. It provides a seamless shopping experience for mechanical keyboard enthusiasts and a robust Content Management System (CMS) for store administrators.

Built with a focus on type safety, performance, and a clean, accessible UI.

---

## 🚀 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73C9D?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/Shadcn%2FUI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide-Icons-orange?style=for-the-badge)

### Backend & Database
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## 🌟 Key Features

### 🛒 Customer Storefront
* **Product Discovery:** Filterable catalog with categories, sorting, and search functionality.
* **Variant System:** Support for complex product variations (e.g., switch types, keycap sets) with shared inventory tracking.
* **Cart Management:** Persistent shopping cart powered by `localStorage` and React Context.
* **Flexible Checkout:**
    * **Guest Checkout:** Seamless purchase flow without registration (email required).
    * **Member Checkout:** Fast-track checkout using saved addresses for logged-in users.
* **User Hub:** Order history tracking and address book management.

### 🛡️ Admin Dashboard
A secure, role-based panel (`ADMIN` role required) to manage the business.

* **Inventory Management:**
    * Create, update, and archive products.
    * Manage images and technical specifications.
    * Soft-delete mechanism to preserve historical order data.
* **Order Processing:**
    * Centralized list of all orders (Guest & Registered).
    * Status workflow management (Pending → Shipped → Delivered).
    * **Quick-View Modal:** Instant access to shipping details and order contents without leaving the list.
* **User Management:**
    * Customer database overview.
    * Order frequency analytics per user.
    * Security protocols preventing self-deletion of admin accounts.

---

## 📸 Gallery

| Landing Page | Admin Dashboard |
|:---:|:---:|
| ![Home](https://via.placeholder.com/400x250?text=Storefront) | ![Admin](https://via.placeholder.com/400x250?text=Admin+Panel) |

| Checkout Flow | Order Details |
|:---:|:---:|
| ![Checkout](https://via.placeholder.com/400x250?text=Checkout) | ![Modal](https://via.placeholder.com/400x250?text=Order+Modal) |

---

## ⚙️ Local Development Setup

Prerequisites: **Node.js (v18+)** and **PostgreSQL**.

### 1. Clone Repository
```bash
git clone [https://github.com/your-username/keyforge.git](https://github.com/your-username/keyforge.git)
cd keyforge
```

### 2. Backend Configuration (`/server`)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=3000
NODE_ENV=development
# Update with your local PostgreSQL credentials
DATABASE_URL="postgresql://postgres:password@localhost:5432/keyforge?schema=public"
JWT_SECRET="your-development-secret-key"
```

Initialize the database:
```bash
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Sync schema with DB (skips migration history for dev speed)
npm run dev          # Start API server on port 3000
```

### 3. Frontend Configuration (`/client`)

Open a new terminal terminal:
```bash
cd client
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🗄️ Database Schema

The application uses a relational model optimized for e-commerce:
* **User:** Handles authentication, roles, and profile data.
* **SavedAddress:** One-to-many relation for user shipping addresses.
* **Product & ProductVariant:** Hierarchical structure allowing multiple stock keeping units (SKUs) under one product listing.
* **Order & OrderItem:** Snapshots of pricing and variant data at the moment of purchase to ensure historical accuracy.

---

## 🤝 Author

**Your Name**
* GitHub: [@YourUsername](https://github.com/)
* LinkedIn: [Your Profile](https://linkedin.com/)

---

*This project was created for educational purposes.*