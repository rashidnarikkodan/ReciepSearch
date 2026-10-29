import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ExternalLink, AlertCircle, Utensils } from 'lucide-react';
import { recipeApi } from '../apis/recipeApi';
import { useFavorites } from '../hooks/useFavorites';
import { Navbar } from '../components/Navbar';
import { NutritionOverview } from '../components/recipes/NutritionOverview';
import { IngredientsList } from '../components/recipes/IngredientsList';
import { CookingInstructions } from '../components/recipes/CookingInstructions';
import { Button } from '../components/common/Button';
import type { RecipeDetail } from '../types/recipe.types';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTogglingFav, setIsTogglingFav] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      setImageError(false);

      try {
        const data = await recipeApi.getRecipeById(id);
        setRecipe(data);
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Could not load recipe details.';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const recipeId = recipe?.id ? Number(recipe.id) : 0;
  const favorited = recipeId ? isFavorite(recipeId) : false;

  const handleToggleFavorite = async () => {
    if (!recipe || isTogglingFav) return;
    setIsTogglingFav(true);

    try {
      await toggleFavorite({
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
      });
    } finally {
      setIsTogglingFav(false);
    }
  };

  const cleanSummary = recipe?.summary
    ? recipe.summary.replace(/<[^>]*>?/gm, '').trim()
    : '';

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#242824] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs text-[#737873] hover:text-[#242824] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {recipe && (
            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={isTogglingFav}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                favorited
                  ? 'bg-white border-[#FECDCA] text-[#B42318]'
                  : 'bg-white border-[#D8DCD4] text-[#242824] hover:border-[#365B45]'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`}
              />
              <span>{favorited ? 'Saved' : 'Save recipe'}</span>
            </button>
          )}
        </div>

        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-7 bg-[#E5E8E2] rounded-lg w-2/3" />
            <div className="h-4 bg-[#E5E8E2] rounded-lg w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              <div className="md:col-span-5 space-y-4">
                <div className="aspect-16/10 bg-[#E5E8E2] rounded-lg" />
                <div className="h-20 bg-[#E5E8E2] rounded-lg" />
              </div>
              <div className="md:col-span-7 space-y-4">
                <div className="h-32 bg-[#E5E8E2] rounded-lg" />
                <div className="h-48 bg-[#E5E8E2] rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="py-16 text-center max-w-sm mx-auto">
            <AlertCircle className="w-8 h-8 text-[#B42318] mx-auto mb-2" />
            <h2 className="text-base font-semibold text-[#242824] mb-1">Recipe Not Found</h2>
            <p className="text-xs text-[#737873] mb-4">{error}</p>
            <Link to="/recipes">
              <Button variant="primary" size="sm" className="rounded-lg text-xs">
                Back to Explore
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && recipe && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-[#E6E8E3]">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#242824] leading-tight">
                {recipe.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#737873] mt-2">
                {recipe.readyInMinutes ? (
                  <span>{recipe.readyInMinutes} mins</span>
                ) : null}

                {recipe.preparationMinutes ? (
                  <>
                    <span>·</span>
                    <span>Prep: {recipe.preparationMinutes}m</span>
                  </>
                ) : null}

                {recipe.cookingMinutes ? (
                  <>
                    <span>·</span>
                    <span>Cook: {recipe.cookingMinutes}m</span>
                  </>
                ) : null}

                {recipe.servings ? (
                  <>
                    <span>·</span>
                    <span>{recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}</span>
                  </>
                ) : null}

                {recipe.healthScore ? (
                  <>
                    <span>·</span>
                    <span className="text-[#365B45] font-medium">Health score: {recipe.healthScore}</span>
                  </>
                ) : null}

                {recipe.cuisines?.length ? (
                  <>
                    <span>·</span>
                    <span className="capitalize">{recipe.cuisines.join(', ')}</span>
                  </>
                ) : null}

                {recipe.diets?.length ? (
                  <>
                    <span>·</span>
                    <span className="capitalize">{recipe.diets.join(', ')}</span>
                  </>
                ) : null}

                {recipe.dishTypes?.length ? (
                  <>
                    <span>·</span>
                    <span className="capitalize text-[#8C9188]">{recipe.dishTypes.slice(0, 2).join(', ')}</span>
                  </>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 space-y-5">
                <div className="aspect-16/10 w-full rounded-lg overflow-hidden bg-[#F6F7F5] border border-[#E6E8E3]">
                  {recipe.image && !imageError ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#737873] p-6 text-center">
                      <Utensils className="w-8 h-8 mb-1 text-[#A3A8A0]" />
                      <span className="text-xs">No image provided</span>
                    </div>
                  )}
                </div>

                {cleanSummary && (
                  <p className="text-xs sm:text-sm text-[#737873] leading-relaxed">
                    {cleanSummary}
                  </p>
                )}

                <NutritionOverview nutrients={recipe.nutrients || []} />

                {recipe.sourceUrl && (
                  <div>
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#365B45] hover:underline"
                    >
                      <span>Original recipe source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="md:col-span-7 space-y-8">
                <IngredientsList
                  ingredients={recipe.ingredients || []}
                  servings={recipe.servings}
                />

                <CookingInstructions
                  steps={recipe.steps || []}
                  instructions={recipe.instructions}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#EBECE8] bg-[#FFFFFF] py-4 text-center text-xs text-[#737873] mt-auto">
        RecipeSearch
      </footer>
    </div>
  );
}
