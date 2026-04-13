# Oracle Learning Hub

A comprehensive, elegant learning platform for mastering **Oracle Fusion Applications** and **Oracle 26ai Database**. This full-stack web application provides interactive learning modules, visual diagrams, official documentation links, auto-updating news feeds, and an AI-powered chat assistant.

## ✨ Features

### 📚 Learning Modules
- **Oracle Fusion Applications**: Explore ERP, HCM, SCM, and CX modules with comprehensive documentation
- **Oracle 26ai Database**: Deep dive into AI Vector Search, SQL AI, and Converged Database capabilities
- Structured learning paths with official Oracle documentation links

### 📊 Visual Learning
- **Diagram Gallery**: Interactive collection of SVG diagrams explaining Oracle architecture and data flows
- **Architecture Visualizations**: Fusion architecture layers, Vector search pipelines, Converged database design
- Zoom and detailed view capabilities for each diagram

### 📰 Auto-Updating News Feed
- Real-time updates from Oracle's official news and blog channels
- Categorized by Fusion Apps, Oracle 26ai, Cloud, and AI & ML
- Manual refresh and automatic updates
- Filterable by category and source type

### 📖 Resource Center
- Curated collection of official Oracle documentation
- PDFs, video tutorials, and blog posts
- Organized by category (Fusion, 26ai, General)
- Direct links to official Oracle sources

### 🔍 Global Search
- Full-text search across all learning content
- Search modules, resources, diagrams, and news
- Instant results with categorization
- Accessible from the sidebar search bar

### 🤖 AI Chat Assistant
- Embedded LLM-powered assistant for Oracle-related questions
- Streaming responses with markdown rendering
- Persistent chat history
- Floating widget accessible from any page
- Answers questions about Oracle Fusion and 26ai

### 🎨 Premium Design
- Elegant, polished UI with gradient accents
- Responsive sidebar navigation
- Smooth animations and transitions
- Professional typography and color scheme
- Dark/Light theme support ready

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **shadcn/ui** for component library
- **Wouter** for routing
- **Framer Motion** for animations
- **Streamdown** for markdown rendering

### Backend
- **Express.js** server
- **tRPC** for type-safe API
- **Drizzle ORM** for database
- **MySQL/TiDB** database
- **LLM Integration** for AI chat
- **OAuth** authentication via Manus

### Architecture
- Full-stack TypeScript
- Server-side rendering ready
- Database-driven content
- Optimized for performance
- Responsive design

## 📁 Project Structure

```
oracle-learning-hub/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── pages/              # Page components (Dashboard, Fusion, 26ai, etc.)
│   │   ├── components/         # Reusable UI components
│   │   ├── contexts/           # React contexts
│   │   ├── lib/                # Utilities and tRPC client
│   │   ├── App.tsx             # Main app component
│   │   └── index.css           # Global styles
│   └── public/                 # Static assets
├── server/                      # Backend Express server
│   ├── routers.ts              # tRPC procedure definitions
│   ├── db.ts                   # Database query helpers
│   └── _core/                  # Core server infrastructure
├── drizzle/                     # Database schema and migrations
│   └── schema.ts               # Drizzle ORM schema
├── diagrams/                    # SVG diagram source files
│   ├── fusion-architecture.d2
│   ├── vector-search-flow.d2
│   └── converged-db-architecture.d2
├── seed-data.mjs               # Database seeding script
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22.13.0+
- pnpm package manager
- MySQL/TiDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hvrcharon1/oracle-learning-hub.git
   cd oracle-learning-hub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   VITE_APP_ID=your_oauth_app_id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://manus.im/oauth
   ```

4. **Run database migrations**
   ```bash
   pnpm db:push
   ```

5. **Seed initial data** (optional)
   ```bash
   node seed-data.mjs
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:3000`

## 📖 Usage

### Dashboard
- View featured learning topics
- See latest Oracle news
- Quick access to all sections
- View key statistics

### Learning Modules
- **Fusion Apps**: Select categories (ERP, HCM, SCM, CX) to explore modules
- **Oracle 26ai**: Learn about AI Vector Search, SQL AI, and Converged Database
- Each module includes official documentation links

### Diagrams
- Browse visual explanations of Oracle concepts
- Filter by category (Architecture, Data Flow, AI Pipeline, Process Flow)
- Click any diagram to view in detail

### News Feed
- Browse latest Oracle announcements
- Filter by category or source type
- Refresh for latest updates
- Click to read full articles

### Resources
- Find official documentation and guides
- Filter by category and resource type
- Access PDFs, videos, and blog posts
- Direct links to Oracle sources

### Global Search
- Click the search icon in the sidebar
- Type to search across all content
- View results with categorization
- Click to navigate to content

### AI Chat Assistant
- Click the floating chat bubble (bottom right)
- Ask questions about Oracle Fusion or 26ai
- Get instant AI-powered responses
- Chat history is saved

## 🧪 Testing

Run tests with:
```bash
pnpm test
```

Run TypeScript type checking:
```bash
pnpm check
```

## 🔧 Development

### Build for production
```bash
pnpm build
```

### Start production server
```bash
pnpm start
```

### Format code
```bash
pnpm format
```

## 📚 Database Schema

The application uses the following main tables:
- **users**: User authentication and profiles
- **learning_modules**: Course content for Fusion and 26ai
- **resources**: Official documentation links and materials
- **diagrams**: Visual diagrams and explanations
- **news_feed**: Auto-updated Oracle news and announcements
- **chat_history**: User chat interactions with AI assistant
- **search_index**: Full-text search index for content discovery

## 🌐 Official Oracle Resources

This application links to official Oracle resources:
- [Oracle Fusion Applications](https://www.oracle.com/applications/fusion/)
- [Oracle Database 26ai](https://www.oracle.com/database/ai/)
- [Oracle Cloud Infrastructure](https://www.oracle.com/cloud/)
- [Oracle Blog](https://blogs.oracle.com/)
- [Oracle News](https://www.oracle.com/news/)

## 🎯 Features Roadmap

- [ ] User learning progress tracking
- [ ] Personalized learning recommendations
- [ ] Quiz and assessment modules
- [ ] Certification paths
- [ ] Community forums
- [ ] Video tutorials integration
- [ ] Offline mode support
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created by **hvrcharon1** as a comprehensive learning platform for Oracle technologies.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainer.

---

**Last Updated**: April 2026

Built with ❤️ for Oracle learners worldwide
