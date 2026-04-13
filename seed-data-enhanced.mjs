import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Clear existing data
await connection.execute('DELETE FROM chat_history');
await connection.execute('DELETE FROM diagrams');
await connection.execute('DELETE FROM resources');
await connection.execute('DELETE FROM learning_modules');
await connection.execute('DELETE FROM news_feed');

console.log('✓ Cleared existing data');

// Enhanced Learning Modules with comprehensive information from crawled data
const modules = [
  // Oracle Fusion ERP
  {
    title: 'Oracle Fusion Cloud ERP Overview',
    category: 'fusion',
    description: 'Comprehensive enterprise resource planning solution with embedded AI. Oracle Fusion Cloud ERP 26A includes invoice handling enhancements, change order automation, expanded cash basis accounting support, and embedded banking services with Bank of America.',
    content: 'Oracle Fusion Cloud ERP is a complete enterprise resource planning solution designed for modern businesses. Release 26A delivers hundreds of product updates including new AI agents for financial management, procurement, project management, and more. Key features include: Financial Management with real-time insights, Procurement with AI-powered contract negotiation, Project Management with advanced analytics, and integrated banking services. The platform supports quarterly updates with minimal downtime and includes AI agents like the Source-to-Settle Assurance Advisor and Record-to-Report Assurance Advisor.',
    url: 'https://www.oracle.com/applications/'
  },
  {
    title: 'Oracle Fusion Financials & Accounting',
    category: 'fusion',
    description: 'Advanced financial management with AI-powered insights. Includes real-time financial reporting, multi-entity consolidation, and automated accounting processes. Release 26A introduces new AI agents for assurance and compliance.',
    content: 'Oracle Fusion Financials provides comprehensive financial management capabilities including general ledger, accounts payable, accounts receivable, and cash management. The 26A release introduces the Source-to-Settle Assurance Advisor and Record-to-Report Assurance Advisor AI agents that help ensure financial accuracy and compliance. Features include real-time financial reporting, multi-currency support, and automated reconciliation processes.',
    url: 'https://docs.oracle.com/en/cloud/saas/'
  },
  {
    title: 'Oracle Fusion Human Capital Management',
    category: 'fusion',
    description: 'Modern HR platform with AI-driven talent management. Release 26A introduces new AI agents for Core HR, Talent Management, and Workforce Management. Includes annual reviews, scheduling, applicant screening, and GenAI capabilities.',
    content: 'Oracle Fusion Cloud HCM (Human Capital Management) is a comprehensive HR solution that helps organizations manage their workforce effectively. Release 26A continues to deliver new AI agents in Core HR, Talent Management, and Workforce Management. Features include talent acquisition, performance management, learning management, compensation planning, and workforce analytics. New GenAI capabilities help workers easily complete note and approval fields, while enhanced agents support managers with annual reviews, scheduling, and applicant screening.',
    url: 'https://www.oracle.com/applications/'
  },
  {
    title: 'Oracle Fusion Supply Chain Management',
    category: 'fusion',
    description: 'Intelligent supply chain platform with AI agents. Release 26A introduces more than a dozen new agents for contract negotiation, cycle count analysis, order configuration, and more. Includes process manufacturing enhancements.',
    content: 'Oracle Fusion Cloud SCM (Supply Chain Management) helps organizations optimize their supply chain operations. Release 26A released more than a dozen new agents to help with tasks like negotiating contracts, analyzing cycle counts, configuring and fulfilling orders, and product optimization. Features include demand planning, inventory management, order management, manufacturing, and supplier management. The platform includes the Product 360 Advisor and other specialized agents for supply chain optimization.',
    url: 'https://www.oracle.com/applications/'
  },
  {
    title: 'Oracle Fusion Customer Experience',
    category: 'fusion',
    description: 'Omnichannel customer experience platform with AI agents. Release 26A introduces new AI agents for Sales, Service, and Marketing. Includes pipeline analysis, attachment processing, knowledge search, and copywriting assistance.',
    content: 'Oracle Fusion Cloud CX (Customer Experience) provides a unified platform for sales, service, and marketing. Release 26A updates across Sales, Service, and Marketing prioritize productivity with new AI agents. Sales agents advise on pipeline, products, contracts, subscriptions, and compensation. Service introduces a new attachment processing agent and enhanced knowledge search with GenAI. Marketing features a copywriter assistant agent and advanced bot detection for email metrics. All updates help simplify campaign launch and evaluation.',
    url: 'https://www.oracle.com/applications/'
  },

  // Oracle 26ai Database
  {
    title: 'Oracle AI Database 26ai Overview',
    category: '26ai',
    description: 'Next-generation database with 300+ new AI features. Transforms the database into an AI-native platform with embedded AI capabilities directly in the SQL engine. Includes AI Vector Search, SQL AI, and converged database architecture.',
    content: 'Oracle AI Database 26ai is the next long-term release (LTS) featuring over 300 new features with a focus on artificial intelligence. It transforms the database into an AI-native platform by embedding AI capabilities directly into the SQL engine. Key capabilities include AI Vector Search for semantic search, SQL AI for intelligent query optimization, and converged database architecture supporting relational, JSON, XML, spatial, graph, and vector data types. The platform includes in-database AI agents and Onyx integration for advanced AI capabilities.',
    url: 'https://www.oracle.com/database/ai-vector-search/'
  },
  {
    title: 'Oracle AI Vector Search',
    category: '26ai',
    description: 'Semantic search on business data without managing multiple databases. Enables searching structured and unstructured data by semantics or meaning. Includes hybrid vector indexes and simple SQL queries.',
    content: 'Oracle AI Vector Search enables searching both structured and unstructured data by semantics or meaning, and by values. Key features include: Native VECTOR data type in Oracle AI Database 26ai, flexible vector generation using ONNX framework, hybrid vector indexes for maximum performance, simple standard SQL for querying vectors, and unified hybrid vector search combining AI with relational, text, JSON, graph, and spatial data. Supports Apache Iceberg tables with vector indexes and includes Exadata optimizations for accelerated search. Use cases include similarity search, retrieval augmented generation (RAG), semantic search of documents and images, recommendation systems, and anomaly detection.',
    url: 'https://www.oracle.com/database/ai-vector-search/'
  },
  {
    title: 'Oracle SQL AI & Semantic Search',
    category: '26ai',
    description: 'AI-powered SQL optimization and semantic understanding. Includes real-time SQL plan management, semantic SQL for advanced queries, and AI-optimized database functions.',
    content: 'Oracle SQL AI provides intelligent SQL optimization and semantic understanding capabilities. Features include real-time SQL plan management for dynamic query optimization, semantic SQL for advanced query capabilities, AI-optimized database functions with improved accuracy in timing and resource cost estimates. The platform uses AI to optimize many key database functions, making more accurate estimates on timings and resource costings. This enables better performance and resource utilization across all database workloads.',
    url: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/'
  },
  {
    title: 'Oracle Converged Database Architecture',
    category: '26ai',
    description: 'Single database for all data types and workloads. Supports relational, JSON, XML, spatial, graph, and vector data types. Eliminates data silos and simplifies architecture.',
    content: 'Oracle Converged Database Architecture provides a unified platform for all data types and workloads. Supported data types include relational (SQL), JSON, XML, spatial/geographic, graph, and vector (AI) data. The converged architecture enables organizations to combine similarity search with relational, text, JSON, spatial, and graph data types in a single database. Benefits include eliminating data silos, simplified architecture, better performance, and the ability to bring AI to your data without moving data for AI. This approach provides industrial-strength capabilities for scalability, performance, high availability, and security.',
    url: 'https://www.oracle.com/database/features/'
  },

  // Oracle Healthcare Cloud
  {
    title: 'Oracle Health Cloud Overview',
    category: 'healthcare',
    description: 'Comprehensive healthcare cloud platform supporting providers, payers, and public health organizations. Built on enterprise-grade infrastructure with AI embedded across all layers.',
    content: 'Oracle Health Cloud supports providers, payers, and public health organizations with secure, comprehensive cloud-based solutions. Built on enterprise-grade infrastructure, unified solutions help safeguard patient data, streamline operations, alleviate administrative burden, and deliver near real-time insights for connected, efficient care. AI is embedded into every layer of the technology—from data platforms to cloud applications—providing actionable insights that help deliver efficient, enhanced care. The platform runs on secure, scalable AI infrastructure built for the demands of healthcare.',
    url: 'https://www.oracle.com/health/'
  },
  {
    title: 'Oracle Health Electronic Health Record (EHR)',
    category: 'healthcare',
    description: 'Next-generation EHR system with AI-powered clinical insights. Features clinical decision support, patient engagement, and integrated workflows.',
    content: 'Oracle Health Electronic Health Record (EHR) is a next-generation EHR system empowering healthcare organizations with AI-powered clinical insights. Key features include clinical decision support powered by AI agents, patient engagement through modern portals, integrated clinical workflows, and real-time data access. The platform includes OpenAI-powered generative AI features for patient communication and support. The new EHR system addresses ongoing challenges in healthcare through innovative clinical features and AI advancements designed to transform healthcare management.',
    url: 'https://www.oracle.com/health/'
  },
  {
    title: 'Oracle Health Revenue Cycle Management',
    category: 'healthcare',
    description: 'Clinically driven revenue cycle platform with AI automation. Includes patient accounting, claims management, and revenue optimization.',
    content: 'Oracle Health Revenue Cycle Management provides a clinically driven, patient-focused approach to revenue cycle management. Key capabilities include patient accounting with clinically integrated business rules, automated claims processing and follow-up, prior authorization workflows, and revenue cycle analytics. The platform leverages clinical integration with financial processes to improve outcomes and efficiency. Features include comprehensive patient billing and collections, automated claims management, and real-time revenue cycle performance metrics. Recent innovations include the Device Validation Program (Feb 2026) for streamlined device integration.',
    url: 'https://www.oracle.com/health/revenue-cycle/'
  },
  {
    title: 'Oracle Health Clinical Operations & AI Agents',
    category: 'healthcare',
    description: 'Clinical operations platform with AI-driven automation. Includes workflow optimization, clinical decision support, and resource management.',
    content: 'Oracle Health Clinical Operations provides comprehensive tools for optimizing clinical workflows and resource management. Features include AI-powered clinical decision support through clinical AI agents, workflow optimization for improved efficiency, resource management and scheduling, and real-time clinical analytics. The platform includes intelligent automation through OHPAC (Oracle Health Process Automation Cloud) and updated clinical AI agents for enhanced clinical decision support. Recent innovations include agentic AI for autonomous clinical workflows and enhanced clinical decision support capabilities.',
    url: 'https://www.oracle.com/health/'
  },
  {
    title: 'Oracle Health Analytics & Population Health',
    category: 'healthcare',
    description: 'Advanced healthcare analytics and population health management. Includes predictive analytics, population insights, and care coordination.',
    content: 'Oracle Health Analytics & Population Health provides comprehensive analytics and population health management capabilities. Features include population-level health analytics for community health insights, predictive analytics powered by AI for health predictions, care coordination tools for integrated care management, and public health management capabilities. The platform uses the latest cloud analytics and data science technologies to analyze healthcare data and build new AI applications. Organizations can create evidence-based care models and leverage AI-powered insights for better population health outcomes.',
    url: 'https://www.oracle.com/health/analytics/'
  },
];

