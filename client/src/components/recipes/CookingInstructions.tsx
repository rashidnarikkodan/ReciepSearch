import { useState } from 'react';
import { Check } from 'lucide-react';
import type { RecipeStep } from '../../types/recipe.types';

interface CookingInstructionsProps {
  steps?: RecipeStep[];
  instructions?: string;
  className?: string;
}

export function CookingInstructions({
  steps = [],
  instructions = '',
  className = '',
}: CookingInstructionsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNumber)) {
        next.delete(stepNumber);
      } else {
        next.add(stepNumber);
      }
      return next;
    });
  };

  const hasSteps = steps && steps.length > 0;

  return (
    <div className={className}>
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EBECE8]">
        <h2 className="text-base font-semibold text-[#242824]">Instructions</h2>
        {hasSteps && completedSteps.size > 0 && (
          <span className="text-xs text-[#737873]">
            {completedSteps.size} of {steps.length} done
          </span>
        )}
      </div>

      {hasSteps ? (
        <ol className="space-y-4">
          {steps.map((step) => {
            const isDone = completedSteps.has(step.number);

            return (
              <li
                key={`step-${step.number}`}
                onClick={() => toggleStep(step.number)}
                className="flex items-start gap-3.5 cursor-pointer group"
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                    isDone
                      ? 'bg-[#365B45] text-white'
                      : 'border border-[#C5CAC0] text-[#737873] bg-[#FAFAF7] group-hover:border-[#365B45]'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : step.number}
                </span>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDone ? 'line-through text-[#A3A8A0]' : 'text-[#242824]'
                  }`}
                >
                  {step.step}
                </p>
              </li>
            );
          })}
        </ol>
      ) : instructions ? (
        <div className="text-xs sm:text-sm text-[#242824] leading-relaxed whitespace-pre-line space-y-2">
          {instructions}
        </div>
      ) : (
        <p className="text-xs text-[#737873]">No specific cooking steps provided.</p>
      )}
    </div>
  );
}
