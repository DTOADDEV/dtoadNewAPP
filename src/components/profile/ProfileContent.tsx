import { ProfileHeader } from "./ProfileHeader";
import { MetricsCards } from "./MetricsCards";
import { FavoriteProjects } from "./FavoriteProjects";

interface ProfileContentProps {
  profile: any;
}

export function ProfileContent({ profile }: ProfileContentProps) {
  const demoProjects = [
    {
      title: "DeFi Integration",
      description: "Smart contract integration for decentralized finance"
    },
    {
      title: "NFT Marketplace",
      description: "Digital marketplace for NFT trading"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-dtoad-background-dark to-dtoad-background rounded-lg p-6 shadow-lg">
        <ProfileHeader profile={profile} />
      </div>

      <MetricsCards
        tokensHeld={profile?.tokens_held}
        tasksCompleted={profile?.tasks_completed}
        referralsCount={profile?.referrals_count}
        leaderboardRank={profile?.leaderboard_rank}
      />

      <FavoriteProjects projects={demoProjects} />
    </div>
  );
}