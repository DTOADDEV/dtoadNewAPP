import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet2 } from "lucide-react";
import { useState } from "react";

interface AccountSettingsProps {
  username?: string;
  email?: string;
  walletAddress?: string;
  onConnectWallet: () => void;
  onUpdateProfile: (data: { username?: string; email?: string }) => void;
}

export function AccountSettings({
  username,
  email,
  walletAddress,
  onConnectWallet,
  onUpdateProfile,
}: AccountSettingsProps) {
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      username: editedUsername,
      email: editedEmail,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={editedUsername}
              onChange={(e) => setEditedUsername(e.target.value)}
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="bg-white/50"
            />
          </div>
          <Button type="submit" className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {walletAddress ? (
            <div className="flex items-center space-x-2 bg-white/50 p-3 rounded-lg">
              <Wallet2 className="h-4 w-4 text-dtoad-primary" />
              <span className="font-mono text-sm">
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </span>
            </div>
          ) : (
            <Button onClick={onConnectWallet} className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90">
              <Wallet2 className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          )}
        </CardContent>
      </Card>
    </form>
  );
}