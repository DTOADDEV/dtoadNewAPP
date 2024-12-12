import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, MinusCircle } from "lucide-react";

export interface SocialLink {
  [key: string]: string; // This makes it compatible with Json type
  platform: string;
  url: string;
}

interface SocialMediaLinksProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

const SOCIAL_PLATFORMS = [
  "X (Twitter)",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "TikTok",
  "Other",
];

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  links,
  onChange,
}) => {
  const handleAddLink = () => {
    onChange([...links, { platform: "", url: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks);
  };

  const handleLinkChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(newLinks);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-4">
      <Label>Social Media Links</Label>
      {links.map((link, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-1">
            <Select
              value={link.platform}
              onValueChange={(value) =>
                handleLinkChange(index, "platform", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {SOCIAL_PLATFORMS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-[2]">
            <Input
              type="url"
              value={link.url}
              onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              placeholder="Enter social media URL"
              className={!validateUrl(link.url) && link.url ? "border-red-500" : ""}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveLink(index)}
          >
            <MinusCircle className="h-5 w-5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={handleAddLink}
        className="w-full flex items-center justify-center gap-2"
      >
        <PlusCircle className="h-5 w-5" />
        Add Social Link
      </Button>
    </div>
  );
};