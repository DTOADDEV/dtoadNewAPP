import { Link } from "react-router-dom";

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const MobileNavLink = ({ href, children, onClick }: MobileNavLinkProps) => (
  <Link
    to={href}
    onClick={onClick}
    className="text-dtoad-text-secondary hover:text-dtoad-primary block px-3 py-2 rounded-md text-base font-semibold"
  >
    {children}
  </Link>
);