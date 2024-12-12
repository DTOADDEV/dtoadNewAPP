import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  onClick: () => void;
}

export const Logo = ({ onClick }: LogoProps) => (
  <Link 
    to="/"
    onClick={onClick}
    className="flex items-center gap-1 cursor-pointer group"
  >
    <DollarSign className="h-8 w-8 text-dtoad-primary group-hover:text-dtoad-accent transition-colors" />
    <span className="text-3xl font-extrabold bg-gradient-to-r from-dtoad-primary to-dtoad-accent bg-clip-text text-transparent group-hover:from-dtoad-accent group-hover:to-dtoad-primary transition-all">
      $DTOAD
    </span>
  </Link>
);