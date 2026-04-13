import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const searchQuery = trpc.search.global.useQuery(
    { query },
    { enabled: isOpen && query.length > 2 }
  );

  useEffect(() => {
    if (searchQuery.data) {
      setResults(searchQuery.data);
    }
  }, [searchQuery.data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl border-0 shadow-2xl">
        <CardContent className="p-0">
          {/* Search Input */}
          <div className="relative p-4 border-b">
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Oracle topics, resources, and diagrams..."
              className="pl-10 pr-10 py-3 border-0 focus:ring-0"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.isLoading ? (
              <div className="p-8 flex items-center justify-center gap-2 text-slate-600">
                <Loader2 size={18} className="animate-spin" />
                Searching...
              </div>
            ) : query.length < 3 ? (
              <div className="p-8 text-center text-slate-500">
                Type at least 3 characters to search
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No results found for "{query}"
              </div>
            ) : (
              <div className="divide-y">
                {results.map((result, idx) => (
                  <Link
                    key={idx}
                    href={result.url || "/"}
                    onClick={onClose}
                  >
                    <a className="block p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {result.type}
                            </Badge>
                            {result.category && (
                              <Badge variant="secondary" className="text-xs">
                                {result.category}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900 line-clamp-1">
                            {result.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
