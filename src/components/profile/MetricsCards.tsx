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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        title="Tokens Held"
        value={`${tokensHeld.toLocaleString()} DTOAD`}
        icon={<Coins className="w-5 h-5 text-dtoad-primary" />}
      />
      <MetricCard
        title="Referrals"
        value={`${referralsCount} Friends`}
        icon={<Users className="w-5 h-5 text-dtoad-primary" />}
      />
      <MetricCard
        title="Tasks Completed"
        value={`${tasksCompleted} Tasks`}
        icon={<Trophy className="w-5 h-5 text-dtoad-primary" />}
      />
      <MetricCard
        title="Leaderboard Rank"
        value={`#${leaderboardRank || "N/A"}`}
        subtitle="Top 10% of Users"
        icon={<Award className="w-5 h-5 text-dtoad-accent" />}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, subtitle, icon }: MetricCardProps) {
  return (
    <Card className="bg-dtoad-secondary/90 border-none hover:translate-y-[-2px] transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-dtoad-background-light">{title}</p>
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-dtoad-background-light">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}