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
    id: "1",
    slug: "best-countries-for-pr-after-study",
    title: "Best Countries for Permanent Residency (PR) After Studying Abroad",
    category: "Study Abroad",
    author: "Global Education Team",
    published_at: "2026-01-20",
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
    id: "2",
    slug: "cost-of-studying-abroad",
    title: "Cost of Studying Abroad: Tuition & Living Costs",
    category: "Finance",
    author: "Global Education",
    published_at: "2026-01-22",
    content: `
<h2>🎓 Cost of Studying Abroad (Per Year)</h2>

<table border="1" cellpadding="8">
<tr><th>Country</th><th>Total Cost (USD)</th></tr>
<tr><td>UK</td><td>$25k – $53k</td></tr>
<tr><td>USA</td><td>$32k – $70k</td></tr>
<tr><td>Canada</td><td>$25k – $45k</td></tr>
<tr><td>Germany</td><td>$8k – $15k</td></tr>
</table>

<p>Costs vary by city, lifestyle, and scholarships.</p>
`
  },
  {
    id: "3",
    slug: "sop-writing-tips-2026",
    title: "SOP Writing Tips for Study Abroad 2026",
    category: "Admissions",
    author: "Admissions Experts",
    published_at: "2026-01-24",
    content: `
<h2>✍️ SOP Writing Tips for 2026</h2>

<ul>
<li>Be honest and structured</li>
<li>Customize SOP for each university</li>
<li>Explain career goals clearly</li>
</ul>

<p>A strong SOP can change your future.</p>

<a href="/contact">👉 Get SOP Help</a>
`
  }
];

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundBlog = BLOGS.find((b) => b.slug === slug);
    setBlog(foundBlog || null);
    setLoading(false);
  }, [slug]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-green">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-green">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-turquoise font-semibold">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center text-turquoise mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>

          <span className="inline-block px-4 py-2 bg-turquoise/10 text-turquoise rounded-full mb-4">
            {blog.category}
          </span>

          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-6 text-body-text">
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2" /> {blog.author}
              </span>
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> {formatDate(blog.published_at)}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 border-2 border-turquoise text-turquoise rounded-lg hover:bg-turquoise hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
          <div
            className="text-body-text"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      <FAQ />
    </>
  );
};

export default BlogDetail;
