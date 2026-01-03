# ⌨️ KeyForge E-commerce Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

> **KeyForge** is a specialized e-commerce web application designed for mechanical keyboard enthusiasts. Unlike generic boilerplates, this platform is engineered to handle complex inventory requirements (variants), rigorous type safety, and scalable data architecture.

---

## 📑 Table of Contents
* [About](#-about)
* [Key Features](#-key-features)
* [Database Architecture](#-database-architecture)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Project Status](#-project-status)

---

## 💡 About

KeyForge addresses the need for a dedicated, aesthetic marketplace for premium switches, artisan keycaps, and custom parts. The application focuses on **Developer Experience (DX)** via end-to-end type safety and **User Experience (UX)** through a performance-first, accessible interface.

Key architectural highlights:
* **Type Safety:** Shared types between Backend and Frontend using TypeScript & Prisma.
* **Scalability:** Normalized relational database schema.
* **Modern UI:** Built with **shadcn/ui** and Tailwind CSS for a consistent, professional look.

---

## ✨ Key Features

### 🛍️ Commerce & Inventory
* **Product Variants System:** Advanced inventory tracking for products with multiple attributes (e.g., Switches: *Lubed/Unlubed*, Keycaps: *ANSI/ISO*).
* **Dynamic Cart:** Persistent cart state management with real-time stock validation.
* **Smart Filtering:** Sort products by categories, price ranges, and variant availability.
* **Financial Integrity:** Order history preserves historical price data at the moment of purchase (snapshotting).

### 👤 User Experience & Accounts
* **Role-Based Access Control:** Distinct logical flows for **Clients** (Storefront) and **Admins**.
* **Address Book:** Users can manage multiple shipping addresses (Home, Office) for faster checkout (1:N relationship).
* **Verified Reviews:** Anti-spam review system ensuring one user can only review a product once.

### 💻 Technical Highlights
* **Form Validation:** Robust validation using **Zod** schemas on both client and server.
* **Dockerized Infrastructure:** Database and services containerized for consistent development environments.
* **RESTful API:** Clean, layered architecture in Express.js.

---

## 🗃️ Database Architecture

The project utilizes a normalized PostgreSQL schema managed by Prisma ORM.

**Database schema:**  

![Database Schema](https://github.com/user-attachments/assets/b3d7971f-d2e1-444b-bcc7-c55ed198968e)
---

## 🛠 Tech Stack

The project relies on a modern PERN stack (Postgres, Express, React, Node) with TypeScript integration.

| Area | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-black?logo=react) | Core UI Library |
| | ![TypeScript](https://img.shields.io/badge/-TypeScript-black?logo=typescript) | Static Typing |
| | **shadcn/ui** | Accessible Component System |
| | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?logo=tailwind-css) | Styling Engine |
| | **Zod** | Schema Validation |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-black?logo=node.js) | Runtime Environment |
| | ![Express](https://img.shields.io/badge/-Express-black?logo=express) | REST API Framework |
| **Data** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?logo=postgresql) | Primary Relational Database |
| | ![Prisma](https://img.shields.io/badge/-Prisma-black?logo=prisma) | ORM & Type Generator |
| **DevOps** | ![Docker](https://img.shields.io/badge/-Docker-black?logo=docker) | Database Containerization |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18 or higher)
* Docker & Docker Compose

### 1. Clone the repository
```bash
git clone [https://github.com/Veexeq/keyforge-site](https://github.com/Veexeq/keyforge-site.git)
cd keyforge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Infrastructure Setup
Start the PostgreSQL database container:
```bash
docker-compose up -d
```

### 4. Database Initialization
Generate Prisma client and push the schema to the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run Development Servers
```bash
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend
npm run dev:client
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (Prisma)
# Connection string for the Dockerized Postgres instance
DATABASE_URL="postgresql://admin:adminpassword@localhost:5432/keyforge?schema=public"

# Auth Secrets
JWT_SECRET=super_secret_key_change_me
```

---

## 🚧 Project Status

This project is currently under **active development** (MVP phase).

---

**Author:** Wiktor Trybus (*@Veexeq*)