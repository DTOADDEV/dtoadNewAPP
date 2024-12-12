import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Brush, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  description: string;
  participant_count: number;
  category: {
    name: string;
  };
}

interface TaskCardProps {
  task: Task;
}

const getTaskIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'design':
      return <Brush className="h-8 w-8 text-dtoad-accent/80" />;
    case 'social':
      return <Twitter className="h-8 w-8 text-dtoad-accent/80" />;
    default:
      return <Brush className="h-8 w-8 text-dtoad-accent/80" />;
  }
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="h-full bg-[#222222] border-none transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="p-4 bg-[#2A2A2A] rounded-xl">
            {getTaskIcon(task.category.name)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-dtoad-accent mb-2">
              {task.title}
            </h3>
            <span className="inline-block px-4 py-1.5 bg-[#2A2A2A] text-dtoad-accent/80 text-sm font-medium rounded-full">
              {task.category.name}
            </span>
          </div>
        </div>
        
        <p className="text-[#8E9196] text-lg">
          {task.description}
        </p>

        <div className="flex items-center gap-2 text-[#8E9196]">
          <Users className="h-5 w-5" />
          <span className="text-lg">{task.participant_count} participants</span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-dtoad-accent border-none text-lg font-semibold py-6"
        >
          Complete Task
        </Button>
      </CardFooter>
    </Card>
  );
}