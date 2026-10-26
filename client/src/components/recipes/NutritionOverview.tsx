import type { RecipeNutrient } from '../../types/recipe.types';

interface NutritionOverviewProps {
  nutrients: RecipeNutrient[];
  className?: string;
}

export function NutritionOverview({ nutrients, className = '' }: NutritionOverviewProps) {
  if (!nutrients || nutrients.length === 0) return null;

  const findNutrient = (names: string[]) => {
    return nutrients.find((n) =>
      names.some((name) => n.name.toLowerCase().includes(name.toLowerCase()))
    );
  };

  const calories = findNutrient(['calories', 'energy']);
  const protein = findNutrient(['protein']);
  const carbs = findNutrient(['carbohydrates', 'carbs']);
  const fat = findNutrient(['fat', 'total fat']);
  const fiber = findNutrient(['fiber']);

  const keyNutrients = [
    { label: 'Calories', item: calories },
    { label: 'Protein', item: protein },
    { label: 'Carbs', item: carbs },
    { label: 'Fat', item: fat },
    { label: 'Fiber', item: fiber },
  ].filter((k) => k.item !== undefined);

  if (keyNutrients.length === 0) return null;

  return (
    <div className={`py-3.5 border-y border-[#EBECE8] ${className}`}>
      <span className="block text-[11px] font-medium text-[#737873] uppercase tracking-wider mb-2">
        Nutrition per serving
      </span>

      <div className="flex items-center gap-5 sm:gap-8 flex-wrap">
        {keyNutrients.map((k) => (
          <div key={k.label} className="text-xs">
            <span className="font-semibold text-[#242824]">
              {Math.round(k.item!.amount)} {k.item!.unit}
            </span>{' '}
            <span className="text-[#737873]">{k.label.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
