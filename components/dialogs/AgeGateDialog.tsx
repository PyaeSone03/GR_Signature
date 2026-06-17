'use client';

import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PRIMARY = "#262F65";
const PRIMARY_LIGHT = "#3A4590";
const TEXT_GOLD = "#fcb335";
const BORDER_COLOR = "rgba(252, 179, 53, 0.15)";

interface AgeGateDialogProps {
  onConfirm: () => void;
  onDecline: () => void;
}

export function AgeGateDialog({ onConfirm, onDecline }: AgeGateDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border" 
        style={{ 
          backgroundColor: PRIMARY,
          borderColor: BORDER_COLOR
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center px-6 pt-8 pb-4">
          <div className="mb-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(252, 179, 53, 0.1)' }}>
              <AlertTriangle size={32} style={{ color: TEXT_GOLD }} />
            </div>
          </div>
          <h2 className="text-xl font-light tracking-wider text-center" style={{ color: TEXT_GOLD }}>
            AGE VERIFICATION
          </h2>
          <div className="w-12 h-0.5 mt-2" style={{ backgroundColor: TEXT_GOLD }} />
          <p className="text-sm text-center mt-3" style={{ color: TEXT_GOLD }}>
            Please confirm you are 18 or older to continue.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8 space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-6 text-sm font-medium tracking-wider transition-all duration-200 rounded-xl hover:scale-[1.02]"
            style={{
              backgroundColor: TEXT_GOLD,
              color: PRIMARY,
            }}
          >
            YES, I'M 18 OR OLDER
          </button>
          <button
            onClick={onDecline}
            className="w-full py-3 px-6 text-sm font-medium tracking-wider transition-all duration-200 rounded-xl hover:bg-white/5"
            style={{
              backgroundColor: "transparent",
              color: TEXT_GOLD,
              border: `1px solid ${BORDER_COLOR}`,
            }}
          >
            No, take me back
          </button>
        </div>
      </div>
    </div>
  );
}