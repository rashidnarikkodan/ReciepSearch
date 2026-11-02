import type { Request, Response } from 'express';
import type { IUserService, ITokenService } from '../interfaces/index.js';
import { ResponseFactory } from '../core/response/response.factory.js';
import { UnauthorizedError } from '../errors/index.js';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  AUTH_CONSTANTS,
  getAuthCookieOptions,
} from '../constants/index.js';
import type { RegisterRequestDto, LoginRequestDto } from '../dtos/auth.dto.js';

export class AuthController {
  constructor(
    private readonly userService: IUserService,
    private readonly tokenService: ITokenService
  ) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.register(req.body as RegisterRequestDto);
    const token = await this.tokenService.createToken(user.id);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, token, getAuthCookieOptions(isProduction));

    ResponseFactory.created(res, { user, token }, SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.login(req.body as LoginRequestDto);
    const token = await this.tokenService.createToken(user.id);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(AUTH_CONSTANTS.COOKIE_NAME, token, getAuthCookieOptions(isProduction));

    ResponseFactory.success(res, { user, token }, SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS);
  };

  public getMe = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
    }

    const user = await this.userService.getMe(String(userId));

    ResponseFactory.success(res, { user });
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies?.[AUTH_CONSTANTS.COOKIE_NAME];

    if (token) {
      await this.tokenService.revokeToken(token);
    }

    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie(AUTH_CONSTANTS.COOKIE_NAME, getAuthCookieOptions(isProduction));

    ResponseFactory.success(res, undefined, SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS);
  };
}
