import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatDialog } from "./chat/ChatDialog";

export function FloatingChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex items-center gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg text-dtoad-text font-medium">
          Ask me anything
        </span>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-dtoad-primary hover:bg-dtoad-primary/90 shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </div>
      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}