import { injectable } from "tsyringe";
import ProfilesRepository from "../infrastructure/profiles.repository";
import { StrapiGetOneRequestOptions } from "../infrastructure/strapi/request-options";
import Profile from "./profile";
import TokenService from "./token.service";

function generateRandomString() {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

@injectable()
export default class ProfileService {
  constructor(
    private readonly _profilesRepo: ProfilesRepository,
    private readonly _tokenService: TokenService,
  ) {}

  getUserInfo(token: string): Promise<Profile> {
    return this._profilesRepo.findOne({
      filters: {
        token: { $eq: token },
      },
      populate: [
        "qr_code",
        "wallets",
        "wallets.bank",
        "wallets.bank.icon",
        "banks",
        "banks.icon",
      ],
    } as StrapiGetOneRequestOptions<"api::profile.profile">);
  }

  async getCurrentUserOrRedirectToLogin(): Promise<Profile> {
    const token = await this._tokenService.getTokenOrRedirectToLogin();
    return this._profilesRepo.findOne({
      filters: {
        token: { $eq: token },
      },
      populate: [
        "qr_code",
        "wallets",
        "wallets.bank",
        "wallets.bank.icon",
        "banks",
        "banks.icon",
      ],
    } as StrapiGetOneRequestOptions<"api::profile.profile">);
  }

  async ensureApiToken(p: Profile): Promise<void> {
    if (p.api_token.trim() === "") {
      p.api_token = generateRandomString();
      await this._profilesRepo.save(p);
    }
  }

  async setUserTraffic(token: string, value: boolean): Promise<void> {
    const user = await this.getUserInfo(token);
    user.traffic_enabled = value;
    this._profilesRepo.save(user);
  }
}
