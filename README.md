# Infinite V Retail - Fullstack VR Platform with Auth & Database

This is a fullstack web application featuring state-of-the-art VR hardware visualizer, interactive 3D SVG showcases, a complete Virtual Retail Gateway command center, user authentication (Login/Signup), and a persistent JSON backend database built with React, Vite, Tailwind CSS, and Express.

---

## 🚀 Quick Start on Local PC

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- Git installed on your computer

### Installation Steps

1. **Extract or Clone the Source Code**
   ```bash
   git clone https://github.com/your-username/infinite-v-retail.git
   cd infinite-v-retail
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser. The app and Express backend API are now live!

---

## 🗄️ Database & Authentication API Endpoints

The Express backend handles user accounts and persists user records in `users_db.json`.

- `POST /api/auth/signup` - Register a new user account
- `POST /api/auth/login` - Authenticate user credentials
- `GET /api/auth/me` - Retrieve current logged-in user profile
- `POST /api/auth/logout` - Invalidate session
- `GET /api/users` - List registered users (sanitized)

---

## 🐙 How to Push to GitHub

1. Initialize git and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Infinite V Retail Fullstack App"
   ```

2. Create a new repository on [GitHub](https://github.com/new).

3. Link and push to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

## ⚡ How to Deploy to Vercel (1-Click Deployment)

1. Go to [Vercel](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`infinite-v-retail`).
4. Keep the default settings (Vite / React preset).
5. Click **"Deploy"**.

Vercel will automatically build the React frontend and deploy the Express API routes defined in `vercel.json` and `api/index.ts`. Your live URL will be ready in under 1 minute!

---

## 📁 Project Structure

```
├── server.ts              # Express backend server & JSON database
├── api/index.ts           # Vercel serverless function entrypoint
├── vercel.json            # Vercel routing configuration
├── users_db.json          # File-backed local user database
├── src/
│   ├── App.tsx            # Main application router
│   ├── pages/
│   │   ├── AuthPage.tsx    # Login & Registration Page & User Dashboard
│   │   ├── SpecsPage.tsx   # Hardware Specs & Matrix
│   │   └── ModelsPage.tsx  # VR Catalog
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── GatewayDashboard.tsx
│   │   ├── ExportSourceModal.tsx # Full Source Code Viewer & Exporter
│   │   └── ...
```
