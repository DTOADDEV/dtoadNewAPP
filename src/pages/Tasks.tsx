import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskCarousel } from "@/components/tasks/TaskCarousel";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"reward" | "deadline" | "popularity">("reward");

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

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", selectedCategory, sortBy, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("tasks")
        .select(`
          *,
          category:task_categories(name)
        `);

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      switch (sortBy) {
        case "reward":
          query = query.order("reward", { ascending: false });
          break;
        case "deadline":
          query = query.order("deadline", { ascending: true });
          break;
        case "popularity":
          query = query.order("participant_count", { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dtoad-text mb-4">Explore Tasks</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-dtoad-text/50" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-dtoad-background/50 border-dtoad-primary/20 text-dtoad-text"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="md:w-auto w-full flex items-center gap-2 border-dtoad-primary/20 text-dtoad-text bg-dtoad-background/50"
              >
                <Filter className="h-4 w-4" />
                Categories
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-dtoad-background border-dtoad-primary/20">
              <DropdownMenuItem
                className="text-dtoad-text hover:bg-dtoad-primary/20"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </DropdownMenuItem>
              {categories?.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  className="text-dtoad-text hover:bg-dtoad-primary/20"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={sortBy} onValueChange={(value: "reward" | "deadline" | "popularity") => setSortBy(value)}>
            <SelectTrigger className="w-[180px] bg-dtoad-background/50 border-dtoad-primary/20 text-dtoad-text">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-dtoad-background border-dtoad-primary/20">
              <SelectItem value="reward" className="text-dtoad-text">Highest Reward</SelectItem>
              <SelectItem value="deadline" className="text-dtoad-text">Closest Deadline</SelectItem>
              <SelectItem value="popularity" className="text-dtoad-text">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-dtoad-text mb-4">Hot Tasks 🔥</h2>
        <TaskCarousel />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-dtoad-text mb-4">All Tasks</h2>
        <TaskGrid tasks={tasks || []} isLoading={isLoading} />
      </section>
    </div>
  );
}