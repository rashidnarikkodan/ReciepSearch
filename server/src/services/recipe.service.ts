export interface RecipeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  dietaryTags: string[];
}

export const INITIAL_RECIPES: RecipeItem[] = [
  {
    id: 'rec-1',
    title: 'Lemon Herb Roasted Chicken',
    description: 'Crispy skin roasted chicken seasoned with fresh lemon juice, rosemary, garlic, and cracked black pepper.',
    category: 'Dinner',
    difficulty: 'Medium',
    prepTime: '20 mins',
    cookTime: '55 mins',
    servings: 4,
    ingredients: [
      '1 whole chicken (approx. 4 lbs)',
      '2 fresh lemons, sliced',
      '4 sprigs fresh rosemary',
      '6 cloves garlic, crushed',
      '2 tbsp olive oil',
      '1 tsp sea salt',
      '1/2 tsp freshly cracked black pepper'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Pat the chicken completely dry with paper towels.',
      'Stuff cavity with lemon slices, half the garlic, and rosemary sprigs.',
      'Rub exterior with olive oil, salt, pepper, and remaining garlic.',
      'Roast for 55–60 minutes until internal temperature reaches 165°F (74°C).',
      'Rest for 10 minutes before carving.'
    ],
    dietaryTags: ['Gluten-Free', 'High-Protein']
  },
  {
    id: 'rec-2',
    title: 'Mediterranean Quinoa Salad',
    description: 'Light and refreshing quinoa tossed with cucumber, cherry tomatoes, kalamata olives, and lemon oregano vinaigrette.',
    category: 'Lunch',
    difficulty: 'Easy',
    prepTime: '15 mins',
    cookTime: '15 mins',
    servings: 3,
    ingredients: [
      '1 cup dry quinoa, rinsed',
      '2 cups water or vegetable broth',
      '1 English cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1/2 cup kalamata olives, pitted and halved',
      '1/4 cup chopped red onion',
      '3 tbsp extra virgin olive oil',
      '2 tbsp fresh lemon juice',
      '1 tsp dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Bring quinoa and water to a boil, then cover and simmer for 15 minutes.',
      'Fluff cooked quinoa with a fork and let cool to room temperature.',
      'In a large bowl, whisk olive oil, lemon juice, oregano, salt, and pepper.',
      'Add cooled quinoa, cucumber, tomatoes, olives, and red onion.',
      'Toss gently to combine and chill before serving.'
    ],
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free']
  },
  {
    id: 'rec-3',
    title: 'Classic Creamy Tomato Basil Soup',
    description: 'Smooth and comforting roasted tomato soup simmered with sweet onions, garlic, and aromatic fresh basil.',
    category: 'Lunch',
    difficulty: 'Easy',
    prepTime: '10 mins',
    cookTime: '30 mins',
    servings: 4,
    ingredients: [
      '2 cans (28 oz each) whole peeled plum tomatoes',
      '1 medium yellow onion, chopped',
      '4 cloves garlic, minced',
      '2 tbsp butter or olive oil',
      '2 cups vegetable broth',
      '1/2 cup fresh basil leaves, packed',
      '1/4 cup heavy cream or coconut cream',
      '1 tsp salt',
      '1/4 tsp crushed red pepper flakes'
    ],
    instructions: [
      'Melt butter in a large pot over medium heat. Sauté onion until translucent (5 mins).',
      'Add garlic and red pepper flakes; cook for 1 minute until fragrant.',
      'Add canned tomatoes with juices and broth. Bring to a simmer for 20 minutes.',
      'Remove from heat, add fresh basil, and purée with an immersion blender until smooth.',
      'Stir in cream, season with salt, and serve warm.'
    ],
    dietaryTags: ['Vegetarian', 'Gluten-Free']
  },
  {
    id: 'rec-4',
    title: 'Garlic Butter Sautéed Salmon',
    description: 'Pan-seared Atlantic salmon fillets with a golden crust in a rich garlic butter pan sauce with fresh parsley.',
    category: 'Dinner',
    difficulty: 'Medium',
    prepTime: '10 mins',
    cookTime: '12 mins',
    servings: 2,
    ingredients: [
      '2 salmon fillets (6 oz each)',
      '2 tbsp unsalted butter',
      '1 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 tbsp fresh lemon juice',
      '1 tbsp chopped fresh parsley',
      'Salt and black pepper to taste'
    ],
    instructions: [
      'Pat salmon dry and season both sides with salt and pepper.',
      'Heat olive oil in a non-stick skillet over medium-high heat.',
      'Add salmon skin-side down and sear for 5 minutes without moving.',
      'Flip fillets, reduce heat to medium, and add butter and garlic to the pan.',
      'Baste salmon with melting garlic butter for 3–4 minutes until cooked through.',
      'Finish with lemon juice and parsley; serve immediately.'
    ],
    dietaryTags: ['Gluten-Free', 'Keto', 'Pescatarian']
  },
  {
    id: 'rec-5',
    title: 'Steel-Cut Oats with Warm Cinnamon Apples',
    description: 'Hearty steel-cut oatmeal cooked with cinnamon, topped with caramelized apple slices and pure maple syrup.',
    category: 'Breakfast',
    difficulty: 'Easy',
    prepTime: '5 mins',
    cookTime: '25 mins',
    servings: 2,
    ingredients: [
      '1 cup steel-cut oats',
      '3 cups water or unsweetened almond milk',
      '1 crisp apple (such as Honeycrisp), diced',
      '1 tbsp butter or coconut oil',
      '1 tsp ground cinnamon',
      '2 tbsp pure maple syrup',
      'Pinch of salt'
    ],
    instructions: [
      'Bring water and salt to a boil. Stir in steel-cut oats, reduce heat to low, cover, and simmer for 20–25 minutes.',
      'In a small skillet, heat butter over medium heat. Sauté diced apple with cinnamon and maple syrup for 5 minutes until tender.',
      'Ladle cooked oatmeal into bowls and spoon caramelized apples on top.'
    ],
    dietaryTags: ['Vegetarian', 'Vegan', 'Dairy-Free Option']
  },
  {
    id: 'rec-6',
    title: 'Flourless Dark Chocolate Almond Brownies',
    description: 'Fudgy, rich dark chocolate brownies made with almond flour and espresso powder, naturally sweetened.',
    category: 'Dessert',
    difficulty: 'Easy',
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 8,
    ingredients: [
      '1 cup finely ground almond flour',
      '1/2 cup unsweetened Dutch-process cocoa powder',
      '1/2 cup coconut sugar or cane sugar',
      '1/4 cup melted coconut oil or butter',
      '2 large eggs, room temperature',
      '1/2 cup bittersweet chocolate chips (70%)',
      '1 tsp vanilla extract',
      '1/4 tsp baking soda',
      '1/4 tsp fine salt'
    ],
    instructions: [
      'Preheat oven to 350°F (175°C) and line an 8-inch square pan with parchment paper.',
      'Whisk eggs, sugar, melted oil, and vanilla extract until smooth.',
      'Fold in almond flour, cocoa powder, baking soda, and salt until a thick batter forms.',
      'Fold in chocolate chips and spread evenly into prepared pan.',
      'Bake for 20–24 minutes until a toothpick inserted in the center comes out with a few moist crumbs.',
      'Cool completely before slicing into squares.'
    ],
    dietaryTags: ['Gluten-Free', 'Vegetarian']
  }
];

export class RecipeService {
  public static getAll(search?: string, category?: string): RecipeItem[] {
    let results = [...INITIAL_RECIPES];

    if (category && category.toLowerCase() !== 'all') {
      results = results.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
          r.dietaryTags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return results;
  }

  public static getById(id: string): RecipeItem | null {
    return INITIAL_RECIPES.find((r) => r.id === id) || null;
  }

  public static getCategories(): string[] {
    const categories = new Set(INITIAL_RECIPES.map((r) => r.category));
    return ['All', ...Array.from(categories)];
  }

  public static getByIds(ids: string[]): RecipeItem[] {
    const idSet = new Set(ids);
    return INITIAL_RECIPES.filter((r) => idSet.has(r.id));
  }
}
