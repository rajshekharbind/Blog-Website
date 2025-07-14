
import React, { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { setBlog } from '@/redux/blogSlice';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const UpdateBlog = () => {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

  const { blog } = useSelector((state) => state.blog);
  const selectedBlog = blog.find((b) => b._id === blogId);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [publish, setPublish] = useState(selectedBlog?.isPublished || false);
  const [previewThumbnail, setPreviewThumbnail] = useState(selectedBlog?.thumbnail);

  const [blogData, setBlogData] = useState({
    title: '',
    subtitle: '',
    category: '',
    thumbnail: null,
    description: ''
  });

  // Load initial blog content into state
  useEffect(() => {
    if (selectedBlog) {
      setBlogData({
        title: selectedBlog.title,
        subtitle: selectedBlog.subtitle,
        category: selectedBlog.category,
        thumbnail: selectedBlog.thumbnail,
        description: selectedBlog.description,
      });
      setContent(selectedBlog.description);
      setPreviewThumbnail(selectedBlog.thumbnail);
    }
  }, [selectedBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value) => {
    setBlogData((prev) => ({ ...prev, category: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    try {
      if (!blogData.title || !blogData.subtitle || !content || !blogData.category) {
        toast.error('All fields are required');
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('subtitle', blogData.subtitle);
      formData.append('description', content);
      formData.append('category', blogData.category);
      if (blogData.thumbnail instanceof File) {
        formData.append('file', blogData.thumbnail);
      }

      const res = await axios.put(
        `https://mern-blog-ha28.onrender.com/api/v1/blog/${blogId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Update blog in store (optional)
        const updatedBlogs = blog.map((b) => (b._id === blogId ? res.data.blog : b));
        dispatch(setBlog(updatedBlogs));
      }
    } catch (error) {
      toast.error('Update failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishUnpublish = async (action) => {
    try {
      const res = await axios.patch(
        `https://mern-blog-ha28.onrender.com/api/v1/blog/publish-toggle/${blogId}?action=${action}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setPublish(!publish);
        navigate('/dashboard/your-blog');
      } else {
        toast.error('Failed to update publish status');
      }
    } catch (err) {
      toast.error('Error toggling publish status');
      console.error(err);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `https://mern-blog-ha28.onrender.com/api/v1/blog/delete/${blogId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedBlogs = blog.filter((b) => b._id !== blogId);
        dispatch(setBlog(updatedBlogs));
        toast.success(res.data.message);
        navigate('/dashboard/your-blog');
      }
    } catch (error) {
      toast.error('Failed to delete blog');
      console.error(error);
    }
  };

  return (
    <div className="pb-10 px-3 pt-20 md:ml-[320px]">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-4">
          <h1 className="text-4xl font-bold">Update Blog</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Modify your blog details and update its status.
          </p>

          <div className="space-x-2">
            <Button
              onClick={() => togglePublishUnpublish(publish ? 'false' : 'true')}
            >
              {publish ? 'Unpublish' : 'Publish'}
            </Button>
            <Button variant="destructive" onClick={deleteBlog}>
              Delete Blog
            </Button>
          </div>

          <div className="pt-4">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter subtitle"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select onValueChange={selectCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={blogData.category || "Select a category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Thumbnail</Label>
            <Input
              id="file"
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 mt-2 rounded-md shadow"
                alt="Blog Thumbnail Preview"
              />
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={updateBlogHandler} disabled={loading}>
              {loading ? 'Please Wait...' : 'Save'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default UpdateBlog;