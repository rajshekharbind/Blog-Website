import React from 'react';
import aboutImg from "../assets/About-blog.avif";

const About = () => {
  return (
    <div className="min-h-screen pt-28 px-4 md:px-0 mb-7 bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="max-w-6xl mx-auto">

        {/* 🌟 Header Section */}
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            About Our Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A digital space to share thoughts, spark conversations, and grow together.
          </p>
        </div>

        {/* 🖼️ Image + Text Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={aboutImg}
            alt="People collaborating on blog ideas"
            className="w-full h-72 object-cover rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          />
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Welcome to our Blog Platform! Whether you're here to explore fresh ideas, share your voice, or find a sense of belonging — you've found the right place.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Our mission is simple yet powerful: to empower individuals from all walks of life to express themselves, connect with others, and build meaningful digital communities.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              With intuitive tools, a clutter-free writing experience, and a vibrant reading community, we strive to make your journey rewarding whether you're publishing your first article or your hundredth.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Thank you for being part of this growing community. Let's write the future, one blog post at a time.
            </p>
          </div>
        </div>

        {/* 📸 Categories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Explore Our Interests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* 🌐 Web Development */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src="https://plus.unsplash.com/premium_photo-1663050633633-2856e875dcc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww" alt="Web Development" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Web Development</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  From HTML to React, we share tips and trends for building fast, scalable websites.
                </p>
              </div>
            </div>

            {/* 📝 Blogging */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src="https://cdn.pixabay.com/photo/2014/08/22/15/27/facebook-424521_1280.jpg" alt="Blogging" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Blogging</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Learn to write impactful posts, grow your voice, and build an audience online.
                </p>
              </div>
            </div>

            {/* 📷 Photography */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src="https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg" alt="Photography" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Photography</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Tips, editing tricks, and inspiration for beginners and pros behind the lens.
                </p>
              </div>
            </div>

            {/* 🍳 Cooking */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src="https://images.unsplash.com/photo-1653233797467-1a528819fd4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cooking" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Cooking</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Delicious recipes and techniques to bring joy and flavor to your kitchen.
                </p>
              </div>
            </div>

            {/* ⚽ Sports */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src="https://media.istockphoto.com/id/512753571/photo/playing-through-the-pain.jpg?s=612x612&w=0&k=20&c=CXOx2bYGVjMq7sOasK_8kaCipCUax5zKB2lk8LNzDtc=" alt="Sports" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Sports</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Dive into game analysis, player stories, and motivation from athletes worldwide.
                </p>
              </div>
            </div>

            {/* 📈 Digital Marketing */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src="https://cdn.pixabay.com/photo/2024/10/09/06/11/ai-generated-9106916_1280.jpg" alt="Digital Marketing" className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Digital Marketing</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Master the art of branding, SEO, and campaign strategy to reach your audience.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 💬 Footer Quote Section */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-500 dark:text-gray-400">
            "Words are powerful. Use them to inspire, to teach, and to connect."
          </blockquote>
        </div>

      </div>
    </div>
  );
};

export default About;

