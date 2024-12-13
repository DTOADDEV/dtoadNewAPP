import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
}

interface FavoriteProjectsProps {
  projects: Project[];
}

export function FavoriteProjects({ projects }: FavoriteProjectsProps) {
  return (
    <Card className="bg-[#1A2825] border-dtoad-primary/10">
      <CardHeader>
        <CardTitle className="text-dtoad-text flex items-center gap-2">
          <Star className="w-5 h-5 text-dtoad-accent" /> Favorite Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-[#0A1614] hover:bg-[#0A1614]/80 transition-colors cursor-pointer border border-dtoad-primary/10"
          >
            <h3 className="text-dtoad-primary font-medium mb-1">{project.title}</h3>
            <p className="text-sm text-dtoad-text-secondary">{project.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}