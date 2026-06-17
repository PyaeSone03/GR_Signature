'use client';

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OptionPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionPill({ label, selected, onClick }: OptionPillProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between ${
        selected 
          ? 'bg-black text-white' 
          : 'bg-white/20 text-black hover:bg-white/30'
      }`}
    >
      <span>{label}</span>
      {selected && <Check size={16} className="text-white" />}
    </button>
  );
}