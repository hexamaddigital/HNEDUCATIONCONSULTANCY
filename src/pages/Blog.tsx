// pages/Blog.tsx
import { Link } from 'react-router-dom';
import { BLOGS } from '../data/blogs';

export const Blog = () => {
  return (
  
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
