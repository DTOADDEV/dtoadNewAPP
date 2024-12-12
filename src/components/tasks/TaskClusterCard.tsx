import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Video, ChevronRight, Calendar } from "lucide-react";
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

interface TaskCluster {
  title: string;
  tasks: Task[];
  totalReward: number;
}

interface TaskClusterCardProps {
  cluster: TaskCluster;
  onClick: () => void;
}

export function TaskClusterCard({ cluster, onClick }: TaskClusterCardProps) {
  const totalParticipants = cluster.tasks.reduce(
    (sum, task) => sum + (task.participant_count || 0),
    0
  );

  // Find the earliest deadline among all tasks
  const earliestDeadline = cluster.tasks.reduce((earliest, task) => {
    const taskDate = new Date(task.deadline);
    return earliest ? (taskDate < earliest ? taskDate : earliest) : taskDate;
  }, null as Date | null);

  return (
    <Card 
      className="h-full bg-dtoad-background/50 border-dtoad-primary/20 cursor-pointer hover:border-dtoad-primary/40 transition-all hover:shadow-md group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-dtoad-primary" />
            <div>
              <h3 className="text-lg font-semibold text-dtoad-text group-hover:text-dtoad-primary transition-colors">{cluster.title}</h3>
              <p className="text-sm text-dtoad-text/70">{cluster.tasks.length} similar tasks</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-dtoad-text/40 group-hover:text-dtoad-primary group-hover:translate-x-1 transition-all" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-dtoad-text/80">
              <Users className="h-4 w-4" />
              <span>{totalParticipants} participants</span>
            </div>
            {earliestDeadline && (
              <div className="flex items-center gap-2 text-sm text-dtoad-text/80">
                <Calendar className="h-4 w-4" />
                <span>Earliest deadline: {formatDistanceToNow(earliestDeadline, { addSuffix: true })}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-dtoad-text/60">
              Average reward: {(cluster.totalReward / cluster.tasks.length).toFixed(0)} DTD
            </div>
            <div className="font-semibold text-dtoad-primary">
              Total: {cluster.totalReward} DTD
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}