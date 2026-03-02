# hrmslite
Lightweight Human Resource Management System (HRMS Lite).


Stack Used - 
Frontend:
React (Vite)
Axios
Tailwind CSS

Backend:
Django
Django REST Framework
Database:
PostgreSQL (Render default)



SQLite for local

Deployment:
Backend → Render
Frontend → Vercel

SYSTEM DESIGN 

Entities-
Employee
id (auto PK)
employee_id (unique)
full_name
email
department
created_at

Attendance
id
employee (FK)
date
status (Present / Absent)
unique constraint: (employee, date)


w9Bj1PJj3DI7oDb4

src/
│
├── api/
│   └── axios.js
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── Employees.jsx
│
├── components/
│   └── Navbar.jsx
│
├── App.jsx
└── main.jsx

8e0dc7841b8f836d9bbcbe599659e22151b987a7