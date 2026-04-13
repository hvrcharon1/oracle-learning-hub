import mysql from 'mysql2/promise';

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
    title: 'Converged Database Architecture',
    description: 'Understand Oracle 26ai converged database capabilities',
    category: '26ai',
    subcategory: 'converged-db',
    content: 'Oracle 26ai provides a converged database supporting JSON, Graph, Spatial, and Vector data...',
    officialDocLink: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/',
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

  console.log('✓ Seed data completed successfully!');
} catch (error) {
  console.error('✗ Error seeding data:', error);
} finally {
  await connection.end();
}
