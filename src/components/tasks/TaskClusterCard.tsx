import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Video } from "lucide-react";

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

  return (
    <Card 
      className="h-full bg-dtoad-background/50 border-dtoad-primary/20 cursor-pointer hover:border-dtoad-primary/40 transition-colors"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-dtoad-primary" />
            <div>
              <h3 className="text-lg font-semibold text-dtoad-text">{cluster.title}</h3>
              <p className="text-sm text-dtoad-text/70">{cluster.tasks.length} similar tasks</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center text-sm text-dtoad-text/80">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{totalParticipants} participants</span>
            </div>
            <div className="font-semibold text-dtoad-primary">
              Up to {cluster.totalReward} DTD
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}