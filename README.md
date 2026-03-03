# HRMS Lite - Employee Attendance Management System

## Project Overview
HRMS Lite is a modern Human Resource Management System designed to manage employee attendance efficiently. The application allows administrators and HR personnel to:

- Register and manage employees
- Record daily attendance
- View dashboard statistics such as total employees and present employees
- Handle authentication with JWT-based login and signup
- Access a clean, responsive frontend interface

The system is built as a **full-stack web application** with a Django REST Framework backend and a React frontend.

---

## Tech Stack Used

**Backend:**
- Django 4.x
- Django REST Framework (DRF)
- SQLite (local) / PostgreSQL (Supabase for production)
- JWT Authentication
- Python 3.10+
- Tailwind CSS for admin/custom templates (optional)

**Frontend:**
- React 19.2
- React Router for SPA routing
- Axios for API calls
- Tailwind CSS for responsive, modern UI

**Deployment:**
- Backend: [Render](https://hrmslite-ubcb.onrender.com)
- Frontend: [Vercel](https://hrmslite-nine.vercel.app/)

---

## Features

1. **Authentication**
   - Login with JWT
   - Session handling using `localStorage`
2. **Employee Management**
   - Add, view, and manage employee records
3. **Attendance Management**
   - Mark attendance for employees
   - Dashboard shows total employees and number of present employees for the current date
4. **Dashboard**
   - Shows overall attendance statistics
5. **Responsive UI**
   - Login and Signup pages designed with Tailwind CSS
   - Mobile-friendly and production-ready design

---

## Steps to Run the Project Locally

> Make sure you have **Python 3.10+** and **Node.js** installed.

### 1. Clone the repository
```bash
git clone https://github.com/sundaramseth/hrmslite.git
cd hrmslite
