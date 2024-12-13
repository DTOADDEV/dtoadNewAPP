import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    username: string;
    avatar_url?: string;
    wallet_address?: string;
  };
  onAvatarChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}

export function ProfileHeader({ profile, onAvatarChange, isUploading }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-dtoad-primary/10">
          <AvatarImage src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`} />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-2xl font-bold text-white">
          {profile.username}
        </h2>
        <p className="text-gray-400">Member</p>
        {profile.wallet_address && (
          <p className="text-sm font-mono bg-[#0A1614] p-2 rounded-lg border border-dtoad-primary/20 text-gray-300">
            {profile.wallet_address}
          </p>
        )}
      </div>
    </div>
  );
}