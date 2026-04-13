import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Send, MessageSquare, Loader2, X } from "lucide-react";
import { Streamdown } from "streamdown";

interface AIChatAssistantProps {
  onClose?: () => void;
}

export default function AIChatAssistant({ onClose }: AIChatAssistantProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{ role: string; message: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatQuery = trpc.chat.history.useQuery(undefined, {
    enabled: !!user,
  });

  const sendMutation = trpc.chat.send.useMutation();

  useEffect(() => {
    if (chatQuery.data) {
      setMessages(
        chatQuery.data.map((item: any) => ({
          role: item.role,
          message: item.message,
        }))
      );
    }
  }, [chatQuery.data]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", message: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMutation.mutateAsync({
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", message: response.assistantMessage },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message:
            "Sorry, I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="pt-6">
          <p className="text-slate-600 text-center">
            Please sign in to use the AI Chat Assistant
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl h-full flex flex-col overflow-hidden">
      <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            <div>
              <CardTitle>Oracle AI Assistant</CardTitle>
              <CardDescription className="text-blue-100">
                Ask questions about Oracle Fusion and 26ai
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X size={18} />
            </Button>
          )}
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center py-8">
              <div>
                <MessageSquare size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">
                  Start a conversation about Oracle technologies
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-100 text-slate-900 rounded-bl-none"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Streamdown>{msg.message}</Streamdown>
                  ) : (
                    <p className="text-sm">{msg.message}</p>
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-slate-50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask me about Oracle..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send size={18} />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </Card>
  );
}
