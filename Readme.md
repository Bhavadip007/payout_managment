# Payout Management MVP

## 🚀 Overview
This project is a simple full-stack Payout Management system built as part of a practical task.  
It includes role-based access, vendor management, payout lifecycle, and audit tracking.

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 🔐 Test Credentials

OPS User:
- Email: ops@demo.com  
- Password: ops123  

FINANCE User:
- Email: finance@demo.com  
- Password: fin123  

---

## 📦 Features

### 1. Authentication
- JWT-based login
- Role-based access (OPS / FINANCE)

---

### 2. Vendor Management
- Add vendor with:
  - name (required)
  - upi_id (optional)
  - bank_account (optional)
  - ifsc (optional)
- View vendor list

---

### 3. Payout Management

#### OPS Role:
- Create payout (Draft)
- Submit payout (Draft → Submitted)
- View all payouts

#### FINANCE Role:
- Approve payout (Submitted → Approved)
- Reject payout (Submitted → Rejected with reason)
- View all payouts

---

### 4. Payout Features
- Status lifecycle validation
- Filters:
  - By status
  - By vendor
- Timestamps (createdAt, updatedAt)

---

### 5. Audit Trail
- Tracks:
  - CREATED
  - SUBMITTED
  - APPROVED
  - REJECTED
- Shows:
  - Action
  - User
  - Timestamp
  - Rejection reason (if any)

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-link>
cd project-folder

---------------------Backend Setup---------------------------------------
cd backend
npm install

Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

Run backend:

npm run dev

-------------------Frontend Setup--------------------------
cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:3000


----------Credential -------------------

========OPS=========
Email - ops@demo.com
Password - ops123

=======FINANCE=========
Email - finance@demo.com
Password - fin123