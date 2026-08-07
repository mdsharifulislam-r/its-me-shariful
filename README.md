# 🚀 MD Shariful Islam — Portfolio

A modern developer portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** — featuring a cinematic animated background, a custom glowing cursor, smooth scroll-triggered reveals, and a clean backend-focused presentation.

🔗 **Live site:** *Add your deployed link here*
👤 **Made by:** MD Shariful Islam

---

## ✨ Features

* 🌌 **Animated night-sky background** with twinkling stars and shooting stars
* 🖱️ **Custom glowing cursor** with interactive hover effects
* 🎬 **Smooth animations** powered by Framer Motion
* 📱 **Fully responsive** across mobile, tablet, and desktop
* ♿ **Accessible** and respects `prefers-reduced-motion`
* 🧩 **Easy to customize** — update content from `lib/data.ts`
* 💼 **Backend-focused portfolio** showcasing scalable systems and infrastructure projects

---

## 🛠️ Tech Stack

| Layer         | Technology           |
| ------------- | -------------------- |
| **Framework** | Next.js (App Router) |
| **Language**  | TypeScript           |
| **Styling**   | Tailwind CSS         |
| **Animation** | Framer Motion        |
| **Icons**     | lucide-react         |

---

## 📂 Project Structure

```text
app/
  layout.tsx      → fonts and global background
  page.tsx        → portfolio sections
  globals.css     → global styles and animations

components/
  StarField.tsx   → animated background
  CursorDot.tsx   → custom cursor
  Header.tsx      → navigation
  Hero.tsx        → introduction
  About.tsx       → experience and skills
  Projects.tsx    → featured projects
  Contact.tsx     → contact section
  Footer.tsx

lib/
  data.ts         → editable portfolio content
  useReveal.ts    → scroll reveal hook

public/
  images/         → profile and project images
```

---

## 🚦 Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🖼️ Adding Images

1. Place your images inside `public/images/`
2. Reference them in `lib/data.ts`
3. If an image is not provided, the portfolio will display the default fallback

---

## ☁️ Deployment

Build and run the production version:

```bash
npm run build
npm start
```

The portfolio can be deployed easily on **Vercel**, **Netlify**, or any Node.js hosting platform.

---

## 👨‍💻 About Me

I am a **Senior Backend Developer** specializing in **NestJS**, **TypeScript**, **Microservices**, **Redis**, **Kafka**, **Docker**, and **AWS**. I enjoy designing scalable backend architectures, distributed systems, and cloud-native applications with a strong focus on performance, reliability, and maintainability.

### Core Expertise

* Scalable backend architecture
* REST APIs and authentication systems
* Microservices and event-driven systems
* Redis caching and queue processing
* Dockerized development and deployment
* AWS cloud infrastructure
* Database design with MongoDB and MySQL
* AI integration and automation

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

⭐ If you like this portfolio, feel free to fork it and customize it for your own work.
