import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TaskClusterCard } from "./TaskClusterCard";
import { TaskClusterContent } from "./TaskClusterContent";

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

interface TaskGridProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TaskGrid({ tasks, isLoading }: TaskGridProps) {
  const [selectedCluster, setSelectedCluster] = useState<TaskCluster | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 animate-pulse bg-dtoad-primary/5 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="text-center py-12">
        <p className="text-dtoad-text/60">No tasks found</p>
      </div>
    );
  }

  // Group tasks by title
  const clusters: Record<string, TaskCluster> = tasks.reduce((acc, task) => {
    if (!acc[task.title]) {
      acc[task.title] = {
        title: task.title,
        tasks: [],
        totalReward: 0,
      };
    }
    acc[task.title].tasks.push(task);
    acc[task.title].totalReward += Number(task.reward);
    return acc;
  }, {} as Record<string, TaskCluster>);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(clusters).map((cluster) => (
          <TaskClusterCard
            key={cluster.title}
            cluster={cluster}
            onClick={() => setSelectedCluster(cluster)}
          />
        ))}
      </div>

      <Dialog open={!!selectedCluster} onOpenChange={() => setSelectedCluster(null)}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          {selectedCluster && (
            <TaskClusterContent cluster={selectedCluster} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}