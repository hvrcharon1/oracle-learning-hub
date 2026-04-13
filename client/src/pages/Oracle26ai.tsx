import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OracleDashboardLayout from "@/components/OracleDashboardLayout";
import { ExternalLink, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Oracle26ai() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const modulesQuery = trpc.learning.modules.useQuery({
    category: "26ai",
    subcategory: selectedCategory || undefined,
  });

  const categories = [
    {
      id: "overview",
      label: "Overview",
      description: "Introduction to Oracle 26ai",
      icon: "🚀",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "vector-search",
      label: "AI Vector Search",
      description: "Semantic search with embeddings",
      icon: "🔍",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "sql-ai",
      label: "SQL AI",
      description: "Natural language to SQL",
      icon: "💬",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "converged-db",
      label: "Converged Database",
      description: "Multi-model data support",
      icon: "🗄️",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <OracleDashboardLayout currentPage="26ai">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={32} className="text-purple-600" />
            <h1 className="text-4xl font-bold text-slate-900">
              Oracle AI Database 26ai
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Next-generation database with native AI capabilities for modern applications
          </p>
        </div>

        {/* Key Features Highlight */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">AI-Powered</h3>
                <p className="text-sm text-slate-600">Built-in machine learning</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">High Performance</h3>
                <p className="text-sm text-slate-600">Optimized for speed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Secure</h3>
                <p className="text-sm text-slate-600">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Select a Topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`group relative overflow-hidden rounded-lg p-4 text-left transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-br ${category.color} text-white shadow-lg`
                    : "bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-900"
                }`}
              >
                <div className="relative">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-sm">{category.label}</h3>
                  <p
                    className={`text-xs mt-1 ${
                      selectedCategory === category.id ? "text-white/80" : "text-slate-600"
                    }`}
                  >
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Modules */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.label}`
              : "All 26ai Modules"}
          </h2>

          {modulesQuery.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : modulesQuery.error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-800">Error loading modules. Please try again.</p>
              </CardContent>
            </Card>
          ) : modulesQuery.data && modulesQuery.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modulesQuery.data.map((module: any) => (
                <Card
                  key={module.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group"
                >
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600" />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {module.subcategory}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-900 group-hover:text-purple-600 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {module.content}
                    </p>
                    {module.officialDocLink && (
                      <a
                        href={module.officialDocLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold group/link"
                      >
                        Official Documentation
                        <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-slate-600">
                  No modules available. Select a topic to view modules.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </OracleDashboardLayout>
  );
}
