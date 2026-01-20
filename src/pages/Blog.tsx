import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FAQ } from '../components/FAQ';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string;
}

export const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, category, author, published_at')
      .order('published_at', { ascending: false });

    if (!error && data) {
      setBlogs(data);
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

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Study Abroad Blog</h1>
            <p className="text-xl text-body-text">
              Expert insights, tips, and guides for your international education journey
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-turquoise/20 hover:border-turquoise/50 hover:shadow-xl transition-all group"
                >
                  <div className="bg-gradient-to-br from-turquoise to-turquoise-dark h-48 flex items-center justify-center">
                    <span className="text-white text-5xl">📚</span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-turquoise/10 text-turquoise text-sm font-semibold rounded-full">
                        {blog.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-3 text-heading group-hover:text-turquoise transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-body-text mb-4 line-clamp-3">{blog.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-body-text mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(blog.published_at)}</span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center text-turquoise font-semibold hover:text-turquoise-dark transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <FAQ />
    </>
  );
};
