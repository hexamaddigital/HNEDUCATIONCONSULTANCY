// pages/Blog.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOGS } from '../data/blogs';

export const Blog = () => {
  return (
    <>
      {/* HERO SECTION – SAME AS TRENDING COURSES */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-body-text">
              Latest insights, guides, and updates on studying abroad
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ul className="space-y-6">
            {BLOGS.map(blog => (
              <li
                key={blog.id}
                className="border-b pb-6 hover:translate-x-1 transition-transform"
              >
                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-turquoise font-semibold text-xl hover:underline"
                >
                  {blog.title}
                </Link>

                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  {blog.category} |{' '}
                  {new Date(blog.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
