import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { BLOGS, BlogPost, COST_ESTIMATION } from '../data/blogs';

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const foundBlog = BLOGS.find((b) => b.slug === slug);
    setBlog(foundBlog || null);
    setLoading(false);
  }, [slug]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const handleShare = () => {
    if (!blog) return;
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 rounded-full border-b-2 border-turquoise"></div></div>;
  if (!blog) return <div className="min-h-screen flex flex-col items-center justify-center"><h1 className="text-3xl font-bold mb-4">Blog Not Found</h1><Link to="/blog" className="text-turquoise font-semibold">Back to Blog</Link></div>;

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center text-turquoise font-semibold mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          <span className="inline-block mb-4 px-4 py-2 bg-turquoise/10 text-turquoise rounded-full text-sm">{blog.category}</span>
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-6 text-body-text">
              <div className="flex items-center"><User className="w-5 h-5 mr-2" />{blog.author}</div>
              <div className="flex items-center"><Calendar className="w-5 h-5 mr-2" />{formatDate(blog.published_at)}</div>
            </div>
            <button onClick={handleShare} className="flex items-center px-4 py-2 border-2 border-turquoise text-turquoise rounded-lg hover:bg-turquoise hover:text-white transition">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-body-text leading-relaxed space-y-6 whitespace-pre-wrap">{blog.content}</div>

            {blog.hasCostTable && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Cost of Studying Abroad (Approx. Per Year)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Country</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Estimated Tuition (USD/Year)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Estimated Living Costs (USD/Year)</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Total Estimated Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COST_ESTIMATION.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition">
                          <td className="border border-gray-300 px-4 py-3">{row.country}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.tuition}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.living}</td>
                          <td className="border border-gray-300 px-4 py-3 font-semibold">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-ghost-green">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Get personalized guidance from our expert counsellors</p>
          <Link to="/contact" className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition">Book Free Counselling</Link>
        </div>
      </section>
    </>
  );
};
