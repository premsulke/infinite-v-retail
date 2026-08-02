import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// File-based simple JSON database path
const DB_FILE = path.join(process.cwd(), "users_db.json");

interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string; // In production use bcrypt, stored as string here
  createdAt: string;
  avatarUrl?: string;
  credits: number;
  role: string;
}

// Initial DB helper functions
function readDb(): UserRecord[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialUsers: UserRecord[] = [
        {
          id: "user_demo_1",
          fullName: "Alex Mercer",
          email: "alex@infinite.vr",
          passwordHash: "cyberpunk2099",
          createdAt: new Date().toISOString(),
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          credits: 2450,
          role: "VIP Quantum Member"
        }
      ];
      fs.writeFileSync(DB_FILE, JSON.stringify(initialUsers, null, 2), "utf8");
      return initialUsers;
    }
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file:", err);
    return [];
  }
}

function writeDb(users: UserRecord[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to database file:", err);
  }
}

// Memory session tokens store
const sessionTokens: Record<string, string> = {
  "token_demo_alex": "user_demo_1"
};

// 1. Healthcheck API
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), server: "Infinite VR Express Engine" });
});

// 2. Auth: Sign Up Endpoint
app.post("/api/auth/signup", (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full Name, Email, and Password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  const users = readDb();
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return res.status(409).json({ error: "An account with this email address already exists." });
  }

  const newUser: UserRecord = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: password, // Store password
    createdAt: new Date().toISOString(),
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`,
    credits: 1000, // Welcome bonus VR credits
    role: "Explorer Member"
  };

  users.push(newUser);
  writeDb(users);

  const token = `token_${Date.now()}_${newUser.id}`;
  sessionTokens[token] = newUser.id;

  const { passwordHash: _, ...safeUser } = newUser;
  return res.status(201).json({
    message: "Account created successfully!",
    user: safeUser,
    token
  });
});

// 3. Auth: Login Endpoint
app.post("/api/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const users = readDb();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.passwordHash === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password. Please try again." });
  }

  const token = `token_${Date.now()}_${user.id}`;
  sessionTokens[token] = user.id;

  const { passwordHash: _, ...safeUser } = user;
  return res.json({
    message: "Login successful!",
    user: safeUser,
    token
  });
});

// 4. Auth: Get Current User (Me) Endpoint
app.get("/api/auth/me", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (!token || !sessionTokens[token]) {
    return res.status(401).json({ error: "Unauthorized or invalid session token." });
  }

  const userId = sessionTokens[token];
  const users = readDb();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User profile not found." });
  }

  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser });
});

// 5. Auth: Logout
app.post("/api/auth/logout", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");
  if (token && sessionTokens[token]) {
    delete sessionTokens[token];
  }
  return res.json({ message: "Logged out successfully." });
});

// 6. Database Users List
app.get("/api/users", (_req: Request, res: Response) => {
  const users = readDb();
  const safeUsers = users.map(({ passwordHash, ...safe }) => safe);
  return res.json({ total: safeUsers.length, users: safeUsers });
});

// Integration of Vite Middleware in Dev, Static serving in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Infinite.V Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
