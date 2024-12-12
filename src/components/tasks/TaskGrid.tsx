import { TaskCard } from "./TaskCard";

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

interface TaskGridProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TaskGrid({ tasks, isLoading }: TaskGridProps) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}