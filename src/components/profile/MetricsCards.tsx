import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Coins, Award } from "lucide-react";

interface MetricsCardsProps {
  tokensHeld: number;
  tasksCompleted: number;
  referralsCount: number;
  leaderboardRank?: number;
}

export function MetricsCards({
  tokensHeld,
  tasksCompleted,
  referralsCount,
  leaderboardRank,
}: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Tokens Held"
        value={tokensHeld.toLocaleString()}
        subtitle="DTOAD"
        icon={<Coins className="h-5 w-5 text-dtoad-accent" />}
        progress={75}
      />
      <MetricCard
        title="Referrals"
        value={`${referralsCount} Friends`}
        icon={<Users className="h-5 w-5 text-dtoad-accent" />}
        progress={60}
      />
      <MetricCard
        title="Tasks Completed"
        value={`${tasksCompleted} Tasks`}
        icon={<Trophy className="h-5 w-5 text-dtoad-accent" />}
        progress={80}
      />
      <MetricCard
        title="Leaderboard Rank"
        value={`#${leaderboardRank || "N/A"}`}
        subtitle="Top 10% of Users"
        icon={<Award className="h-5 w-5 text-dtoad-accent" />}
        progress={90}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  progress: number;
}

function MetricCard({ title, value, subtitle, icon, progress }: MetricCardProps) {
  return (
    <Card className="bg-[#1A2825] border-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-400">{title}</span>
          {icon}
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-white">{value}</h3>
          </div>
          {subtitle && (
            <p className="text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="mt-4">
          <div className="h-1 w-full bg-dtoad-primary/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-dtoad-primary rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}