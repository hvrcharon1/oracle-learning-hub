import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OracleDashboardLayout from "@/components/OracleDashboardLayout";
import { Link } from "wouter";
import { ArrowRight, Zap, BookMarked, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const newsQuery = trpc.news.feed.useQuery({ limit: 5 }) as any;

  useEffect(() => {
    if (newsQuery.data) {
      setFeaturedNews(newsQuery.data);
    }
  }, [newsQuery.data]);

  const featuredTopics = [
    {
      id: "fusion-overview",
      title: "Oracle Fusion Applications",
      description: "Comprehensive suite of cloud-based enterprise applications",
      icon: "📱",
      color: "from-blue-500 to-blue-600",
      href: "/fusion-apps",
      stats: "5 modules",
    },
    {
      id: "26ai-overview",
      title: "Oracle 26ai Database",
      description: "Next-generation database with built-in AI capabilities",
      icon: "🤖",
      color: "from-purple-500 to-purple-600",
      href: "/oracle-26ai",
      stats: "4 modules",
    },
    {
      id: "diagrams",
      title: "Visual Diagrams",
      description: "Architecture and data flow diagrams explained visually",
      icon: "📊",
      color: "from-emerald-500 to-emerald-600",
      href: "/diagrams",
      stats: "7 diagrams",
    },
    {
      id: "resources",
      title: "Resource Center",
      description: "Official documentation, PDFs, and video tutorials",
      icon: "📚",
      color: "from-amber-500 to-amber-600",
      href: "/resources",
      stats: "50+ resources",
    },
    {
      id: "healthcare",
      title: "Healthcare Cloud",
      description: "Oracle Health Cloud for healthcare organizations",
      icon: "🏥",
      color: "from-red-500 to-red-600",
      href: "/healthcare",
      stats: "5 modules",
    },
  ];

  return (
    <OracleDashboardLayout currentPage="dashboard">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome to Oracle Learning Hub
          </h1>
          <p className="text-lg text-slate-600">
            Master Oracle Fusion Applications, Oracle 26ai Database, and Healthcare Cloud with comprehensive learning resources
          </p>
        </div>

        {/* Featured Topics Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTopics.map((topic) => (
              <Link key={topic.id} href={topic.href}>
                <a className="group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${topic.color}`} />
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-4xl">{topic.icon}</span>
                        <Badge variant="secondary" className="bg-slate-100">
                          {topic.stats}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-slate-900">{topic.title}</CardTitle>
                      <CardDescription className="text-slate-600">
                        {topic.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform"
                      >
                        Explore <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* Latest News Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Latest Oracle News</h2>
            <Link href="/news-feed">
              <a className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                View All <ArrowRight size={16} />
              </a>
            </Link>
          </div>

          {newsQuery.isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : newsQuery.error ? (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <p className="text-amber-800">Unable to load news feed. Please try again later.</p>
              </CardContent>
            </Card>
          ) : featuredNews.length > 0 ? (
            <div className="space-y-4">
              {featuredNews.map((news, idx) => (
                <Card
                  key={idx}
                  className="hover:shadow-lg transition-all duration-300 border-0 overflow-hidden"
                >
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp size={16} className="text-blue-600" />
                          <Badge variant="outline" className="text-xs">
                            {news.category || "News"}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {new Date(news.publishedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {news.description}
                        </p>
                      </div>
                      <a
                        href={news.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                          Read
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-slate-600">No news available at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookMarked size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Modules</p>
                  <p className="text-2xl font-bold text-slate-900">9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Zap size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">AI Features</p>
                  <p className="text-2xl font-bold text-slate-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Latest Updates</p>
                  <p className="text-2xl font-bold text-slate-900">Apr 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </OracleDashboardLayout>
  );
}
