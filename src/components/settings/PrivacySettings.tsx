import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PrivacySettings {
  show_profile: boolean;
  show_stats: boolean;
  show_leaderboard: boolean;
}

interface PrivacySettingsProps {
  settings: PrivacySettings;
  onUpdateSettings: (settings: PrivacySettings) => void;
}

export function PrivacySettings({ settings, onUpdateSettings }: PrivacySettingsProps) {
  const handleToggle = (key: keyof PrivacySettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-profile">Show Profile</Label>
          <Switch
            id="show-profile"
            checked={settings.show_profile}
            onCheckedChange={() => handleToggle("show_profile")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-stats">Show Stats</Label>
          <Switch
            id="show-stats"
            checked={settings.show_stats}
            onCheckedChange={() => handleToggle("show_stats")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-leaderboard">Show on Leaderboard</Label>
          <Switch
            id="show-leaderboard"
            checked={settings.show_leaderboard}
            onCheckedChange={() => handleToggle("show_leaderboard")}
          />
        </div>
      </CardContent>
    </Card>
  );
}