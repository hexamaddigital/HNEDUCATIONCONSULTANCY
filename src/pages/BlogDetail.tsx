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
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Regular blog content */}
            {!blog.hasCostTable && (
              <div className="whitespace-pre-wrap leading-relaxed text-body-text">
                {blog.content}
              </div>
            )}

            {/* Cost Table Blog */}
            {blog.hasCostTable && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  🎓 Cost of Studying Abroad (Per Year)
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-3 text-left">Country</th>
                        <th className="border px-4 py-3 text-left">Tuition</th>
                        <th className="border px-4 py-3 text-left">Living</th>
                        <th className="border px-4 py-3 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COST_ESTIMATION.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="border px-4 py-3">{row.country}</td>
                          <td className="border px-4 py-3">{row.tuition}</td>
                          <td className="border px-4 py-3">{row.living}</td>
                          <td className="border px-4 py-3 font-semibold">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Notes, Insights, Tips */}
                <div className="mt-10 space-y-8 text-body-text">

                  {/* Notes Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">🔎 Notes on the Table</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Figures are approximate annual costs combining tuition + living expenses, useful for general planning.</li>
                      <li>Dubai (UAE) averages are rough estimates based on UAE study cost breakdown trends and living costs — tuition & living vary widely by city and institution.</li>
                      <li>Russia & Spain ranges are estimated from a mix of European cost data and student expense insights.</li>
                      <li>Costs vary significantly depending on city, course, university, lifestyle, exchange rates, and scholarships — always check official university and government pages before budgeting.</li>
                      <li>These figures do not include visa fees, travel, health insurance, study materials, or personal expenses, which can add several thousand dollars to your annual budget.</li>
                    </ul>
                  </div>

                  {/* Insights Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">🧠 Quick Insights</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Most Affordable (Tuition):</strong> Germany, France, Italy (public institutions often low or free).</li>
                      <li><strong>Highest Living Costs:</strong> Switzerland, Australia, USA, UK.</li>
                      <li><strong>Balanced Overall Cost:</strong> Canada, Ireland, New Zealand, Netherlands.</li>
                    </ul>
                  </div>

                  {/* Tips Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">📌 Tips to Save on Study Abroad Costs</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>🎓 <strong>Scholarships:</strong> Many universities and governments (e.g., Sweden’s Institute Scholarships) offer tuition or fee support.</li>
                      <li>🍽 <strong>Part-time work:</strong> Student work rights can help offset living costs in Canada, Australia, UK, and more.</li>
                      <li>🏠 <strong>Shared living:</strong> Choosing shared apartments or student dorms can significantly reduce accommodation expenses.</li>
                      <li>✈️ <strong>Travel off-peak:</strong> Booking flights early and comparing options can save a lot on travel costs.</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 bg-ghost-green">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Get personalized guidance from our expert counsellors</p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>
    </>
  );
};
