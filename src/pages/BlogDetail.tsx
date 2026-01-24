import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { FAQ } from '../components/FAQ';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  published_at: string;
}

const BLOGS: BlogPost[] = [
  {
    id: '1',
    slug: 'best-countries-for-pr-after-study',
    title: 'Best Countries for Permanent Residency (PR) After Studying Abroad',
    category: 'Study Abroad',
    author: 'Global Education Team',
    published_at: '2026-01-20',
    content: `
<h2>🌍 Best Countries for Permanent Residency (PR) After Studying Abroad</h2>
<p>Studying abroad is not just about education — it’s about building a future.</p>

<h3>🇨🇦 Canada</h3>
<p>PGWP up to 3 years + Express Entry + PNP programs.</p>

<h3>🇩🇪 Germany</h3>
<p>18-month job seeker visa after graduation.</p>

<h3>🇦🇺 Australia</h3>
<p>Subclass 485 visa + Skilled Migration pathways.</p>

<a href="/contact">👉 Get Free Consultation</a>
`
  },
  {
    id: '2',
    slug: 'cost-of-studying-abroad',
    title: 'Cost of Studying Abroad: Tuition & Living Costs',
    category: 'Finance',
    author: 'Global Education',
    published_at: '2026-01-22',
    content: `
<h2>🎓 Cost of Studying Abroad: Tuition + Living (Approx. Per Year)</h2>

<table border="1" cellpadding="8">
<tr>
<th>Country</th><th>Total Cost (USD)</th>
</tr>
<tr><td>UK</td><td>$25,000 – $53,000</td></tr>
<tr><td>USA</td><td>$32,000 – $70,000</td></tr>
<tr><td>Canada</td><td>$25,000 – $45,000</td></tr>
<tr><td>Germany</td><td>$8,000 – $15,000</td></tr>
</table>

<p>Costs vary by city, lifestyle, exchange rates, and scholarships.</p>
`
  },
  {
    id: '3',
    slug: 'sop-writing-tips-2026',
    title: 'SOP Writing Tips for Study Abroad 2026',
    category: 'Admissions',
    author: 'Admissions Experts',
    published_at: '2026-01-24',
    content: `
<h2>✍️ SOP Writing Tips for Study Abroad 2026</h2>

<ul>
<li>Start with an authentic introduction</li>
<li>Clearly justify your course choice</li>
<li>Customize SOP for each university</li>
<li>Define short-term and long-term goals</li>
</ul>

<p>A strong SOP can make or break your application.</p>

<a href="/contact">👉 Get SOP Help</a>
`
  }
];

const BlogDetail = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-turquoise"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link to="/blog" className="text-turquoise font-semibold">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-turquoise font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <span className="inline-block mb-4 px-4 py-2 bg-turquoise/10 text-turquoise rounded-full text-sm">
            {blog.category}
          </span>

          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-6 text-body-text">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {blog.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(blog.published_at)}
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 border-2 border-turquoise text-turquoise rounded-lg hover:bg-turquoise hover:text-white transition"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="text-body-text leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: String(blog.content) }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-ghost-green">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">
            Get personalized guidance from our expert counsellors
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>

      <FAQ />
    </>
  );
};

export default BlogDetail;
