import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTokenAmount(amount: number): string {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(0)}B $DTOAD`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)}M $DTOAD`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}k $DTOAD`;
  }
  return `${amount} $DTOAD`;
}