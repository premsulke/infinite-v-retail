import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Github, 
  Zap, 
  Code2, 
  FileCode, 
  Database, 
  Globe
} from 'lucide-react';

interface ExportSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportSourceModal: React.FC<ExportSourceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'files' | 'pc' | 'github' | 'vercel'>('files');
  const [selectedFile, setSelectedFile] = useState<'server' | 'auth' | 'app' | 'vercel' | 'readme'>('server');
  const [copied, setCopied] = useState(false);

  const fileContents = {
    server: `// server.ts - Fullstack Express Backend & JSON User Database
import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;
app.use(express.json());

const DB_FILE = path.join(process.cwd(), "users_db.json");

interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  credits: number;
  role: string;
}

function readDb(): UserRecord[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialUsers = [{
        id: "user_demo_1",
        fullName: "Alex Mercer",
        email: "alex@infinite.vr",
        passwordHash: "cyberpunk2099",
        createdAt: new Date().toISOString(),
        credits: 2450,
        role: "VIP Quantum Member"
      }];
      fs.writeFileSync(DB_FILE, JSON.stringify(initialUsers, null, 2));
      return initialUsers;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch { return []; }
}

function writeDb(users: UserRecord[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

// REST API Endpoints
app.post("/api/auth/signup", (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  const users = readDb();
  if (users.find(u => u.email === email)) return res.status(409).json({ error: "Email exists" });
  
  const newUser = {
    id: \`user_\${Date.now()}\`,
    fullName,
    email,
    passwordHash: password,
    createdAt: new Date().toISOString(),
    credits: 1000,
    role: "Explorer Member"
  };
  users.push(newUser);
  writeDb(users);
  return res.status(201).json({ message: "Registered", user: newUser });
});

app.post("/api/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = readDb();
  const user = users.find(u => u.email === email && u.passwordHash === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  return res.json({ message: "Logged in", user });
});

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,

    auth: `// src/pages/AuthPage.tsx - Login & Signup Component
import React, { useState } from 'react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { fullName, email, password };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) alert(isLogin ? "Welcome back!" : "Account created!");
    else alert(data.error);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
        )}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
    </div>
  );
};`,

    app: `// src/App.tsx - Main React Frontend Entrypoint
