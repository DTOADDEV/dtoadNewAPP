import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  participant_count: number;
  category: {
    name: string;
  };
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="h-full bg-dtoad-background/50 border-dtoad-primary/20 group hover:border-dtoad-primary/40 transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-dtoad-text group-hover:text-dtoad-primary transition-colors">{task.title}</h3>
            <p className="text-sm text-dtoad-text/70 flex items-center gap-1">
              {task.category.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-dtoad-primary">{task.reward} DTD</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
      <CardFooter>
        <Button 
          className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90 group-hover:translate-x-1 transition-all flex items-center gap-2"
        >
          Join Task
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}