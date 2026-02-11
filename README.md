# Frontend Technical Test – Local Version  
Fullstack Developer Intern Test  
PT Aksamedia Mulia Digital  

## 👨‍💻 Author
Muhammad Ahnaf Zaki  

---

## 🧩 Tech Stack

- React (Vite)
- React Router
- Context API
- Tailwind CSS
- Local Storage (No API)
- Vercel (Deployment)

---

## 🎯 Overview

Project ini merupakan implementasi Tugas 1 (Frontend Only) sesuai requirement:

- Authentication tanpa API
- CRUD tanpa API (Local Storage)
- Search & Pagination manual
- Query string state persistence
- Dark / Light / System mode
- Protected routes
- Responsive design

Seluruh UI dibangun menggunakan Tailwind CSS tanpa UI library tambahan.

---

## 🔐 Login Credential

Username: admin  
Password: admin  

---

## ✨ Features Implemented

### 🔐 Authentication (Local)
- Login tanpa API
- Persist login saat refresh
- Logout via custom dropdown
- Protected route

### 📊 CRUD (Local Storage)
- Create
- Read
- Update
- Delete
- Search / Filter
- Pagination manual
- State bertahan via query string

### 🎨 UI/UX
- Fully responsive (Desktop / Tablet / Mobile)
- Custom dropdown (tanpa library)
- Dark / Light / System mode
- Auto follow OS preference

### 👤 Profile Edit
- Edit nama user
- Navbar auto update
- Persist after refresh

---

## 🛠 Installation

```bash
npm install
npm run dev
🚀 Live Demo
https://front-end-test-local.vercel.app/

🧠 Architecture
src/
├── components
├── pages
├── context
├── services
├── hooks
├── layouts
└── router
State management menggunakan Context API untuk menjaga clean architecture dan mempermudah integrasi API di tahap berikutnya.

📌 Notes
Tidak menggunakan UI library (Material UI, Chakra, dll)

Seluruh pagination & dropdown dibuat manual

Data disimpan menggunakan Local Storage
