// Repositories
import { userRepository, type UserRepository } from './repositories/user.repository.js';
import { tokenRepository, type TokenRepository } from './repositories/token.repository.js';
import { favoriteRepository, type FavoriteRepository } from './repositories/favorite.repository.js';
import type { IUserRepository, ITokenRepository, IFavoriteRepository } from './interfaces/index.js';

// Providers
import { spoonacularService } from './services/provider/spoonacular.service.js';
import type { IRecipeProvider } from './interfaces/index.js';

// Services
import { UserService } from './services/user.service.js';
import { TokenService } from './services/token.service.js';
import { RecipeService } from './services/recipe.service.js';
import { FavoriteService } from './services/favorite.service.js';
import type { IUserService, ITokenService, IRecipeService, IFavoriteService } from './interfaces/index.js';

// Controllers
import { AuthController } from './controllers/auth.controller.js';
import { RecipeController } from './controllers/recipe.controller.js';
import { FavoriteController } from './controllers/favorite.controller.js';

export interface IDependencyContainer {
  // Repositories
  userRepository: IUserRepository;
  tokenRepository: ITokenRepository;
  favoriteRepository: IFavoriteRepository;

  // Providers
  recipeProvider: IRecipeProvider;

  // Services
  userService: IUserService;
  tokenService: ITokenService;
  recipeService: IRecipeService;
  favoriteService: IFavoriteService;

  // Controllers
  authController: AuthController;
  recipeController: RecipeController;
  favoriteController: FavoriteController;
}

export class DependencyContainer implements IDependencyContainer {
  // Repositories
  public readonly userRepository: IUserRepository;
  public readonly tokenRepository: ITokenRepository;
  public readonly favoriteRepository: IFavoriteRepository;

  // Providers
  public readonly recipeProvider: IRecipeProvider;

  // Services
  public readonly userService: IUserService;
  public readonly tokenService: ITokenService;
  public readonly recipeService: IRecipeService;
  public readonly favoriteService: IFavoriteService;

  // Controllers
  public readonly authController: AuthController;
  public readonly recipeController: RecipeController;
  public readonly favoriteController: FavoriteController;

  constructor() {
    // 1. Initialize Repositories
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
    this.favoriteRepository = favoriteRepository;

    // 2. Initialize Providers
    this.recipeProvider = spoonacularService;

    // 3. Initialize Services with injected Repositories & Providers (DIP)
    this.userService = new UserService(this.userRepository);
    this.tokenService = new TokenService(this.tokenRepository);
    this.recipeService = new RecipeService(this.recipeProvider);
    this.favoriteService = new FavoriteService(this.favoriteRepository, this.recipeService);

    // 4. Initialize Controllers with injected Services (IoC)
    this.authController = new AuthController(this.userService, this.tokenService);
    this.recipeController = new RecipeController(this.recipeService);
    this.favoriteController = new FavoriteController(this.favoriteService);
  }
}

// Singleton composition root instance
export const container = new DependencyContainer();
