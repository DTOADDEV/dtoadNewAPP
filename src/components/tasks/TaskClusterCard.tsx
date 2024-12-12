import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Video, ChevronRight, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatTokenAmount } from "@/lib/utils";

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

  const earliestDeadline = cluster.tasks.reduce((earliest, task) => {
    const taskDate = new Date(task.deadline);
    return earliest ? (taskDate < earliest ? taskDate : earliest) : taskDate;
  }, null as Date | null);

  const averageReward = Math.floor(cluster.totalReward / cluster.tasks.length);

  return (
    <Card 
      className="h-full bg-[#222222] border-none cursor-pointer hover:scale-[1.02] transition-all group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-dtoad-accent" />
            <div>
              <h3 className="text-lg font-bold text-dtoad-accent group-hover:text-dtoad-accent/80 transition-colors">
                {cluster.title}
              </h3>
              <p className="text-sm font-semibold text-[#8E9196]">
                {cluster.tasks.length} similar tasks
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-[#8E9196] group-hover:text-dtoad-accent group-hover:translate-x-1 transition-all" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#8E9196]">
              <Users className="h-4 w-4" />
              <span>{totalParticipants} participants</span>
            </div>
            {earliestDeadline && (
              <div className="flex items-center gap-2 text-sm font-semibold text-[#8E9196]">
                <Calendar className="h-4 w-4" />
                <span>Earliest deadline: {formatDistanceToNow(earliestDeadline, { addSuffix: true })}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold text-[#8E9196]">
              Average reward: {formatTokenAmount(Number(averageReward))}
            </div>
            <div className="font-bold text-dtoad-accent">
              Total: {formatTokenAmount(Number(cluster.totalReward))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}