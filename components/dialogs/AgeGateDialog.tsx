'use client';

import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PRIMARY = "#f3bf655e";

interface AgeGateDialogProps {
  onConfirm: () => void;
  onDecline: () => void;
}

export function AgeGateDialog({ onConfirm, onDecline }: AgeGateDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: PRIMARY }}>
        {/* Header */}
        <div className="flex flex-col items-center justify-center px-6 pt-8 pb-4">
          <div className="mb-3">
            <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center">
              <AlertTriangle size={32} className="text-black" />
            </div>
          </div>
          <h2 className="text-xl font-light tracking-wider text-center text-black">
            AGE VERIFICATION
          </h2>
          <div className="w-12 h-0.5 mt-2 bg-black" />
          <p className="text-sm text-center mt-3 text-black/70">
            Please confirm you are 18 or older to continue.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8 space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-6 text-sm font-medium tracking-wider transition-all duration-200 rounded-xl hover:scale-[1.02]"
            style={{
              backgroundColor: "black",
              color: "#f3bf65",
            }}
          >
            YES, I'M 18 OR OLDER
          </button>
          <button
            onClick={onDecline}
            className="w-full py-3 px-6 text-sm font-medium tracking-wider transition-all duration-200 rounded-xl hover:bg-black/5"
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: `1px solid black`,
            }}
          >
            No, take me back
          </button>
        </div>
      </div>
    </div>
  );
}