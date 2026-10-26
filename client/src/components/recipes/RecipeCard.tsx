import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookmarkCheck, UtensilsCrossed } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import type { RecipeSummary, FavoriteRecipe } from '../../types/recipe.types';

interface RecipeCardProps {
  recipe: RecipeSummary | FavoriteRecipe;
  onRemoveFavorite?: (recipeId: number) => void;
  showRemoveButton?: boolean;
}

export function RecipeCard({
  recipe,
  onRemoveFavorite,
  showRemoveButton = false,
}: RecipeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageError, setImageError] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const recipeId = 'recipeId' in recipe ? recipe.recipeId : recipe.id;
  const title = recipe.title;
  const image = recipe.image;
  const readyInMinutes = recipe.readyInMinutes;
  const servings = recipe.servings;
  const rawSummary = 'summary' in recipe ? recipe.summary : '';

  const cleanSummary = rawSummary
    ? rawSummary.replace(/<[^>]*>?/gm, '').trim()
    : '';

  const favorited = isFavorite(recipeId);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isToggling) return;
    setIsToggling(true);

    try {
      if (showRemoveButton && onRemoveFavorite) {
        onRemoveFavorite(recipeId);
      } else {
        await toggleFavorite({
          recipeId,
          title,
          image,
          readyInMinutes,
          servings,
        });
      }
    } finally {
      setIsToggling(false);
    }
  };

  const cuisines = 'cuisines' in recipe && Array.isArray(recipe.cuisines) ? recipe.cuisines : [];
  const diets = 'diets' in recipe && Array.isArray(recipe.diets) ? recipe.diets : [];
  const healthScore = 'healthScore' in recipe && typeof recipe.healthScore === 'number' ? recipe.healthScore : undefined;
  const aggregateLikes = 'aggregateLikes' in recipe && typeof recipe.aggregateLikes === 'number' ? recipe.aggregateLikes : undefined;
  const primaryTag = cuisines[0] || diets[0];

  return (
    <article className="group relative flex flex-col bg-[#FFFFFF] border border-[#E6E8E3] rounded-lg hover:border-[#CBD0C5] transition-colors overflow-hidden">
      <Link
        to={`/recipes/${recipeId}`}
        className="block relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-[#F6F7F5]"
      >
        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#737873] p-4">
            <UtensilsCrossed className="w-6 h-6 mb-1 text-[#A3A8A0]" />
            <span className="text-[11px]">No preview</span>
          </div>
        )}

        {primaryTag && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-medium capitalize bg-white/95 text-[#242824] shadow-xs">
            {primaryTag}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={isToggling}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/95 text-[#242824] shadow-xs hover:text-[#B42318] transition-colors cursor-pointer ${
            favorited ? 'text-[#B42318]' : ''
          }`}
        >
          {showRemoveButton ? (
            <BookmarkCheck className="w-3.5 h-3.5 text-[#365B45]" />
          ) : (
            <Heart
              className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`}
            />
          )}
        </button>
      </Link>

      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {(readyInMinutes || servings || healthScore) ? (
            <div className="text-[11px] text-[#737873] font-medium mb-1 flex items-center gap-1.5 flex-wrap">
              {readyInMinutes ? <span>{readyInMinutes} mins</span> : null}
              {readyInMinutes && servings ? <span>·</span> : null}
              {servings ? <span>{servings} {servings === 1 ? 'serving' : 'servings'}</span> : null}
              {healthScore ? (
                <>
                  <span>·</span>
                  <span className="text-[#365B45]">Score {healthScore}</span>
                </>
              ) : null}
            </div>
          ) : null}

          <Link
            to={`/recipes/${recipeId}`}
            className="block text-sm font-semibold text-[#242824] hover:text-[#365B45] transition-colors line-clamp-2 leading-snug"
          >
            {title}
          </Link>

          {cleanSummary && (
            <p className="text-xs text-[#737873] mt-1.5 line-clamp-2 leading-relaxed">
              {cleanSummary}
            </p>
          )}
        </div>

        <div className="pt-3 mt-3 flex items-center justify-between text-[11px] text-[#737873]">
          <Link
            to={`/recipes/${recipeId}`}
            className="font-medium text-[#365B45] hover:underline"
          >
            View recipe
          </Link>
          {aggregateLikes ? (
            <span className="inline-flex items-center gap-1 text-[#737873]">
              <Heart className="w-2.5 h-2.5 fill-current text-[#A3A8A0]" />
              <span>{aggregateLikes}</span>
            </span>
          ) : (
            <span className="font-mono text-[#A3A8A0]">#{recipeId}</span>
          )}
        </div>
      </div>
    </article>
  );
}
