import type { RecipeDetail } from '../../types/recipe.types.js';

export const MOCK_RECIPES: RecipeDetail[] = [
  {
    id: 716429,
    title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
    image: 'https://img.spoonacular.com/recipes/716429-312x231.jpg',
    summary: 'A flavorful, comforting vegetarian pasta toss with crispy cauliflower florets, toasted breadcrumbs, and fresh herbs.',
    readyInMinutes: 45,
    servings: 2,
    preparationMinutes: 15,
    cookingMinutes: 30,
    cuisines: ['italian', 'mediterranean'],
    dishTypes: ['lunch', 'main course'],
    diets: ['vegetarian'],
    instructions: '1. Boil pasta until al dente. 2. Sauté cauliflower with garlic and scallions in olive oil. 3. Toast breadcrumbs in butter. 4. Toss pasta with cauliflower mixture and top with breadcrumbs.',
    ingredients: [
      { id: 11135, name: 'cauliflower', original: '1 head cauliflower, chopped', amount: 1, unit: 'head' },
      { id: 11291, name: 'green onions', original: '1/3 cup chopped scallions', amount: 0.33, unit: 'cup' },
      { id: 11215, name: 'garlic', original: '3 cloves garlic, minced', amount: 3, unit: 'cloves' },
      { id: 20420, name: 'pasta', original: '8 oz fettuccine pasta', amount: 8, unit: 'oz' },
      { id: 18079, name: 'breadcrumbs', original: '1/2 cup panko breadcrumbs', amount: 0.5, unit: 'cup' },
      { id: 4053, name: 'olive oil', original: '3 tbsp extra virgin olive oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Bring a large pot of salted water to a boil and cook pasta according to package directions.' },
      { number: 2, step: 'Heat olive oil in a skillet over medium heat, add minced garlic and scallions until fragrant.' },
      { number: 3, step: 'Add chopped cauliflower florets and cook until golden brown and tender.' },
      { number: 4, step: 'Toast breadcrumbs until crisp in a small pan.' },
      { number: 5, step: 'Combine drained pasta with cauliflower skillet, toss gently, and serve garnished with toasted breadcrumbs.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 584, unit: 'kcal', percentOfDailyNeeds: 29 },
      { name: 'Protein', amount: 19, unit: 'g', percentOfDailyNeeds: 38 },
      { name: 'Fat', amount: 20, unit: 'g', percentOfDailyNeeds: 31 },
      { name: 'Carbohydrates', amount: 84, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Fiber', amount: 8, unit: 'g', percentOfDailyNeeds: 32 }
    ]
  },
  {
    id: 715538,
    title: 'What to make for dinner tonight? Bruschetta Style Pork Chops',
    image: 'https://img.spoonacular.com/recipes/715538-312x231.jpg',
    summary: 'Juicy skillet pork chops topped with a fresh tomato, basil, and balsamic bruschetta relish.',
    readyInMinutes: 35,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 25,
    cuisines: ['italian', 'american'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free', 'ketogenic'],
    instructions: '1. Season pork chops with salt and pepper. 2. Sear pork in olive oil until golden. 3. Dice tomatoes and mix with basil, garlic, and balsamic. 4. Top pork chops with bruschetta mixture and serve.',
    ingredients: [
      { id: 10010062, name: 'pork chops', original: '4 bone-in pork chops', amount: 4, unit: 'chops' },
      { id: 11529, name: 'tomatoes', original: '3 ripe roma tomatoes, diced', amount: 3, unit: 'tomatoes' },
      { id: 2044, name: 'fresh basil', original: '1/4 cup fresh basil leaves, chopped', amount: 0.25, unit: 'cup' },
      { id: 2069, name: 'balsamic vinegar', original: '2 tbsp balsamic vinegar', amount: 2, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '2 cloves garlic, minced', amount: 2, unit: 'cloves' }
    ],
    steps: [
      { number: 1, step: 'Pat pork chops dry and generously season both sides with sea salt and cracked black pepper.' },
      { number: 2, step: 'In a medium bowl, combine diced tomatoes, minced garlic, chopped basil, and balsamic vinegar.' },
      { number: 3, step: 'Heat olive oil in a skillet over medium-high heat and sear pork chops for 5–6 minutes per side.' },
      { number: 4, step: 'Remove skillet from heat, let chops rest for 5 minutes, then spoon fresh tomato bruschetta topping over each chop.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 421, unit: 'kcal', percentOfDailyNeeds: 21 },
      { name: 'Protein', amount: 48, unit: 'g', percentOfDailyNeeds: 96 },
      { name: 'Fat', amount: 22, unit: 'g', percentOfDailyNeeds: 34 },
      { name: 'Carbohydrates', amount: 6, unit: 'g', percentOfDailyNeeds: 2 }
    ]
  },
  {
    id: 644387,
    title: 'Garlic Herb Baked Salmon with Asparagus',
    image: 'https://img.spoonacular.com/recipes/644387-312x231.jpg',
    summary: 'Sheet-pan Atlantic salmon fillets baked to perfection with tender green asparagus, lemon slices, and aromatic garlic butter.',
    readyInMinutes: 25,
    servings: 2,
    preparationMinutes: 10,
    cookingMinutes: 15,
    cuisines: ['mediterranean', 'european'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free', 'pescetarian', 'ketogenic', 'whole30'],
    instructions: '1. Preheat oven to 400°F. 2. Place salmon fillets and trimmed asparagus on baking sheet. 3. Brush with melted garlic herb butter. 4. Bake for 15 minutes.',
    ingredients: [
      { id: 15076, name: 'salmon fillets', original: '2 wild salmon fillets (6 oz each)', amount: 2, unit: 'fillets' },
      { id: 11011, name: 'asparagus', original: '1 bunch fresh asparagus, trimmed', amount: 1, unit: 'bunch' },
      { id: 1001, name: 'butter', original: '2 tbsp melted butter', amount: 2, unit: 'tbsp' },
      { id: 9152, name: 'lemon juice', original: '1 tbsp fresh lemon juice', amount: 1, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '3 cloves garlic, minced', amount: 3, unit: 'cloves' }
    ],
    steps: [
      { number: 1, step: 'Preheat oven to 400°F (200°C) and line a rimmed baking sheet with parchment paper.' },
      { number: 2, step: 'Arrange salmon fillets and trimmed asparagus in a single layer on the sheet.' },
      { number: 3, step: 'Whisk together melted butter, minced garlic, lemon juice, salt, and chopped parsley.' },
      { number: 4, step: 'Brush mixture over the salmon and asparagus.' },
      { number: 5, step: 'Bake for 12–15 minutes until salmon flakes easily with a fork.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 395, unit: 'kcal', percentOfDailyNeeds: 20 },
      { name: 'Protein', amount: 35, unit: 'g', percentOfDailyNeeds: 70 },
      { name: 'Fat', amount: 25, unit: 'g', percentOfDailyNeeds: 38 },
      { name: 'Carbohydrates', amount: 5, unit: 'g', percentOfDailyNeeds: 2 }
    ]
  },
  {
    id: 654959,
    title: 'Pasta with Garlic and Oil (Aglio e Olio)',
    image: 'https://img.spoonacular.com/recipes/654959-312x231.jpg',
    summary: 'A classic Roman pasta dish featuring spaghetti emulsified in extra virgin olive oil, golden toasted garlic, red chili flakes, and parsley.',
    readyInMinutes: 20,
    servings: 4,
    preparationMinutes: 5,
    cookingMinutes: 15,
    cuisines: ['italian'],
    dishTypes: ['lunch', 'main course'],
    diets: ['vegetarian', 'vegan'],
    instructions: '1. Cook spaghetti in salted water. 2. Gently sauté sliced garlic and red pepper flakes in plenty of olive oil. 3. Toss pasta with garlic oil and reserved cooking water to create an emulsion.',
    ingredients: [
      { id: 11420420, name: 'spaghetti', original: '1 lb spaghetti', amount: 1, unit: 'lb' },
      { id: 11215, name: 'garlic', original: '8 cloves garlic, thinly sliced', amount: 8, unit: 'cloves' },
      { id: 4053, name: 'olive oil', original: '1/2 cup extra virgin olive oil', amount: 0.5, unit: 'cup' },
      { id: 2044, name: 'parsley', original: '1/2 cup chopped fresh flat-leaf parsley', amount: 0.5, unit: 'cup' },
      { id: 1032009, name: 'red pepper flakes', original: '1/2 tsp crushed red pepper flakes', amount: 0.5, unit: 'tsp' }
    ],
    steps: [
      { number: 1, step: 'Cook spaghetti in a large pot of boiling salted water until 1 minute shy of al dente.' },
      { number: 2, step: 'In a wide skillet, heat olive oil over medium-low heat and add sliced garlic and chili flakes.' },
      { number: 3, step: 'Cook gently for 3 minutes until garlic is pale golden, never burnt.' },
      { number: 4, step: 'Transfer pasta directly to the skillet along with 1/2 cup of starchy pasta cooking water.' },
      { number: 5, step: 'Stir vigorously until an emulsion coats the pasta, finish with chopped parsley, and serve immediately.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 480, unit: 'kcal', percentOfDailyNeeds: 24 },
      { name: 'Protein', amount: 13, unit: 'g', percentOfDailyNeeds: 26 },
      { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Carbohydrates', amount: 68, unit: 'g', percentOfDailyNeeds: 23 }
    ]
  },
  {
    id: 638420,
    title: 'Chicken Tikka Masala with Steamed Basmati Rice',
    image: 'https://img.spoonacular.com/recipes/638420-312x231.jpg',
    summary: 'Tender marinated chicken chunks simmered in an aromatic spiced tomato, ginger, garlic, and cream sauce.',
    readyInMinutes: 40,
    servings: 4,
    preparationMinutes: 15,
    cookingMinutes: 25,
    cuisines: ['indian', 'asian'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free'],
    instructions: '1. Marinate chicken in spiced yogurt. 2. Brown chicken in pan. 3. Sauté onions, garlic, and spices. 4. Simmer in tomato sauce and finish with heavy cream.',
    ingredients: [
      { id: 5062, name: 'chicken breast', original: '1.5 lbs boneless skinless chicken breasts', amount: 1.5, unit: 'lbs' },
      { id: 11529, name: 'tomato puree', original: '1 can (15 oz) tomato puree', amount: 15, unit: 'oz' },
      { id: 1053, name: 'heavy cream', original: '1/2 cup heavy whipping cream', amount: 0.5, unit: 'cup' },
      { id: 2015, name: 'garam masala', original: '1.5 tbsp garam masala', amount: 1.5, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '4 cloves garlic, minced', amount: 4, unit: 'cloves' }
    ],
    steps: [
      { number: 1, step: 'Dice chicken and toss with greek yogurt, cumin, and chili powder.' },
      { number: 2, step: 'Sear chicken in a hot skillet with ghee until nicely charred, then remove.' },
      { number: 3, step: 'Add diced onions, minced ginger, and garlic to the pan, cooking until softened.' },
      { number: 4, step: 'Pour in tomato puree and spices, simmering for 15 minutes.' },
      { number: 5, step: 'Return chicken to the sauce, stir in cream, and garnish with fresh cilantro.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 520, unit: 'kcal', percentOfDailyNeeds: 26 },
      { name: 'Protein', amount: 42, unit: 'g', percentOfDailyNeeds: 84 },
      { name: 'Fat', amount: 28, unit: 'g', percentOfDailyNeeds: 43 },
      { name: 'Carbohydrates', amount: 18, unit: 'g', percentOfDailyNeeds: 6 }
    ]
  },
  {
    id: 640803,
    title: 'Crispy Baja Fish Tacos with Chipotle Lime Crema',
    image: 'https://img.spoonacular.com/recipes/640803-312x231.jpg',
    summary: 'Golden beer-battered cod folded into warm corn tortillas with crunchy shredded red cabbage, fresh cilantro, and tangy chipotle crema.',
    readyInMinutes: 30,
    servings: 3,
    preparationMinutes: 15,
    cookingMinutes: 15,
    cuisines: ['mexican'],
    dishTypes: ['lunch', 'dinner', 'main course'],
    diets: ['pescetarian'],
    instructions: '1. Dip cod strips into light batter. 2. Fry until crisp and golden. 3. Warm corn tortillas. 4. Assemble with cabbage slaw and chipotle crema.',
    ingredients: [
      { id: 15015, name: 'cod fillets', original: '1 lb fresh cod fillets, sliced into strips', amount: 1, unit: 'lb' },
      { id: 18364, name: 'corn tortillas', original: '8 small corn tortillas', amount: 8, unit: 'tortillas' },
      { id: 11112, name: 'red cabbage', original: '2 cups shredded red cabbage', amount: 2, unit: 'cups' },
      { id: 1056, name: 'sour cream', original: '1/2 cup sour cream', amount: 0.5, unit: 'cup' },
      { id: 9159, name: 'lime juice', original: '2 limes, juiced', amount: 2, unit: 'limes' }
    ],
    steps: [
      { number: 1, step: 'Whisk together flour, beer or sparkling water, cumin, salt, and pepper.' },
      { number: 2, step: 'Dip fish strips into batter and fry in hot vegetable oil at 375°F for 4 minutes.' },
      { number: 3, step: 'Mix sour cream, lime juice, and chipotle paste for the crema sauce.' },
      { number: 4, step: 'Char tortillas on a dry skillet, fill with crispy fish, shredded slaw, and drizzle with crema.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 430, unit: 'kcal', percentOfDailyNeeds: 22 },
      { name: 'Protein', amount: 32, unit: 'g', percentOfDailyNeeds: 64 },
      { name: 'Fat', amount: 16, unit: 'g', percentOfDailyNeeds: 25 },
      { name: 'Carbohydrates', amount: 38, unit: 'g', percentOfDailyNeeds: 13 }
    ]
  },
  {
    id: 663845,
    title: 'Rich Tonkotsu Ramen with Chashu Pork and Soft Egg',
    image: 'https://img.spoonacular.com/recipes/663845-312x231.jpg',
    summary: 'Steaming bowl of Japanese ramen in a silky pork bone broth topped with sliced chashu, jammy marinated egg, nori, and scallions.',
    readyInMinutes: 50,
    servings: 2,
    preparationMinutes: 20,
    cookingMinutes: 30,
    cuisines: ['japanese', 'asian'],
    dishTypes: ['soup', 'main course'],
    diets: [],
    instructions: '1. Simmer pork broth with ginger, scallions, and dashi. 2. Cook fresh ramen noodles. 3. Divide noodles into bowls, pour hot broth over, and top with pork, egg, and bamboo shoots.',
    ingredients: [
      { id: 6583, name: 'ramen noodles', original: '2 portions fresh Japanese ramen noodles', amount: 2, unit: 'portions' },
      { id: 6150, name: 'pork stock', original: '4 cups rich bone broth', amount: 4, unit: 'cups' },
      { id: 1123, name: 'eggs', original: '2 soft-boiled eggs, marinated in soy', amount: 2, unit: 'eggs' },
      { id: 11291, name: 'scallions', original: '1/4 cup finely sliced green onions', amount: 0.25, unit: 'cup' },
      { id: 10011445, name: 'nori seaweed', original: '2 sheets roasted nori', amount: 2, unit: 'sheets' }
    ],
    steps: [
      { number: 1, step: 'Bring rich bone broth to a gentle simmer with crushed garlic, soy sauce, and mirin.' },
      { number: 2, step: 'Boil ramen noodles in a separate pot for 90 seconds until chewy.' },
      { number: 3, step: 'Distribute noodles into deep ceramic ramen bowls.' },
      { number: 4, step: 'Ladle boiling broth over noodles, top with sliced pork, soft egg halved, and nori.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 640, unit: 'kcal', percentOfDailyNeeds: 32 },
      { name: 'Protein', amount: 36, unit: 'g', percentOfDailyNeeds: 72 },
      { name: 'Fat', amount: 28, unit: 'g', percentOfDailyNeeds: 43 },
      { name: 'Carbohydrates', amount: 62, unit: 'g', percentOfDailyNeeds: 21 }
    ]
  },
  {
    id: 642582,
    title: 'Authentic Thai Pad Thai with Fresh Jumbo Shrimp',
    image: 'https://img.spoonacular.com/recipes/642582-312x231.jpg',
    summary: 'Stir-fried flat rice noodles tossed with tamarind sauce, succulent shrimp, crisp bean sprouts, egg ribbons, and crushed peanuts.',
    readyInMinutes: 25,
    servings: 2,
    preparationMinutes: 10,
    cookingMinutes: 15,
    cuisines: ['thai', 'asian'],
    dishTypes: ['lunch', 'main course'],
    diets: ['pescetarian', 'gluten free'],
    instructions: '1. Soak rice noodles in warm water. 2. Sauté garlic and shrimp in wok. 3. Push aside and scramble egg. 4. Toss noodles, tamarind sauce, bean sprouts, and peanuts.',
    ingredients: [
      { id: 20133, name: 'rice noodles', original: '8 oz flat pad thai rice noodles', amount: 8, unit: 'oz' },
      { id: 15152, name: 'shrimp', original: '1/2 lb peeled and deveined jumbo shrimp', amount: 0.5, unit: 'lb' },
      { id: 11043, name: 'bean sprouts', original: '1 cup fresh bean sprouts', amount: 1, unit: 'cup' },
      { id: 16091, name: 'peanuts', original: '1/4 cup roasted peanuts, crushed', amount: 0.25, unit: 'cup' },
      { id: 1123, name: 'eggs', original: '2 large eggs', amount: 2, unit: 'eggs' }
    ],
    steps: [
      { number: 1, step: 'Soak rice noodles until pliable, then drain thoroughly.' },
      { number: 2, step: 'Heat oil in a wok over high heat, sear shrimp for 2 minutes, then remove.' },
      { number: 3, step: 'Scramble eggs in the center, add noodles, fish sauce, tamarind paste, and brown sugar.' },
      { number: 4, step: 'Toss in bean sprouts, scallions, and cooked shrimp, serving with crushed peanuts and lime.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 510, unit: 'kcal', percentOfDailyNeeds: 25 },
      { name: 'Protein', amount: 28, unit: 'g', percentOfDailyNeeds: 56 },
      { name: 'Fat', amount: 17, unit: 'g', percentOfDailyNeeds: 26 },
      { name: 'Carbohydrates', amount: 62, unit: 'g', percentOfDailyNeeds: 21 }
    ]
  },
  {
    id: 639606,
    title: 'Classic Mediterranean Greek Salad with Feta & Olives',
    image: 'https://img.spoonacular.com/recipes/639606-312x231.jpg',
    summary: 'A vibrant salad of crisp Persian cucumbers, sun-ripened tomatoes, thinly sliced red onion, brine-cured Kalamata olives, and rich Greek feta.',
    readyInMinutes: 15,
    servings: 4,
    preparationMinutes: 15,
    cookingMinutes: 0,
    cuisines: ['greek', 'mediterranean'],
    dishTypes: ['salad', 'side dish', 'lunch'],
    diets: ['vegetarian', 'gluten free'],
    instructions: '1. Chop tomatoes, cucumbers, and red onion. 2. Toss in a large wooden bowl with olives. 3. Top with block of feta cheese. 4. Drizzle with extra virgin olive oil and oregano.',
    ingredients: [
      { id: 11529, name: 'tomatoes', original: '4 ripe tomatoes, cut into wedges', amount: 4, unit: 'tomatoes' },
      { id: 11206, name: 'cucumbers', original: '2 English cucumbers, sliced', amount: 2, unit: 'cucumbers' },
      { id: 1019, name: 'feta cheese', original: '7 oz Greek sheep milk feta', amount: 7, unit: 'oz' },
      { id: 9195, name: 'kalamata olives', original: '1/2 cup pitted kalamata olives', amount: 0.5, unit: 'cup' },
      { id: 4053, name: 'olive oil', original: '3 tbsp extra virgin olive oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Cut tomatoes into bite-sized wedges and slice cucumbers into half-moons.' },
      { number: 2, step: 'Combine vegetables and olives in a shallow serving bowl.' },
      { number: 3, step: 'Place a slab of feta on top, sprinkle with wild dried oregano.' },
      { number: 4, step: 'Drizzle generously with high quality olive oil and red wine vinegar.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 280, unit: 'kcal', percentOfDailyNeeds: 14 },
      { name: 'Protein', amount: 9, unit: 'g', percentOfDailyNeeds: 18 },
      { name: 'Fat', amount: 22, unit: 'g', percentOfDailyNeeds: 34 },
      { name: 'Carbohydrates', amount: 11, unit: 'g', percentOfDailyNeeds: 4 },
      { name: 'Fiber', amount: 3, unit: 'g', percentOfDailyNeeds: 12 }
    ]
  },
  {
    id: 661259,
    title: 'Smoky Slow Cooker Beef Chili with Cheddar & Scallions',
    image: 'https://img.spoonacular.com/recipes/661259-312x231.jpg',
    summary: 'Rich, hearty ground beef and red kidney bean chili simmered with fire-roasted tomatoes, chipotle peppers, and dark cocoa powder.',
    readyInMinutes: 45,
    servings: 6,
    preparationMinutes: 15,
    cookingMinutes: 30,
    cuisines: ['american'],
    dishTypes: ['soup', 'dinner', 'main course'],
    diets: ['gluten free'],
    instructions: '1. Brown ground beef with diced onion. 2. Add spices, tomato sauce, and kidney beans. 3. Simmer until thickened. 4. Serve topped with shredded cheddar.',
    ingredients: [
      { id: 23572, name: 'ground beef', original: '1.5 lbs lean ground beef', amount: 1.5, unit: 'lbs' },
      { id: 16033, name: 'kidney beans', original: '2 cans (15 oz each) dark kidney beans, rinsed', amount: 2, unit: 'cans' },
      { id: 11529, name: 'diced tomatoes', original: '1 can (28 oz) crushed tomatoes', amount: 28, unit: 'oz' },
      { id: 2009, name: 'chili powder', original: '3 tbsp chili powder blend', amount: 3, unit: 'tbsp' },
      { id: 1009, name: 'cheddar cheese', original: '1 cup sharp cheddar, shredded', amount: 1, unit: 'cup' }
    ],
    steps: [
      { number: 1, step: 'Brown beef with chopped onions and minced garlic in a large Dutch oven until caramelized.' },
      { number: 2, step: 'Stir in chili powder, cumin, smoked paprika, and a touch of unsweetened cocoa.' },
      { number: 3, step: 'Add crushed tomatoes, kidney beans, and beef stock, bringing to a simmer.' },
      { number: 4, step: 'Cover and simmer over low heat for 30 minutes, ladle into bowls, and top with cheese.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 460, unit: 'kcal', percentOfDailyNeeds: 23 },
      { name: 'Protein', amount: 38, unit: 'g', percentOfDailyNeeds: 76 },
      { name: 'Fat', amount: 20, unit: 'g', percentOfDailyNeeds: 31 },
      { name: 'Carbohydrates', amount: 32, unit: 'g', percentOfDailyNeeds: 11 }
    ]
  },
  {
    id: 648506,
    title: 'Indian Palak Paneer with Spiced Garlic Naan',
    image: 'https://img.spoonacular.com/recipes/648506-312x231.jpg',
    summary: 'Cubes of fresh Indian cottage cheese lightly pan-seared and gently folded into a velvety pureed spinach gravy seasoned with cumin and garam masala.',
    readyInMinutes: 30,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 20,
    cuisines: ['indian', 'asian'],
    dishTypes: ['dinner', 'main course'],
    diets: ['vegetarian', 'gluten free'],
    instructions: '1. Blanch spinach and puree until smooth. 2. Sauté garlic, ginger, and cumin in ghee. 3. Add spinach puree and spices. 4. Fold in paneer cubes and simmer gently.',
    ingredients: [
      { id: 10011457, name: 'spinach', original: '1 lb fresh baby spinach leaves', amount: 1, unit: 'lb' },
      { id: 98847, name: 'paneer', original: '8 oz paneer cheese, cubed', amount: 8, unit: 'oz' },
      { id: 1001, name: 'ghee', original: '2 tbsp pure ghee or butter', amount: 2, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '4 cloves garlic, crushed', amount: 4, unit: 'cloves' },
      { id: 2015, name: 'garam masala', original: '1 tsp garam masala', amount: 1, unit: 'tsp' }
    ],
    steps: [
      { number: 1, step: 'Blanch spinach in boiling water for 2 minutes, shock in ice water, and blend into a puree.' },
      { number: 2, step: 'Lightly fry paneer cubes in ghee until edges are golden, then set aside.' },
      { number: 3, step: 'In the same pan, fry cumin seeds, minced garlic, ginger, and chopped green chili.' },
      { number: 4, step: 'Pour in spinach puree, stir in garam masala, and simmer gently with paneer cubes for 5 minutes.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 340, unit: 'kcal', percentOfDailyNeeds: 17 },
      { name: 'Protein', amount: 16, unit: 'g', percentOfDailyNeeds: 32 },
      { name: 'Fat', amount: 24, unit: 'g', percentOfDailyNeeds: 37 },
      { name: 'Carbohydrates', amount: 10, unit: 'g', percentOfDailyNeeds: 3 }
    ]
  },
  {
    id: 646512,
    title: 'Hearty Tuscan White Bean and Lacinato Kale Soup',
    image: 'https://img.spoonacular.com/recipes/646512-312x231.jpg',
    summary: 'A rustic Italian soup with creamy cannellini beans, tender dinosaur kale, aromatic mirepoix, and a parmesan rind broth.',
    readyInMinutes: 35,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 25,
    cuisines: ['italian', 'mediterranean'],
    dishTypes: ['soup', 'lunch', 'dinner'],
    diets: ['vegetarian', 'vegan'],
    instructions: '1. Sauté onions, carrots, and celery in olive oil. 2. Add cannellini beans and vegetable stock. 3. Add chopped kale and simmer until tender.',
    ingredients: [
      { id: 16051, name: 'cannellini beans', original: '2 cans (15 oz each) white beans', amount: 2, unit: 'cans' },
      { id: 11233, name: 'kale', original: '1 bunch lacinato kale, stemmed and chopped', amount: 1, unit: 'bunch' },
      { id: 11124, name: 'carrots', original: '2 medium carrots, diced', amount: 2, unit: 'carrots' },
      { id: 6615, name: 'vegetable stock', original: '4 cups vegetable broth', amount: 4, unit: 'cups' },
      { id: 4053, name: 'olive oil', original: '2 tbsp extra virgin olive oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Heat olive oil in a soup pot, sauté carrots, celery, and onions until translucent.' },
      { number: 2, step: 'Stir in minced garlic, rosemary, and white beans with their liquid.' },
      { number: 3, step: 'Pour in broth and simmer for 15 minutes, lightly mashing some beans for thickness.' },
      { number: 4, step: 'Stir in chopped kale leaves and cook for 5 minutes until tender.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 310, unit: 'kcal', percentOfDailyNeeds: 15 },
      { name: 'Protein', amount: 15, unit: 'g', percentOfDailyNeeds: 30 },
      { name: 'Fat', amount: 8, unit: 'g', percentOfDailyNeeds: 12 },
      { name: 'Carbohydrates', amount: 48, unit: 'g', percentOfDailyNeeds: 16 }
    ]
  },
  {
    id: 655219,
    title: 'Sourdough Avocado Toast with Soft Boiled Eggs',
    image: 'https://img.spoonacular.com/recipes/655219-312x231.jpg',
    summary: 'Toasted artisan sourdough bread smeared with ripe avocado, topped with jammy 6-minute eggs, microgreens, and red pepper flakes.',
    readyInMinutes: 15,
    servings: 2,
    preparationMinutes: 5,
    cookingMinutes: 10,
    cuisines: ['american'],
    dishTypes: ['breakfast', 'lunch'],
    diets: ['vegetarian'],
    instructions: '1. Toast sourdough slices until golden. 2. Boil eggs for 6.5 minutes. 3. Mash avocado with lemon juice and sea salt. 4. Spread avocado on toast and top with sliced eggs.',
    ingredients: [
      { id: 9037, name: 'avocado', original: '1 large ripe Hass avocado', amount: 1, unit: 'avocado' },
      { id: 18029, name: 'sourdough bread', original: '2 thick slices rustic sourdough bread', amount: 2, unit: 'slices' },
      { id: 1123, name: 'eggs', original: '2 pasture-raised eggs', amount: 2, unit: 'eggs' },
      { id: 9152, name: 'lemon juice', original: '1 tsp fresh lemon juice', amount: 1, unit: 'tsp' },
      { id: 1032009, name: 'red pepper flakes', original: 'Pinch of red pepper flakes', amount: 1, unit: 'pinch' }
    ],
    steps: [
      { number: 1, step: 'Gently lower cold eggs into boiling water and cook for 6 minutes and 30 seconds.' },
      { number: 2, step: 'Transfer eggs to an ice bath, peel carefully, and slice in half.' },
      { number: 3, step: 'Toast sourdough until crisp, rub with garlic clove if desired.' },
      { number: 4, step: 'Mash avocado with lemon juice and salt, spread on bread, and crown with jammy eggs.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 375, unit: 'kcal', percentOfDailyNeeds: 19 },
      { name: 'Protein', amount: 16, unit: 'g', percentOfDailyNeeds: 32 },
      { name: 'Fat', amount: 21, unit: 'g', percentOfDailyNeeds: 32 },
      { name: 'Carbohydrates', amount: 32, unit: 'g', percentOfDailyNeeds: 11 }
    ]
  },
  {
    id: 633344,
    title: 'Slow Cooker BBQ Pulled Pork on Brioche Buns',
    image: 'https://img.spoonacular.com/recipes/633344-312x231.jpg',
    summary: 'Melt-in-your-mouth pork shoulder slow cooked in apple cider and spice rub, shredded and tossed in tangy sweet barbecue sauce.',
    readyInMinutes: 45,
    servings: 6,
    preparationMinutes: 15,
    cookingMinutes: 30,
    cuisines: ['american'],
    dishTypes: ['dinner', 'main course'],
    diets: [],
    instructions: '1. Rub pork shoulder with brown sugar and smoked paprika. 2. Cook until fork tender. 3. Shred with forks and toss with BBQ sauce. 4. Serve on toasted brioche buns with coleslaw.',
    ingredients: [
      { id: 10084, name: 'pork shoulder', original: '3 lbs pork shoulder roast', amount: 3, unit: 'lbs' },
      { id: 6150, name: 'bbq sauce', original: '1.5 cups hickory barbecue sauce', amount: 1.5, unit: 'cups' },
      { id: 18079, name: 'brioche buns', original: '6 brioche sandwich buns', amount: 6, unit: 'buns' },
      { id: 19334, name: 'brown sugar', original: '2 tbsp dark brown sugar', amount: 2, unit: 'tbsp' },
      { id: 2028, name: 'paprika', original: '1 tbsp smoked paprika', amount: 1, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Coat pork shoulder with brown sugar, paprika, garlic powder, salt, and black pepper.' },
      { number: 2, step: 'Sear pork in a Dutch oven on all sides, then braise in apple cider until falling apart.' },
      { number: 3, step: 'Shred pork with two forks, discarding excess fat.' },
      { number: 4, step: 'Fold in favorite barbecue sauce and heap onto buttered toasted brioche buns.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 560, unit: 'kcal', percentOfDailyNeeds: 28 },
      { name: 'Protein', amount: 44, unit: 'g', percentOfDailyNeeds: 88 },
      { name: 'Fat', amount: 22, unit: 'g', percentOfDailyNeeds: 34 },
      { name: 'Carbohydrates', amount: 46, unit: 'g', percentOfDailyNeeds: 15 }
    ]
  },
  {
    id: 652078,
    title: 'Mexican Street Corn Dip (Warm Elote Skillet)',
    image: 'https://img.spoonacular.com/recipes/652078-312x231.jpg',
    summary: 'Charred sweet corn kernels baked in a creamy cotija, cilantro, jalapeño, and lime cheese dip served with crispy tortilla chips.',
    readyInMinutes: 25,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 15,
    cuisines: ['mexican'],
    dishTypes: ['appetizer', 'snack'],
    diets: ['vegetarian', 'gluten free'],
    instructions: '1. Char corn kernels in cast iron skillet. 2. Fold in mayonnaise, sour cream, cotija, and jalapeños. 3. Bake until bubbling. 4. Serve with tortilla chips.',
    ingredients: [
      { id: 11167, name: 'sweet corn', original: '4 ears fresh corn, shucked and kernels cut', amount: 4, unit: 'ears' },
      { id: 1019, name: 'cotija cheese', original: '1/2 cup crumbled cotija or feta', amount: 0.5, unit: 'cup' },
      { id: 4025, name: 'mayonnaise', original: '1/3 cup mayonnaise', amount: 0.33, unit: 'cup' },
      { id: 11979, name: 'jalapeno', original: '1 jalapeño, seeded and minced', amount: 1, unit: 'jalapeno' },
      { id: 9159, name: 'lime juice', original: '1 tbsp fresh lime juice', amount: 1, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Heat a dry cast-iron skillet over high heat and char corn kernels until slightly blackened.' },
      { number: 2, step: 'Remove from heat and stir in mayonnaise, sour cream, lime juice, and chili powder.' },
      { number: 3, step: 'Fold in crumbled cotija cheese and chopped jalapeño.' },
      { number: 4, step: 'Broil for 3 minutes until bubbly and serve warm with salty tortilla chips.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 260, unit: 'kcal', percentOfDailyNeeds: 13 },
      { name: 'Protein', amount: 6, unit: 'g', percentOfDailyNeeds: 12 },
      { name: 'Fat', amount: 16, unit: 'g', percentOfDailyNeeds: 25 },
      { name: 'Carbohydrates', amount: 26, unit: 'g', percentOfDailyNeeds: 9 }
    ]
  },
  {
    id: 641908,
    title: 'Savory Chicken Fried Rice with Garden Vegetables',
    image: 'https://img.spoonacular.com/recipes/641908-312x231.jpg',
    summary: 'A fast weekday favorite using cold jasmine rice stir-fried in toasted sesame oil, tender chicken, peas, carrots, and soy sauce.',
    readyInMinutes: 20,
    servings: 4,
    preparationMinutes: 5,
    cookingMinutes: 15,
    cuisines: ['chinese', 'asian'],
    dishTypes: ['dinner', 'main course'],
    diets: [],
    instructions: '1. Sauté diced chicken in sesame oil. 2. Push to side, scramble eggs. 3. Add cold cooked rice, peas, and carrots. 4. Season with soy sauce and green onions.',
    ingredients: [
      { id: 20444, name: 'cooked white rice', original: '3 cups day-old cold jasmine rice', amount: 3, unit: 'cups' },
      { id: 5062, name: 'chicken breast', original: '1 cup cooked chicken, diced', amount: 1, unit: 'cup' },
      { id: 11304, name: 'peas and carrots', original: '1 cup frozen peas and diced carrots', amount: 1, unit: 'cup' },
      { id: 1123, name: 'eggs', original: '2 large eggs, beaten', amount: 2, unit: 'eggs' },
      { id: 16124, name: 'soy sauce', original: '3 tbsp reduced-sodium soy sauce', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Heat vegetable oil and sesame oil in a wok over high heat.' },
      { number: 2, step: 'Scramble eggs until soft curds form, then add diced chicken and thawed vegetables.' },
      { number: 3, step: 'Add chilled rice, breaking up clumps with a wooden spoon.' },
      { number: 4, step: 'Drizzle with soy sauce and toss continuously for 4 minutes until rice is piping hot.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 410, unit: 'kcal', percentOfDailyNeeds: 21 },
      { name: 'Protein', amount: 24, unit: 'g', percentOfDailyNeeds: 48 },
      { name: 'Fat', amount: 12, unit: 'g', percentOfDailyNeeds: 18 },
      { name: 'Carbohydrates', amount: 50, unit: 'g', percentOfDailyNeeds: 17 }
    ]
  },
  {
    id: 647572,
    title: 'Crispy Lemon Herb Roasted Chicken Thighs with Baby Potatoes',
    image: 'https://img.spoonacular.com/recipes/647572-312x231.jpg',
    summary: 'Bone-in, skin-on chicken thighs roasted over baby Yukon gold potatoes with fresh rosemary, thyme, garlic, and bright lemon wedges.',
    readyInMinutes: 45,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 35,
    cuisines: ['french', 'european'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free', 'whole30'],
    instructions: '1. Toss potatoes in olive oil and herbs. 2. Season chicken thighs with salt, pepper, and garlic. 3. Arrange in roasting pan. 4. Roast at 425°F for 35 minutes until skin is crackling.',
    ingredients: [
      { id: 5096, name: 'chicken thighs', original: '4 bone-in skin-on chicken thighs', amount: 4, unit: 'thighs' },
      { id: 11362, name: 'potatoes', original: '1 lb baby Yukon gold potatoes, halved', amount: 1, unit: 'lb' },
      { id: 2036, name: 'fresh rosemary', original: '2 sprigs fresh rosemary, chopped', amount: 2, unit: 'sprigs' },
      { id: 9150, name: 'lemon', original: '1 large lemon, sliced into rounds', amount: 1, unit: 'lemon' },
      { id: 4053, name: 'olive oil', original: '3 tbsp extra virgin olive oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Preheat oven to 425°F (220°C).' },
      { number: 2, step: 'Toss halved potatoes with olive oil, rosemary, salt, and pepper in a baking dish.' },
      { number: 3, step: 'Place chicken thighs on top of potatoes, skin-side up, and tuck lemon slices around.' },
      { number: 4, step: 'Roast for 35–40 minutes until skin is deeply golden and chicken reaches 175°F internal temperature.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 490, unit: 'kcal', percentOfDailyNeeds: 25 },
      { name: 'Protein', amount: 36, unit: 'g', percentOfDailyNeeds: 72 },
      { name: 'Fat', amount: 27, unit: 'g', percentOfDailyNeeds: 42 },
      { name: 'Carbohydrates', amount: 25, unit: 'g', percentOfDailyNeeds: 8 }
    ]
  },
  {
    id: 658277,
    title: 'North African Shakshuka with Poached Eggs & Crusty Bread',
    image: 'https://img.spoonacular.com/recipes/658277-312x231.jpg',
    summary: 'A skillet of gently poached farm eggs nestling in a spiced bell pepper, onion, tomato, and cumin sauce topped with fresh cilantro.',
    readyInMinutes: 30,
    servings: 3,
    preparationMinutes: 10,
    cookingMinutes: 20,
    cuisines: ['middle eastern', 'mediterranean'],
    dishTypes: ['breakfast', 'lunch', 'dinner'],
    diets: ['vegetarian', 'gluten free'],
    instructions: '1. Sauté peppers and onions. 2. Add crushed tomatoes, cumin, and paprika. 3. Make wells in the sauce and crack eggs in. 4. Cover and simmer until egg whites are set.',
    ingredients: [
      { id: 1123, name: 'eggs', original: '4 large eggs', amount: 4, unit: 'eggs' },
      { id: 11529, name: 'crushed tomatoes', original: '1 can (14 oz) whole peeled tomatoes, crushed', amount: 14, unit: 'oz' },
      { id: 11821, name: 'red bell pepper', original: '1 large red bell pepper, thinly sliced', amount: 1, unit: 'pepper' },
      { id: 1002014, name: 'cumin', original: '1 tsp ground cumin', amount: 1, unit: 'tsp' },
      { id: 2028, name: 'smoked paprika', original: '1 tsp smoked paprika', amount: 1, unit: 'tsp' }
    ],
    steps: [
      { number: 1, step: 'Heat olive oil in a skillet, soften onions, red peppers, and garlic for 8 minutes.' },
      { number: 2, step: 'Add cumin, paprika, cayenne, and tomatoes, simmering until thickened.' },
      { number: 3, step: 'Use a spoon to create 4 wells in the sauce, crack one egg into each indentation.' },
      { number: 4, step: 'Cover with lid and cook over low heat for 6–8 minutes until whites are firm but yolks remain runny.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 260, unit: 'kcal', percentOfDailyNeeds: 13 },
      { name: 'Protein', amount: 14, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Fat', amount: 15, unit: 'g', percentOfDailyNeeds: 23 },
      { name: 'Carbohydrates', amount: 18, unit: 'g', percentOfDailyNeeds: 6 }
    ]
  },
  {
    id: 637999,
    title: 'Crispy Falafel Mezze Bowl with Lemon Tahini Drizzle',
    image: 'https://img.spoonacular.com/recipes/637999-312x231.jpg',
    summary: 'Freshly fried herbed chickpea falafels served over pearl couscous, diced cucumber-tomato salad, pickled red onions, and nutty tahini.',
    readyInMinutes: 35,
    servings: 3,
    preparationMinutes: 15,
    cookingMinutes: 20,
    cuisines: ['middle eastern', 'mediterranean'],
    dishTypes: ['lunch', 'dinner', 'main course'],
    diets: ['vegan', 'vegetarian'],
    instructions: '1. Blend chickpeas, parsley, cilantro, cumin, and garlic. 2. Form into small patties. 3. Pan fry until deep brown and crisp. 4. Serve over grains with tahini dressing.',
    ingredients: [
      { id: 16057, name: 'chickpeas', original: '2 cups cooked or canned garbanzo beans, drained', amount: 2, unit: 'cups' },
      { id: 11297, name: 'parsley', original: '1/2 cup fresh parsley leaves', amount: 0.5, unit: 'cup' },
      { id: 11165, name: 'cilantro', original: '1/2 cup fresh cilantro leaves', amount: 0.5, unit: 'cup' },
      { id: 12698, name: 'tahini', original: '3 tbsp sesame tahini paste', amount: 3, unit: 'tbsp' },
      { id: 11215, name: 'garlic', original: '3 cloves garlic', amount: 3, unit: 'cloves' }
    ],
    steps: [
      { number: 1, step: 'Pulse chickpeas, herbs, garlic, cumin, coriander, salt, and flour in food processor until crumbly.' },
      { number: 2, step: 'Form mixture into golf ball sized balls and flatten slightly into discs.' },
      { number: 3, step: 'Pan fry in vegetable oil over medium heat for 3–4 minutes per side until deeply crisp.' },
      { number: 4, step: 'Whisk tahini with lemon juice and water, drizzle over falafel patties, and serve with pita.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 410, unit: 'kcal', percentOfDailyNeeds: 21 },
      { name: 'Protein', amount: 17, unit: 'g', percentOfDailyNeeds: 34 },
      { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Carbohydrates', amount: 50, unit: 'g', percentOfDailyNeeds: 17 }
    ]
  },
  {
    id: 640841,
    title: 'Vietnamese Beef Pho Noodle Soup with Fresh Herbs',
    image: 'https://img.spoonacular.com/recipes/640841-312x231.jpg',
    summary: 'A fragrant, crystal-clear beef broth spiced with star anise and cinnamon, served over flat rice noodles, thinly sliced beef, bean sprouts, and Thai basil.',
    readyInMinutes: 45,
    servings: 2,
    preparationMinutes: 15,
    cookingMinutes: 30,
    cuisines: ['vietnamese', 'asian'],
    dishTypes: ['soup', 'dinner', 'main course'],
    diets: ['gluten free'],
    instructions: '1. Simmer beef broth with charred ginger, onion, star anise, and cinnamon. 2. Cook flat rice noodles. 3. Place raw sliced beef over noodles. 4. Ladle boiling broth over beef to cook delicately.',
    ingredients: [
      { id: 20133, name: 'rice noodles', original: '8 oz pho rice noodles', amount: 8, unit: 'oz' },
      { id: 23572, name: 'beef sirloin', original: '1/2 lb beef sirloin, paper-thin sliced', amount: 0.5, unit: 'lb' },
      { id: 6008, name: 'beef broth', original: '5 cups high quality beef stock', amount: 5, unit: 'cups' },
      { id: 2044, name: 'thai basil', original: '1/2 cup fresh Thai basil', amount: 0.5, unit: 'cup' },
      { id: 11043, name: 'bean sprouts', original: '1 cup fresh bean sprouts', amount: 1, unit: 'cup' }
    ],
    steps: [
      { number: 1, step: 'Char ginger and onion over open flame, add to simmering beef broth with star anise, cloves, and cinnamon.' },
      { number: 2, step: 'Simmer broth for 30 minutes, strain, and season with fish sauce and rock sugar.' },
      { number: 3, step: 'Cook rice noodles and place into warm serving bowls.' },
      { number: 4, step: 'Layer raw beef slices on top, pour piping-hot boiling broth directly over to cook instantly, and garnish with herbs.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 480, unit: 'kcal', percentOfDailyNeeds: 24 },
      { name: 'Protein', amount: 36, unit: 'g', percentOfDailyNeeds: 72 },
      { name: 'Fat', amount: 14, unit: 'g', percentOfDailyNeeds: 22 },
      { name: 'Carbohydrates', amount: 55, unit: 'g', percentOfDailyNeeds: 18 }
    ]
  },
  {
    id: 651998,
    title: 'Golden Fluffy Buttermilk Blueberry Pancakes',
    image: 'https://img.spoonacular.com/recipes/651998-312x231.jpg',
    summary: 'Tender, mile-high stack of scratch buttermilk pancakes studded with fresh sweet blueberries and served with pure Vermont maple syrup.',
    readyInMinutes: 20,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 10,
    cuisines: ['american'],
    dishTypes: ['breakfast'],
    diets: ['vegetarian'],
    instructions: '1. Whisk dry ingredients. 2. Combine buttermilk, melted butter, and eggs. 3. Mix batter gently leaving small lumps. 4. Cook on griddle dropping blueberries on top.',
    ingredients: [
      { id: 20081, name: 'flour', original: '2 cups all-purpose flour', amount: 2, unit: 'cups' },
      { id: 1230, name: 'buttermilk', original: '1.75 cups cultured buttermilk', amount: 1.75, unit: 'cups' },
      { id: 9050, name: 'blueberries', original: '1 cup fresh organic blueberries', amount: 1, unit: 'cup' },
      { id: 1123, name: 'eggs', original: '2 large eggs', amount: 2, unit: 'eggs' },
      { id: 1001, name: 'butter', original: '3 tbsp melted butter', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Whisk flour, sugar, baking powder, baking soda, and salt together.' },
      { number: 2, step: 'Whisk buttermilk, eggs, and melted butter in another bowl, then fold into dry mix until just moistened.' },
      { number: 3, step: 'Ladle batter onto a hot buttered griddle at 350°F and sprinkle blueberries onto each pancake.' },
      { number: 4, step: 'Flip when bubbles form on the surface, cooking another 2 minutes until golden.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 360, unit: 'kcal', percentOfDailyNeeds: 18 },
      { name: 'Protein', amount: 10, unit: 'g', percentOfDailyNeeds: 20 },
      { name: 'Fat', amount: 11, unit: 'g', percentOfDailyNeeds: 17 },
      { name: 'Carbohydrates', amount: 56, unit: 'g', percentOfDailyNeeds: 19 }
    ]
  },
  {
    id: 663559,
    title: 'Classic Caesar Salad with Sourdough Croutons & Shaved Parmesan',
    image: 'https://img.spoonacular.com/recipes/663559-312x231.jpg',
    summary: 'Crisp hearts of romaine lettuce tossed in a creamy garlic, anchovy, and lemon dressing, topped with crisp homemade croutons and aged Parmigiano-Reggiano.',
    readyInMinutes: 20,
    servings: 4,
    preparationMinutes: 15,
    cookingMinutes: 5,
    cuisines: ['american', 'italian'],
    dishTypes: ['salad', 'appetizer'],
    diets: ['vegetarian'],
    instructions: '1. Toast sourdough cubes in olive oil until crisp. 2. Whisk garlic, lemon juice, Dijon, egg yolk, and olive oil into dressing. 3. Toss with crisp romaine. 4. Top with parmesan.',
    ingredients: [
      { id: 10111251, name: 'romaine lettuce', original: '2 large heads romaine, chopped', amount: 2, unit: 'heads' },
      { id: 1033, name: 'parmesan cheese', original: '1/2 cup freshly shaved parmesan', amount: 0.5, unit: 'cup' },
      { id: 18029, name: 'sourdough bread', original: '2 cups cubed sourdough bread', amount: 2, unit: 'cups' },
      { id: 11215, name: 'garlic', original: '2 cloves garlic, finely grated', amount: 2, unit: 'cloves' },
      { id: 9152, name: 'lemon juice', original: '2 tbsp fresh lemon juice', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Toss sourdough cubes with olive oil and bake at 375°F for 10 minutes until crunchy.' },
      { number: 2, step: 'Whisk grated garlic, lemon juice, Worcestershire, Dijon mustard, and olive oil into an emulsion.' },
      { number: 3, step: 'Toss cold, crisp romaine lettuce in a wide bowl with the Caesar dressing.' },
      { number: 4, step: 'Finish with generous shaved parmesan ribbons and toasted croutons.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 240, unit: 'kcal', percentOfDailyNeeds: 12 },
      { name: 'Protein', amount: 8, unit: 'g', percentOfDailyNeeds: 16 },
      { name: 'Fat', amount: 16, unit: 'g', percentOfDailyNeeds: 25 },
      { name: 'Carbohydrates', amount: 17, unit: 'g', percentOfDailyNeeds: 6 }
    ]
  },
  {
    id: 657279,
    title: 'Quinoa Buddha Bowl with Roasted Spiced Chickpeas',
    image: 'https://img.spoonacular.com/recipes/657279-312x231.jpg',
    summary: 'A nourishing plant-powered bowl of fluffy quinoa, crispy roasted turmeric chickpeas, sliced avocado, shaved radishes, and lemon tahini dressing.',
    readyInMinutes: 30,
    servings: 2,
    preparationMinutes: 10,
    cookingMinutes: 20,
    cuisines: ['mediterranean'],
    dishTypes: ['lunch', 'dinner', 'main course'],
    diets: ['vegan', 'vegetarian', 'gluten free'],
    instructions: '1. Roast chickpeas with paprika at 400°F for 20 minutes. 2. Cook quinoa in broth. 3. Assemble bowls with vegetables and quinoa. 4. Drizzle with lemon tahini dressing.',
    ingredients: [
      { id: 20035, name: 'quinoa', original: '1 cup dry tricolor quinoa', amount: 1, unit: 'cup' },
      { id: 16057, name: 'chickpeas', original: '1 can (15 oz) chickpeas, rinsed and dried', amount: 1, unit: 'can' },
      { id: 9037, name: 'avocado', original: '1 ripe avocado, sliced', amount: 1, unit: 'avocado' },
      { id: 12698, name: 'tahini', original: '2 tbsp sesame tahini', amount: 2, unit: 'tbsp' },
      { id: 9152, name: 'lemon juice', original: '1 tbsp lemon juice', amount: 1, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Toss dried chickpeas with olive oil, smoked paprika, cumin, and salt, then roast at 400°F until crunchy.' },
      { number: 2, step: 'Cook quinoa in vegetable broth for 15 minutes, remove from heat, and fluff with fork.' },
      { number: 3, step: 'Arrange warm quinoa in bowls surrounded by sliced avocado, cucumber ribbons, and crispy chickpeas.' },
      { number: 4, step: 'Whisk tahini with lemon juice and warm water, then drizzle over the bowl.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 440, unit: 'kcal', percentOfDailyNeeds: 22 },
      { name: 'Protein', amount: 16, unit: 'g', percentOfDailyNeeds: 32 },
      { name: 'Fat', amount: 18, unit: 'g', percentOfDailyNeeds: 28 },
      { name: 'Carbohydrates', amount: 58, unit: 'g', percentOfDailyNeeds: 19 }
    ]
  },
  {
    id: 641803,
    title: 'Creamy Wild Mushroom & White Truffle Risotto',
    image: 'https://img.spoonacular.com/recipes/641803-312x231.jpg',
    summary: 'Slowly stirred Italian Arborio rice cooked in rich vegetable broth with sautéed cremini, shiitake, and chanterelle mushrooms, white wine, and butter.',
    readyInMinutes: 40,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 30,
    cuisines: ['italian'],
    dishTypes: ['dinner', 'main course'],
    diets: ['vegetarian', 'gluten free'],
    instructions: '1. Sauté mushrooms until caramelized, remove. 2. Toast arborio rice in shallot butter. 3. Add white wine, then ladle hot broth gradually while stirring. 4. Finish with mushrooms and parmesan.',
    ingredients: [
      { id: 10020052, name: 'arborio rice', original: '1.5 cups arborio rice', amount: 1.5, unit: 'cups' },
      { id: 11260, name: 'mushrooms', original: '1/2 lb mixed wild mushrooms, sliced', amount: 0.5, unit: 'lb' },
      { id: 14106, name: 'white wine', original: '1/2 cup dry white wine', amount: 0.5, unit: 'cup' },
      { id: 1033, name: 'parmesan cheese', original: '1/2 cup freshly grated Parmigiano-Reggiano', amount: 0.5, unit: 'cup' },
      { id: 1001, name: 'butter', original: '3 tbsp unsalted butter', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Sauté mushrooms in 1 tbsp butter over medium heat until browned and tender, then set aside.' },
      { number: 2, step: 'In the same pan, soften minced shallots in butter and toast arborio rice for 2 minutes.' },
      { number: 3, step: 'Deglaze with white wine, then ladle warm broth one cup at a time, stirring constantly until absorbed.' },
      { number: 4, step: 'When rice is al dente and creamy, fold in mushrooms, remaining butter, parmesan, and cracked pepper.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 460, unit: 'kcal', percentOfDailyNeeds: 23 },
      { name: 'Protein', amount: 12, unit: 'g', percentOfDailyNeeds: 24 },
      { name: 'Fat', amount: 15, unit: 'g', percentOfDailyNeeds: 23 },
      { name: 'Carbohydrates', amount: 65, unit: 'g', percentOfDailyNeeds: 22 }
    ]
  },
  {
    id: 639601,
    title: 'Classic French Onion Soup with Melted Gruyère Crostini',
    image: 'https://img.spoonacular.com/recipes/639601-312x231.jpg',
    summary: 'Slowly caramelized yellow onions in a rich beef and sherry broth, crowned with toasted French baguette and bubbling broiled Gruyère cheese.',
    readyInMinutes: 50,
    servings: 4,
    preparationMinutes: 10,
    cookingMinutes: 40,
    cuisines: ['french', 'european'],
    dishTypes: ['soup', 'appetizer'],
    diets: [],
    instructions: '1. Caramelize sliced onions in butter for 30 minutes. 2. Deglaze with sherry. 3. Add beef stock, thyme, and bay leaf. 4. Ladle into oven-safe crocks, top with baguette and Gruyère, and broil.',
    ingredients: [
      { id: 11282, name: 'yellow onions', original: '4 large yellow onions, thinly sliced', amount: 4, unit: 'onions' },
      { id: 6008, name: 'beef broth', original: '6 cups rich beef stock', amount: 6, unit: 'cups' },
      { id: 1023, name: 'gruyere cheese', original: '1.5 cups shredded Gruyère cheese', amount: 1.5, unit: 'cups' },
      { id: 18029, name: 'french baguette', original: '4 thick slices toasted French baguette', amount: 4, unit: 'slices' },
      { id: 1001, name: 'butter', original: '3 tbsp unsalted butter', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Caramelize onions slowly in butter and salt over medium-low heat for 35 minutes until deep mahogany.' },
      { number: 2, step: 'Deglaze pan with dry sherry wine, scraping up browned fond.' },
      { number: 3, step: 'Pour in beef stock and fresh thyme, simmering gently for 20 minutes.' },
      { number: 4, step: 'Ladle soup into oven-safe bowls, place toasted baguette on top, cover with Gruyère, and broil until bubbling.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 380, unit: 'kcal', percentOfDailyNeeds: 19 },
      { name: 'Protein', amount: 18, unit: 'g', percentOfDailyNeeds: 36 },
      { name: 'Fat', amount: 19, unit: 'g', percentOfDailyNeeds: 29 },
      { name: 'Carbohydrates', amount: 34, unit: 'g', percentOfDailyNeeds: 11 }
    ]
  },
  {
    id: 648320,
    title: 'Baked Chicken Enchiladas with Tangy Salsa Verde',
    image: 'https://img.spoonacular.com/recipes/648320-312x231.jpg',
    summary: 'Corn tortillas filled with seasoned shredded chicken and jack cheese, baked under a vibrant tomatillo salsa verde and topped with crema.',
    readyInMinutes: 40,
    servings: 4,
    preparationMinutes: 15,
    cookingMinutes: 25,
    cuisines: ['mexican'],
    dishTypes: ['dinner', 'main course'],
    diets: ['gluten free'],
    instructions: '1. Mix shredded chicken with spices and cheese. 2. Roll into warm corn tortillas. 3. Lay in baking dish and cover with salsa verde and cheese. 4. Bake at 375°F for 20 minutes.',
    ingredients: [
      { id: 5062, name: 'shredded chicken', original: '3 cups cooked shredded chicken', amount: 3, unit: 'cups' },
      { id: 18364, name: 'corn tortillas', original: '10 corn tortillas', amount: 10, unit: 'tortillas' },
      { id: 10011595, name: 'salsa verde', original: '2 cups roasted tomatillo salsa verde', amount: 2, unit: 'cups' },
      { id: 1001025, name: 'monterey jack cheese', original: '2 cups Monterey Jack cheese, shredded', amount: 2, unit: 'cups' },
      { id: 1056, name: 'sour cream', original: '1/3 cup sour cream for drizzling', amount: 0.33, unit: 'cup' }
    ],
    steps: [
      { number: 1, step: 'Dip corn tortillas in warm salsa to soften, then fill with shredded chicken and shredded jack cheese.' },
      { number: 2, step: 'Roll tightly and place seam-side down in a 9x13 inch baking dish.' },
      { number: 3, step: 'Pour remaining salsa verde over enchiladas and blanket with cheese.' },
      { number: 4, step: 'Bake at 375°F for 20 minutes until cheese is bubbly and lightly browned.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 530, unit: 'kcal', percentOfDailyNeeds: 27 },
      { name: 'Protein', amount: 42, unit: 'g', percentOfDailyNeeds: 84 },
      { name: 'Fat', amount: 24, unit: 'g', percentOfDailyNeeds: 37 },
      { name: 'Carbohydrates', amount: 36, unit: 'g', percentOfDailyNeeds: 12 }
    ]
  },
  {
    id: 652976,
    title: 'Warm Molten Dark Chocolate Lava Cakes',
    image: 'https://img.spoonacular.com/recipes/652976-312x231.jpg',
    summary: 'Individual French chocolate cakes with a delicate cake crust and a decadent, flowing molten chocolate center, dusted with powdered sugar.',
    readyInMinutes: 25,
    servings: 2,
    preparationMinutes: 10,
    cookingMinutes: 15,
    cuisines: ['french'],
    dishTypes: ['dessert'],
    diets: ['vegetarian'],
    instructions: '1. Melt dark chocolate and butter. 2. Whisk eggs and sugar until pale. 3. Fold chocolate and a little flour into eggs. 4. Bake in ramekins at 425°F for 12 minutes.',
    ingredients: [
      { id: 10019904, name: 'dark chocolate', original: '4 oz bittersweet dark chocolate (70%)', amount: 4, unit: 'oz' },
      { id: 1001, name: 'butter', original: '1/2 cup unsalted butter', amount: 0.5, unit: 'cup' },
      { id: 1123, name: 'eggs', original: '2 whole eggs plus 2 egg yolks', amount: 2, unit: 'eggs' },
      { id: 19335, name: 'sugar', original: '1/3 cup granulated sugar', amount: 0.33, unit: 'cup' },
      { id: 20081, name: 'flour', original: '2 tbsp all-purpose flour', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      { number: 1, step: 'Butter two 6-oz ceramic ramekins and dust interior with cocoa powder.' },
      { number: 2, step: 'Gently melt dark chocolate and butter together in microwave or double boiler.' },
      { number: 3, step: 'Whisk eggs, yolks, sugar, and pinch of salt until pale and thickened.' },
      { number: 4, step: 'Fold melted chocolate and flour into eggs, divide into ramekins, and bake at 425°F for 12 minutes until edges are set.' }
    ],
    nutrients: [
      { name: 'Calories', amount: 480, unit: 'kcal', percentOfDailyNeeds: 24 },
      { name: 'Protein', amount: 7, unit: 'g', percentOfDailyNeeds: 14 },
      { name: 'Fat', amount: 34, unit: 'g', percentOfDailyNeeds: 52 },
      { name: 'Carbohydrates', amount: 40, unit: 'g', percentOfDailyNeeds: 13 }
    ]
  }
];
