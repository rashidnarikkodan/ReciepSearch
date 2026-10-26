import { useState } from 'react';
import { Check } from 'lucide-react';
import type { RecipeIngredient } from '../../types/recipe.types';

interface IngredientsListProps {
  ingredients: RecipeIngredient[];
  servings?: number;
  className?: string;
}

export function IngredientsList({
  ingredients,
  servings,
  className = '',
}: IngredientsListProps) {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (checkedIds.size === ingredients.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(ingredients.map((item, idx) => item.id || idx)));
    }
  };

  if (!ingredients || ingredients.length === 0) {
    return (
      <div className={className}>
        <h2 className="text-sm font-semibold text-[#242824] mb-1">Ingredients</h2>
        <p className="text-xs text-[#737873]">No ingredients details available.</p>
      </div>
    );
  }

  const allChecked = checkedIds.size === ingredients.length;

  return (
    <div className={className}>
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EBECE8]">
        <div>
          <h2 className="text-base font-semibold text-[#242824]">Ingredients</h2>
          {servings && (
            <span className="text-xs text-[#737873]">
              For {servings} {servings === 1 ? 'serving' : 'servings'}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSelectAll}
          className="text-xs text-[#737873] hover:text-[#242824] cursor-pointer"
        >
          {allChecked ? 'Reset' : `Select all (${checkedIds.size}/${ingredients.length})`}
        </button>
      </div>

      <ul className="divide-y divide-[#F0F2ED]">
        {ingredients.map((item, idx) => {
          const itemKey = item.id || idx;
          const isChecked = checkedIds.has(itemKey);

          return (
            <li
              key={`ing-${itemKey}-${idx}`}
              onClick={() => toggleCheck(itemKey)}
              className="py-2.5 flex items-start gap-3 cursor-pointer select-none group"
            >
              <div
                className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isChecked
                    ? 'bg-[#365B45] border-[#365B45] text-white'
                    : 'border-[#C5CAC0] bg-white group-hover:border-[#365B45]'
                }`}
              >
                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              <span
                className={`text-xs sm:text-sm leading-relaxed ${
                  isChecked ? 'line-through text-[#A3A8A0]' : 'text-[#242824]'
                }`}
              >
                {item.original || `${item.amount} ${item.unit} ${item.name}`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
