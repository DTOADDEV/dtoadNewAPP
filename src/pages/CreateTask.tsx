import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { PlusCircle, MinusCircle, Upload, Coins, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SocialMediaLinks, SocialLink } from "@/components/tasks/SocialMediaLinks";

interface TaskForm {
  title: string;
  description: string;
  isHot: boolean;
  category: string;
  rewardType: "dtoad_tokens" | "airdrop_tokens";
  rewardAmount: number;
  image?: File;
  transactionHash?: string;
  socialLinks: SocialLink[];
}

const PLATFORM_WALLET = "0x1234567890abcdef"; // Replace with actual platform wallet address

const CreateTask = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isMultipleTasks, setIsMultipleTasks] = useState(false);
  const [tasks, setTasks] = useState<TaskForm[]>([{
    title: "",
    description: "",
    isHot: false,
    category: "",
    rewardType: "dtoad_tokens",
    rewardAmount: 0,
    socialLinks: []
  }]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ["taskCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

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

  const handleImageUpload = async (file: File, index: number) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('task-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Error uploading image",
        description: "Please try again.",
        variant: "destructive",
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('task-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAddTask = () => {
    setTasks([...tasks, {
      title: "",
      description: "",
      isHot: false,
      category: "",
      rewardType: "dtoad_tokens",
      rewardAmount: 0,
      socialLinks: []
    }]);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleTaskChange = (index: number, field: keyof TaskForm, value: any) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      for (const task of tasks) {
        let imageUrl = null;
        if (task.image) {
          imageUrl = await handleImageUpload(task.image, tasks.indexOf(task));
        }

        // Convert social links to a format compatible with Supabase's Json type
        const socialLinksJson = task.socialLinks.map(link => ({
          platform: link.platform,
          url: link.url
        }));

        const { error } = await supabase.from("tasks").insert({
          title: task.title,
          description: task.description,
          is_hot: task.isHot,
          task_type: task.isHot ? "hot" : "normal",
          reward: task.rewardAmount,
          reward_type: task.rewardType,
          transaction_hash: task.transactionHash,
          image_url: imageUrl,
          social_links: socialLinksJson,
          category_id: task.category,
          payment_status: "pending"
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
                  <Label htmlFor={`category-${index}`}>Category</Label>
                  <Select
                    value={task.category}
                    onValueChange={(value) => handleTaskChange(index, "category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Custom Title (Optional)</Label>
                  <Input
                    id={`title-${index}`}
                    value={task.title}
                    onChange={(e) => handleTaskChange(index, "title", e.target.value)}
                    placeholder="Enter custom task title"
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

                <div className="space-y-2">
                  <Label>Reward Type</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`reward-type-${index}`}
                        checked={task.rewardType === "dtoad_tokens"}
                        onCheckedChange={(checked) =>
                          handleTaskChange(index, "rewardType", checked ? "dtoad_tokens" : "airdrop_tokens")
                        }
                      />
                      <Label htmlFor={`reward-type-${index}`}>
                        {task.rewardType === "dtoad_tokens" ? (
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4" />
                            $DTOAD Tokens
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Wallet className="h-4 w-4" />
                            Airdrop Tokens
                          </div>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>

                {task.rewardType === "airdrop_tokens" && (
                  <div className="space-y-2 p-4 bg-dtoad-background-light rounded-lg">
                    <p className="text-sm text-dtoad-text-secondary">
                      Please send your tokens to our platform wallet:
                    </p>
                    <code className="block p-2 bg-white/50 rounded text-sm">
                      {PLATFORM_WALLET}
                    </code>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor={`transaction-hash-${index}`}>Transaction Hash</Label>
                      <Input
                        id={`transaction-hash-${index}`}
                        value={task.transactionHash}
                        onChange={(e) => handleTaskChange(index, "transactionHash", e.target.value)}
                        placeholder="Enter your transaction hash"
                        required={task.rewardType === "airdrop_tokens"}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor={`reward-amount-${index}`}>Reward Amount</Label>
                  <Input
                    id={`reward-amount-${index}`}
                    type="number"
                    min="0"
                    value={task.rewardAmount}
                    onChange={(e) => handleTaskChange(index, "rewardAmount", parseFloat(e.target.value))}
                    required
                    placeholder="Enter reward amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`image-${index}`}>Task Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id={`image-${index}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleTaskChange(index, "image", file);
                        }
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById(`image-${index}`)?.click()}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Upload className="h-5 w-5" />
                      {task.image ? "Change Image" : "Upload Image"}
                    </Button>
                    {task.image && (
                      <p className="text-sm text-dtoad-text-secondary">
                        {task.image.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id={`hot-${index}`}
                    checked={task.isHot}
                    onCheckedChange={(checked) => handleTaskChange(index, "isHot", checked)}
                  />
                  <Label htmlFor={`hot-${index}`}>Hot Task (50 USDT)</Label>
                </div>

                <SocialMediaLinks
                  links={task.socialLinks}
                  onChange={(links) => handleTaskChange(index, "socialLinks", links)}
                />
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