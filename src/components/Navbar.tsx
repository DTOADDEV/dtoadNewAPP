import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-dtoad-background/80 backdrop-blur-lg border-b border-dtoad-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-dtoad-primary to-dtoad-accent bg-clip-text text-transparent">
                DToad
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#tasks">Tasks</NavLink>
                <NavLink href="#news">News</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="outline" className="mr-3">
                Login
              </Button>
              <Button className="bg-dtoad-primary hover:bg-dtoad-primary/90">
                Sign Up
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-dtoad-text hover:text-dtoad-primary focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#tasks">Tasks</MobileNavLink>
            <MobileNavLink href="#news">News</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-dtoad-primary/20">
            <div className="px-2 space-y-1">
              <Button
                variant="outline"
                className="w-full mb-2 text-center justify-center"
              >
                Login
              </Button>
              <Button className="w-full bg-dtoad-primary hover:bg-dtoad-primary/90 text-center justify-center">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-dtoad-text-secondary hover:text-dtoad-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-dtoad-text-secondary hover:text-dtoad-primary block px-3 py-2 rounded-md text-base font-medium"
  >
    {children}
  </a>
);