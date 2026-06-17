'use client';

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PRIMARY = "#F3BE65";
const PRIMARY_DARK = "#D4A04A";
const TEXT_DARK = "#2D1B00";

interface ThanksDialogProps {
  onContinue: () => void;
}

export function ThanksDialog({ onContinue }: ThanksDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: PRIMARY }}>
        {/* Header */}
        <div className="flex flex-col items-center justify-center px-6 pt-8 pb-4">
          <div className="mb-3">
            <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-black" />
            </div>
          </div>
          <h2 className="text-2xl font-light tracking-wider text-center" style={{ color: TEXT_DARK }}>
            THANK YOU!
          </h2>
          <div className="w-12 h-0.5 mt-2" style={{ backgroundColor: TEXT_DARK }} />
          <p className="text-sm text-center mt-3 text-black/70">
            Your response has been recorded. We appreciate your feedback!
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8">
          <button
            onClick={onContinue}
            className="w-full py-3 px-6 text-sm font-medium tracking-wider transition-all duration-200 rounded-xl hover:scale-[1.02]"
            style={{
              backgroundColor: TEXT_DARK,
              color: PRIMARY,
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}