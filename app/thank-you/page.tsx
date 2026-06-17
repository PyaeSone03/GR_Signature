'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Gift, Phone } from "lucide-react";

const PRIMARY = "#F3BE65";
const TEXT_DARK = "#000000";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: PRIMARY }}>
      <div className="max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Content */}
        <p className="text-xs font-medium uppercase tracking-wider text-black/50">
          Thank You
        </p>
        
        <h1 className="mt-3 text-2xl font-light tracking-wide" style={{ color: TEXT_DARK }}>
          သင့်ရဲ့အကြံပြုချက်ကို ကျေးဇူးတင်ပါသည်
        </h1>
        
        <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: TEXT_DARK }} />
        
        {/* Reward Message */}
        <div className="mt-6 p-4 rounded-xl bg-black/5 border border-black/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift size={20} className="text-black/70" />
           
          </div>
          <p className="text-sm text-black/80 font-medium">
            We've sent you 1,000 Kyats to your phone number
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-black/50">
            <Phone size={14} />
            <span>09XXXXXXX</span>
          </div>
        </div>

        {/* Secondary Logo */}
        <div className="flex justify-center mt-8">
          <Image
            src="/images/KVFont.png"
            alt="KV Font Logo"
            width={180}
            height={180}
            className="object-contain opacity-60"
            priority
          />
        </div>

       
      </div>
    </div>
  );
}