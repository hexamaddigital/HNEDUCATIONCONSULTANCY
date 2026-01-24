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
<h2>🌍 Best Countries for Permanent Residency (PR) After Studying Abroad 🇨🇦🇩🇪🇦🇺🇮🇪🇳🇱🇸🇪🇫🇷</h2>
<p>For many international students, studying abroad isn’t just about earning a degree — it’s about building a long-term career and life in a new country. While some destinations focus primarily on education, others offer clear and achievable pathways to permanent residency (PR) after you graduate. In 2026, these countries stand out for their student-friendly PR routes and post-study work opportunities.</p>

<h3>📌 1. Canada — The Gold Standard for PR After Studies 🇨🇦</h3>
<p>Canada continues to be one of the easiest and most welcoming countries for international students who want to convert their study stay into permanent residency. Its Post-Graduation Work Permit (PGWP) allows graduates to stay and work for up to 3 years after completing their degree — giving you valuable Canadian work experience that counts toward your PR application.</p>
<ul>
<li>✅ Express Entry (Canadian Experience Class)</li>
<li>✅ Provincial Nominee Programs (PNPs)</li>
<li>✅ Quebec Experience Program (PEQ)</li>
</ul>
<p>🇨🇦 Why Canada? The combination of a long PGWP, flexible immigration pathways, and a points-based PR system makes Canada a top choice for Indian students and others looking to stay long-term. <a href="/work-abroad">Learn more</a></p>

<h3>🇩🇪 2. Germany — Fast Track to Residency in Europe</h3>
<p>Germany is known for affordable or tuition-free public universities and a strong job market, especially in STEM fields. After graduation, international students can apply for an 18-month Job Seeker Visa to find work in their field. Once employed, graduates can transition to a work visa and fast-track permanent residency (the Niederlassungserlaubnis).</p>
<p>🎯 Pro Tip: Learning German can significantly boost your employability and shorten the PR timeframe — as skilled workers with language proficiency often qualify faster. <a href="/work-abroad">Learn more</a></p>

<h3>🇦🇺 3. Australia — Skilled Immigration Through Study</h3>
<p>Australia offers post-study work visas and pathways to PR — particularly through skilled migration routes. Graduates can apply for the Temporary Graduate Visa (Subclass 485) after completing eligible studies, which lets them work in Australia for 2–4 years depending on their degree and location.</p>
<p>Over time, work experience gained on this visa can be used to score points under Australia’s General Skilled Migration (GSM) system for PR. <a href="/work-abroad">Learn more</a></p>

<h3>🇮🇪 4. Ireland — Emerging PR Pathway in Europe</h3>
<p>Ireland’s Third Level Graduate Scheme lets eligible graduates stay for up to 2 years to find employment after finishing their studies. With a Critical Skills Employment Permit, you can transition to long-term residency leading to PR. <a href="/work-abroad">Learn more</a></p>

<h3>🇳🇱 5. Netherlands — Work First, Then PR</h3>
<p>The Netherlands offers the Orientation Year Visa (Zoekjaar), which allows international graduates to stay for 12 months after finishing their studies while searching for a job. Securing employment can lead to a Highly Skilled Migrant Permit, opening the pathway to PR. <a href="/work-abroad">Learn more</a></p>

<h3>🇸🇪 6. Sweden — A Practical European Pathway</h3>
<p>Sweden allows graduates to stay for up to 12 months after graduation to look for work related to their studies. Continuous skilled employment can lead to long-term residency. <a href="/work-abroad">Learn more</a></p>

<h3>🇫🇷 7. France — Culture, Opportunity, and PR</h3>
<p>France offers a temporary “Autorisation Provisoire de Séjour (APS)” after graduation, allowing you to stay for 12–24 months to find work or start a business. Continuous residence can lead to PR. <a href="/work-abroad">Learn more</a></p>

<h3>📊 Key Takeaways for Students Planning to Settle Abroad</h3>
<ul>
<li>✔️ Canada remains the top destination for international students seeking PR after studies.</li>
<li>✔️ Europe — Germany, Ireland, Netherlands, Sweden, and France — offer structured study-to-PR pathways.</li>
<li>✔️ Australia blends excellent education with strong work rights and points-based immigration for PR.</li>
</ul>

<p>🌍 Important Note: Immigration and PR rules are dynamic and may change each year. Always check official immigration websites.</p>
<p>🎓 Final Thoughts: Choosing where to study abroad is just the first step — planning how to stay long-term is key. If your goal is PR, countries like Canada, Germany, Australia, Ireland, Netherlands, Sweden, and France should be top of your list.</p>