import React, { useState } from 'react';
import { AuthPage } from './pages/AuthPage';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app flex flex-col min-h-screen bg-black text-white">
      <header className="p-6 border-b border-white/10 flex justify-between">
        <h1 className="font-bold text-xl">INFINITE.V.RETAIL</h1>
        <span>{user ? \`Logged in as \${user.fullName}\` : "Guest"}</span>
      </header>

      <main className="flex-1 p-8">
        <AuthPage />
      </main>
    </div>
  );
}`,

    vercel: `{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,

    readme: `# Infinite V Retail - Fullstack Setup & Deployment

## 1. Run on PC
1. npm install
2. npm run dev
3. Open http://localhost:3000

## 2. Deploy to GitHub
1. git init
2. git add .
3. git commit -m "Initial Commit"
4. git remote add origin https://github.com/your-user/your-repo.git
5. git push -u origin main

## 3. Deploy to Vercel
1. Import GitHub repository in Vercel.
2. Hit Deploy.`
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fileContents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "infinite_v_fullstack_source.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0d0e12] border border-[#FF5B00]/40 rounded-2xl shadow-[0_0_80px_rgba(255,91,0,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#14151c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-[#FF5B00]" />
            <span className="font-orbitron font-bold text-base text-white">
              Fullstack Source Code & Deployment Center
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadAll}
              className="clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-xs px-3.5 py-1.5 flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_12px_#FF5B00]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Source JSON</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-Nav Tabs */}
        <div className="px-6 py-2.5 bg-black/50 border-b border-white/5 flex items-center space-x-4 text-xs font-chakra font-semibold">
          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'files' ? 'bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Source Code Files</span>
          </button>

          <button
            onClick={() => setActiveTab('pc')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'pc' ? 'bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>1. Run on PC</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'github' ? 'bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>2. Push to GitHub</span>
          </button>

          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'vercel' ? 'bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/40' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3. Deploy on Vercel</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 font-chakra space-y-6">
          
          {activeTab === 'files' && (
            <div className="space-y-4">
              {/* File Selector Pills */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                {[
                  { id: 'server', label: 'server.ts (Backend & DB)', icon: Database },
                  { id: 'auth', label: 'AuthPage.tsx (Login/Signup UI)', icon: FileCode },
                  { id: 'app', label: 'App.tsx (Frontend Router)', icon: Code2 },
                  { id: 'vercel', label: 'vercel.json (Vercel Config)', icon: Globe },
                  { id: 'readme', label: 'README.md (Setup Guide)', icon: Terminal },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFile(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      selectedFile === f.id
                        ? 'bg-[#FF5B00] text-black font-bold'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <f.icon className="w-3.5 h-3.5" />
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>

              {/* Code Box */}
              <div className="relative bg-black/90 border border-white/10 rounded-xl p-4 overflow-x-auto">
                <button
                  onClick={() => handleCopy(fileContents[selectedFile])}
                  className="absolute top-3 right-3 bg-white/10 hover:bg-[#FF5B00] hover:text-black text-gray-200 px-3 py-1 rounded text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                  <code>{fileContents[selectedFile]}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'pc' && (
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-[#FF5B00]" />
                <span>Running the Project Locally on Your PC</span>
              </h3>

              <ol className="list-decimal list-inside space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <li>
                  <strong className="text-white">Install Node.js:</strong> Ensure you have Node.js 18 or newer installed on your computer.
                </li>
                <li>
                  <strong className="text-white">Install Dependencies:</strong> Run <code className="bg-black px-2 py-0.5 rounded text-[#FF5B00]">npm install</code> in your project directory.
                </li>
                <li>
                  <strong className="text-white">Start Development Server:</strong> Run <code className="bg-black px-2 py-0.5 rounded text-[#FF5B00]">npm run dev</code>.
                </li>
                <li>
                  <strong className="text-white">Access Web App:</strong> Open <code className="bg-black px-2 py-0.5 rounded text-emerald-400">http://localhost:3000</code>. Both the React frontend and Express REST API will start together!
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center space-x-2">
                <Github className="w-5 h-5 text-[#FF5B00]" />
                <span>Pushing Your Project to GitHub</span>
              </h3>

              <div className="bg-black/80 border border-white/10 p-4 rounded-xl space-y-2 text-xs font-mono text-emerald-400">
                <div># 1. Initialize Git repository</div>
                <div className="text-white">git init</div>
                <div className="text-white">git add .</div>
                <div className="text-white">git commit -m "Initial commit: Infinite V Retail fullstack app"</div>
                <br />
                <div># 2. Add your GitHub repository link</div>
                <div className="text-white">git remote add origin https://github.com/YOUR_USERNAME/infinite-v-retail.git</div>
                <div className="text-white">git branch -M main</div>
                <div className="text-white">git push -u origin main</div>
              </div>
            </div>
          )}

          {activeTab === 'vercel' && (
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <h3 className="font-orbitron font-bold text-base text-white flex items-center space-x-2">
                <Globe className="w-5 h-5 text-[#FF5B00]" />
                <span>1-Click Deploy to Vercel</span>
              </h3>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                <p>
                  Because this project includes <code className="text-[#FF5B00]">vercel.json</code> and <code className="text-[#FF5B00]">api/index.ts</code>, Vercel will automatically build the React frontend and deploy the Express authentication API endpoints as serverless functions.
                </p>

                <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300">
                  <li>Log in to <strong>Vercel.com</strong></li>
                  <li>Click <strong>Import Project</strong> and select your GitHub repository</li>
                  <li>Click <strong>Deploy</strong> — Your live URL will be ready in 60 seconds!</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
