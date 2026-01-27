import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { BLOGS, COST_ESTIMATION } from '../data/blogs';

export const BlogDetail = () => {
  const { slug } = useParams();
  const blog = BLOGS.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-bold">Blog Not Found</h1>
        <Link to="/blog" className="text-turquoise font-semibold">
          Back to Blog
        </Link>
      </div>
    );
  }

  const sharePost = () => {
    navigator.share
      ? navigator.share({ title: blog.title, url: window.location.href })
      : navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="flex items-center text-turquoise mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <span className="inline-block mb-4 px-4 py-2 bg-turquoise/10 text-turquoise rounded-full">
            {blog.category}
          </span>

          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-6 text-gray-600">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {blog.published_at}
              </div>
            </div>

            <button
              onClick={sharePost}
              className="border-2 border-turquoise px-4 py-2 rounded-lg text-turquoise hover:bg-turquoise hover:text-white transition"
            >
              <Share2 className="w-4 h-4 inline mr-2" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {!blog.hasCostTable && (
              <div className="whitespace-pre-wrap leading-relaxed">
                {blog.content}
              </div>
            )}

            {blog.hasCostTable && (
              <>
                <h2 className="text-2xl font-bold">
                  🎓 Cost of Studying Abroad (Per Year)
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-3">Country</th>
                        <th className="border px-4 py-3">Tuition</th>
                        <th className="border px-4 py-3">Living</th>
                        <th className="border px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COST_ESTIMATION.map((row, i) => (
                        <tr key={i}>
                          <td className="border px-4 py-3">{row.country}</td>
                          <td className="border px-4 py-3">{row.tuition}</td>
                          <td className="border px-4 py-3">{row.living}</td>
                          <td className="border px-4 py-3 font-semibold">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {blog.notes && (
                  <ul className="list-disc pl-6">
                    {blog.notes.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};
