import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface Announcement {
  title: string;
  description: string;
  date: string;
}

interface AnnouncementCardProps {
  announcements: Announcement[];
}

export function AnnouncementCard({ announcements }: AnnouncementCardProps) {
  return (
    <Card className="bg-dtoad-secondary/20 border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-dtoad-text">Community Announcements</CardTitle>
        <Bell className="h-5 w-5 text-dtoad-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-dtoad-text">{announcement.title}</h3>
              <p className="text-sm text-dtoad-text/70">{announcement.description}</p>
              <p className="text-xs text-dtoad-text/60">{announcement.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}