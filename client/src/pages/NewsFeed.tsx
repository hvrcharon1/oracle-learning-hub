import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OracleDashboardLayout from "@/components/OracleDashboardLayout";
import { ExternalLink, TrendingUp, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export default function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const newsQuery = trpc.news.feed.useQuery({
    category: selectedCategory || undefined,
    limit: 50,
  });

  const categories = [
    { id: "fusion", label: "Fusion Apps", icon: "📱" },
    { id: "26ai", label: "Oracle 26ai", icon: "🤖" },
    { id: "cloud", label: "Cloud", icon: "☁️" },
    { id: "ai", label: "AI & ML", icon: "🧠" },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await newsQuery.refetch();
    setIsRefreshing(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fusion":
        return "bg-blue-100 text-blue-700";
      case "26ai":
        return "bg-purple-100 text-purple-700";
      case "cloud":
        return "bg-cyan-100 text-cyan-700";
      case "ai":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <OracleDashboardLayout currentPage="news">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Oracle News Feed
              </h1>
              <p className="text-lg text-slate-600">
                Latest updates from Oracle Cloud, Fusion, and AI technologies
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              All News
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

        {/* News Items */}
        <div className="space-y-4">
          {newsQuery.isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : newsQuery.error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-800">Error loading news feed. Please try again.</p>
              </CardContent>
            </Card>
          ) : newsQuery.data && newsQuery.data.length > 0 ? (
            <>
              {newsQuery.data.map((news: any, idx: number) => (
                <a
                  key={idx}
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <TrendingUp size={16} className="text-blue-600 flex-shrink-0" />
                            <Badge className={getCategoryColor(news.category)}>
                              {news.category || "News"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {news.sourceType}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {new Date(news.publishedDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {news.title}
                          </h3>
                          <p className="text-slate-600 line-clamp-3">
                            {news.description || news.content}
                          </p>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          <ExternalLink
                            size={20}
                            className="text-slate-400 group-hover:text-blue-600 transition-colors"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </>
          ) : (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-slate-600">
                  No news available. Try a different category or check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Auto-refresh Info */}
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Auto-Update:</strong> This news feed automatically updates with the latest Oracle announcements and blog posts. Check back regularly for new content.
          </p>
        </div>
      </div>
    </OracleDashboardLayout>
  );
}
