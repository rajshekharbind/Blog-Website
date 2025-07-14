 Folder Structure

Edit
frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── components/        # Reusable UI components (buttons, cards, etc.)
│   ├── pages/             # Route-level components (Dashboard, Home, CreateBlog)
│   ├── redux/             # Redux store setup and slices
│   ├── router/            # React Router v7 setup
│   ├── styles/            # Tailwind & global styles
│   ├── App.jsx            # Main app file
│   └── main.jsx           # Entry point
├── .eslintrc.cjs          # ESLint configuration
├── postcss.config.cjs     # PostCSS configuration
├── tailwind.config.cjs    # TailwindCSS configuration
├── vite.config.js         # Vite config with plugins
└── package.json

📥 Dependencies

"dependencies": {
  "@radix-ui/react-avatar": "^1.1.10",
  "@radix-ui/react-dialog": "^1.1.14",
  "@radix-ui/react-dropdown-menu": "^2.1.15",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-select": "^2.2.5",
  "@radix-ui/react-slot": "^1.2.3",
  "@reduxjs/toolkit": "^2.8.2",
  "@tailwindcss/vite": "^4.1.11",
  "axios": "^1.10.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "jodit-react": "^5.2.19",
  "lucide-react": "^0.523.0",
  "next-themes": "^0.4.6",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.6.2",
  "redux-persist": "^6.0.0",
  "sonner": "^2.0.5",
  "tailwind-merge": "^3.3.1",
  "tailwindcss": "^4.1.11"
}





🛠️ Dev Dependencies

"devDependencies": {
  "@eslint/js": "^9.29.0",
  "@types/react": "^19.1.8",
  "@types/react-dom": "^19.1.6",
  "@vitejs/plugin-react": "^4.5.2",
  "eslint": "^9.29.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^16.2.0",
  "vite": "^7.0.0"
}



🚀 Live Demo
📡 Hosted on: https://mern-blog-ha28.onrender.com






⚙️ Tech Stack & Dependencies
✅ Frontend Libraries
React 19: UI library

Redux Toolkit: Global state management

React Router DOM v7: Client-side routing

Tailwind CSS 4: Utility-first CSS framework

Jodit React: Rich text editor for blogs

Sonner: Toast notifications

Lucide React: Icons

React Icons: Additional icons

Axios: API calls

Radix UI: Accessible components

React Redux: Hooks for Redux

Redux Persist: Persist Redux store

Class Variance Authority / clsx / tailwind-merge: Tailwind class handling

🛠️ Dev Tools
Vite 7: Next-gen frontend build tool

ESLint: Linting for clean code

@vitejs/plugin-react: React support in Vite

TypeScript types: For React & DOM

🔧 Installation & Setup
Clone the Repository



cd frontend
Install Dependencies



npm install
Start the Development Server


npm run dev
Build for Production


npm run build
Preview Production Build


npm run preview
📌 Features
✅ Blog Creation & Editing

✅ Rich Text Editing using Jodit

✅ Category-based Blog Filtering

✅ Dark/Light Mode Support

✅ Toast Notification System

✅ Responsive Dashboard & Routes

✅ Modern UI/UX with Radix & Tailwind

✅ Redux Persist for session state




📁 Backend Folder Structure
bash
Copy
Edit
backend/
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js
│   └── blogController.js
├── middlewares/
│   ├── authMiddleware.js       # JWT verify
│   └── errorMiddleware.js
├── models/
│   ├── Blog.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
├── uploads/                    # If you use Multer for image uploads
├── utils/
│   └── sendEmail.js            # Nodemailer or Resend API
├── .env
├── app.js                      # Express app setup
├── server.js                   # Starts server (listens on port)
└── package.json




✅ Example .env file

PORT=5000
MONGO_URI=mongodb+srv://your_db
JWT_SECRET=yourSecretKey
COOKIE_SECRET=yourCookieKey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_API_KEY=your_smtp_key_or_resend_key


 ***package.json Dependencies
json
Copy
Edit
"dependencies": {
  "bcryptjs": "^2.4.3",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-validator": "^6.15.0",
  "jsonwebtoken": "^9.0.0",
  "mongoose": "^8.3.4",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.8"
},
"devDependencies": {
  "nodemon": "^3.1.0"
}
