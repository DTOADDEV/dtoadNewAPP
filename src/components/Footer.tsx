import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with a newsletter service
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our newsletter at " + email,
    });
    setEmail("");
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/dtoad", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/dtoad", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/dtoad", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/dtoad", label: "LinkedIn" },
    { icon: Send, href: "https://t.me/dtoad", label: "Telegram" },
  ];

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dtoad-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-dtoad-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-dtoad-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-dtoad-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-dtoad-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-dtoad-primary">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@dtoad.com" className="hover:text-dtoad-primary transition-colors">
                  support@dtoad.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-dtoad-primary">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-xs"
                  required
                />
                <Button type="submit" variant="default">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-dtoad-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">© 2024 DToad. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}