import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function FloatingChatIcon() {
  const { toast } = useToast();

  const handleChatClick = () => {
    toast({
      title: "Chat Coming Soon!",
      description: "Our chat feature will be available shortly.",
    });
  };

  return (
    <Button
      onClick={handleChatClick}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-dtoad-primary hover:bg-dtoad-primary/90 shadow-lg"
      size="icon"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}