// Enhanced Resources with real Oracle documentation links
const resources = [
  {
    title: 'Oracle Fusion Cloud Applications Documentation',
    category: 'fusion',
    description: 'Official Oracle documentation for all Fusion Cloud Applications modules including ERP, HCM, SCM, and CX.',
    url: 'https://docs.oracle.com/en/cloud/saas/',
    resourceType: 'documentation'
  },
  {
    title: 'Oracle AI Database 26ai Documentation',
    category: '26ai',
    description: 'Comprehensive documentation for Oracle AI Database 26ai including AI Vector Search, SQL AI, and converged database features.',
    url: 'https://docs.oracle.com/en/database/oracle/oracle-database/26/',
    resourceType: 'documentation'
  },
  {
    title: 'Oracle Health Cloud Solutions',
    category: 'healthcare',
    description: 'Official Oracle Health Cloud solutions documentation and resources for healthcare providers, payers, and public health organizations.',
    url: 'https://www.oracle.com/health/',
    resourceType: 'documentation'
  },
  {
    title: 'Oracle Fusion Insider Blog',
    category: 'fusion',
    description: 'Latest updates, best practices, and product tips from the Oracle Fusion Development team. Includes roadmaps and release information.',
    url: 'https://blogs.oracle.com/fusioninsider/',
    resourceType: 'blog'
  },
  {
    title: 'Oracle Database Insider Blog',
    category: '26ai',
    description: 'Latest updates on Oracle Database features, AI Vector Search, and database innovations from the Oracle Database team.',
    url: 'https://blogs.oracle.com/database/',
    resourceType: 'blog'
  },
  {
    title: 'Oracle News & Announcements',
    category: 'general',
    description: 'Official Oracle news, press releases, and announcements about latest products and innovations.',
    url: 'https://www.oracle.com/news/',
    resourceType: 'news'
  },
];

