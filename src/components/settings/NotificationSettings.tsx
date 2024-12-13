import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSettings {
  email: {
    account_updates: boolean;
    task_updates: boolean;
    platform_news: boolean;
  };
  push: {
    new_tasks: boolean;
    platform_updates: boolean;
  };
}

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onUpdateSettings: (settings: NotificationSettings) => void;
}

export function NotificationSettings({ settings, onUpdateSettings }: NotificationSettingsProps) {
  const handleEmailToggle = (key: keyof typeof settings.email) => {
    onUpdateSettings({
      ...settings,
      email: {
        ...settings.email,
        [key]: !settings.email[key],
      },
    });
  };

  const handlePushToggle = (key: keyof typeof settings.push) => {
    onUpdateSettings({
      ...settings,
      push: {
        ...settings.push,
        [key]: !settings.push[key],
      },
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-dtoad-background-dark/50 backdrop-blur-sm border-dtoad-primary/20">
        <CardHeader>
          <CardTitle className="text-dtoad-text">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="account-updates" className="text-dtoad-text">Account Updates</Label>
            <Switch
              id="account-updates"
              checked={settings.email.account_updates}
              onCheckedChange={() => handleEmailToggle("account_updates")}
              className="data-[state=checked]:bg-dtoad-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="task-updates" className="text-dtoad-text">Task Updates</Label>
            <Switch
              id="task-updates"
              checked={settings.email.task_updates}
              onCheckedChange={() => handleEmailToggle("task_updates")}
              className="data-[state=checked]:bg-dtoad-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="platform-news" className="text-dtoad-text">Platform News</Label>
            <Switch
              id="platform-news"
              checked={settings.email.platform_news}
              onCheckedChange={() => handleEmailToggle("platform_news")}
              className="data-[state=checked]:bg-dtoad-primary"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-dtoad-background-dark/50 backdrop-blur-sm border-dtoad-primary/20">
        <CardHeader>
          <CardTitle className="text-dtoad-text">Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="new-tasks" className="text-dtoad-text">New Tasks</Label>
            <Switch
              id="new-tasks"
              checked={settings.push.new_tasks}
              onCheckedChange={() => handlePushToggle("new_tasks")}
              className="data-[state=checked]:bg-dtoad-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="platform-updates" className="text-dtoad-text">Platform Updates</Label>
            <Switch
              id="platform-updates"
              checked={settings.push.platform_updates}
              onCheckedChange={() => handlePushToggle("platform_updates")}
              className="data-[state=checked]:bg-dtoad-primary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}