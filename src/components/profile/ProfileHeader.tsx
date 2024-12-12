import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileHeaderProps {
  username: string;
  avatarUrl?: string;
  isUploading: boolean;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHeader({ username, avatarUrl, isUploading, onAvatarChange }: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-dtoad-primary/20 to-dtoad-accent/20 rounded-t-lg animate-gradient-y"></div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
        <div className="relative group">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg transition-transform hover:scale-105">
            <AvatarImage
              src={avatarUrl ? `${supabase.storage.from("avatars").getPublicUrl(avatarUrl).data.publicUrl}` : undefined}
              alt="Profile"
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
            <Upload className="w-4 h-4" />
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
      </div>
    </div>
  );
}