<p><a href="/contact" class="inline-block px-4 py-2 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition">👉 Get Free Consultation</a></p>
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
<th>Country</th><th>Estimated Tuition (USD/Year)</th><th>Estimated Living Costs (USD/Year)</th><th>Total Estimated Cost</th>
</tr>
<tr><td>UK</td><td>$15,000 – $35,000</td><td>$10,000 – $18,000</td><td>$25,000 – $53,000</td></tr>
<tr><td>USA</td><td>$20,000 – $50,000</td><td>$12,000 – $20,000</td><td>$32,000 – $70,000</td></tr>
<tr><td>Canada</td><td>$15,000 – $30,000</td><td>$10,000 – $15,000</td><td>$25,000 – $45,000</td></tr>
<tr><td>Australia</td><td>$13,000 – $28,000</td><td>$14,000 – $22,000</td><td>$27,000 – $50,000</td></tr>
<tr><td>New Zealand</td><td>$14,000 – $30,000</td><td>$10,000 – $18,000</td><td>$24,000 – $48,000</td></tr>
<tr><td>Ireland</td><td>$15,000 – $25,000</td><td>$12,000 – $18,000</td><td>$27,000 – $43,000</td></tr>
<tr><td>Dubai (UAE)</td><td>$8,000 – $20,000*</td><td>$8,000 – $12,000*</td><td>$16,000 – $32,000</td></tr>
<tr><td>Italy</td><td>$2,000 – $5,500</td><td>$9,000 – $13,000</td><td>$11,000 – $18,500</td></tr>
<tr><td>Germany</td><td>$0 – $3,000</td><td>$8,000 – $12,000</td><td>$8,000 – $15,000</td></tr>
<tr><td>France</td><td>$2,000 – $5,000</td><td>$10,000 – $14,000</td><td>$12,000 – $19,000</td></tr>
<tr><td>Russia</td><td>$3,000 – $8,000†</td><td>$6,000 – $9,000†</td><td>$9,000 – $17,000</td></tr>
<tr><td>Spain</td><td>$3,000 – $10,000†</td><td>$9,000 – $14,000†</td><td>$12,000 – $24,000</td></tr>
<tr><td>Sweden</td><td>$8,000 – $20,000</td><td>$10,000 – $14,000</td><td>$18,000 – $34,000</td></tr>
<tr><td>Switzerland</td><td>$800 – $1,200</td><td>$22,000 – $24,000</td><td>$23,000 – $25,000</td></tr>
<tr><td>Malta</td><td>$8,000 – $15,000§</td><td>$8,000 – $12,000§</td><td>$16,000 – $27,000</td></tr>
<tr><td>Finland</td><td>$8,000 – $15,000§</td><td>$9,000 – $13,000§</td><td>$17,000 – $28,000</td></tr>
<tr><td>Netherlands</td><td>$8,000 – $20,000</td><td>$11,000 – $15,000</td><td>$19,000 – $35,000</td></tr>
</table>

<p>🔎 Notes:</p>
<ul>
<li>*Figures are approximate annual costs combining tuition + living expenses.</li>
<li>Costs vary by city, course, university, lifestyle, exchange rates, and scholarships.</li>
<li>Does not include visa fees, travel, insurance, study materials, or personal expenses.</li>
</ul>

<p>🧠 Quick Insights:</p>
<ul>
<li>✅ Most Affordable Tuition: Germany, France, Italy</li>
<li>✅ Highest Living Costs: Switzerland, Australia, USA, UK</li>
<li>✅ Balanced Overall Cost: Canada, Ireland, New Zealand, Netherlands</li>
</ul>

<p>📌 Tips to Save:</p>
<ul>
<li>🎓 Scholarships: University or government-based support.</li>
<li>🍽 Part-time work: Offsets living costs.</li>
<li>🏠 Shared living: Reduces accommodation costs.</li>
<li>✈️ Travel off-peak: Save on flights.</li>
</ul>
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

<p>A Statement of Purpose (SOP) is one of the most critical parts of your study abroad application. In 2026, universities and visa officers are paying closer attention to how well you articulate your goals, intent, and fit.</p>

<h3>📌 What Is an SOP and Why It’s Important?</h3>
<p>An SOP is a personal essay explaining:</p>
<ul>
<li>Why you chose a specific course and university</li>
<li>Your academic and professional background</li>
<li>Your career goals</li>
<li>Why studying abroad makes sense</li>
</ul>

<h3>✨ Top SOP Writing Tips for Study Abroad 2026</h3>
<ol>
<li><strong>Start with a Strong, Authentic Introduction</strong>
<p>Use defining academic experiences or moments shaping your career, not clichés.</p></li>

<li><strong>Be Clear About Academic Background</strong>
<p>Highlight key subjects, achievements, projects, and relevant skills like AI, data literacy, sustainability.</p></li>

<li><strong>Justify Your Course Choice Clearly</strong>
<p>Show progression: past studies → current interests → future career. Avoid generic lines.</p></li>

<li><strong>Explain Why You Chose This Country</strong>
<p>Mention education quality, industry demand, research ecosystem, post-study work exposure.</p></li>

<li><strong>Customise SOP for Each University</strong>
<p>Include specific modules, faculty names, facilities, teaching approach.</p></li>

<li><strong>Address Academic Gaps or Weaknesses Honestly</strong>
<p>Explain strategically what you learned and skills gained. Take ownership.</p></li>

<li><strong>Define Clear Career Goals (Short-Term & Long-Term)</strong>
<p>Goals should match course and market demand; be realistic.</p></li>

<li><strong>Maintain the Right SOP Structure</strong>
<p>Introduction → Academic Background → Experience → Course Motivation → University → Country → Career Goals → Conclusion. Ideal: 800–1,000 words.</p></li>

<li><strong>Use Simple, Professional Language</strong>
<p>Clear, concise, professional. Avoid slang, over-emotional or AI-generated generic phrases.</p></li>

<li><strong>Proofread and Get Expert Feedback</strong>
<p>Check grammar, consistency, remove repetition, follow visa-specific SOP requirements.</p></li>
</ol>

<p>❌ Common SOP Mistakes to Avoid: One SOP for all universities, ignoring visa intent, exaggerating achievements, copying online samples.</p>

<p>🎓 Need Help? Our experts craft personalised, plagiarism-free SOPs for country, university, and visa requirements. <a href="/contact" class="inline-block px-4 py-2 bg-turquoise text-white rounded-lg font-semibold hover:bg-turquoise-dark transition">👉 Contact Us</a></p>
`
  }
];


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
