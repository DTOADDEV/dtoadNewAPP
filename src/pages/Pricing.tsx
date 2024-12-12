import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Mail, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const handleCreateTask = (type: 'normal' | 'hot') => {
    navigate('/create-task', { state: { taskType: type } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-dtoad-text mb-2">Choose Your Task Type</h1>
        <p className="text-dtoad-text-secondary">Select the best option for your project's visibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Normal Task Card */}
        <Card className="bg-dtoad-secondary/20 border-none relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-dtoad-text">
              <Star className="h-5 w-5 text-dtoad-primary" />
              Normal Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold text-dtoad-text">$20</span>
              <span className="text-dtoad-text-secondary">/task</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="text-dtoad-text-secondary">✓ Standard visibility</li>
              <li className="text-dtoad-text-secondary">✓ Basic task listing</li>
              <li className="text-dtoad-text-secondary">✓ Community engagement</li>
            </ul>
            <Button 
              onClick={() => handleCreateTask('normal')}
              className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90"
            >
              Create Normal Task
            </Button>
          </CardContent>
        </Card>

        {/* Hot Task Card */}
        <Card className="bg-gradient-to-br from-dtoad-primary/20 to-dtoad-accent/20 border-none relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-dtoad-accent text-dtoad-secondary px-3 py-1 rounded-full text-sm font-semibold">
            Popular
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-dtoad-text">
              <Flame className="h-5 w-5 text-dtoad-accent" />
              Hot Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold text-dtoad-text">$50</span>
              <span className="text-dtoad-text-secondary">/task</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="text-dtoad-text-secondary">✓ Enhanced visibility</li>
              <li className="text-dtoad-text-secondary">✓ Featured listing</li>
              <li className="text-dtoad-text-secondary">✓ Social media promotion</li>
              <li className="text-dtoad-text-secondary">✓ Priority support</li>
            </ul>
            <Button 
              onClick={() => handleCreateTask('hot')}
              className="w-full bg-dtoad-accent hover:bg-dtoad-accent/90 text-dtoad-secondary"
            >
              Create Hot Task
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-dtoad-text mb-4">Need a Custom Solution?</h2>
        <p className="text-dtoad-text-secondary mb-4">
          Looking for a personalized promotion strategy? We can help!
        </p>
        <a 
          href="mailto:Info@dtoad.com"
          className="inline-flex items-center gap-2 text-dtoad-primary hover:text-dtoad-accent transition-colors"
        >
          <Mail className="h-5 w-5" />
          Contact us at Info@dtoad.com
        </a>
      </div>
    </div>
  );
}