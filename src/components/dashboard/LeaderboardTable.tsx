import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaderboardEntry {
  rank: number;
  avatar: string;
  username: string;
  tasksCompleted: number;
  rewardsEarned: string;
  badge: string;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="rounded-lg bg-dtoad-secondary/20 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-dtoad-text/70 font-bold text-lg">Rank</TableHead>
            <TableHead className="text-dtoad-text/70 font-bold text-lg">Avatar</TableHead>
            <TableHead className="text-dtoad-text/70 font-bold text-lg">Username</TableHead>
            <TableHead className="text-dtoad-text/70 font-bold text-lg">Tasks Completed</TableHead>
            <TableHead className="text-dtoad-text/70 font-bold text-lg">Rewards Earned</TableHead>
            <TableHead className="text-dtoad-text/70 font-bold text-lg">Badge</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.rank} className="hover:bg-dtoad-secondary/30 transition-colors">
              <TableCell className="font-extrabold text-xl text-dtoad-text">{entry.rank}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>{entry.username[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-bold text-lg text-dtoad-text">{entry.username}</TableCell>
              <TableCell className="font-bold text-lg text-dtoad-text">{entry.tasksCompleted}</TableCell>
              <TableCell className="font-extrabold text-lg text-dtoad-primary">{entry.rewardsEarned}</TableCell>
              <TableCell className="font-bold text-lg text-dtoad-text">{entry.badge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}