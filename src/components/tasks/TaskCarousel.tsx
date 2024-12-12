import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TaskCard } from "./TaskCard";
import { Card } from "@/components/ui/card";

export function TaskCarousel() {
  const { data: hotTasks, isLoading } = useQuery({
    queryKey: ["hotTasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          *,
          category:task_categories(name)
        `)
        .eq("is_hot", true)
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-48 animate-pulse bg-dtoad-primary/5" />
        ))}
      </div>
    );
  }

  if (!hotTasks?.length) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {hotTasks.map((task) => (
          <CarouselItem key={task.id} className="md:basis-1/3 lg:basis-1/3">
            <TaskCard task={task} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}