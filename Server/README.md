# CRM MERN App

## Run locally

### Backend

1. cd backend
2. cp .env.example .env (fill MONGO_URI & JWT_SECRET)
3. npm install
4. npm run dev

### Frontend

1. cd frontend
2. set VITE_API_URL in .env (e.g. <http://localhost:5000>)
3. npm install
4. npm run dev

## Features

- JWT auth (register/login)
- CRUD for customers
- React + Vite + Tailwind UI
- MongoDB Atlas (Mongoose)
cd backend
cp .env.example .env   # then edit .env and set MONGO_URI, JWT_SECRET
npm install
npm run dev            # runs nodemon server.js on PORT (default 5500)
