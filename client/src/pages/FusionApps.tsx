import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OracleDashboardLayout from "@/components/OracleDashboardLayout";
import { ExternalLink, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function FusionApps() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const modulesQuery = trpc.learning.modules.useQuery({
    category: "fusion",
    subcategory: selectedCategory || undefined,
  });

  const categories = [
    {
      id: "overview",
      label: "Overview",
      description: "Introduction to Oracle Fusion",
      icon: "📋",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "erp",
      label: "Enterprise Resource Planning",
      description: "Financial & Procurement Management",
      icon: "💰",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "hcm",
      label: "Human Capital Management",
      description: "Workforce & Talent Management",
      icon: "👥",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "scm",
      label: "Supply Chain Management",
      description: "Supply Chain Optimization",
      icon: "📦",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "cx",
      label: "Customer Experience",
      description: "Sales, Service & Marketing",
      icon: "🎯",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <OracleDashboardLayout currentPage="fusion">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Oracle Fusion Applications
          </h1>
          <p className="text-lg text-slate-600">
            Explore comprehensive enterprise applications for modern business operations
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Select a Module</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" />
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
              ? `${categories.find((c) => c.id === selectedCategory)?.label} Modules`
              : "All Fusion Modules"}
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
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {module.subcategory}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
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
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/link"
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
                  No modules available. Select a category to view modules.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </OracleDashboardLayout>
  );
}
