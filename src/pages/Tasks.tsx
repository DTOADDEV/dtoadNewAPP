import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskCarousel } from "@/components/tasks/TaskCarousel";
import { TaskGrid } from "@/components/tasks/TaskGrid";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Tasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"reward" | "deadline" | "popularity">("reward");

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
          <Button
            variant="outline"
            className="md:w-auto w-full flex items-center gap-2 border-dtoad-primary/20 text-dtoad-text"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <TaskFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

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