import { Users, Trophy, Coins } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnnouncementCard } from "@/components/dashboard/AnnouncementCard";
import { LeaderboardTable } from "@/components/dashboard/LeaderboardTable";

const announcements = [
  {
    title: "New Airdrop Coming Soon!",
    description: "Get ready for our biggest airdrop yet. Stay tuned for details!",
    date: "2024-03-15",
  },
  {
    title: "Platform Milestone: 1,000 Active Users!",
    description: "We've reached 1,000 active users! Thank you for being part of our growth.",
    date: "2024-03-10",
  },
  {
    title: "Monthly Token Burn",
    description: "10,000 $DTOAD tokens were burned this month.",
    date: "2024-03-01",
  },
];

const leaderboardEntries = [
  {
    rank: 1,
    avatar: "/placeholder.svg",
    username: "ToadBoss22",
    tasksCompleted: 125,
    rewardsEarned: "1,500 $DTOAD",
    badge: "Task Champion 🏆",
  },
  {
    rank: 2,
    avatar: "/placeholder.svg",
    username: "GreenJump12",
    tasksCompleted: 110,
    rewardsEarned: "1,200 $DTOAD",
    badge: "Rising Star ⭐",
  },
  {
    rank: 3,
    avatar: "/placeholder.svg",
    username: "MemeKing",
    tasksCompleted: 100,
    rewardsEarned: "1,000 $DTOAD",
    badge: "Hard Worker 💪",
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dtoad-text mb-2">
          Leaderboard – Celebrate the Best of DToad 🐸
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Active Users"
          value="1,234"
          subtitle="+180 from last week"
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Tasks Created"
          value="2,345"
          subtitle="+340 this month"
          icon={<Trophy className="h-5 w-5" />}
        />
        <StatsCard
          title="Rewards Distributed"
          value="45,678 $DTOAD"
          subtitle="+5,000 this week"
          icon={<Coins className="h-5 w-5" />}
        />
      </div>

      <div className="mb-8">
        <AnnouncementCard announcements={announcements} />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-dtoad-text">Top Task Performers</h2>
          <select className="bg-dtoad-secondary/20 border-none text-dtoad-text rounded-md p-2">
            <option value="all-time">All Time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <LeaderboardTable entries={leaderboardEntries} />
      </div>
    </div>
  );
}