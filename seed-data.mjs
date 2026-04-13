import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

if (!process.env.DATABASE_URL) {
  console.error('✗ DATABASE_URL environment variable is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);


// Learning Modules Data
const learningModules = [
  {
    title: 'Oracle Fusion Applications Overview',
    description: 'Comprehensive introduction to Oracle Fusion Applications suite',
    category: 'fusion',
    subcategory: 'overview',
    content: 'Oracle Fusion Applications is a suite of cloud-based enterprise applications...',
    officialDocLink: 'https://docs.oracle.com/en/cloud/saas/',
  },
  {
    title: 'Enterprise Resource Planning (ERP)',
    description: 'Learn about Oracle Fusion ERP capabilities and modules',
    category: 'fusion',
    subcategory: 'erp',
    content: 'Oracle Fusion ERP provides comprehensive financial management, procurement, and supply chain capabilities...',
    officialDocLink: 'https://docs.oracle.com/en/cloud/saas/erp/',
  },
  {
    title: 'Human Capital Management (HCM)',
    description: 'Explore Oracle Fusion HCM for workforce management',
    category: 'fusion',
    subcategory: 'hcm',
    content: 'Oracle Fusion HCM helps organizations attract, develop, and retain talent...',
    officialDocLink: 'https://docs.oracle.com/en/cloud/saas/hcm/',
  },
  {
    title: 'Supply Chain Management (SCM)',
    description: 'Understand Oracle Fusion SCM for supply chain optimization',
    category: 'fusion',
    subcategory: 'scm',
    content: 'Oracle Fusion SCM provides end-to-end supply chain visibility and control...',
    officialDocLink: 'https://docs.oracle.com/en/cloud/saas/scm/',
  },
  {
    title: 'Customer Experience (CX)',
    description: 'Discover Oracle Fusion CX for customer engagement',
    category: 'fusion',
    subcategory: 'cx',
    content: 'Oracle Fusion CX enables organizations to deliver exceptional customer experiences...',
    officialDocLink: 'https://docs.oracle.com/en/cloud/saas/cx/',
  },
  {
    title: 'Oracle AI Database 26ai Introduction',
    description: 'Get started with Oracle 26ai Database and AI capabilities',
    category: '26ai',
    subcategory: 'overview',
    content: 'Oracle AI Database 26ai brings native AI capabilities directly into the database...',
    officialDocLink: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/',
  },
  {
    title: 'AI Vector Search',
    description: 'Learn about vector search and embeddings in Oracle 26ai',
    category: '26ai',
    subcategory: 'vector-search',
    content: 'AI Vector Search enables semantic search capabilities using vector embeddings...',
    officialDocLink: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/ai.html',
  },
  {
    title: 'SQL AI and Natural Language Queries',
    description: 'Explore SQL AI for natural language to SQL conversion',
    category: '26ai',
    subcategory: 'sql-ai',
    content: 'SQL AI allows users to write queries in natural language...',
    officialDocLink: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/ai.html',
  },
  {
    title: 'Converged Database',
    description: 'Understand Oracle 26ai converged database capabilities',
    category: '26ai',
    subcategory: 'converged-db',
    content: 'Oracle 26ai converged database supports multiple data types and workloads...',
    officialDocLink: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/',
  },
  {
    title: 'Oracle Health Cloud Overview',
    description: 'Introduction to Oracle Health Cloud for healthcare organizations',
    category: 'healthcare',
    subcategory: 'overview',
    content: 'Oracle Health Cloud is a comprehensive suite of cloud-based healthcare applications designed for healthcare organizations to improve patient care, operational efficiency, and clinical outcomes. It integrates EHR, billing, supply chain, and analytics capabilities.',
    officialDocLink: 'https://www.oracle.com/healthcare/health-cloud/',
  },
  {
    title: 'Oracle Clinical Applications',
    description: 'Learn about Oracle Clinical modules for healthcare providers',
    category: 'healthcare',
    subcategory: 'clinical',
    content: 'Oracle Clinical applications provide comprehensive clinical documentation, patient management, and care coordination tools. Features include electronic health records (EHR), clinical decision support, and patient engagement capabilities.',
    officialDocLink: 'https://www.oracle.com/healthcare/clinical/',
  },
  {
    title: 'Healthcare Revenue Cycle Management',
    description: 'Explore revenue cycle management solutions in Oracle Health Cloud',
    category: 'healthcare',
    subcategory: 'revenue-cycle',
    content: 'Revenue Cycle Management (RCM) in Oracle Health Cloud streamlines billing, claims management, and financial operations. It ensures accurate coding, timely claims submission, and improved cash flow for healthcare organizations.',
    officialDocLink: 'https://www.oracle.com/healthcare/revenue-cycle/',
  },
  {
    title: 'Healthcare Supply Chain Management',
    description: 'Manage healthcare supply chain with Oracle solutions',
    category: 'healthcare',
    subcategory: 'supply-chain',
    content: 'Oracle Healthcare Supply Chain Management optimizes inventory, procurement, and distribution of medical supplies and pharmaceuticals. It reduces costs, improves availability, and ensures compliance with healthcare regulations.',
    officialDocLink: 'https://www.oracle.com/healthcare/supply-chain/',
  },
  {
    title: 'AI in Healthcare - Predictive Analytics',
    description: 'Discover AI and predictive analytics in Oracle Health Cloud',
    category: 'healthcare',
    subcategory: 'ai-analytics',
    content: 'Oracle Health Cloud leverages AI and machine learning for predictive analytics, patient risk stratification, and clinical insights. These capabilities help healthcare providers identify high-risk patients and improve outcomes.',
    officialDocLink: 'https://www.oracle.com/healthcare/ai-analytics/',
  },
];

// Resources Data
const resources = [
  {
    title: 'Oracle Fusion Cloud Applications Documentation',
    description: 'Official comprehensive documentation for all Fusion modules',
    category: 'fusion',
    resourceType: 'documentation',
    url: 'https://docs.oracle.com/en/cloud/saas/',
    author: 'Oracle',
    publishedDate: new Date('2026-04-01'),
  },
  {
    title: 'Oracle AI Database 26ai Features Guide',
    description: 'Complete guide to Oracle 26ai AI and ML capabilities',
    category: '26ai',
    resourceType: 'pdf',
    url: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/nfcoa/oracle-ai-database-26ai-new-features-guide.pdf',
    author: 'Oracle',
    publishedDate: new Date('2026-03-26'),
  },
  {
    title: 'Oracle AI Database 26ai: AI Made Simple for Enterprise',
    description: 'Video overview of Oracle 26ai revolutionary features',
    category: '26ai',
    resourceType: 'video',
    url: 'https://www.youtube.com/watch?v=fDwJeQ9AYrU',
    author: 'Oracle',
    publishedDate: new Date('2025-11-21'),
  },
  {
    title: 'Oracle Cloud Infrastructure Blog',
    description: 'Latest news and technical insights from Oracle Cloud',
    category: 'general',
    resourceType: 'blog',
    url: 'https://blogs.oracle.com/cloud-infrastructure/',
    author: 'Oracle',
    publishedDate: new Date('2026-04-13'),
  },
  {
    title: 'Oracle Health Cloud Documentation',
    description: 'Complete documentation for Oracle Health Cloud implementation',
    category: 'healthcare',
    resourceType: 'documentation',
    url: 'https://docs.oracle.com/en/cloud/saas/health-cloud/',
    author: 'Oracle',
    publishedDate: new Date('2026-04-12'),
  },
  {
    title: 'Healthcare AI and Machine Learning Guide',
    description: 'Guide to implementing AI/ML in healthcare with Oracle',
    category: 'healthcare',
    resourceType: 'pdf',
    url: 'https://www.oracle.com/a/ocom/docs/healthcare/oracle-healthcare-ai-ml-guide.pdf',
    author: 'Oracle',
    publishedDate: new Date('2026-04-10'),
  },
];

// News Feed Data
const newsFeed = [
  {
    title: 'Oracle Announces Oracle Database 26ai - AI Made Simple for Enterprise',
    description: 'Oracle introduces the next generation of database technology with built-in AI capabilities',
    category: '26ai',
    sourceType: 'press-release',
    url: 'https://www.oracle.com/news/announcement/oracle-database-26ai-ai-made-simple-for-enterprise/',
    publishedDate: new Date('2026-04-10'),
    content: 'Oracle has announced Oracle Database 26ai, the next generation of database technology with built-in AI capabilities. This revolutionary database combines the power of AI with enterprise-grade database features.',
  },
  {
    title: 'Oracle Fusion Applications Cloud Service Updates',
    description: 'Latest enhancements and new features in Oracle Fusion Applications',
    category: 'fusion',
    sourceType: 'blog',
    url: 'https://blogs.oracle.com/applications/oracle-fusion-applications-updates/',
    publishedDate: new Date('2026-04-08'),
    content: 'Oracle Fusion Applications continues to evolve with new features and enhancements. The latest updates include improved user experience, enhanced analytics, and better integration capabilities.',
  },
  {
    title: 'AI Vector Search in Oracle Database 26ai',
    description: 'Explore how AI vector search enables semantic search and similarity matching',
    category: '26ai',
    sourceType: 'blog',
    url: 'https://blogs.oracle.com/database/ai-vector-search-oracle-database-26ai/',
    publishedDate: new Date('2026-04-05'),
    content: 'Vector search is a powerful new capability in Oracle Database 26ai that enables semantic search and similarity matching. Learn how to leverage this feature for AI-powered applications.',
  },
  {
    title: 'Oracle Cloud Infrastructure AI Services',
    description: 'New AI and machine learning services available on Oracle Cloud',
    category: 'cloud',
    sourceType: 'announcement',
    url: 'https://www.oracle.com/cloud/ai-services/',
    publishedDate: new Date('2026-04-01'),
    content: 'Oracle Cloud Infrastructure now offers comprehensive AI and machine learning services to help enterprises build intelligent applications at scale.',
  },
  {
    title: 'Getting Started with Oracle Fusion HCM',
    description: 'Comprehensive guide to implementing Oracle Fusion Human Capital Management',
    category: 'fusion',
    sourceType: 'tutorial',
    url: 'https://blogs.oracle.com/applications/getting-started-oracle-fusion-hcm/',
    publishedDate: new Date('2026-03-28'),
    content: 'This comprehensive guide walks you through implementing Oracle Fusion HCM, covering everything from initial setup to advanced configurations.',
  },
  {
    title: 'Oracle Database 26ai Performance Benchmarks',
    description: 'Performance improvements and benchmarks for Oracle Database 26ai',
    category: '26ai',
    sourceType: 'whitepaper',
    url: 'https://www.oracle.com/a/ocom/docs/database/oracle-database-26ai-performance-benchmarks.pdf',
    publishedDate: new Date('2026-03-25'),
    content: 'Detailed performance benchmarks showing the significant improvements in Oracle Database 26ai over previous versions, including AI-specific workloads.',
  },
  {
    title: 'Oracle Health Cloud Transforms Healthcare Delivery',
    description: 'How Oracle Health Cloud is revolutionizing healthcare operations',
    category: 'healthcare',
    sourceType: 'blog',
    url: 'https://blogs.oracle.com/healthcare/oracle-health-cloud-transforms-delivery/',
    publishedDate: new Date('2026-04-12'),
    content: 'Oracle Health Cloud enables healthcare organizations to streamline operations, improve patient care, and reduce costs through integrated clinical, financial, and supply chain management.',
  },
  {
    title: 'AI-Powered Clinical Decision Support in Oracle Health',
    description: 'Leveraging AI for better clinical outcomes',
    category: 'healthcare',
    sourceType: 'blog',
    url: 'https://blogs.oracle.com/healthcare/ai-clinical-decision-support/',
    publishedDate: new Date('2026-04-08'),
    content: 'Discover how Oracle Health Cloud uses AI and machine learning to provide clinical decision support, helping healthcare providers make informed decisions and improve patient outcomes.',
  },
];

// Diagrams Data
const diagrams = [
  {
    title: 'Oracle Fusion Applications Architecture',
    description: 'High-level architecture of Oracle Fusion Applications suite',
    category: 'architecture',
    svgContent: '<svg viewBox="0 0 800 600"><rect x="50" y="50" width="700" height="500" fill="none" stroke="#1f2937" stroke-width="2"/><text x="400" y="100" text-anchor="middle" font-size="24" font-weight="bold" fill="#1f2937">Oracle Fusion Applications Architecture</text><g><rect x="100" y="150" width="150" height="80" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/><text x="175" y="195" text-anchor="middle" font-size="14" fill="#1f2937">ERP</text></g><g><rect x="300" y="150" width="150" height="80" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/><text x="375" y="195" text-anchor="middle" font-size="14" fill="#1f2937">HCM</text></g><g><rect x="500" y="150" width="150" height="80" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/><text x="575" y="195" text-anchor="middle" font-size="14" fill="#1f2937">SCM</text></g><g><rect x="200" y="300" width="150" height="80" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="275" y="345" text-anchor="middle" font-size="14" fill="#1f2937">CX</text></g><g><rect x="400" y="300" width="150" height="80" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="475" y="345" text-anchor="middle" font-size="14" fill="#1f2937">Analytics</text></g><line x1="175" y1="230" x2="275" y2="300" stroke="#6b7280" stroke-width="2"/><line x1="375" y1="230" x2="375" y2="300" stroke="#6b7280" stroke-width="2"/><line x1="575" y1="230" x2="475" y2="300" stroke="#6b7280" stroke-width="2"/></svg>',
    imageUrl: null,
  },
  {
    title: 'Oracle 26ai Vector Search Process',
    description: 'How vector search and semantic search works in Oracle 26ai',
    category: 'data-flow',
    svgContent: '<svg viewBox="0 0 800 400"><text x="400" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#1f2937">Oracle 26ai Vector Search Flow</text><g><rect x="50" y="80" width="120" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="110" y="115" text-anchor="middle" font-size="12" fill="#1f2937">User Query</text></g><path d="M 170 110 L 220 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="220" y="80" width="120" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="280" y="115" text-anchor="middle" font-size="12" fill="#1f2937">Embedding</text></g><path d="M 340 110 L 390 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="390" y="80" width="120" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="450" y="115" text-anchor="middle" font-size="12" fill="#1f2937">Vector DB</text></g><path d="M 510 110 L 560 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="560" y="80" width="120" height="60" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="620" y="115" text-anchor="middle" font-size="12" fill="#1f2937">Results</text></g><defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><polygon points="0 0, 10 5, 0 10" fill="#6b7280"/></marker></defs></svg>',
    imageUrl: null,
  },
  {
    title: 'Converged Database Architecture',
    description: 'Oracle 26ai converged database supporting multiple data types',
    category: 'architecture',
    svgContent: '<svg viewBox="0 0 800 500"><text x="400" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#1f2937">Oracle 26ai Converged Database</text><g><rect x="100" y="100" width="600" height="300" fill="none" stroke="#1f2937" stroke-width="2" rx="10"/><text x="400" y="130" text-anchor="middle" font-size="16" font-weight="bold" fill="#1f2937">Unified Database Engine</text><g><rect x="130" y="160" width="100" height="60" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/><text x="180" y="195" text-anchor="middle" font-size="12" fill="#1f2937">Relational</text></g><g><rect x="270" y="160" width="100" height="60" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="320" y="195" text-anchor="middle" font-size="12" fill="#1f2937">JSON</text></g><g><rect x="410" y="160" width="100" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="460" y="195" text-anchor="middle" font-size="12" fill="#1f2937">Graph</text></g><g><rect x="550" y="160" width="100" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="600" y="195" text-anchor="middle" font-size="12" fill="#1f2937">Vector</text></g><g><rect x="130" y="260" width="520" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="390" y="295" text-anchor="middle" font-size="12" fill="#1f2937">Spatial, Temporal, and AI/ML Capabilities</text></g></g></svg>',
    imageUrl: null,
  },
  {
    title: 'Oracle Health Cloud Architecture',
    description: 'Integrated architecture of Oracle Health Cloud components',
    category: 'healthcare',
    svgContent: '<svg viewBox="0 0 800 600"><text x="400" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#1f2937">Oracle Health Cloud Architecture</text><g><rect x="50" y="80" width="700" height="480" fill="none" stroke="#1f2937" stroke-width="2" rx="10"/><text x="400" y="110" text-anchor="middle" font-size="14" font-weight="bold" fill="#1f2937">Integrated Healthcare Platform</text><g><rect x="80" y="140" width="140" height="70" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/><text x="150" y="175" text-anchor="middle" font-size="12" fill="#1f2937">Clinical</text><text x="150" y="195" text-anchor="middle" font-size="10" fill="#1f2937">EHR & Care</text></g><g><rect x="250" y="140" width="140" height="70" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="320" y="175" text-anchor="middle" font-size="12" fill="#1f2937">Financial</text><text x="320" y="195" text-anchor="middle" font-size="10" fill="#1f2937">RCM & Billing</text></g><g><rect x="420" y="140" width="140" height="70" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="490" y="175" text-anchor="middle" font-size="12" fill="#1f2937">Supply Chain</text><text x="490" y="195" text-anchor="middle" font-size="10" fill="#1f2937">Inventory</text></g><g><rect x="590" y="140" width="140" height="70" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="660" y="175" text-anchor="middle" font-size="12" fill="#1f2937">Analytics</text><text x="660" y="195" text-anchor="middle" font-size="10" fill="#1f2937">AI & Insights</text></g><g><rect x="80" y="280" width="650" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="405" y="315" text-anchor="middle" font-size="12" fill="#1f2937">Unified Data Platform with AI/ML Capabilities</text></g><g><rect x="80" y="400" width="650" height="60" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="405" y="435" text-anchor="middle" font-size="12" fill="#1f2937">Patient Engagement & Interoperability Layer</text></g></g></svg>',
    imageUrl: null,
  },
  {
    title: 'Healthcare Revenue Cycle Flow',
    description: 'Revenue cycle management process in Oracle Health Cloud',
    category: 'healthcare',
    svgContent: '<svg viewBox="0 0 900 400"><text x="450" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#1f2937">Healthcare Revenue Cycle Management</text><g><rect x="30" y="80" width="100" height="60" fill="#dbeafe" stroke="#0284c7" stroke-width="2"/><text x="80" y="115" text-anchor="middle" font-size="11" fill="#1f2937">Patient Visit</text></g><path d="M 130 110 L 170 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="170" y="80" width="100" height="60" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/><text x="220" y="115" text-anchor="middle" font-size="11" fill="#1f2937">Coding</text></g><path d="M 270 110 L 310 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="310" y="80" width="100" height="60" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="360" y="115" text-anchor="middle" font-size="11" fill="#1f2937">Billing</text></g><path d="M 410 110 L 450 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="450" y="80" width="100" height="60" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/><text x="500" y="115" text-anchor="middle" font-size="11" fill="#1f2937">Claims</text></g><path d="M 550 110 L 590 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="590" y="80" width="100" height="60" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/><text x="640" y="115" text-anchor="middle" font-size="11" fill="#1f2937">Adjudication</text></g><path d="M 690 110 L 730 110" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/><g><rect x="730" y="80" width="100" height="60" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="780" y="115" text-anchor="middle" font-size="11" fill="#1f2937">Payment</text></g><g><rect x="30" y="220" width="800" height="80" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" stroke-dasharray="5,5"/><text x="430" y="245" text-anchor="middle" font-size="12" font-weight="bold" fill="#1f2937">Oracle Health Cloud Analytics & Monitoring</text><text x="430" y="270" text-anchor="middle" font-size="10" fill="#1f2937">Real-time tracking, compliance monitoring, and performance metrics</text><text x="430" y="290" text-anchor="middle" font-size="10" fill="#1f2937">AI-powered insights for revenue optimization and denial management</text></g><defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><polygon points="0 0, 10 5, 0 10" fill="#6b7280"/></marker></defs></svg>',
    imageUrl: null,
  },
];

// Insert data
try {
  console.log('Seeding learning modules...');
  for (const module of learningModules) {
    await connection.execute(
      'INSERT INTO learning_modules (title, description, category, subcategory, content, official_doc_link) VALUES (?, ?, ?, ?, ?, ?)',
      [module.title, module.description, module.category, module.subcategory, module.content, module.officialDocLink]
    );
  }
  console.log(`✓ Inserted ${learningModules.length} learning modules`);

  console.log('Seeding resources...');
  for (const resource of resources) {
    await connection.execute(
      'INSERT INTO resources (title, description, category, resource_type, url, author, published_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [resource.title, resource.description, resource.category, resource.resourceType, resource.url, resource.author, resource.publishedDate]
    );
  }
  console.log(`✓ Inserted ${resources.length} resources`);

  console.log('Seeding diagrams...');
  for (const diagram of diagrams) {
    await connection.execute(
      'INSERT INTO diagrams (title, description, category, svg_content) VALUES (?, ?, ?, ?)',
      [diagram.title, diagram.description, diagram.category, diagram.svgContent]
    );
  }
  console.log(`✓ Inserted ${diagrams.length} diagrams`);

  console.log('Seeding news feed...');
  for (const item of newsFeed) {
    await connection.execute(
      'INSERT INTO news_feed (title, description, content, category, source_type, source_url, published_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [item.title, item.description, item.content, item.category, item.sourceType, item.url, item.publishedDate]
    );
  }
  console.log(`✓ Inserted ${newsFeed.length} news feed items`);

  console.log('✓ Seed data completed successfully!');
} catch (error) {
  console.error('✗ Error seeding data:', error);
  process.exit(1);
} finally {
  await connection.end();
}

  console.log('\n✓ All data seeded successfully!');
  console.log('\nContent Summary:');
  console.log('  Healthcare Modules:', learningModules.filter(m => m.category === 'healthcare').length);
  console.log('  Healthcare Resources:', resources.filter(r => r.category === 'healthcare').length);
  console.log('  Healthcare Diagrams:', diagrams.filter(d => d.category === 'healthcare').length);
  console.log('  Healthcare News:', newsFeed.filter(n => n.category === 'healthcare').length);
