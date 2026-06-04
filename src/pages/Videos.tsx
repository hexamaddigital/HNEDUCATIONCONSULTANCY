import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram, Youtube, ExternalLink, Film } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Video {
  id: string;
  title: string;
  description: string | null;
  platform: 'instagram' | 'youtube';
  video_id: string;
  original_url: string;
  thumbnail_url: string | null;
  display_order: number;
}

function getEmbedUrl(platform: string, videoId: string): string {
  if (platform === 'youtube') {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  }
  return `https://www.instagram.com/reel/${videoId}/embed/`;
}

function PlatformBadge({ platform }: { platform: string }) {
  if (platform === 'youtube') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold">
        <Youtube className="w-3 h-3" /> YouTube
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-semibold">
      <Instagram className="w-3 h-3" /> Instagram
    </span>
  );
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getEmbedUrl(video.platform, video.video_id);

  const thumbnailSrc =
    video.thumbnail_url ||
    (video.platform === 'youtube'
      ? `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`
      : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
    >
      {/* Video embed / thumbnail */}
      <div
        className={`relative bg-gray-900 overflow-hidden ${
          video.platform === 'instagram' ? 'aspect-[9/16]' : 'aspect-video'
        }`}
      >
        {playing ? (
          <iframe
            src={`${embedUrl}${video.platform === 'youtube' ? '&autoplay=1' : ''}`}
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
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/30 to-turquoise-dark/60 flex items-center justify-center">
                <Film className="w-16 h-16 text-white/40" />
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play className="w-7 h-7 text-turquoise ml-1" fill="currentColor" />
              </motion.div>
            </button>
            {/* Platform badge on thumbnail */}
            <div className="absolute top-3 left-3">
              <PlatformBadge platform={video.platform} />
            </div>
          </>
        )}
      </div>

      {/* Card footer */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-heading text-base leading-snug mb-1 line-clamp-2">{video.title}</h3>
        {video.description && (
          <p className="text-body-text text-sm leading-relaxed line-clamp-2 mb-3">{video.description}</p>
        )}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <PlatformBadge platform={video.platform} />
          <a
            href={video.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-turquoise hover:text-turquoise-dark transition-colors"
            onClick={e => e.stopPropagation()}
          >
            View original <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'instagram' | 'youtube'>('all');

  useEffect(() => {
    supabase
      .from('videos')
      .select('id,title,description,platform,video_id,original_url,thumbnail_url,display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('[Videos] fetch error:', error.message);
        if (data) setVideos(data as Video[]);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'all' ? videos : videos.filter(v => v.platform === filter);
  const hasYT = videos.some(v => v.platform === 'youtube');
  const hasIG = videos.some(v => v.platform === 'instagram');

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-ghost-green to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-turquoise/10 text-turquoise px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Play className="w-4 h-4" fill="currentColor" /> Our Videos
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-heading">
              Watch Our Story Unfold
            </h1>
            <p className="text-xl text-body-text">
              Student success stories, campus tours, counselling sessions, and more from HN Study Abroad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white min-h-[60vh]">
        <div className="container mx-auto px-4">
          {/* Filter tabs */}
          {(hasYT || hasIG) && (
            <div className="flex justify-center gap-3 mb-12">
              {(['all', hasIG && 'instagram', hasYT && 'youtube'] as const).filter(Boolean).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab as typeof filter)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    filter === tab
                      ? 'bg-turquoise text-white shadow-lg shadow-turquoise/30'
                      : 'bg-ghost-green text-body-text hover:bg-turquoise/10 hover:text-turquoise'
                  }`}
                >
                  {tab === 'all' && <Film className="w-4 h-4" />}
                  {tab === 'instagram' && <Instagram className="w-4 h-4" />}
                  {tab === 'youtube' && <Youtube className="w-4 h-4" />}
                  {tab === 'all' ? 'All Videos' : tab === 'instagram' ? 'Instagram Reels' : 'YouTube'}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-12 h-12 rounded-full border-4 border-turquoise border-t-transparent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 bg-ghost-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-9 h-9 text-turquoise" />
              </div>
              <h3 className="text-2xl font-bold text-heading mb-3">Videos Coming Soon</h3>
              <p className="text-body-text max-w-md mx-auto">
                We're uploading our latest reels and videos. Check back soon or follow us on Instagram for live updates.
              </p>
              <a
                href="https://www.instagram.com/hnstudyabroadpvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <Instagram className="w-4 h-4" /> Follow on Instagram
              </a>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`grid gap-6 ${
                  filtered.every(v => v.platform === 'instagram')
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                    : filtered.every(v => v.platform === 'youtube')
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                } max-w-7xl mx-auto`}
              >
                {filtered.map((video, i) => (
                  <VideoCard key={video.id} video={video} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA */}
      {!loading && filtered.length > 0 && (
        <section className="py-16 bg-ghost-green">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-heading mb-4">Want to Be Our Next Success Story?</h2>
              <p className="text-body-text mb-8 max-w-xl mx-auto">
                Book a free counselling session and start your international education journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-turquoise text-white rounded-full font-semibold hover:bg-turquoise-dark transition-all hover:scale-105 shadow-lg"
                >
                  Book Free Consultation
                </a>
                <a
                  href="https://www.instagram.com/hnstudyabroadpvtltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-heading border-2 border-gray-200 rounded-full font-semibold hover:border-turquoise hover:text-turquoise transition-all hover:scale-105"
                >
                  Follow on Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};
