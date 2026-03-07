# Mohammed Athar K — Portfolio v2.0

> Multi-page, fully animated, production-ready developer portfolio  
> Built with React + Vite + Framer Motion + Tailwind CSS + FastAPI

---

## 🗂️ Folder Structure

```
portfolio/
├── 📁 src/
│   ├── 📁 pages/
│   │   ├── Home.jsx         ← Particles, 3D name, typing animation
│   │   ├── About.jsx        ← Bio, terminal card, interests
│   │   ├── Skills.jsx       ← Animated skill bars, tech pills
│   │   ├── Projects.jsx     ← Cards with modal detail view
│   │   ├── Education.jsx    ← University details, courses
│   │   ├── Contact.jsx      ← Socials + contact form
│   │   └── NotFound.jsx     ← 404 page
│   ├── 📁 components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx   ← Sticky glass nav, mobile menu
│   │   │   └── PageTransition.jsx
│   │   └── ui/
│   │       └── Cursor.jsx   ← Custom cursor (desktop)
│   ├── 📁 data/
│   │   └── data.js          ⭐ ALL YOUR CONTENT LIVES HERE
│   ├── 📁 hooks/
│   │   └── index.js         ← useReveal, useCounter, etc.
│   ├── 📁 styles/
│   │   └── globals.css      ← Global styles + Tailwind
│   ├── App.jsx              ← Router + AnimatePresence
│   └── main.jsx
│
├── 📁 backend/
│   ├── main.py              ← FastAPI contact form API
│   ├── requirements.txt     ← Python dependencies
│   └── .env.example         ← Environment variables template
│
├── 📁 public/
│   ├── favicon.svg
│   └── resume.pdf           ← ⚠️ DROP YOUR RESUME HERE
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json              ← Vercel deployment config
└── package.json
```

---

## ✏️ Step 1 — Personalize

Open **`src/data/data.js`** and update:

```js
export const personal = {
  email: 'your.real@email.com',
  phone: '+91 XXXXX XXXXX',
  linkedin: 'https://linkedin.com/in/YOUR-ID',
  github: 'https://github.com/YOUR-USERNAME',
  instagram: 'https://instagram.com/YOUR-ID',
}
```

Also update project `github` and `demo` links in the `projects` array.

---

## 📄 Step 2 — Add Your Resume

Place your resume as `public/resume.pdf` — the Download button works automatically.

---

## 💻 Step 3 — Run Locally

### Prerequisites
- **Node.js 18+** → https://nodejs.org
- **Python 3.10+** (for backend) → https://python.org

### Frontend

```bash
cd portfolio
npm install
npm run dev
# → http://localhost:3000
```

### Backend (Optional — for real contact form emails)

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Gmail credentials

uvicorn main:app --reload --port 5000
# → http://localhost:5000
# → API docs at http://localhost:5000/docs
```

**Note:** Without the backend running, the contact form falls back to opening your mail client (`mailto:`). Still works great!

---

## 🚀 Step 4 — Deploy Frontend on Vercel

### Option A — Vercel CLI (Fastest)

```bash
npm install -g vercel
vercel

# Follow prompts:
# → Set up project? Yes
# → Project name: mohammed-athar-portfolio
# → Directory: ./
# → Override settings? No

# Deployed to: https://your-project.vercel.app
```

### Option B — GitHub + Vercel Dashboard

1. Push to GitHub: `git init && git add . && git commit -m "init" && git push`
2. Go to https://vercel.com → Add New Project
3. Import your GitHub repo
4. Vercel auto-detects Vite → Click **Deploy**
5. Done in ~60 seconds!

### Option C — Drag & Drop

```bash
npm run build
# Drag the dist/ folder to https://vercel.com/new
```

---

## 🔧 Step 5 — Deploy Backend (Optional)

### On Railway (Free tier available)

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select your repo → Set root directory to `backend/`
3. Add environment variables from `.env.example`
4. Railway auto-detects Python → deploys FastAPI

### On Render (Free)

1. Go to https://render.com → New Web Service
2. Connect GitHub, select repo, set root to `backend/`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add env vars → Deploy

### Update Frontend URL

After deploying backend, update `vite.config.js`:
```js
proxy: {
  '/api': {
    target: 'https://your-backend.railway.app',
  },
},
```

---

## 📧 Set Up Gmail for Contact Form

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Search "App Passwords" → Create one for "Mail"
4. Use that 16-char password as `SMTP_PASS` in `.env`
5. Messages arrive in your inbox with full HTML formatting!

---

## 🎨 Customization

### Change accent color
In `src/styles/globals.css`:
```css
:root { --accent: #E8654A; }  /* Change to any color */
```

### Add more projects
In `src/data/data.js`, add to `projects` array.

### Change page background
In `globals.css`, update `.bg-home`, `.bg-about`, etc.

---

## ✅ Feature Checklist

- [x] **6 separate pages** with smooth transitions (Framer Motion)
- [x] **Animated particle field** on homepage (canvas + requestAnimationFrame)
- [x] **3D parallax name** follows mouse
- [x] **Custom cursor** with ring tracker (desktop)
- [x] **Typing animation** cycling through roles
- [x] **Glass morphism** navbar with mobile hamburger
- [x] **Scroll-triggered reveal** on all elements
- [x] **Animated skill progress bars**
- [x] **Interactive skill group accordion**
- [x] **Project cards + modal** for details
- [x] **FastAPI backend** for contact form with HTML emails
- [x] **Mailto fallback** if backend is offline
- [x] **Fully responsive** — mobile, tablet, desktop
- [x] **Light warm color palette** (cream, sand, soft gradients)
- [x] **Floating geometric shapes** on hero
- [x] **Animated blob backgrounds**
- [x] **SEO meta tags** in index.html
- [x] **Security headers** in vercel.json
- [x] **404 Not Found** page

---

Built with 🔥 for Mohammed Athar K · VIT 2027
