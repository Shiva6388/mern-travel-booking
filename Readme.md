# 🧳 MERN Travel Booking System

A full-stack travel booking web application where users can explore trips and book seats, and admins can manage trips and bookings.

Built using **MongoDB, Express, React, Node.js (MERN Stack)**.

---

## 🌐 Live Demo

Frontend (User Website)
👉 https://mern-travel-booking-sigma.vercel.app/

Backend API
👉 https://travel-backend-pzxk.onrender.com/

Health Check
👉 https://travel-backend-pzxk.onrender.com/api/health

---

## ✨ Features

### 👤 User

* View available trips
* See trip details (price, dates, seats)
* Book seats
* Seat availability auto updates

### 🔐 Admin

* Admin login authentication (JWT)
* Create new trips
* Edit trips
* Delete trips
* View all bookings
* Dashboard data

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* CORS

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 📁 Project Structure

```
mern-travel-booking
│
├── travel-frontend (React App)
│
└── travel-backend (Node + Express API)
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone repository

```
git clone https://github.com/yourusername/mern-travel-booking.git
cd mern-travel-booking
```

---

### 2️⃣ Backend Setup

```
cd travel-backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```
cd ../travel-frontend
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔑 API Endpoints

### Admin

```
POST /api/admin/register
POST /api/admin/login
```

### Trips

```
GET    /api/trips
GET    /api/trips/:id
POST   /api/trips          (Admin)
PUT    /api/trips/:id      (Admin)
DELETE /api/trips/:id      (Admin)
```

### Booking

```
POST /api/bookings
GET  /api/bookings (Admin)
```

---

## 🔐 Authentication

Protected routes use JWT token.

Admin must login → token stored → used in headers:

```
Authorization: Bearer <token>
```

---

## 📊 What I Learned

* REST API design
* JWT authentication
* Protected routes
* CRUD operations
* MongoDB relations
* Deployment (Render + Vercel)
* Real world project architecture

---

## 🚀 Future Improvements

* Payment gateway integration
* Email confirmation
* Image upload for trips
* User accounts & booking history
* Admin analytics dashboard

---

## 👨‍💻 Author

**Shiva Singh**
MERN Stack Developer

---

⭐ If you like this project, give it a star!
