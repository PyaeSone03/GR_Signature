'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OptionPill } from "./OptionPill";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Color constants with gold theme
const TEXT_GOLD = "#fcb335";
const INPUT_BG = "rgba(252, 179, 53, 0.06)";
const INPUT_BORDER = "rgba(252, 179, 53, 0.15)";
const INPUT_FOCUS = "#fcb335";
const SELECT_BG = "#2A346B";
const PLACEHOLDER_COLOR = "rgba(252, 179, 53, 0.5)";

interface QuestionCardProps {
  index: number;
  question: any;
  answer: any;
  onAnswer: (id: string, value: any) => void;
  availableOptions?: string[];
  availableTownships?: string[];
  totalQuestions: number;
}

export function QuestionCard({ 
  index, 
  question, 
  answer, 
  onAnswer, 
  availableOptions = [], 
  availableTownships = [],
  totalQuestions 
}: QuestionCardProps) {
  // Get the phone value from the answer object
  const phoneValue = answer?.phone || "";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters
    const digits = e.target.value.replace(/\D/g, '');
    
    // Limit to 9 digits (Myanmar phone numbers are 9 digits)
    const limited = digits.slice(0, 9);
    
    // Store just the digits without any prefix
    onAnswer('phone', limited);
  };

  // Render phone input
  if (question.type === "phone") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: TEXT_GOLD }}>
            {question.text}
          </p>
          {question.required && (
            <span className="text-xs font-medium" style={{ color: TEXT_GOLD }}>
              REQUIRED
            </span>
          )}
        </div>
        <div className="relative">
          <Input
            type="tel"
            value={phoneValue}
            onChange={handlePhoneChange}
            placeholder={question.placeholder}
            className="w-full h-11 pl-14 rounded-lg text-sm focus:ring-0"
            style={{
              backgroundColor: INPUT_BG,
              borderColor: INPUT_BORDER,
              color: TEXT_GOLD,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = INPUT_FOCUS;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = INPUT_BORDER;
            }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: PLACEHOLDER_COLOR }}>
            +959
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: PLACEHOLDER_COLOR }}>
          ဥပမာ: 912345678
        </p>
      </div>
    );
  }

  // Render location (region + township combined)
  if (question.type === "location") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: TEXT_GOLD }}>
            {question.text}
          </p>
          {question.required && (
            <span className="text-xs font-medium" style={{ color: TEXT_GOLD }}>
              REQUIRED
            </span>
          )}
        </div>
        <div className="space-y-3">
          <Select 
            value={answer?.region || ""} 
            onValueChange={(val) => onAnswer('region', val)}
          >
            <SelectTrigger 
              className="w-full h-11 rounded-lg text-sm focus:ring-0"
              style={{
                backgroundColor: INPUT_BG,
                borderColor: INPUT_BORDER,
                color: TEXT_GOLD,
              }}
            >
              <SelectValue placeholder="ပြည်နယ် / တိုင်း ရွေးချယ်ပါ" />
            </SelectTrigger>
            <SelectContent 
              className="rounded-lg border"
              style={{
                backgroundColor: SELECT_BG,
                borderColor: INPUT_BORDER,
                color: TEXT_GOLD,
              }}
            >
              <SelectGroup>
                {availableOptions.map((opt: string) => (
                  <SelectItem 
                    key={opt} 
                    value={opt}
                    className="text-sm"
                    style={{ color: TEXT_GOLD }}
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select 
            value={answer?.township || ""} 
            onValueChange={(val) => onAnswer('township', val)}
            disabled={!answer?.region}
          >
            <SelectTrigger 
              className={`w-full h-11 rounded-lg text-sm focus:ring-0 ${
                !answer?.region ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{
                backgroundColor: INPUT_BG,
                borderColor: INPUT_BORDER,
                color: TEXT_GOLD,
              }}
            >
              <SelectValue placeholder="မြို့နယ် ရွေးချယ်ပါ" />
            </SelectTrigger>
            <SelectContent 
              className="rounded-lg border"
              style={{
                backgroundColor: SELECT_BG,
                borderColor: INPUT_BORDER,
                color: TEXT_GOLD,
              }}
            >
              <SelectGroup>
                {availableTownships.map((opt: string) => (
                  <SelectItem 
                    key={opt} 
                    value={opt}
                    className="text-sm"
                    style={{ color: TEXT_GOLD }}
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  // Render regular text input (name)
  if (question.type === "text") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: TEXT_GOLD }}>
            {question.text}
          </p>
          {question.required && (
            <span className="text-xs font-medium" style={{ color: TEXT_GOLD }}>
              REQUIRED
            </span>
          )}
        </div>
        <Input
          type="text"
          value={answer?.name || ""}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full h-11 rounded-lg text-sm focus:ring-0"
          style={{
            backgroundColor: INPUT_BG,
            borderColor: INPUT_BORDER,
            color: TEXT_GOLD,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = INPUT_FOCUS;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = INPUT_BORDER;
          }}
        />
      </div>
    );
  }

  // Render single select (age, gender)
  if (question.type === "single") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: TEXT_GOLD }}>
            {question.text}
          </p>
          {question.required && (
            <span className="text-xs font-medium" style={{ color: TEXT_GOLD }}>
              REQUIRED
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {question.options.map((opt: string) => (
            <OptionPill 
              key={opt} 
              label={opt} 
              selected={answer?.[question.id] === opt} 
              onClick={() => onAnswer(question.id, opt)} 
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}