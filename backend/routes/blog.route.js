import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
  getOwnBlogs,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// Consistent parameter naming (:blogId)
router.post("/", isAuthenticated, createBlog);
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog);
router.patch("/:blogId/publish", isAuthenticated, togglePublishBlog);

// Grouped GET routes
router.get("/all", getAllBlogs);  // Simplified from "/get-all-blogs"
router.get("/published", getPublishedBlog);  // Simplified from "/get-published-blogs"
router.get("/my-blogs", isAuthenticated, getOwnBlogs);  // Simplified from "/get-own-blogs"
router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);

// Changed to POST for state-changing actions
router.post("/:blogId/like", isAuthenticated, likeBlog);
router.post("/:blogId/dislike", isAuthenticated, dislikeBlog);

router.delete("/:blogId", isAuthenticated, deleteBlog);  // Simplified from "/delete/:id"

export default router;