# Agent Router System

This document defines how Claude automatically routes your requests to the right sub-agents.

## How It Works

When you say something like:
- "Build me a coffee shop website with online ordering"

Claude automatically:
1. **Analyzes** your request
2. **Routes** to needed agents (Graphic Design → Website Builder → Database → Full Stack)
3. **Coordinates** them to work together
4. **Deploys** the final result

You just describe what you want in plain English. No agent selection needed.

---

## Agent Capabilities

### 🎨 Graphic Design Agent
**Triggers:** logo, branding, graphics, images, design assets, color scheme, visual identity
**What it builds:**
- Logos (SVG, scalable)
- Color palettes
- Brand guidelines
- Hero images
- Icons and illustrations
- Social media graphics

**Output:** Design files + CSS variables ready for web

---

### 🌐 Website Builder Agent
**Triggers:** website, landing page, portfolio, homepage, marketing site, blog
**What it builds:**
- Landing pages
- Marketing websites
- Portfolios
- Blogs
- Documentation sites
- Company websites

**Tech Stack:** HTML, CSS, JavaScript (React for complex sites)
**Output:** Static site ready to deploy

---

### ⚡ Full Stack App Agent
**Triggers:** app, dashboard, admin panel, user accounts, authentication, API
**What it builds:**
- Web applications
- User authentication (login/signup)
- Admin dashboards
- REST APIs
- Real-time features
- Payment integration

**Tech Stack:** React + Cloudflare Workers + D1 Database
**Output:** Full application with backend

---

### 🗄️ Database Agent
**Triggers:** database, data storage, user data, orders, inventory, records
**What it builds:**
- Database schemas
- Migrations
- API endpoints for CRUD operations
- Data relationships
- Indexes and optimization

**Tech Stack:** Cloudflare D1 (SQLite)
**Output:** Database + API layer

---

### 📱 Mobile-Responsive Agent
**Auto-activated** for all web projects
**What it ensures:**
- Mobile-first design
- Responsive layouts
- Touch-friendly interfaces
- Fast loading on mobile

---

### 🔒 Security Agent
**Auto-activated** for apps with user data
**What it adds:**
- Input validation
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting

---

## Example Routing

### Request: "Build a landing page for my yoga studio"
**Agents Used:**
1. Graphic Design → Creates color palette, logo, hero images
2. Website Builder → Builds responsive landing page
3. Mobile-Responsive → Ensures mobile optimization

**Deployment:** `./deploy yoga-studio`
**Result:** `https://yoga-studio.pages.dev`

---

### Request: "Create an e-commerce store for handmade jewelry"
**Agents Used:**
1. Graphic Design → Brand identity, product image templates
2. Database → Product catalog, inventory, orders
3. Full Stack App → Shopping cart, checkout, admin panel
4. Security → Payment processing, user data protection
5. Website Builder → Storefront pages

**Deployment:** `./deploy jewelry-store`
**Result:** Full e-commerce app with admin dashboard

---

### Request: "Build a SaaS dashboard for project management"
**Agents Used:**
1. Graphic Design → Dashboard theme, icons
2. Database → Projects, tasks, users, teams
3. Full Stack App → Authentication, real-time updates, API
4. Security → User permissions, data isolation
5. Website Builder → Marketing landing page

**Deployment:** `./deploy project-manager`
**Result:** Complete SaaS application

---

## Special Features

### Smart Context Awareness
Claude remembers:
- Your brand colors from previous projects
- Your preferred design style
- Database schemas you've used
- Common features you request

### Progressive Enhancement
Start simple, add features:
1. "Build a blog" → Static blog deployed
2. "Add comments" → Database + authentication added
3. "Add email notifications" → Email service integrated

### One Command Deployment
No matter how complex:
```bash
./deploy my-project
```

Everything deploys together - frontend, backend, database, all configured.

---

## Usage

You don't need to understand this file. Just tell Claude what you want to build in plain English, and the routing happens automatically.

**Examples:**
- "Build me a portfolio website"
- "Create a booking system for my salon"
- "Make an admin dashboard to manage my inventory"
- "Build a blog with newsletter signup"

Claude figures out which agents to use and coordinates everything.
