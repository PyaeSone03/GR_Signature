'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Gift, Phone } from "lucide-react";

const PRIMARY = "#262F65";
const TEXT_WHITE = "#ffffff";
const TEXT_GOLD = "#fcb335";
const CARD_BG = "rgba(252, 179, 53, 0.06)";
const BORDER_COLOR = "rgba(252, 179, 53, 0.15)";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: PRIMARY }}>
      <div className="max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logoo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Content */}
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: TEXT_GOLD }}>
          Thank You
        </p>
        
        <h1 className="mt-3 text-2xl font-light tracking-wide" style={{ color: TEXT_WHITE }}>
          သင့်ရဲ့အကြံပြုချက်ကို ကျေးဇူးတင်ပါသည်
        </h1>
        
        <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: TEXT_GOLD }} />
        
        {/* Reward Message */}
        <div className="mt-6 p-4 rounded-xl border" style={{ 
          backgroundColor: CARD_BG,
          borderColor: BORDER_COLOR 
        }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift size={20} style={{ color: TEXT_GOLD }} />
          </div>
          <p className="text-sm font-medium" style={{ color: TEXT_WHITE }}>
            သင့်ဖုန်းနံပါတ်သို့ ကျပ် ၁၀၀၀ ပေးပို့ထားပါသည်
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs" style={{ color: TEXT_GOLD }}>
            <Phone size={14} />
            <span>09XXXXXXX</span>
          </div>
        </div>
      </div>
    </div>
  );
}