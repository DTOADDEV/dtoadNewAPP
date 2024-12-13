import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileContent } from "./ProfileContent";
import { SettingsContent } from "./SettingsContent";

interface ProfileTabsProps {
  profile: any;
  onConnectWallet: () => void;
}

export function ProfileTabs({ profile, onConnectWallet }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="w-full bg-dtoad-background border border-dtoad-primary/20 rounded-full p-1">
        <TabsTrigger 
          value="profile" 
          className="flex-1 text-dtoad-text data-[state=active]:bg-dtoad-primary data-[state=active]:text-white transition-colors"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          className="flex-1 text-dtoad-text data-[state=active]:bg-dtoad-primary data-[state=active]:text-white transition-colors"
        >
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6 space-y-6 animate-fade-in-up">
        <ProfileContent profile={profile} />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <SettingsContent
          walletAddress={profile?.wallet_address}
          onConnectWallet={onConnectWallet}
        />
      </TabsContent>
    </Tabs>
  );
}