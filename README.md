# 🏥 HealthFlow - Diagnostic Center Management System (Client)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> A comprehensive full-stack Diagnostic Center Management System that streamlines appointments, patient records, test results, and administrative tasks.

## 🌐 Live Demo

🔗 [https://assignment-twelve---full-stack.web.app](https://assignment-twelve---full-stack.web.app)

## 🔗 Related Repositories

- **Server (Backend):** [HealthFlow Server](https://github.com/mithuchandrabiswas/Diagnostic-Center-Management-System-HealthFlow--Server)

---

## ✨ Features

### 👤 User Features
- Secure registration & login with **Firebase Authentication**
- Profile management (name, avatar, blood group, district, upazila)
- Private dashboard to manage upcoming appointments
- View, download & print test results as PDF
- Cancel appointments with ease
- **Stripe** payment integration for booking tests

### 🔐 Admin Features
- Manage all users, roles, and statuses
- Add, edit, and delete diagnostic tests
- Manage reservations and promotional banners
- Export user data as **PDF** using jsPDF
- View booking statistics with **interactive charts**

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js (Vite) |
| Styling | TailwindCSS + DaisyUI |
| Data Fetching | Axios + TanStack Query |
| Authentication | Firebase Auth |
| Payment | Stripe |
| PDF Export | jsPDF |
| Deployment | Firebase Hosting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mithuchandrabiswas/Diagnostic-Center-Management-System-HealthFlow--Client.git

# 2. Navigate to project directory
cd Diagnostic-Center-Management-System-HealthFlow--Client

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_SERVER_URL=http://localhost:5000
```

### Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-based page components
├── hooks/            # Custom React hooks
├── providers/        # Context & auth providers
├── utils/            # Helper functions
└── main.jsx          # App entry point
```

---

## 👨‍💻 Author

**Mithu Chandra Biswas**
- GitHub: [@mithuchandrabiswas](https://github.com/mithuchandrabiswas)
