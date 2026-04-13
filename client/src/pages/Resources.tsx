import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OracleDashboardLayout from "@/components/OracleDashboardLayout";
import { ExternalLink, FileText, Video, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const resourcesQuery = trpc.resources.list.useQuery({
    category: selectedCategory || undefined,
    resourceType: selectedType || undefined,
  });

  const categories = [
    { id: "fusion", label: "Fusion Apps", icon: "📱" },
    { id: "26ai", label: "Oracle 26ai", icon: "🤖" },
    { id: "general", label: "General", icon: "📚" },
  ];

  const resourceTypes = [
    { id: "documentation", label: "Documentation", icon: BookOpen },
    { id: "pdf", label: "PDFs", icon: FileText },
    { id: "video", label: "Videos", icon: Video },
    { id: "blog", label: "Blog Posts", icon: BookOpen },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText size={20} className="text-red-600" />;
      case "video":
        return <Video size={20} className="text-red-500" />;
      case "documentation":
        return <BookOpen size={20} className="text-blue-600" />;
      default:
        return <BookOpen size={20} className="text-slate-600" />;
    }
  };

  return (
    <OracleDashboardLayout currentPage="resources">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Resource Center
          </h1>
          <p className="text-lg text-slate-600">
            Official documentation, guides, PDFs, and video tutorials
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Type Filter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Resource Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === null
                    ? "bg-purple-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                All Types
              </button>
              {resourceTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      selectedType === type.id
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    <Icon size={16} />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {selectedCategory || selectedType
              ? "Filtered Resources"
              : "All Resources"}
          </h2>

          {resourcesQuery.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : resourcesQuery.error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-800">Error loading resources. Please try again.</p>
              </CardContent>
            </Card>
          ) : resourcesQuery.data && resourcesQuery.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesQuery.data.map((resource: any) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          {getResourceIcon(resource.resourceType)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {resource.resourceType}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {resource.author && (
                          <p className="text-xs text-slate-500">By {resource.author}</p>
                        )}
                        {resource.publishedDate && (
                          <p className="text-xs text-slate-500">
                            {new Date(resource.publishedDate).toLocaleDateString()}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                          Access Resource
                          <ExternalLink size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-slate-600">
                  No resources found. Try adjusting your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </OracleDashboardLayout>
  );
}
