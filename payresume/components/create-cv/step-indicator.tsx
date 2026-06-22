"use client";

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

const steps = [
  { num: 1, label: "Data Diri" },
  { num: 2, label: "Pendidikan" },
  { num: 3, label: "Pengalaman" },
  { num: 4, label: "Skill" },
  { num: 5, label: "Preferensi" },
];

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="brutal-card p-4 mb-8 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[500px] md:min-w-0">
        {steps.map((step, i) => {
          const isActive = currentStep === step.num;
          const isCompleted = completedSteps.includes(step.num);

          return (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center border-3 border-black font-display font-bold text-sm transition-colors ${
                    isActive
                      ? "bg-yellow text-black shadow-brutal"
                      : isCompleted
                      ? "bg-black text-yellow"
                      : "bg-white text-black"
                  }`}
                >
                  {isCompleted && !isActive ? "✓" : step.num}
                </div>
                <span
                  className={`text-xs font-display font-medium whitespace-nowrap ${
                    isActive ? "text-black font-bold" : "text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-1 mx-1 border-t-2 ${
                    isCompleted ? "border-black" : "border-black/20"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
