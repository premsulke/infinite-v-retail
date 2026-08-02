import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// In-Memory fallback database for serverless environment
interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  avatarUrl?: string;
  credits: number;
  role: string;
}

const vercelUsersDb: UserRecord[] = [
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

const vercelSessions: Record<string, string> = {
  "token_demo_alex": "user_demo_1"
};

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", environment: "Vercel Serverless Function", timestamp: new Date().toISOString() });
});

app.post("/api/auth/signup", (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full Name, Email, and Password are required." });
  }

  const existing = vercelUsersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: "User with this email already exists." });
  }

  const newUser: UserRecord = {
    id: `user_${Date.now()}`,
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: password,
    createdAt: new Date().toISOString(),
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`,
    credits: 1000,
    role: "Explorer Member"
  };

  vercelUsersDb.push(newUser);
  const token = `token_${Date.now()}_${newUser.id}`;
  vercelSessions[token] = newUser.id;

  const { passwordHash: _, ...safe } = newUser;
  return res.status(201).json({ message: "Registered successfully!", user: safe, token });
});

app.post("/api/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = vercelUsersDb.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.passwordHash === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = `token_${Date.now()}_${user.id}`;
  vercelSessions[token] = user.id;

  const { passwordHash: _, ...safe } = user;
  return res.json({ message: "Login successful!", user: safe, token });
});

app.get("/api/auth/me", (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || !vercelSessions[token]) {
    return res.status(401).json({ error: "Unauthorized session." });
  }

  const user = vercelUsersDb.find(u => u.id === vercelSessions[token]);
  if (!user) return res.status(404).json({ error: "User not found." });

  const { passwordHash: _, ...safe } = user;
  return res.json({ user: safe });
});

app.get("/api/users", (_req: Request, res: Response) => {
  const safe = vercelUsersDb.map(({ passwordHash, ...u }) => u);
  return res.json({ total: safe.length, users: safe });
});

export default app;
