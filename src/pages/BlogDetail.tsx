import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
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

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      setBlog(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-green">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-turquoise hover:text-turquoise-dark font-semibold">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-turquoise hover:text-turquoise-dark font-semibold mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <span className="inline-block px-4 py-2 bg-turquoise/10 text-turquoise text-sm font-semibold rounded-full mb-4">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center space-x-6 text-body-text">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(blog.published_at)}</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-white border-2 border-turquoise text-turquoise rounded-lg hover:bg-turquoise hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-br from-turquoise to-turquoise-dark rounded-2xl h-96 flex items-center justify-center mb-8">
                <span className="text-white text-8xl">📚</span>
              </div>

              <div className="text-body-text leading-relaxed space-y-6">
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="py-12 bg-ghost-green">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl text-body-text mb-8">
                Get personalized guidance from our expert counsellors
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition-all hover:scale-105"
              >
                Book Free Counselling
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
};
