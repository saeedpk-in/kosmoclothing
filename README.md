# 👥 Users Page – E-Commerce Website

The **Users Page** is a part of the admin dashboard of the kosmo e-commerce platform. It allows administrators to view, manage, and interact with all registered customer accounts.

---

## 📌 Purpose

This page enables staff to:
- View all registered users
- Manage user roles (e.g., admin, customer)
- Suspend or delete user accounts
- View order history or activity tied to a user
- Search, sort, and filter users

---

## 🖥️ Technologies Used

- **Frontend Framework:** Next.js 
- **Backend:** Next.js 
- **Database:** MongoDB 
- **Authentication:** JWT-based
- **UI Library:** Tailwind CSS 

---

## 📂 Component Overview

- `UsersTable`: Displays paginated list of users
- `UserDetailsModal`: View detailed user info
- `UserActions`: Buttons to suspend, promote, or delete
- `SearchBar`: Real-time search by name or email
- `Filters`: Role-based and status-based filters

---

## 🧪 Features

- ✅ List all users with basic details (name, email, role, join date)
- 🔍 Search and filter functionality
- 🛠 Admin-only controls to change user roles or suspend users
- 📄 Export user data to CSV (optional)
- ⚠️ Confirmation dialogs for destructive actions

---