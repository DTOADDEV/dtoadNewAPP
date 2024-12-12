import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ShareButton } from "./ShareButton";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  participant_count: number;
  image_url?: string;
  category: {
    name: string;
  };
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const imageUrl = task.image_url 
    ? `${supabase.storage.from("task-images").getPublicUrl(task.image_url).data.publicUrl}`
    : "/placeholder.svg";

  return (
    <Card className="h-full bg-dtoad-background/50 border-dtoad-primary/20 group hover:border-dtoad-primary/40 transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-dtoad-text group-hover:text-dtoad-primary transition-colors">
              {task.title}
            </h3>
            <p className="text-sm text-dtoad-text/70 flex items-center gap-1">
              {task.category.name}
            </p>
          </div>
          <ShareButton 
            taskId={task.id}
            title={task.title}
            imageUrl={task.image_url}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg bg-dtoad-background/20">
          <img
            src={imageUrl}
            alt={task.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-dtoad-text/80 line-clamp-2 mb-4">{task.description}</p>
        <div className="flex items-center gap-4 text-sm text-dtoad-text/60">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(task.deadline), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{task.participant_count} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-right">
          <p className="text-lg font-bold text-dtoad-primary">{task.reward} DTD</p>
        </div>
        <Button 
          className="bg-dtoad-primary hover:bg-dtoad-primary/90 group-hover:translate-x-1 transition-all flex items-center gap-2"
        >
          Join Task
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}