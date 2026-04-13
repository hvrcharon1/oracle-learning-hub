import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

interface Module {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  content: string;
  official_doc_link: string;
}

export default function Healthcare() {
  const [selectedCategory, setSelectedCategory] = useState<string>("overview");
  const { data: modules, isLoading } = trpc.learning.modules.useQuery({
    category: "healthcare",
  }) as any;

  const categories = [
    { id: "overview", label: "Overview", icon: "🏥" },
    { id: "clinical", label: "Clinical", icon: "👨‍⚕️" },
    { id: "revenue-cycle", label: "Revenue Cycle", icon: "💰" },
    { id: "supply-chain", label: "Supply Chain", icon: "📦" },
    { id: "ai-analytics", label: "AI & Analytics", icon: "🤖" },
  ];

  const filteredModules = (modules?.filter(
    (m: Module) => m.subcategory === selectedCategory
  ) || []) as Module[];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Oracle Health Cloud
        </h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive healthcare solutions for modern healthcare organizations
        </p>
      </div>

      {/* Overview Card */}
      <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            Healthcare Cloud Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Oracle Health Cloud is a comprehensive suite of cloud-based healthcare applications designed for healthcare organizations to improve patient care, operational efficiency, and clinical outcomes. It integrates clinical, financial, supply chain, and analytics capabilities into a unified platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Key Features:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Electronic Health Records (EHR)</li>
                <li>✓ Clinical Decision Support</li>
                <li>✓ Revenue Cycle Management</li>
                <li>✓ Supply Chain Optimization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Benefits:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ Improved Patient Outcomes</li>
                <li>✓ Operational Efficiency</li>
                <li>✓ Cost Reduction</li>
                <li>✓ Better Compliance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs defaultValue="overview" onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-red-100 to-pink-100">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm">
              <span className="mr-1">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              </div>
            ) : filteredModules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModules.map((module: Module) => (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow border-red-100">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {module.content}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-red-200 hover:bg-red-50"
                      >
                        <a
                          href={module.official_doc_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Official Documentation
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No modules available for this category</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">5</div>
              <p className="text-sm text-muted-foreground mt-2">Learning Modules</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">2</div>
              <p className="text-sm text-muted-foreground mt-2">Visual Diagrams</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2</div>
              <p className="text-sm text-muted-foreground mt-2">Resources</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-rose-100 border-rose-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">2</div>
              <p className="text-sm text-muted-foreground mt-2">News Articles</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Topics */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle>Key Healthcare Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-xl">👨‍⚕️</span> Clinical Management
              </h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive EHR systems, clinical decision support, and patient care coordination tools for healthcare providers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-xl">💰</span> Financial Operations
              </h4>
              <p className="text-sm text-muted-foreground">
                Revenue cycle management, billing, claims processing, and financial analytics for healthcare organizations.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-xl">📦</span> Supply Chain
              </h4>
              <p className="text-sm text-muted-foreground">
                Inventory management, procurement, and distribution optimization for medical supplies and pharmaceuticals.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <span className="text-xl">🤖</span> AI & Analytics
              </h4>
              <p className="text-sm text-muted-foreground">
                Predictive analytics, patient risk stratification, and AI-powered clinical insights for better outcomes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
