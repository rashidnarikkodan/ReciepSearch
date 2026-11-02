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
        className="block relative aspect-4/3 w-full overflow-hidden bg-[#F6F7F5]"
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
          <div className="w-full h-full flex flex-col items-center justify-center text-[#737873] p-3">
            <UtensilsCrossed className="w-5 h-5 mb-1 text-[#A3A8A0]" />
            <span className="text-[10px]">No preview</span>
          </div>
        )}

        {primaryTag && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium capitalize bg-white/95 text-[#242824] shadow-xs max-w-[70%] truncate">
            {primaryTag}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          disabled={isToggling}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
          className={`absolute top-2 right-2 p-1 sm:p-1.5 rounded-md bg-white/95 text-[#242824] shadow-xs hover:text-[#B42318] transition-colors cursor-pointer ${
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

      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {(readyInMinutes || servings || healthScore) ? (
            <div className="text-[10px] sm:text-[11px] text-[#737873] font-medium mb-1 flex items-center gap-1 sm:gap-1.5 flex-wrap">
              {readyInMinutes ? <span>{readyInMinutes}m</span> : null}
              {readyInMinutes && servings ? <span>·</span> : null}
              {servings ? <span>{servings} {servings === 1 ? 'srv' : 'srvs'}</span> : null}
              {healthScore ? (
                <>
                  <span>·</span>
                  <span className="text-[#365B45] font-semibold">{healthScore}%</span>
                </>
              ) : null}
            </div>
          ) : null}

          <Link
            to={`/recipes/${recipeId}`}
            className="block text-xs sm:text-sm font-semibold text-[#242824] hover:text-[#365B45] transition-colors line-clamp-2 leading-snug"
          >
            {title}
          </Link>
        </div>

        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-[#737873] border-t border-[#F0F2ED]">
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
