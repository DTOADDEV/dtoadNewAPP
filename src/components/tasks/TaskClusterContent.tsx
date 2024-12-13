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

interface TaskClusterContentProps {
  cluster: TaskCluster;
}

export function TaskClusterContent({ cluster }: TaskClusterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#333333]">{cluster.title}</h2>
        <p className="text-sm text-[#333333]/70">
          {cluster.tasks.length} similar tasks available
        </p>
      </div>

      <div className="grid gap-4">
        {cluster.tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg border border-dtoad-primary/20 bg-white/50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-[#333333]">{task.title}</h3>
                <p className="text-sm text-[#333333]/70">{task.category.name}</p>
              </div>
              <p className="font-bold text-dtoad-primary">
                {formatTokenAmount(Number(task.reward))}
              </p>
            </div>
            <p className="text-sm text-[#333333]/80 mb-4">{task.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#333333]/60">
                {task.participant_count} participants
              </p>
              <button className="px-4 py-2 bg-dtoad-primary text-white rounded-md hover:bg-dtoad-primary/90 transition-colors">
                Join Task
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-dtoad-primary/20">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-[#333333]/70">
            Total Reward Pool
          </p>
          <p className="text-xl font-bold text-dtoad-primary">
            {formatTokenAmount(Number(cluster.totalReward))}
          </p>
        </div>
      </div>
    </div>
  );
}