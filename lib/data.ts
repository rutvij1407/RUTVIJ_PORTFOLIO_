export const profile = {
  name: 'Vakati Rutvij Reddy',
  short: 'Rutvij',
  email: 'rvakati@gmu.edu',
  phone: '+1 (703) 499-1275',
  phoneHref: 'tel:+17034991275',
  location: 'Fairfax, VA',
  linkedin: 'https://www.linkedin.com/in/vakati-rutvij-1167rutvij',
  github: 'https://github.com/rutvij1407',
  resume: '/assets/pdf/Rutvij_Resume.pdf',
  roles: [
    'Data Analytics Engineer',
    'ETL & Pipeline Builder',
    'Power BI & Tableau Storyteller',
    'AI-Powered App Builder',
  ],
  tagline:
    'MS Data Analytics Engineering student at George Mason University. I build pipelines, dashboards and AI tools that turn messy data into decisions people can act on.',
}

export const stats = [
  { value: 99, suffix: '%', label: 'Data accuracy', note: '10K+ daily records' },
  { value: 50, suffix: 'K+', label: 'Records analyzed', note: 'SQL, SSMS, Power BI' },
  { value: 40, suffix: '%', label: 'Faster queries', note: 'indexing & tuning' },
  { value: 9, suffix: '', label: 'Shipped projects', note: 'web, ML, AI, native' },
]

export const experience = [
  {
    role: 'Data Analytics Intern',
    company: 'Archents India Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Aug 2024 – Jul 2025',
    metrics: [
      { v: '15%', l: 'forecast accuracy' },
      { v: '4→2', l: 'days to report' },
      { v: '25%', l: 'fewer errors' },
    ],
    points: [
      'Improved sales forecast accuracy by 15% by analyzing 50K+ records in SQL, SSMS, and Power BI to uncover seasonal demand patterns and revenue drivers.',
      'Cut stakeholder report delivery time from 4 days to 2 by automating recurring analytics workflows in Power BI and Excel, reducing manual effort by 35%.',
      'Decreased reporting errors by 25% by building a consolidated data pipeline in Python and SQL that unified records from 5+ disparate sources into a single validated dataset.',
    ],
    tags: ['SQL', 'SSMS', 'Power BI', 'Excel', 'Python'],
  },
  {
    role: 'Cofounder & Data Lead',
    company: 'Pullulate Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Dec 2022 – Aug 2024',
    metrics: [
      { v: '99%', l: 'data accuracy' },
      { v: '30%', l: 'faster decisions' },
      { v: '20%', l: 'lower cloud cost' },
    ],
    points: [
      'Accelerated executive decision making by 30% by designing real-time Power BI dashboards on AWS RDS, giving leadership on-demand visibility into 10+ operational KPIs.',
      'Achieved 99% data accuracy across 10K+ daily records by building end-to-end ETL pipelines in Python and SQL with automated validation checks.',
      'Reduced cloud infrastructure costs by 20% with resource monitoring and right-sizing across AWS EC2, S3, and RDS.',
      'Mentored and trained 5 junior analysts on validation workflows, data standards, and analytics best practices, improving team data quality by 20%.',
    ],
    tags: ['Power BI', 'AWS RDS', 'EC2', 'S3', 'ETL', 'Python', 'SQL'],
  },
  {
    role: 'AWS Cloud Analytics Intern',
    company: 'NSIC, Institute of Aeronautical Engineering',
    location: 'Hyderabad, India',
    period: 'Jun 2022 – Aug 2022',
    metrics: [
      { v: '15%', l: 'cost optimization' },
      { v: '40%', l: 'faster queries' },
    ],
    points: [
      'Demonstrated 15% cost optimization potential by prototyping a Power BI dashboard that visualized AWS billing trends and surfaced underutilized cloud resources.',
      'Achieved 40% faster query execution by optimizing SQL queries and implementing indexing strategies on analytical workloads.',
    ],
    tags: ['AWS', 'Power BI', 'SQL', 'Indexing'],
  },
]

