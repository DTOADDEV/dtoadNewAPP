import { Link } from "react-router-dom";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ href, children, className = "" }: NavLinkProps) => (
  <Link
    to={href}
    className={`text-dtoad-text-secondary hover:text-dtoad-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors ${className}`}
  >
    {children}
  </Link>
);