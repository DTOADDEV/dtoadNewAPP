import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Coins } from "lucide-react";

interface MetricsCardsProps {
  tokensHeld: number;
  tasksCompleted: number;
  referralsCount: number;
  leaderboardRank?: number;
}

export function MetricsCards({ tokensHeld, tasksCompleted, referralsCount, leaderboardRank }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tokens Held</CardTitle>
          <Coins className="h-4 w-4 text-dtoad-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tokensHeld.toLocaleString()}</div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <Trophy className="h-4 w-4 text-dtoad-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tasksCompleted}</div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Referrals</CardTitle>
          <Users className="h-4 w-4 text-dtoad-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{referralsCount}</div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rank</CardTitle>
          <Trophy className="h-4 w-4 text-dtoad-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">#{leaderboardRank || "N/A"}</div>
        </CardContent>
      </Card>
    </div>
  );
}