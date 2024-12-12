import { useState } from "react";
import { TaskCard } from "./TaskCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface TaskClusterContentProps {
  cluster: TaskCluster;
}

export function TaskClusterContent({ cluster }: TaskClusterContentProps) {
  const [sortBy, setSortBy] = useState<"reward" | "deadline" | "popularity">("reward");

  const sortedTasks = [...cluster.tasks].sort((a, b) => {
    switch (sortBy) {
      case "reward":
        return Number(b.reward) - Number(a.reward);
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "popularity":
        return (b.participant_count || 0) - (a.participant_count || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#333333]">{cluster.title}</h2>
        <Select value={sortBy} onValueChange={(value: "reward" | "deadline" | "popularity") => setSortBy(value)}>
          <SelectTrigger className="w-[180px] font-semibold">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reward" className="font-semibold">Highest Reward</SelectItem>
            <SelectItem value="deadline" className="font-semibold">Closest Deadline</SelectItem>
            <SelectItem value="popularity" className="font-semibold">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}