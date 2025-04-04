
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { School, CheckCircle, Monitor, Shield, PenTool, Clock } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Map of icon names to their respective Lucide React components
export const IconMap = {
  School,
  CheckCircle,
  Monitor,
  Shield,
  PenTool,
  Clock,
};
