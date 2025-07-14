import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllCommentsOnMyBlogs,
  getCommentsOfPost,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// GET Routes (read operations)
router.get("/my-blogs/comments", isAuthenticated, getAllCommentsOnMyBlogs);
router.get("/posts/:postId/comments", getCommentsOfPost);  // Changed from 'post' to 'posts' for consistency

// POST/PUT/DELETE Routes (write operations)
router.post("/posts/:postId/comments", isAuthenticated, createComment);  // More RESTful structure
router.put("/comments/:commentId", isAuthenticated, editComment);  // Clear resource identification
router.delete("/comments/:commentId", isAuthenticated, deleteComment);

// Like action - changed to POST as it modifies state
router.post("/comments/:commentId/like", isAuthenticated, likeComment);

export default router;