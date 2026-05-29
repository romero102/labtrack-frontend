# LabTrack 🖥️

A web-based system for managing computer maintenance in university computer labs. Built with the MERN stack.

🔗 **Live Demo:** [labtrack-frontend-lime.vercel.app](https://labtrack-frontend-lime.vercel.app)
📦 **Backend Repo:** [github.com/romero102/labtrack-backend](https://github.com/romero102/labtrack-backend)

---

## The Problem

During my time as a lab technician at a university, maintenance records were kept on paper forms that were never consulted again. No one knew what hardware was inside each machine until they opened it up. Parts would quietly disappear — a 8GB RAM module swapped for a 2GB one — and no one would notice until much later.

LabTrack was built to solve that: a digital system to register every computer's specs, track maintenance history, and give technicians instant access to that information via QR code.

---

## Features

- 🔐 **JWT Authentication** with HTTP-only cookies
- 👥 **Role-based access control** — Admin and Technician roles
- 🏫 **Lab & computer management** — Register labs, assign computers, track specs
- 🔧 **Maintenance tracking** — Log preventive, corrective, and logical maintenance per computer
- 📱 **QR Code per computer** — Scan to instantly access a computer's profile and history
- 📊 **Maintenance ownership** — Technicians can only edit/delete their own records
- 🔑 **Password recovery** — Email-based reset flow with expiring tokens
- 🚫 **Soft delete for users** — Deactivate accounts without losing maintenance history

---

## Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- React Hook Form + Controller
- React Select
- Tailwind CSS
- Lucide React
- React Hot Toast
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- Nodemailer
- QRCode

---

## System Structure

```
Users
 └── assigned to Labs
      └── Labs contain Computers
           └── Computers have Maintenance records
```

**Admin** can manage everything: users, labs, computers, and all maintenance records.

**Technician** can:
- View all labs, computers, users, and maintenance records
- Create maintenance records for assigned computers
- Edit and delete only their own maintenance records

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
git clone https://github.com/romero102/labtrack-backend.git
cd labtrack-backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_SECRET=your_cloudinary_secret
PORT=5000
```

```bash
npm run dev
```

### Frontend Setup

```bash
git clone https://github.com/romero102/labtrack-frontend.git
cd labtrack-frontend
npm install
npm run dev
```
Create a `.env` file based on `.env.example`:

```env
VITE_INSTALL_TOKEN=your_token
VITE_API_URL=your_api_url
```

### First Run

On first launch, the system will prompt you to create the initial admin account. After that, only admins can create new users.

---

## API Overview

| Resource | Endpoint | Access |
|---|---|---|
| Auth | `/api/auth` | Public |
| Users | `/api/users` | Admin |
| Labs | `/api/labs` | Admin / Technician |
| Computers | `/api/computers` | Admin / Technician |
| Maintenance | `/api/maintenance` | Admin / Technician |

---

## Author

**Ilsen Romero Caraballo** — Full Stack Developer (MERN)
[GitHub](https://github.com/romero102)

---

## License

MIT