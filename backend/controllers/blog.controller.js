import { Blog } from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Helper function for population
const populateOptions = [
  {
    path: 'author',
    select: 'firstName lastName photoUrl'
  },
  {
    path: 'comments',
    options: { sort: { createdAt: -1 } },
    populate: {
      path: 'userId',
      select: 'firstName lastName photoUrl'
    }
  }
];

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    
    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
        requiredFields: ["title", "category"]
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.id
    });

    return res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully"
    });

  } catch (error) {
    console.error("Create Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update blog post
export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      const uploadResult = await cloudinary.uploader.upload(fileUri);
      thumbnail = uploadResult.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { 
        title, 
        subtitle, 
        description, 
        category,
        ...(thumbnail && { thumbnail })
      },
      { new: true, runValidators: true }
    ).populate(populateOptions);

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully"
    });

  } catch (error) {
    console.error("Update Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog"
    });
  }
};

// Get all blogs
export const getAllBlogs = async (_, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate(populateOptions);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });

  } catch (error) {
    console.error("Get All Blogs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs"
    });
  }
};

// Get published blogs
export const getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate(populateOptions);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });

  } catch (error) {
    console.error("Get Published Blogs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch published blogs"
    });
  }
};

// Toggle publish status
export const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.status(200).json({
      success: true,
      data: {
        isPublished: blog.isPublished
      },
      message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`
    });

  } catch (error) {
    console.error("Toggle Publish Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle publish status"
    });
  }
};

// Get user's blogs
export const getOwnBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.id })
      .populate(populateOptions);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });

  } catch (error) {
    console.error("Get Own Blogs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your blogs"
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.blogId,
      author: req.id
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or unauthorized"
      });
    }

    await Comment.deleteMany({ postId: blog._id });

    if (blog.thumbnail) {
      const publicId = blog.thumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });

  } catch (error) {
    console.error("Delete Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog"
    });
  }
};

// Like blog
export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      { $addToSet: { likes: req.id } },
      { new: true }
    ).populate(populateOptions);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog liked successfully"
    });

  } catch (error) {
    console.error("Like Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to like blog"
    });
  }
};

// Dislike blog
export const dislikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.id;

    // Validate inputs
    if (!blogId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: userId } },
      { new: true }
    ).populate('author', 'firstName lastName');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog disliked successfully"
    });

  } catch (error) {
    console.error("Dislike Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to dislike blog",
      ...(process.env.NODE_ENV === 'development' && { 
        error: error.message,
        stack: error.stack 
      })
    });
  }
};

// Get total likes for user's blogs
export const getMyTotalBlogLikes = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.id }).select("likes");
    const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);

    return res.status(200).json({
      success: true,
      data: {
        totalBlogs: blogs.length,
        totalLikes
      }
    });

  } catch (error) {
    console.error("Get Total Likes Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total likes"
    });
  }
};