// Enhanced Diagrams with descriptions
const diagrams = [
  {
    title: 'Oracle Fusion Architecture Layers',
    category: 'fusion',
    description: 'Comprehensive architecture diagram showing Oracle Fusion Cloud Applications layers including UI, business logic, data, and infrastructure.',
    svgPath: '/diagrams/fusion-architecture.png',
    source: 'Oracle Official Documentation'
  },
  {
    title: 'AI Vector Search Process Flow',
    category: '26ai',
    description: 'Detailed flow diagram showing how AI Vector Search processes data through embedding, indexing, and semantic search.',
    svgPath: '/diagrams/vector-search-flow.png',
    source: 'Oracle Official Documentation'
  },
  {
    title: 'Oracle 26ai Converged Database Architecture',
    category: '26ai',
    description: 'Architecture diagram showing Oracle 26ai converged database supporting multiple data types: relational, JSON, spatial, graph, and vector.',
    svgPath: '/diagrams/converged-db-architecture.png',
    source: 'Oracle Official Documentation'
  },
  {
    title: 'Oracle Health Cloud Architecture',
    category: 'healthcare',
    description: 'System architecture diagram for Oracle Health Cloud showing clinical, financial, and operational components.',
    svgPath: '/diagrams/health-cloud-architecture.png',
    source: 'Oracle Health Documentation'
  },
  {
    title: 'Healthcare Revenue Cycle Flow',
    category: 'healthcare',
    description: 'Process flow diagram showing the complete healthcare revenue cycle from patient encounter to payment collection.',
    svgPath: '/diagrams/revenue-cycle-flow.png',
    source: 'Oracle Health Documentation'
  },
];

