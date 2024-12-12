import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTokenAmount(amount: number): string {
  if (amount >= 1000000000) {
    const billions = amount / 1000000000;
    const formatted = billions >= 10 ? billions.toFixed(0) : billions.toFixed(1);
    return `${formatted}B $DTOAD`;
  }
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    const formatted = millions >= 10 ? millions.toFixed(0) : millions.toFixed(1);
    return `${formatted}M $DTOAD`;
  }
  if (amount >= 1000) {
    const thousands = amount / 1000;
    const formatted = thousands >= 10 ? thousands.toFixed(0) : thousands.toFixed(1);
    return `${formatted}K $DTOAD`;
  }
  return `${amount} $DTOAD`;
}