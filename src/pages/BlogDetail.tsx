// pages/Blog.tsx
import { Link } from 'react-router-dom';
import { BLOGS } from '../data/blogs';

export const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-10">Blog</h1>

      {/* Blog List */}
      <div className="space-y-8">
        {BLOGS.map(blog => (
          <Link
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="block group"
          >
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-turquoise group-hover:underline">
                {blog.title}
              </h2>

              {/* Meta */}
              <p className="text-gray-600 mt-2">
                {blog.category} |{' '}
                {new Date(blog.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              {/* Short preview */}
              <p className="text-body-text mt-4 line-clamp-2">
                {blog.content.slice(0, 180)}...
              </p>

              {/* Read more */}
              <span className="inline-block mt-4 text-turquoise font-semibold">
                Read article →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
