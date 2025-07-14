import BlogCard from '@/components/BlogCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'

export const blogJson = [
   {
  "id": 1,
  "title": "The Ultimate Guide to Digital Marketing in 2025",
  "author": "Rohit Singh",
  "date": "2025-03-27",
  "content": "Digital marketing is constantly evolving...",
  "tags": ["digital marketing", "SEO"],
  "category": "Marketing",
  "image": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
}
,
    {
        "id": 2,
        "title": "Building a Full-Stack LMS with MERN Stack",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "Step-by-step MERN LMS build...",
        "tags": ["MERN", "React"],
        "category": "Web Development",
        "image": "https://source.unsplash.com/random/600x400/?mern,code"
    },
    {
        "id": 3,
        "title": "Top 10 WordPress Plugins for 2025",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "Best plugins for security, SEO...",
        "tags": ["WordPress", "plugins"],
        "category": "WordPress",
        "image": "https://source.unsplash.com/random/600x400/?wordpress,plugins"
    },
    {
        "id": 4,
        "title": "How to Use APIs in Web Development",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "Understanding RESTful APIs...",
        "tags": ["APIs", "web"],
        "category": "Web Development",
        "image": "https://source.unsplash.com/random/600x400/?api,webdev"
    },
    {
        "id": 5,
        "title": "Search Engine Optimization: Beginner’s Guide",
        "author": "Rohit Singh",
        "date": "2025-03-27",
        "content": "SEO is vital for ranking...",
        "tags": ["SEO", "ranking"],
        "category": "Marketing",
        "image": "https://source.unsplash.com/random/600x400/?seo,google"
    }
]

const Blog = () => {
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const [localFallback, setLocalFallback] = useState(false)

    useEffect(() => {
        const getAllPublishedBlogs = async () => {
            try {
                const res = await axios.get(
                    `https://mern-blog-ha28.onrender.com/api/v1/blog/get-published-blogs`,
                    { withCredentials: true }
                )
                if (res.data.success && res.data.blogs?.length > 0) {
                    dispatch(setBlog(res.data.blogs))
                    setLocalFallback(false)
                } else {
                    setLocalFallback(true)
                }
            } catch (error) {
                console.log("API failed. Falling back to local data.", error)
                setLocalFallback(true)
            }
        }
        getAllPublishedBlogs()
    }, [])

    const dataToRender = localFallback ? blogJson : blog

    return (
        <div className='pt-16'>
            <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
                <h1 className='text-4xl font-bold text-center pt-10 '>Our Blogs</h1>
                <hr className='w-24 text-center border-2 border-red-500 rounded-full' />
            </div>

            <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-10 px-4 md:px-0'>
                {
                    dataToRender?.map((blog, index) => (
                        <BlogCard blog={blog} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Blog
