import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatDialog } from "./chat/ChatDialog";

export function FloatingChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex items-center gap-3 animate-fade-in-up">
        <span className="bg-dtoad-background-light/90 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-lg text-dtoad-text font-medium border border-dtoad-primary/20">
          Ask me anything
        </span>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-br from-dtoad-primary to-dtoad-secondary hover:from-dtoad-primary/90 hover:to-dtoad-secondary/90 shadow-lg transition-all duration-300 hover:scale-105"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </div>
      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}