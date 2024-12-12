import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet2 } from "lucide-react";

interface ProfileContentProps {
  bio: string;
  isEditing: boolean;
  editedBio: string;
  onBioChange: (value: string) => void;
  onSaveBio: () => void;
  onEditToggle: () => void;
}

export function ProfileContent({
  bio,
  isEditing,
  editedBio,
  onBioChange,
  onSaveBio,
  onEditToggle,
}: ProfileContentProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader>
        <CardTitle>Bio</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editedBio}
              onChange={(e) => onBioChange(e.target.value)}
              placeholder="Write something about yourself..."
              className="bg-white/50"
            />
            <div className="flex space-x-2">
              <Button onClick={onSaveBio} className="bg-dtoad-primary hover:bg-dtoad-primary/90">
                Save
              </Button>
              <Button variant="outline" onClick={onEditToggle}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">{bio || "No bio yet"}</p>
            <Button variant="outline" onClick={onEditToggle}>
              Edit Bio
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}