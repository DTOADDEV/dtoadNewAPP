import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const newsItems = [
  {
    title: "Latest Tasks Added",
    description: "Check out the newest opportunities on our platform!",
    date: "2024-03-20",
  },
  {
    title: "Platform Update",
    description: "New features released to enhance your experience.",
    date: "2024-03-19",
  },
  {
    title: "Community Milestone",
    description: "We've reached 5,000 active users!",
    date: "2024-03-18",
  },
  {
    title: "Task Highlights",
    description: "See which tasks are trending this week.",
    date: "2024-03-17",
  },
  {
    title: "Success Stories",
    description: "Read about our community's achievements.",
    date: "2024-03-16",
  },
  {
    title: "Upcoming Features",
    description: "Exciting new features coming soon!",
    date: "2024-03-15",
  },
  {
    title: "Community Guidelines",
    description: "Important updates to our platform rules.",
    date: "2024-03-14",
  },
];

export default function News() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dtoad-text mb-2 flex items-center gap-2">
          <Newspaper className="h-8 w-8 text-dtoad-primary" />
          Platform News & Updates
        </h1>
        <p className="text-dtoad-text-secondary">Stay updated with the latest from DToad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item, index) => (
          <Card key={index} className="bg-dtoad-background-light/20 border-dtoad-primary/20 hover:bg-dtoad-background-light/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg text-dtoad-text">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-dtoad-text-secondary mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-dtoad-text/60">{item.date}</span>
                <button className="text-dtoad-primary hover:text-dtoad-accent transition-colors text-sm font-semibold">
                  Read More →
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}