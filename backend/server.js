// import express from "express"
// //import dotenv from "dotenv"
// //import connectDB from "./database/db.js"
// // import userRoute from "./routes/user.route.js"
// // import blogRoute from "./routes/blog.route.js"
// // import commentRoute from "./routes/comment.route.js"
// // import cookieParser from 'cookie-parser';
// // import cors from 'cors'
// // import path from "path"

// dotenv.config()
// const app = express()

// const PORT = process.env.PORT || 3000


// // default middleware
// app.use(express.json());
// // app.use(cookieParser());
// // app.use(express.urlencoded({extended:true}));
// // app.use(cors({
// //     origin: "https://mern-blog-ha28.onrender.com",
// //     credentials:true
// // }))

// // const _dirname = path.resolve()

// // apis
// //  app.use("/api/v1/user", userRoute)
// //  app.use("/api/v1/blog", blogRoute)
// //  app.use("/api/v1/comment", commentRoute)

// //  app.use(express.static(path.join(_dirname,"/frontend/dist")));
// //  app.get("*", (_, res)=>{
// //     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
// //  });

// app.listen(PORT, ()=>{
//     console.log(`Server listen at port ${PORT}`);
//     connectDB()
// })
// backend/server.js

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import morgan from "morgan";

// Initialize environment and paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// Create Express app
const app = express();

// Security Middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
  })
);

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:5173",
  "https://mern-blog-ha28.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Enhanced Logging
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use((req, res, next) => {
  console.log({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.url,
    ip: req.ip,
    origin: req.headers.origin || "non-browser",
    userAgent: req.headers["user-agent"],
  });
  next();
});

// Standard Middleware
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Static Files (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
}

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// Client-Side Routing (production only)
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS Error",
      message: "The origin is not allowed to access this resource",
      allowedOrigins,
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
});

// Server Initialization
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🛡️  CORS allowed origins: ${allowedOrigins.join(", ")}`);
    })
    .catch((err) => {
      console.error("❌ Database connection failed:", err);
      process.exit(1);
    });
});
















// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import blogRoute from "./routes/blog.route.js";
// import commentRoute from "./routes/comment.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // 🔐 Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://mern-blog-ha28.onrender.com",
//     credentials: true,
//   })
// );

// // 📦 API Routes (FIRST)
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/blog", blogRoute);
// app.use("/api/v1/comment", commentRoute);

// // 🛠 Static file serving (LAST)
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "frontend", "dist")));

// // Catch-all route (VERY LAST)
// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// // 🚀 Start Server
// app.listen(PORT, () => {
//   console.log(`✅ Server listening on port ${PORT}`);
//   connectDB();
// });