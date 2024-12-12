import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AppearanceSettingsProps {
  theme: string;
  fontSize: string;
  onUpdateTheme: (theme: string) => void;
  onUpdateFontSize: (size: string) => void;
}

export function AppearanceSettings({
  theme,
  fontSize,
  onUpdateTheme,
  onUpdateFontSize,
}: AppearanceSettingsProps) {
  return (
    <div className="space-y-4">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={onUpdateTheme} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={fontSize} onValueChange={onUpdateFontSize} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large">Large</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}