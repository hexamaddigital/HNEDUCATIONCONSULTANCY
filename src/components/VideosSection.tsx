import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Instagram, Youtube, ArrowRight, Film } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Video {
  id: string;
  title: string;
  platform: 'instagram' | 'youtube';
  video_id: string;
  original_url: string;
  thumbnail_url: string | null;
}

function VideoPreviewCard({ video, index }: { video: Video; index: number }) {
  const [playing, setPlaying] = useState(false);

  const embedUrl =
    video.platform === 'youtube'
      ? `https://www.youtube.com/embed/${video.video_id}?rel=0&modestbranding=1&autoplay=1`
      : `https://www.instagram.com/reel/${video.video_id}/embed/`;

  const thumbnailSrc =
    video.thumbnail_url ||
    (video.platform === 'youtube'
      ? `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`
      : null);

  const isVertical = video.platform === 'instagram';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <div className={`relative bg-gray-900 overflow-hidden ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
        {playing ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <>
            {thumbnailSrc ? (
              <img
                src={thumbnailSrc}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 to-turquoise-dark/50 flex items-center justify-center">
                <Film className="w-12 h-12 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play className="w-6 h-6 text-turquoise ml-1" fill="currentColor" />
              </motion.div>
            </button>
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                video.platform === 'youtube' ? 'bg-red-50 text-red-600' : 'bg-pink-50 text-pink-600'
              }`}>
                {video.platform === 'youtube'
                  ? <><Youtube className="w-3 h-3" /> YouTube</>
                  : <><Instagram className="w-3 h-3" /> Reel</>
                }
              </span>
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-heading text-sm line-clamp-2">{video.title}</p>
      </div>
    </motion.div>
  );
}

export const VideosSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('videos')
      .select('id,title,platform,video_id,original_url,thumbnail_url')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setVideos(data as Video[]);
        setLoading(false);
      });
  }, []);

  if (loading || videos.length === 0) return null;

  const hasVertical = videos.some(v => v.platform === 'instagram');
  const allVertical = videos.every(v => v.platform === 'instagram');

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-turquoise/10 text-turquoise px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" fill="currentColor" /> Our Latest Videos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            See Us in Action
          </h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            Student stories, success journeys, and expert guidance from HN Study Abroad
          </p>
        </motion.div>

        <div className={`grid gap-6 max-w-7xl mx-auto ${
          allVertical
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
            : hasVertical
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {videos.map((video, i) => (
            <VideoPreviewCard key={video.id} video={video} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-turquoise text-turquoise rounded-full font-semibold hover:bg-turquoise hover:text-white transition-all duration-300 hover:scale-105"
          >
            View All Videos <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