export type Project = {
  title: string
  kind: string
  category: 'Web' | 'Data & ML' | 'AI' | 'Native'
  live?: boolean
  link?: string
  github: string
  blurb: string
  points: string[]
  tech: string[]
  stat?: { v: string; l: string }
}

const GH = 'https://github.com/rutvij1407'

export const projects: Project[] = [
  {
    title: 'TalentScope',
    kind: 'Job market intelligence',
    category: 'Web',
    live: true,
    github: GH,
    blurb: 'H1B and labor market hiring trends across US states, on a live map.',
    points: [
      'Built a job market intelligence dashboard surfacing H1B and labor market hiring trends across US states with live Mapbox visualizations.',
      'Engineered an employer and market data pipeline alongside candidate analysis tools, deployed end to end on Vercel.',
    ],
    tech: ['Next.js', 'TypeScript', 'Mapbox', 'Data Pipelines', 'Vercel'],
    stat: { v: 'Live', l: 'on Vercel' },
  },
  {
    title: 'Pulse',
    kind: 'Music sentiment analytics',
    category: 'Data & ML',
    live: true,
    github: GH,
    blurb: 'Spotify and YouTube data, sentiment-scored and surfaced in Tableau.',
    points: [
      'Built an automated ETL pipeline ingesting Spotify and YouTube API data and running VADER and TextBlob sentiment analysis on 1,000+ listener comments.',
      'Surfaced streaming trends, including a 100 to 130 BPM hit tempo range and genre-level popularity drivers, through interactive Tableau dashboards.',
    ],
    tech: ['Python', 'Pandas', 'NLP', 'Tableau'],
    stat: { v: '1,000+', l: 'comments scored' },
  },
  {
    title: 'DataSense AI',
    kind: 'Natural language analytics chatbot',
    category: 'AI',
    github: GH,
    blurb: 'Upload a CSV, ask questions in plain English, get charts and reports.',
    points: [
      'Reduced dataset exploration time from hours to minutes with an AI chatbot on the Anthropic Claude API that generates insights, Plotly visualizations, and exportable reports from user-uploaded CSV data.',
      'Deployed a full-stack application supporting multi-turn analytical conversations with session-based context management.',
    ],
    tech: ['Python', 'Claude API', 'Plotly', 'Streamlit'],
    stat: { v: 'Hours→Min', l: 'to explore data' },
  },
  {
    title: 'HuntBoard',
    kind: 'AI job search copilot',
    category: 'AI',
    github: GH,
    blurb: 'Tailors your resume and cover letter to each job, then tracks the application.',
    points: [
      'Built an AI-assisted job search tool that parses PDF and DOCX resumes, optimizes them against target job descriptions through the Claude API, and drafts tailored cover letters.',
      'Implemented an end-to-end application tracking dashboard backed by Supabase.',
    ],
    tech: ['Next.js', 'Claude API', 'Supabase'],
  },
  {
    title: 'CapitalEdge',
    kind: 'DMV real estate intelligence',
    category: 'Data & ML',
    github: GH,
    blurb: 'Random forest valuation model that flags undervalued DC-metro ZIP codes.',
    points: [
      'Fused Zillow home value, US Census demographic, and crime data across 200+ DC metro ZIP codes into a single analytics dataset.',
      'Trained a random forest valuation model that flagged 15+ statistically undervalued ZIP codes and quantified household income as the strongest price driver (Pearson r ≈ 0.78).',
    ],
    tech: ['Python', 'Scikit-learn', 'SQL'],
    stat: { v: 'r ≈ 0.78', l: 'income vs. price' },
  },
  {
    title: 'JobAtlas',
    kind: 'US jobs platform for international students',
    category: 'Web',
    github: GH,
    blurb: 'H1B market and state-level hiring dashboards for visa-sponsored searches.',
    points: [
      'Built H1B market and state-level hiring dashboards for international students navigating visa-sponsored job search.',
      'Automated a daily data refresh pipeline with a dedicated ops monitoring page for pipeline health.',
    ],
    tech: ['Next.js', 'Google Maps API'],
    stat: { v: 'Daily', l: 'automated refresh' },
  },
  {
    title: 'Solaris',
    kind: 'Geospatial intelligence app',
    category: 'Native',
    github: GH,
    blurb: 'Tactical-style macOS app for live flights, satellites and NOAA weather radar.',
    points: [
      'Built a native macOS app with a tactical-style interface for live flight tracking, satellite positions, and NOAA weather radar through public APIs.',
      'Designed a SwiftUI and Cesium.js hybrid 3D globe, paired with a Next.js and Mapbox web companion.',
    ],
    tech: ['Swift', 'SwiftUI', 'Mapbox', 'Next.js', 'Cesium.js'],
  },
  {
    title: 'IBM HR Attrition Analysis',
    kind: 'STAT 515 final project',
    category: 'Data & ML',
    live: true,
    link: 'https://rutvij1407.github.io/rtuvij1407.github.io-output/',
    github: 'https://github.com/rutvij1407/rtuvij1407.github.io-output',
    blurb: 'Four models compared on 1,470 employee records, reported in Quarto.',
    points: [
      'Achieved 88% prediction accuracy (AUC-ROC validated) on employee attrition by training and evaluating Decision Tree, Random Forest, Logistic Regression, and GBM models across 1,470 records.',
      'Identified the top 3 attrition drivers (overtime, job level, monthly income) through feature importance analysis, delivering a reproducible Quarto report with actionable HR policy recommendations.',
    ],
    tech: ['R', 'Machine Learning', 'Quarto'],
    stat: { v: '88%', l: 'AUC-ROC validated' },
  },
]