// Enhanced News Feed with real Oracle announcements
const news = [
  {
    title: 'Oracle Introduces Fusion Agentic Applications for HR',
    category: 'fusion',
    description: 'New class of enterprise applications reinvent HR processes with eight AI-driven HR apps that can reason, act, and coordinate actions.',
    content: 'Oracle announced Fusion Agentic Applications for HR on April 9, 2026. This new class of enterprise applications introduces eight AI-driven HR apps that can reason, act, and coordinate actions to unlock time, capacity, and outcomes that were previously out of reach. The applications are built on Oracle Cloud Infrastructure and Oracle AI Agent Studio, automating hiring, scheduling, talent calibration, contract management, and more.',
    source: 'Oracle News',
    url: 'https://www.oracle.com/news/',
    publishedDate: '2026-04-09'
  },
  {
    title: 'Oracle Introduces Fusion Agentic Applications for Customer Experience',
    category: 'fusion',
    description: 'New agentic applications for Sales, Service, and Marketing redefine customer experience with AI-powered automation.',
    content: 'Oracle introduced Fusion Agentic Applications for Customer Experience, a new class of enterprise applications powered by coordinated teams of specialized AI agents. These applications help sales, service, and marketing teams work more efficiently with AI-powered insights and automation.',
    source: 'Oracle News',
    url: 'https://www.oracle.com/news/',
    publishedDate: '2026-04-09'
  },
  {
    title: '26A Roadmaps: New AI Agents for ERP, HCM, SCM, and CX',
    category: 'fusion',
    description: 'Release 26A delivers enhancements to existing AI agents plus new ones across all Fusion Cloud Applications modules.',
    content: 'Oracle Fusion Cloud Applications Release 26A delivers hundreds of product updates and new features. Key highlights include new AI agents for ERP (Source-to-Settle Assurance Advisor, Record-to-Report Assurance Advisor), HCM (Core HR, Talent Management, Workforce Management), SCM (more than a dozen new agents), and CX (Sales, Service, Marketing agents). All new agents are available at no additional charge.',
    source: 'Oracle Fusion Insider Blog',
    url: 'https://blogs.oracle.com/fusioninsider/roadmaps',
    publishedDate: '2026-02-05'
  },
  {
    title: 'Oracle AI Database 26ai Powers the AI for Data Revolution',
    category: '26ai',
    description: 'Oracle AI Database 26ai features 300+ new AI features including AI Vector Search, SQL AI, and converged database capabilities.',
    content: 'Oracle announced that Oracle AI Database 26ai powers the AI for Data Revolution with advanced AI features such as AI Vector Search included at no additional charge. The database features over 300 new features with a focus on artificial intelligence, transforming the database into an AI-native platform.',
    source: 'Oracle News',
    url: 'https://www.oracle.com/news/announcement/ai-world-database-26ai-powers-the-ai-for-data-revolution-2025-10-14/',
    publishedDate: '2025-10-14'
  },
  {
    title: 'Oracle Health Launches Device Validation Program',
    category: 'healthcare',
    description: 'New program streamlines device integration for health systems with predictable, standardized integration.',
    content: 'Oracle Health launched the Device Validation Program on February 25, 2026, to streamline device integration for health systems. Through the program, health systems can gain predictable, standardized integration with validated devices working seamlessly from day one.',
    source: 'Oracle News',
    url: 'https://www.oracle.com/news/announcement/oracle-health-launches-device-validation-program-2026-02-25/',
    publishedDate: '2026-02-25'
  },
  {
    title: 'Oracle Introduces AI Agent Studio',
    category: 'fusion',
    description: 'New AI Agent Studio empowers customers and partners to easily create, extend, deploy, and manage AI agents.',
    content: 'Oracle introduced AI Agent Studio on March 20, 2025, empowering Oracle Fusion Cloud Applications customers and partners to easily create, extend, deploy, and manage AI agents and agent workflows. The studio enables organizations to build custom AI agents for their specific business processes.',
    source: 'Oracle News',
    url: 'https://www.oracle.com/news/announcement/oracle-introduces-ai-agent-studio-2025-03-20/',
    publishedDate: '2025-03-20'
  },
  {
    title: 'Oracle Fusion Cloud SCM 25C Release: Key Innovations',
    category: 'fusion',
    description: 'Oracle Fusion Cloud SCM 25C introduces new features, AI capabilities, and process innovations for modern supply chains.',
    content: 'Oracle Fusion Cloud SCM 25C release introduces continuous innovation with new features and AI capabilities. The quarterly update approach ensures customers get rapid access to innovation with minimal downtime. Key innovations include new AI agents for supply chain optimization and process manufacturing enhancements.',
    source: 'Oracle News',
    url: 'https://nexinfo.com/resources/blog/oracle-fusion-cloud-scm-25c-release-update-key-innovations-and-what-it-means-for-modern-supply-chains/',
    publishedDate: '2026-04-10'
  },
  {
    title: 'Oracle Health Ramps Up Agentic AI for Healthcare Transformation',
    category: 'healthcare',
    description: 'Oracle accelerates agentic AI deployment in healthcare with new features for clinical and operational automation.',
    content: 'Oracle is ramping up agentic AI deployment in healthcare amid a race to modernize EHRs. The company unveiled new features including autonomous agents for healthcare workflows, enhanced patient portals with generative AI, and advanced clinical decision support powered by AI agents.',
    source: 'Healthcare IT News',
    url: 'https://www.fiercehealthcare.com/ai-and-machine-learning/oracle-ramps-healthcare-ai-tech-unveils-new-features-patients-prior-auth',
    publishedDate: '2025-09-10'
  },
];

