import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TaskFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: "reward" | "deadline" | "popularity";
  onSortChange: (sort: "reward" | "deadline" | "popularity") => void;
}

export function TaskFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: TaskFiltersProps) {
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

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategoryChange(null)}
          className="bg-dtoad-primary/10 hover:bg-dtoad-primary/20 text-dtoad-text border-dtoad-primary/20"
        >
          All Tasks
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="bg-dtoad-primary/10 hover:bg-dtoad-primary/20 text-dtoad-text border-dtoad-primary/20"
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={sortBy === "reward" ? "default" : "outline"}
          onClick={() => onSortChange("reward")}
          className="bg-dtoad-primary/10 hover:bg-dtoad-primary/20 text-dtoad-text border-dtoad-primary/20"
        >
          Highest Reward
        </Button>
        <Button
          variant={sortBy === "deadline" ? "default" : "outline"}
          onClick={() => onSortChange("deadline")}
          className="bg-dtoad-primary/10 hover:bg-dtoad-primary/20 text-dtoad-text border-dtoad-primary/20"
        >
          Closest Deadline
        </Button>
        <Button
          variant={sortBy === "popularity" ? "default" : "outline"}
          onClick={() => onSortChange("popularity")}
          className="bg-dtoad-primary/10 hover:bg-dtoad-primary/20 text-dtoad-text border-dtoad-primary/20"
        >
          Most Popular
        </Button>
      </div>
    </div>
  );
}