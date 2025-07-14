// import BlogCard from '@/components/BlogCard';
// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// const SearchList = () => {
//     const location = useLocation();
//     const params = new URLSearchParams(location.search);
//     const query = params.get('q');
//     const { blog } = useSelector(store => store.blog)

//     console.log(blog);


//     const filteredBlogs = blog.filter(
//         (blog) =>
//             blog.title.toLowerCase().includes(query) ||
//             blog.subtitle.toLowerCase().includes(query) ||
//             blog.category.toLowerCase() === query.toLowerCase()
//     );
   
//     useEffect(()=>{
//         window.scrollTo(0,0)
//     },[])
//     return (
//         <div className='pt-32'>
//             <div className='max-w-6xl mx-auto'>
//                 <h2 className='mb-5'>Search Results for: "{query}"</h2>
//                 {/* Here you can fetch data or display filtered results based on the query */}
//                 <div className='grid grid-cols-3 gap-7 my-10'>
//                     {
//                         filteredBlogs.map((blog, index) => {
//                             return <BlogCard  blog={blog} />
//                         })
//                     }

//                 </div>

//             </div>
//         </div>
//     )
// }

// export default SearchList






import BlogCard from '@/components/BlogCard';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SearchList = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q')?.toLowerCase(); // make query lowercase for case-insensitive match
    const { blog } = useSelector(store => store.blog);

    // ✅ Fallback if blog is null or undefined
    const filteredBlogs = (blog || []).filter((item) => {
        const title = item.title?.toLowerCase() || '';
        const subtitle = item.subtitle?.toLowerCase() || '';
        const category = item.category?.toLowerCase() || '';

        return (
            title.includes(query) ||
            subtitle.includes(query) ||
            category === query
        );
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='pt-32'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='mb-5'>Search Results for: "{query}"</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10'>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))
                    ) : (
                        <p>No results found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchList;