// Insert modules
for (const module of modules) {
  await connection.execute(
    'INSERT INTO learning_modules (title, category, description, content, official_doc_link) VALUES (?, ?, ?, ?, ?)',
    [module.title, module.category, module.description, module.content, module.url]
  );
}
console.log(`✓ Inserted ${modules.length} learning modules`);

// Insert resources
for (const resource of resources) {
  await connection.execute(
    'INSERT INTO resources (title, category, description, url, resource_type) VALUES (?, ?, ?, ?, ?)',
    [resource.title, resource.category, resource.description, resource.url, resource.resourceType]
  );
}
console.log(`✓ Inserted ${resources.length} resources`);

// Insert diagrams
for (const diagram of diagrams) {
  await connection.execute(
    'INSERT INTO diagrams (title, category, description, image_url) VALUES (?, ?, ?, ?)',
    [diagram.title, diagram.category, diagram.description, diagram.svgPath]
  );
}
console.log(`✓ Inserted ${diagrams.length} diagrams`);

// Insert news feed
for (const newsItem of news) {
  await connection.execute(
    'INSERT INTO news_feed (title, category, description, content, source_type, source_url, published_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [newsItem.title, newsItem.category, newsItem.description, newsItem.content, newsItem.source, newsItem.url, newsItem.publishedDate]
  );
}
console.log(`✓ Inserted ${news.length} news feed items`);

await connection.end();

console.log('\n✅ Database seeding completed successfully!');
console.log(`Total content items: ${modules.length + resources.length + diagrams.length + news.length}`);
