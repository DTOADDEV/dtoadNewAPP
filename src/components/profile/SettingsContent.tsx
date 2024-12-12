import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet2 } from "lucide-react";

interface SettingsContentProps {
  walletAddress?: string;
  referralCode?: string;
  onConnectWallet: () => void;
  onGenerateReferralCode: () => void;
}

export function SettingsContent({
  walletAddress,
  referralCode,
  onConnectWallet,
  onGenerateReferralCode,
}: SettingsContentProps) {
  return (
    <div className="space-y-4 animate-fade-in-up">
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

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Referral Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {referralCode ? (
            <div className="bg-white/50 p-3 rounded-lg">
              <code className="font-mono text-sm">{referralCode}</code>
            </div>
          ) : (
            <Button
              onClick={onGenerateReferralCode}
              className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90"
            >
              Generate Referral Code
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}