import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("bg-dtoad-secondary/20 border-none shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-dtoad-text/70">{title}</p>
            <h3 className="text-2xl font-bold text-dtoad-text mt-2">{value}</h3>
            {subtitle && (
              <p className="text-sm text-dtoad-text/60 mt-1">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="text-dtoad-primary">{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}