import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SettingsContentProps {
  walletAddress?: string;
  onConnectWallet: () => void;
}

export function SettingsContent({ walletAddress, onConnectWallet }: SettingsContentProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    theme: "light",
    fontSize: "medium",
    email_notifications: {
      account_updates: true,
      task_updates: true,
      platform_news: true,
    },
    push_notifications: {
      new_tasks: true,
      platform_updates: true,
    },
    privacy_settings: {
      show_profile: true,
      show_stats: true,
      show_leaderboard: true,
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      if (data) {
        setSettings({
          theme: data.theme_preference,
          fontSize: data.font_size,
          email_notifications: data.email_notifications,
          push_notifications: data.push_notifications,
          privacy_settings: data.privacy_settings,
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    }
  };

  const updateSettings = async (newSettings: Partial<typeof settings>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from("user_settings")
        .upsert({
          id: session.user.id,
          theme_preference: newSettings.theme ?? settings.theme,
          font_size: newSettings.fontSize ?? settings.fontSize,
          email_notifications: newSettings.email_notifications ?? settings.email_notifications,
          push_notifications: newSettings.push_notifications ?? settings.push_notifications,
          privacy_settings: newSettings.privacy_settings ?? settings.privacy_settings,
        });

      if (error) throw error;

      setSettings((prev) => ({ ...prev, ...newSettings }));
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue="account" className="w-full animate-fade-in-up">
      <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
        <TabsTrigger
          value="account"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="appearance"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white"
        >
          Appearance
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white"
        >
          Privacy
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="account" className="space-y-4">
          <AccountSettings
            walletAddress={walletAddress}
            onConnectWallet={onConnectWallet}
            onUpdateProfile={() => {}}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings
            settings={{
              email: settings.email_notifications,
              push: settings.push_notifications,
            }}
            onUpdateSettings={(newSettings) => {
              updateSettings({
                email_notifications: newSettings.email,
                push_notifications: newSettings.push,
              });
            }}
          />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings
            theme={settings.theme}
            fontSize={settings.fontSize}
            onUpdateTheme={(theme) => updateSettings({ theme })}
            onUpdateFontSize={(fontSize) => updateSettings({ fontSize })}
          />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings
            settings={settings.privacy_settings}
            onUpdateSettings={(privacy_settings) => updateSettings({ privacy_settings })}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}