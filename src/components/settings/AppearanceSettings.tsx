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
      <Card className="bg-dtoad-background-dark/50 backdrop-blur-sm border-dtoad-primary/20">
        <CardHeader>
          <CardTitle className="text-dtoad-text">Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={onUpdateTheme} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" className="border-dtoad-primary text-dtoad-primary" />
              <Label htmlFor="light" className="text-dtoad-text">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" className="border-dtoad-primary text-dtoad-primary" />
              <Label htmlFor="dark" className="text-dtoad-text">Dark</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-dtoad-background-dark/50 backdrop-blur-sm border-dtoad-primary/20">
        <CardHeader>
          <CardTitle className="text-dtoad-text">Font Size</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={fontSize} onValueChange={onUpdateFontSize} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="small" className="border-dtoad-primary text-dtoad-primary" />
              <Label htmlFor="small" className="text-dtoad-text">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" className="border-dtoad-primary text-dtoad-primary" />
              <Label htmlFor="medium" className="text-dtoad-text">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="large" className="border-dtoad-primary text-dtoad-primary" />
              <Label htmlFor="large" className="text-dtoad-text">Large</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}