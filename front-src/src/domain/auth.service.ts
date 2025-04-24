import { cookies } from "next/headers";
import { injectable } from "tsyringe";
import ProfileService from "./profile.service";
import TokenService from "./token.service";

@injectable()
export default class AuthService {
  constructor(
    private readonly _userService: ProfileService,
    private readonly _tokenService: TokenService,
  ) {}

  async auth(token: string) {
    const user = await this._userService.getUserInfo(token);
    await this._userService.ensureApiToken(user);

    if (!user) throw new Error();
    const userCookies = await cookies();
    return userCookies.set("token", token);
  }

  isAuthorized(): Promise<boolean> {
    return this._tokenService.getToken().then((token) => {
      if (!token) return false;
      return this._userService.getUserInfo(token).then((p) => !!p);
    });
  }

  logout() {
    return cookies().then((c) => c.delete("token"));
  }
}
