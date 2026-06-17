'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { AgeGateDialog } from "@/components/dialogs/AgeGateDialog";
import { ThanksDialog } from "@/components/dialogs/ThanksDialog";
import { QuestionCard } from "@/components/survey/QuestionCard";
import { REGIONS_AND_STATES } from "@/lib/myanmar-data";

const PRIMARY = "#262F65";
const PRIMARY_DARK = "#1A214A";
const PRIMARY_LIGHT = "#3A4590";
const CARD_BG = "#2A346B";
const CARD_BG_HOVER = "#323D7A";
const BORDER_COLOR = "rgba(252, 179, 53, 0.12)";
const PROGRESS_BG = "rgba(252, 179, 53, 0.15)";
const TEXT_GOLD = "#fcb335";

const QUESTIONS = [
  {
    id: "name",
    type: "text",
    text: "အမည်",
    placeholder: "သင့်အမည်အပြည့်အစုံ ထည့်ပါ",
    required: true,
  },
  {
    id: "age",
    type: "single",
    text: "အသက်အပိုင်းအခြား",
    options: ["၁၈-၂၀", "၂၁-၃၀", "၃၁-၄၀", "၄၁-၅၀", "၅၀+"],
    required: true,
  },
  {
    id: "gender",
    type: "single",
    text: "လိင်",
    options: ["အမျိုးသား", "အမျိုးသမီး", "အခြား", "ဖြေကြားလိုမည်မဟုတ်"],
    required: true,
  },
  {
    id: "phone",
    type: "phone",
    text: "ဖုန်းနံပါတ်",
    placeholder: "09XXXXXXXX",
    required: true,
  },
  {
    id: "location",
    type: "location",
    text: "သင့်ဒေသ",
    regionPlaceholder: "ပြည်နယ် / တိုင်း ရွေးချယ်ပါ",
    townshipPlaceholder: "မြို့နယ် ရွေးချယ်ပါ",
    required: true,
  },
];

export default function SurveyLanding() {
  const router = useRouter();
  const [ageVerified, setAgeVerified] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showThanksDialog, setShowThanksDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [availableTownships, setAvailableTownships] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (answers.region) {
      const townships = REGIONS_AND_STATES[answers.region as keyof typeof REGIONS_AND_STATES] || [];
      setAvailableTownships(townships);
      if (answers.township) {
        setAnswer("township", "");
      }
    }
  }, [answers.region]);

  const setAnswer = (id: string, value: any) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const isAnswered = (q: any) => {
    const a = answers[q.id];
    if (q.required) {
      return a !== undefined && a !== null && a !== "";
    }
    return true;
  };

  // Special check for location question
  const isLocationAnswered = () => {
    return answers.region && answers.region !== "" && answers.township && answers.township !== "";
  };

  const answeredCount = QUESTIONS.filter((q) => {
    if (q.id === "location") {
      return isLocationAnswered();
    }
    return isAnswered(q);
  }).length;
  
  const allAnswered = answeredCount === QUESTIONS.length;
  const progress = answeredCount / QUESTIONS.length;

  const handleSubmit = () => {
    if (allAnswered) {
      const existingResponses = JSON.parse(localStorage.getItem('survey-responses') || '[]');
      const newResponse = {
        id: Date.now().toString(),
        responses: answers,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('survey-responses', JSON.stringify([...existingResponses, newResponse]));
      setShowThanksDialog(true);
    }
  };

  if (!mounted) return null;

  if (declined) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: PRIMARY }}>
        <p style={{ color: TEXT_GOLD }}>ဆက်လက်လုပ်ဆောင်ရန် အသက် ၁၈ နှစ်ပြည့်ပြီးဖြစ်ရပါမည်။ နားလည်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: PRIMARY }}>
      {!ageVerified && (
        <AgeGateDialog onConfirm={() => setAgeVerified(true)} onDecline={() => setDeclined(true)} />
      )}

      <div className={!ageVerified ? "pointer-events-none select-none blur-sm" : ""}>
        {/* Hero Section - Minimal */}
        <div className="px-6 py-10 text-center">
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
            <div className="mb-3">
              <Image
                src="/images/logo-v2.png"
                alt="Logo"
                width={160}
                height={120}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-light tracking-wide" style={{ color: TEXT_GOLD }}>
              သင့်အမြင်ကို မျှဝေပါ
            </h1>
            <p className="text-sm mt-1.5 font-light tracking-wider" style={{ color: TEXT_GOLD }}>
              ကျွန်ုပ်တို့ကို အကောင်းဆုံးဖန်တီးပေးပါ
            </p>
          </div>
        </div>

        {/* Progress Bar - Clean */}
        <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: PRIMARY_DARK, borderColor: PRIMARY_LIGHT }}>
          <div className="mx-auto max-w-2xl px-6 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-wider" style={{ color: TEXT_GOLD }}>
                  {answeredCount} / {QUESTIONS.length}
                </span>
                <div className="w-32 h-1 rounded-full overflow-hidden" style={{ backgroundColor: PROGRESS_BG }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress * 100}%`, backgroundColor: TEXT_GOLD }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {QUESTIONS.map((q, i) => {
                  const isAnswered_q = q.id === "location" ? isLocationAnswered() : isAnswered(q);
                  return (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        isAnswered_q ? 'bg-[#fcb335]' : 'bg-[#fcb335]/30'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Questions - Dark/Gray Cards */}
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => {
              const isAnswered_q = q.id === "location" ? isLocationAnswered() : isAnswered(q);
              return (
                <div
                  key={q.id}
                  className="rounded-xl p-5 border"
                  style={{
                    backgroundColor: CARD_BG,
                    borderColor: BORDER_COLOR,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {isAnswered_q ? (
                        <CheckCircle2 size={16} style={{ color: TEXT_GOLD }} />
                      ) : (
                        <Circle size={16} style={{ color: TEXT_GOLD }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <QuestionCard
                        index={i}
                        question={q}
                        answer={answers}
                        onAnswer={(id: string, val: any) => setAnswer(id, val)}
                        availableOptions={
                          q.id === "location" 
                            ? Object.keys(REGIONS_AND_STATES)
                            : []
                        }
                        availableTownships={availableTownships}
                        totalQuestions={QUESTIONS.length}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              disabled={!allAnswered}
              onClick={handleSubmit}
              className="w-full py-3.5 px-6 text-sm font-medium tracking-wide rounded-xl flex items-center justify-center gap-2"
              style={{
                backgroundColor: allAnswered ? TEXT_GOLD : "#1A214A",
                color: allAnswered ? PRIMARY : "rgba(252, 179, 53, 0.5)",
                cursor: allAnswered ? "pointer" : "default",
                border: allAnswered ? "none" : `1px solid ${BORDER_COLOR}`,
              }}
            >
              တင်သွင်းမည်
              <ChevronRight size={18} className={allAnswered ? "opacity-100" : "opacity-50"} />
            </button>
            {!allAnswered && (
              <p className="text-xs text-center mt-3 tracking-wider" style={{ color: TEXT_GOLD }}>
                မေးခွန်းအားလုံးကို ဖြေဆိုပြီးမှ တင်သွင်းပါ
              </p>
            )}
          </div>
        </div>
      </div>

      {showThanksDialog && (
        <ThanksDialog
          onContinue={() => {
            setShowThanksDialog(false);
            router.push("/thank-you");
          }}
        />
      )}
    </div>
  );
}