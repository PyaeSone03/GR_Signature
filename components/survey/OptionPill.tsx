'use client';

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRIMARY = "#262F65";
const TEXT_GOLD = "#fcb335";

interface OptionPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionPill({ label, selected, onClick }: OptionPillProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center justify-between ${
        selected 
          ? 'bg-[#fcb335] text-[#262F65]' 
          : ''
      }`}
      style={{
        backgroundColor: selected ? '#fcb335' : 'rgba(252, 179, 53, 0.05)',
        color: selected ? PRIMARY : TEXT_GOLD,
      }}
    >
      <span>{label}</span>
      {selected && <Check size={16} style={{ color: PRIMARY }} />}
    </button>
  );
}