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
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TaskCarousel() {
  const { data: hotTasks, isLoading } = useQuery({
    queryKey: ["hotTasks"],
    queryFn: async () => {
      console.log("Fetching hot tasks");
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          *,
          category:task_categories(name)
        `)
        .eq("is_hot", true)
        .limit(5);
      if (error) throw error;
      console.log("Hot tasks fetched:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-[400px] animate-pulse bg-dtoad-primary/5" />
        ))}
      </div>
    );
  }

  if (!hotTasks?.length) {
    return null;
  }

  return (
    <div className="relative group">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {hotTasks.map((task) => (
            <CarouselItem key={task.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <TaskCard task={task} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CarouselPrevious 
            variant="ghost" 
            size="icon" 
            className="h-12 w-12 rounded-full border-2 border-dtoad-primary/20 bg-white/80 hover:bg-white hover:border-dtoad-primary"
          >
            <ChevronLeft className="h-8 w-8 text-dtoad-primary" />
          </CarouselPrevious>
        </div>
        <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <CarouselNext 
            variant="ghost" 
            size="icon"
            className="h-12 w-12 rounded-full border-2 border-dtoad-primary/20 bg-white/80 hover:bg-white hover:border-dtoad-primary"
          >
            <ChevronRight className="h-8 w-8 text-dtoad-primary" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}