export const skills = [
  { group: 'Programming', items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Matplotlib', 'SQL', 'R', 'Swift', 'Bash'] },
  { group: 'Web & APIs', items: ['Next.js', 'React', 'TypeScript', 'Flask', 'REST APIs', 'Claude & LLM APIs', 'Mapbox', 'Google Maps API'] },
  { group: 'Databases', items: ['MySQL', 'PostgreSQL', 'AWS RDS', 'SQL Server (SSMS)', 'Supabase', 'MongoDB', 'NoSQL'] },
  { group: 'Visualization', items: ['Power BI', 'Tableau', 'Plotly', 'Streamlit', 'Quarto', 'Excel (Pivot, Power Query, DAX)'] },
  { group: 'Cloud & DevOps', items: ['AWS EC2', 'AWS RDS', 'S3', 'Glue', 'Lambda', 'Vercel', 'Docker', 'Linux', 'Git', 'GitHub Actions'] },
  { group: 'Data Engineering', items: ['ETL / ELT Pipelines', 'Apache Spark', 'Hadoop', 'Airflow', 'Data Modeling', 'NLP (VADER, TextBlob)'] },
  { group: 'Methods', items: ['Machine Learning', 'Statistical Analysis', 'A/B Testing', 'Agile (Scrum)', 'SDLC'] },
]

export const marquee = [
  'Python', 'SQL', 'R', 'Power BI', 'Tableau', 'AWS', 'Next.js', 'TypeScript', 'Claude API',
  'Spark', 'Airflow', 'Docker', 'Supabase', 'Plotly', 'Scikit-learn', 'Swift', 'Mapbox',
]

export const education = [
  {
    school: 'George Mason University',
    degree: 'Master of Science in Data Analytics Engineering',
    location: 'Fairfax, VA',
    period: 'Aug 2025 – May 2027',
    detail: 'GPA 3.45 / 4.00',
    courses: ['Big Data Essentials', 'Machine Learning', 'Healthcare Database Management', 'Applied Statistics & Visualization', 'Principles of Data Management'],
  },
  {
    school: 'Institute of Aeronautical Engineering',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    location: 'Hyderabad, India',
    period: 'Jul 2019 – Jun 2023',
    detail: '',
    courses: [],
  },
]

export const credentials = [
  { type: 'Publication', title: 'AuthentiQ: Blockchain-based Document Authentication System', meta: 'IEEE · ICPCSN 2024' },
  { type: 'Certification', title: 'HackerRank: Python', meta: 'Basic, Intermediate' },
  { type: 'Certification', title: 'HackerRank: SQL', meta: 'Basic, Intermediate, Advanced' },
]
