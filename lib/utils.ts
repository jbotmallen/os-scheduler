import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomDarkColor = () => {
  const r = Math.floor(Math.random() * 100); // Limit red to lower values
  const g = Math.floor(Math.random() * 100); // Limit green to lower values
  const b = Math.floor(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getPercentage = (value: number, total: number) => {
  return (value / total) * 100;
};