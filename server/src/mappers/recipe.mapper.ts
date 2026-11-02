import type {
  SpoonacularRawSummary,
  SpoonacularRawDetail,
} from '../types/recipe.types.js';
import type {
  RecipeSummaryDto,
  RecipeDetailDto,
} from '../dtos/recipe.dto.js';

export class RecipeMapper {
  public static cleanHtml(html: string = ''): string {
    return html.replace(/<[^>]*>?/gm, '').trim();
  }

  public static toSummaryDto(item: SpoonacularRawSummary): RecipeSummaryDto {
    return {
      id: item.id,
      title: item.title,
      image: item.image || '',
      summary: this.cleanHtml(item.summary || ''),
      readyInMinutes: item.readyInMinutes || 0,
      servings: item.servings || 0,
      cuisines: item.cuisines || [],
      diets: item.diets || [],
      dishTypes: item.dishTypes || [],
      healthScore: item.healthScore,
      aggregateLikes: item.aggregateLikes,
    };
  }

  public static toSummaryDtoList(items: SpoonacularRawSummary[]): RecipeSummaryDto[] {
    return items.map((item) => this.toSummaryDto(item));
  }

  public static toDetailDto(raw: SpoonacularRawDetail): RecipeDetailDto {
    return {
      id: raw.id,
      title: raw.title,
      image: raw.image || '',
      summary: this.cleanHtml(raw.summary || ''),
      readyInMinutes: raw.readyInMinutes || 0,
      preparationMinutes: raw.preparationMinutes,
      cookingMinutes: raw.cookingMinutes,
      servings: raw.servings || 1,
      cuisines: raw.cuisines || [],
      dishTypes: raw.dishTypes || [],
      diets: raw.diets || [],
      healthScore: raw.healthScore,
      aggregateLikes: raw.aggregateLikes,
      instructions: this.cleanHtml(raw.instructions || ''),
      sourceUrl: raw.sourceUrl,
      ingredients: (raw.extendedIngredients || []).map((ing, idx) => ({
        id: ing.id || idx,
        name: ing.name || '',
        original: ing.original || '',
        amount: ing.amount || 0,
        unit: ing.unit || '',
      })),
      steps:
        raw.analyzedInstructions?.[0]?.steps?.map((s) => ({
          number: s.number,
          step: s.step,
        })) || [],
      nutrients:
        raw.nutrition?.nutrients?.slice(0, 8).map((n) => ({
          name: n.name,
          amount: n.amount,
          unit: n.unit,
          percentOfDailyNeeds: n.percentOfDailyNeeds,
        })) || [],
    };
  }
}
