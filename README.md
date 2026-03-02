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
