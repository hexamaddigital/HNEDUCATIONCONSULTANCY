export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  published_at: string;
}

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    slug: 'best-countries-for-pr-after-study',
    title: 'Best Countries for Permanent Residency (PR) After Studying Abroad',
    category: 'Study Abroad',
    author: 'Global Education Team',
    published_at: '2026-01-20',
    content: `
<h2>🌍 Best Countries for Permanent Residency (PR) After Studying Abroad</h2>
<p>Studying abroad is not just about education — it's about building a future.</p>

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
