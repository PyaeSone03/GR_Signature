'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { AgeGateDialog } from "@/components/dialogs/AgeGateDialog";
import { ThanksDialog } from "@/components/dialogs/ThanksDialog";
import { QuestionCard } from "@/components/survey/QuestionCard";
import { REGIONS_AND_STATES } from "@/lib/myanmar-data";

const PRIMARY = "#F3BE65";
const PRIMARY_DARK = "#D4A04A";
const TEXT_DARK = "#000000";
const TEXT_LIGHT = "#6B7280";

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
    type: "text",
    text: "ဖုန်းနံပါတ်",
    placeholder: "ဥပမာ - ၀၉XXXXXX X",
    required: true,
  },
  {
    id: "region",
    type: "select",
    text: "ပြည်နယ် / တိုင်း",
    placeholder: "သင့်ပြည်နယ် သို့မဟုတ် တိုင်းကို ရွေးချယ်ပါ",
    required: true,
  },
  {
    id: "township",
    type: "select",
    text: "မြို့နယ်",
    placeholder: "သင့်မြို့နယ်ကို ရွေးချယ်ပါ",
    dependsOn: "region",
    required: true,
  },
];

export default function SurveyLanding() {
  const router = useRouter();
  const [ageVerified, setAgeVerified] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [answers, setAnswers] = useState({});
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

  const answeredCount = QUESTIONS.filter(isAnswered).length;
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
        <p style={{ color: TEXT_DARK }}>ဆက်လက်လုပ်ဆောင်ရန် အသက် ၁၈ နှစ်ပြည့်ပြီးဖြစ်ရပါမည်။ နားလည်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။</p>
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
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-light tracking-wide" style={{ color: TEXT_DARK }}>
              သင့်အမြင်ကို မျှဝေပါ
            </h1>
            <p className="text-sm mt-1.5 font-light tracking-wider opacity-70" style={{ color: TEXT_DARK }}>
              ကျွန်ုပ်တို့ကို အကောင်းဆုံးဖန်တီးပေးပါ
            </p>
          </div>
        </div>

        {/* Progress Bar - Clean */}
        <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: PRIMARY, borderColor: PRIMARY_DARK }}>
          <div className="mx-auto max-w-2xl px-6 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tracking-wider" style={{ color: TEXT_DARK }}>
                  {answeredCount} / {QUESTIONS.length}
                </span>
                <div className="w-32 h-1 rounded-full bg-white/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress * 100}%`, backgroundColor: TEXT_DARK }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {QUESTIONS.map((q, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isAnswered(q) ? 'bg-black' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Questions - Clean Cards */}
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 transition-all duration-200 hover:bg-white/15 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {isAnswered(q) ? (
                      <CheckCircle2 size={16} className="text-black" />
                    ) : (
                      <Circle size={16} className="text-black/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <QuestionCard
                      index={i}
                      question={q}
                      answer={answers[q.id]}
                      onAnswer={(val: any) => setAnswer(q.id, val)}
                      availableOptions={
                        q.id === "region" 
                          ? Object.keys(REGIONS_AND_STATES)
                          : q.id === "township"
                          ? availableTownships
                          : []
                      }
                      totalQuestions={QUESTIONS.length}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              disabled={!allAnswered}
              onClick={handleSubmit}
              className="w-full py-3.5 px-6 text-sm font-medium tracking-wide transition-all duration-200 rounded-xl flex items-center justify-center gap-2"
              style={{
                backgroundColor: allAnswered ? TEXT_DARK : "rgba(0,0,0,0.2)",
                color: allAnswered ? PRIMARY : "rgba(0,0,0,0.4)",
                cursor: allAnswered ? "pointer" : "default",
                border: allAnswered ? "none" : "1px solid rgba(0,0,0,0.1)",
              }}
            >
              တင်သွင်းမည်
              <ChevronRight size={18} className={allAnswered ? "opacity-100" : "opacity-30"} />
            </button>
            {!allAnswered && (
              <p className="text-xs text-center mt-3 tracking-wider text-black/50">
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