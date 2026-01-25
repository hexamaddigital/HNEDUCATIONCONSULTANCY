// pages/Blog.tsx
import { Link } from 'react-router-dom';
import { BLOGS } from '../data/blogs';

export const Blog = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blogs</h1>
            <p className="text-xl text-body-text">
              Empowering students to achieve their global education dreams
            </p>
          </motion.div>
        </div>
      </section>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      <ul className="space-y-4">
        {BLOGS.map(blog => (
          <li key={blog.id} className="border-b pb-4">
            <Link
              to={`/blog/${blog.slug}`}
              className="text-turquoise font-semibold text-xl hover:underline"
            >
              {blog.title}
            </Link>
            <p className="text-gray-600 mt-1">
              {blog.category} | {new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
