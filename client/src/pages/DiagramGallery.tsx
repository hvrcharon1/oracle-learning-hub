import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OracleDashboardLayout from "@/components/OracleDashboardLayout";
import { ZoomIn } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function DiagramGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDiagram, setSelectedDiagram] = useState<any | null>(null);

  const diagramsQuery = trpc.diagrams.list.useQuery({
    category: selectedCategory || undefined,
  });

  const categories = [
    { id: "architecture", label: "Architecture", icon: "🏗️" },
    { id: "data-flow", label: "Data Flow", icon: "🔄" },
    { id: "ai-pipeline", label: "AI Pipeline", icon: "🤖" },
    { id: "process-flow", label: "Process Flow", icon: "📊" },
  ];

  return (
    <OracleDashboardLayout currentPage="diagrams">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Visual Diagram Gallery
          </h1>
          <p className="text-lg text-slate-600">
            Architecture diagrams, data flows, and visual explanations of Oracle concepts
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              All Diagrams
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diagrams Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.label} Diagrams`
              : "All Diagrams"}
          </h2>

          {diagramsQuery.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : diagramsQuery.error ? (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <p className="text-red-800">Error loading diagrams. Please try again.</p>
              </CardContent>
            </Card>
          ) : diagramsQuery.data && diagramsQuery.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagramsQuery.data.map((diagram: any) => (
                <button
                  key={diagram.id}
                  onClick={() => setSelectedDiagram(diagram)}
                  className="text-left group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-600" />
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {diagram.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {diagram.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        {diagram.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {diagram.imageUrl ? (
                        <div className="w-full h-40 bg-slate-100 rounded-lg overflow-hidden mb-4">
                          <img
                            src={diagram.imageUrl}
                            alt={diagram.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-4">
                          <span className="text-slate-400">Diagram Preview</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                        <ZoomIn size={16} />
                        View Details
                      </div>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          ) : (
            <Card className="border-slate-200 bg-slate-50">
              <CardContent className="pt-6">
                <p className="text-slate-600">
                  No diagrams available. Try a different category.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Diagram Modal */}
        {selectedDiagram && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDiagram(null)}
          >
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto border-0">
              <CardHeader className="sticky top-0 bg-white border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2 bg-emerald-100 text-emerald-700">
                      {selectedDiagram.category}
                    </Badge>
                    <CardTitle className="text-2xl">{selectedDiagram.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {selectedDiagram.description}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => setSelectedDiagram(null)}
                    className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {selectedDiagram.imageUrl ? (
                  <img
                    src={selectedDiagram.imageUrl}
                    alt={selectedDiagram.title}
                    className="w-full rounded-lg"
                  />
                ) : selectedDiagram.svgContent ? (
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: selectedDiagram.svgContent }}
                  />
                ) : (
                  <div className="w-full h-96 bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400">Diagram not available</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </OracleDashboardLayout>
  );
}
