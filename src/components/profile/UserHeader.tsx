import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserHeaderProps {
  username: string;
  accountType?: string;
  walletAddress?: string;
  avatarUrl?: string;
  isUploading: boolean;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInviteFriends: () => void;
}

export function UserHeader({
  username,
  accountType = "Demo Account",
  walletAddress,
  avatarUrl,
  isUploading,
  onAvatarChange,
  onInviteFriends,
}: UserHeaderProps) {
  return (
    <div className="relative bg-dtoad-secondary/90 rounded-lg p-6 mb-8">
      <div className="flex items-start gap-6">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 border-white/10">
            <AvatarImage
              src={avatarUrl ? `${supabase.storage.from("avatars").getPublicUrl(avatarUrl).data.publicUrl}` : undefined}
              alt={username}
              className="object-cover"
            />
            <AvatarFallback className="bg-dtoad-primary text-white text-2xl">
              {username?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <label
            className="absolute bottom-0 right-0 bg-dtoad-primary hover:bg-dtoad-primary/90 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            htmlFor="avatar-upload"
          >
            <Edit className="w-4 h-4" />
          </label>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={onAvatarChange}
            disabled={isUploading}
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold text-white">{username}</h1>
          <p className="text-dtoad-background-light">{accountType}</p>
          {walletAddress && (
            <p className="text-sm font-mono bg-black/20 text-dtoad-background-light p-2 rounded-md">
              {walletAddress}
            </p>
          )}
          <div className="flex gap-4 mt-4">
            <Button className="bg-dtoad-primary hover:bg-dtoad-primary/90">
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
            <Button variant="outline" onClick={onInviteFriends} className="bg-black/20 border-dtoad-background-light/20 text-white hover:bg-black/30">
              <UserPlus className="w-4 h-4 mr-2" /> Invite Friends
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}