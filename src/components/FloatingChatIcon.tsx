import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatDialog } from "./chat/ChatDialog";

export function FloatingChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex items-center gap-4 animate-fade-in-up">
        <span className="glass-effect px-5 py-3 rounded-full shadow-lg text-dtoad-text font-bold text-xl uppercase tracking-wider">
          AMA
        </span>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-br from-dtoad-primary via-dtoad-primary/90 to-dtoad-secondary hover:from-dtoad-primary/90 hover:via-dtoad-primary/80 hover:to-dtoad-secondary/90 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-dtoad-primary/20 hover:shadow-2xl border border-dtoad-primary/20"
          size="icon"
        >
          <Bot className="h-7 w-7 text-white" />
        </Button>
      </div>
      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
