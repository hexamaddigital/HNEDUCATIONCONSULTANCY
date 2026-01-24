// pages/BlogDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { BLOGS } from '../data/blogs';

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = BLOGS.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <Link to="/blog" className="text-turquoise underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back */}
      <Link
        to="/blog"
        className="text-turquoise font-semibold hover:underline"
      >
        ← Back to Blog
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold mt-4 mb-2">
        {blog.title}
      </h1>

      {/* Meta */}
      <p className="text-gray-600 mb-8">
        {blog.category} · {blog.author} ·{' '}
        {new Date(blog.published_at).toDateString()}
      </p>

      {/* Content EXACT AS WRITTEN */}
      <div
        className="text-body-text text-lg leading-relaxed whitespace-pre-wrap"
      >
        {blog.content}
      </div>
    </div>
  );
};
