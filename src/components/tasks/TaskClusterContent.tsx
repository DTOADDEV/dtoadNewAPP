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
        <h2 className="text-2xl font-bold text-dtoad-accent">{cluster.title}</h2>
        <p className="text-sm text-[#8E9196]">
          {cluster.tasks.length} similar tasks available
        </p>
      </div>

      <div className="grid gap-4">
        {cluster.tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg bg-[#222222] border border-[#2A2A2A]"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-dtoad-accent">{task.title}</h3>
                <p className="text-sm text-[#8E9196]">{task.category.name}</p>
              </div>
              <p className="font-bold text-dtoad-accent">
                {formatTokenAmount(Number(task.reward))}
              </p>
            </div>
            <p className="text-sm text-[#8E9196] mb-4">{task.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#8E9196]">
                {task.participant_count} participants
              </p>
              <button className="px-4 py-2 bg-[#2A2A2A] text-dtoad-accent rounded-md hover:bg-[#333333] transition-colors">
                Join Task
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-[#2A2A2A]">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-[#8E9196]">
            Total Reward Pool
          </p>
          <p className="text-xl font-bold text-dtoad-accent">
            {formatTokenAmount(Number(cluster.totalReward))}
          </p>
        </div>
      </div>
    </div>
  );
}