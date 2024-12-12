import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { PlusCircle, MinusCircle } from "lucide-react";

interface TaskForm {
  title: string;
  description: string;
  isHot: boolean;
}

const CreateTask = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isMultipleTasks, setIsMultipleTasks] = useState(false);
  const [tasks, setTasks] = useState<TaskForm[]>([{ title: "", description: "", isHot: false }]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in or create an account to create tasks.",
          duration: 5000,
        });
        navigate("/login");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleAddTask = () => {
    setTasks([...tasks, { title: "", description: "", isHot: false }]);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleTaskChange = (index: number, field: keyof TaskForm, value: string | boolean) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      for (const task of tasks) {
        const { error } = await supabase.from("tasks").insert({
          title: task.title,
          description: task.description,
          is_hot: task.isHot,
          task_type: task.isHot ? "hot" : "normal",
          reward: task.isHot ? 50 : 20,
        });

        if (error) throw error;
      }

      toast({
        title: "Success!",
        description: `${tasks.length} task${tasks.length > 1 ? "s" : ""} created successfully.`,
      });
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating tasks:", error);
      toast({
        title: "Error",
        description: "Failed to create tasks. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-dtoad-text">Create New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2 mb-6">
          <Switch
            id="multiple-tasks"
            checked={isMultipleTasks}
            onCheckedChange={setIsMultipleTasks}
          />
          <Label htmlFor="multiple-tasks">Create Multiple Tasks</Label>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {tasks.map((task, index) => (
            <AccordionItem key={index} value={`task-${index}`} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="text-lg font-semibold">
                  {task.title || `Task ${index + 1}`}
                </AccordionTrigger>
                {isMultipleTasks && tasks.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTask(index)}
                    className="text-dtoad-text-secondary hover:text-dtoad-primary"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <AccordionContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={task.title}
                    onChange={(e) => handleTaskChange(index, "title", e.target.value)}
                    required
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={task.description}
                    onChange={(e) => handleTaskChange(index, "description", e.target.value)}
                    required
                    placeholder="Enter task description"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`hot-${index}`}
                    checked={task.isHot}
                    onCheckedChange={(checked) => handleTaskChange(index, "isHot", checked)}
                  />
                  <Label htmlFor={`hot-${index}`}>Hot Task (50 USDT)</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {isMultipleTasks && (
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTask}
            className="w-full flex items-center justify-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Add Another Task
          </Button>
        )}

        <Button type="submit" className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90">
          Create Task{tasks.length > 1 ? "s" : ""}
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;