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

type EmailNotifications = {
  account_updates: boolean;
  task_updates: boolean;
  platform_news: boolean;
}

type PushNotifications = {
  new_tasks: boolean;
  platform_updates: boolean;
}

type PrivacySettings = {
  show_profile: boolean;
  show_stats: boolean;
  show_leaderboard: boolean;
}

type Settings = {
  theme: string;
  fontSize: string;
  email_notifications: EmailNotifications;
  push_notifications: PushNotifications;
  privacy_settings: PrivacySettings;
}

const defaultSettings: Settings = {
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
};

export function SettingsContent({ walletAddress, onConnectWallet }: SettingsContentProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      console.log("Loading settings...");
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.log("No session found");
        return;
      }

      console.log("Fetching settings for user:", session.user.id);
      let { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Error fetching settings:", error);
        if (error.code === "PGRST116") {
          console.log("No settings found, creating default settings");
          const { data: newSettings, error: insertError } = await supabase
            .from("user_settings")
            .insert([
              {
                id: session.user.id,
                theme_preference: defaultSettings.theme,
                font_size: defaultSettings.fontSize,
                email_notifications: defaultSettings.email_notifications,
                push_notifications: defaultSettings.push_notifications,
                privacy_settings: defaultSettings.privacy_settings,
              }
            ])
            .select()
            .single();

          if (insertError) {
            console.error("Error creating settings:", insertError);
            throw insertError;
          }
          
          console.log("Default settings created:", newSettings);
          data = newSettings;
        } else {
          throw error;
        }
      }

      if (data) {
        console.log("Settings loaded:", data);
        setSettings({
          theme: data.theme_preference,
          fontSize: data.font_size,
          email_notifications: data.email_notifications as EmailNotifications,
          push_notifications: data.push_notifications as PushNotifications,
          privacy_settings: data.privacy_settings as PrivacySettings,
        });
      }
    } catch (error) {
      console.error("Error in loadSettings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      console.log("Updating settings:", newSettings);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.log("No session found during update");
        return;
      }

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
      console.log("Settings updated successfully");
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
      <TabsList className="grid grid-cols-4 gap-4 bg-dtoad-background border border-dtoad-primary/20 rounded-lg p-1">
        <TabsTrigger
          value="account"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white text-dtoad-text"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white text-dtoad-text"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="appearance"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white text-dtoad-text"
        >
          Appearance
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="data-[state=active]:bg-dtoad-primary data-[state=active]:text-white text-dtoad-text"
        >
          Privacy
        </TabsTrigger>
      </TabsList>

      <div className="mt-6 bg-dtoad-background rounded-lg border border-dtoad-primary/20">
        <TabsContent value="account" className="p-6">
          <AccountSettings
            walletAddress={walletAddress}
            onConnectWallet={onConnectWallet}
            onUpdateProfile={() => {}}
          />
        </TabsContent>

        <TabsContent value="notifications" className="p-6">
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

        <TabsContent value="appearance" className="p-6">
          <AppearanceSettings
            theme={settings.theme}
            fontSize={settings.fontSize}
            onUpdateTheme={(theme) => updateSettings({ theme })}
            onUpdateFontSize={(fontSize) => updateSettings({ fontSize })}
          />
        </TabsContent>

        <TabsContent value="privacy" className="p-6">
          <PrivacySettings
            settings={settings.privacy_settings}
            onUpdateSettings={(privacy_settings) => updateSettings({ privacy_settings })}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}