'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OptionPill } from "./OptionPill";
import { Input } from "@/components/ui/input";

interface QuestionCardProps {
  index: number;
  question: any;
  answer: any;
  onAnswer: (value: any) => void;
  availableOptions?: string[];
  totalQuestions: number;
}

export function QuestionCard({ index, question, answer, onAnswer, availableOptions = [], totalQuestions }: QuestionCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-black">
          {question.text}
        </p>
        {question.required && (
          <span className="text-xs font-medium text-black/50">REQUIRED</span>
        )}
      </div>
      
      <div className="space-y-2">
        {question.type === "text" && (
          <Input
            type="text"
            inputMode={question.inputMode || "text"}
            pattern={question.pattern || undefined}
            value={answer || ""}
            onChange={(e) => {
              // For phone number, only allow digits
              if (question.id === "phone") {
                const value = e.target.value.replace(/\D/g, '');
                onAnswer(value);
              } else {
                onAnswer(e.target.value);
              }
            }}
            placeholder={question.placeholder}
            className="w-full h-11 bg-white/20 border-white/30 rounded-lg text-sm text-black placeholder:text-black/40 focus:border-black/50 focus:ring-0"
          />
        )}

        {question.type === "single" && (
          <div className="grid grid-cols-1 gap-1.5">
            {question.options.map((opt: string) => (
              <OptionPill 
                key={opt} 
                label={opt} 
                selected={answer === opt} 
                onClick={() => onAnswer(opt)} 
              />
            ))}
          </div>
        )}

        {question.type === "select" && (
          <Select value={answer || ""} onValueChange={onAnswer}>
            <SelectTrigger className="w-full h-11 bg-white/20 border-white/30 rounded-lg text-sm text-black placeholder:text-black/40 focus:border-black/50 focus:ring-0">
              <SelectValue placeholder={question.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent 
              className="bg-white/95 backdrop-blur-sm border-white/30 rounded-lg"
              style={{ minWidth: '100%', width: 'auto' }}
            >
              <SelectGroup>
                {availableOptions.map((opt: string) => (
                  <SelectItem 
                    key={opt} 
                    value={opt}
                    className="text-sm hover:bg-black/5 focus:bg-black/5"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}