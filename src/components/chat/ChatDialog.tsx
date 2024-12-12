import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to edge function:', [...messages, newMessage]);
      const { data, error } = await supabase.functions.invoke('realtime-chat', {
        body: { messages: [...messages, newMessage] }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Edge function response:', data);

      if (!data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from chat function');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col gap-4 bg-gradient-to-br from-dtoad-background-light to-dtoad-background border-dtoad-primary/20 shadow-2xl rounded-2xl overflow-hidden"
      >
        <DialogTitle className="sr-only">Chat with DToad Assistant</DialogTitle>
        <div className="flex items-center gap-4 pb-4 border-b border-dtoad-primary/20">
          <div className="p-2.5 rounded-full bg-gradient-to-br from-dtoad-primary/20 to-dtoad-secondary/20 backdrop-blur-sm">
            <Bot className="h-6 w-6 text-dtoad-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-dtoad-text">DToad Assistant</h2>
              <Sparkles className="h-4 w-4 text-dtoad-accent animate-pulse" />
            </div>
            <p className="text-sm text-dtoad-text-secondary">Powered by AI</p>
          </div>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="flex flex-col gap-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                } animate-fade-in-up`}
              >
                <div className="flex-shrink-0">
                  {message.role === 'assistant' ? (
                    <div className="p-2.5 rounded-full bg-gradient-to-br from-dtoad-primary/20 to-dtoad-secondary/20">
                      <Bot className="h-5 w-5 text-dtoad-primary" />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-full bg-gradient-to-br from-dtoad-secondary/20 to-dtoad-accent/20">
                      <User className="h-5 w-5 text-dtoad-secondary" />
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-2xl p-4 max-w-[80%] shadow-lg ${
                    message.role === 'assistant'
                      ? 'glass-effect bg-dtoad-background-light/30'
                      : 'bg-gradient-to-br from-dtoad-primary to-dtoad-secondary text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-3 p-3 glass-effect rounded-xl mt-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none bg-transparent border-none focus-visible:ring-0 placeholder:text-dtoad-text-secondary/50"
            aria-label="Chat message input"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 bg-gradient-to-br from-dtoad-primary to-dtoad-secondary hover:from-dtoad-primary/90 hover:to-dtoad-secondary/90 transition-all duration-300 hover:scale-105"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}