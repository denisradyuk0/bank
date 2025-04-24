/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from "tsyringe";
import CreateWalletDTO from "../infrastructure/dtos/create-wallet.dto";
import UpdateWalletDTO from "../infrastructure/dtos/update-wallet.dto";
import ProfilesRepository from "../infrastructure/profiles.repository";
import { StrapiGetOneRequestOptions } from "../infrastructure/strapi/request-options";
import WalletsRepository from "../infrastructure/wallets.repository";
import ProfileService from "./profile.service";
import Wallet from "./wallet";

@injectable()
export default class WalletsService {
  constructor(
    private readonly _profilesRepository: ProfilesRepository,
    private readonly _userService: ProfileService,
    private readonly _walletsRepository: WalletsRepository,
  ) {}

  getUserWallets(token: string): Promise<Wallet[]> {
    return this._profilesRepository
      .findOne({
        filters: {
          token: { $eq: token },
        },
        populate: {
          wallets: {
            populate: ["bank", "bank.icon"],
          },
        },
      } as StrapiGetOneRequestOptions<"api::profile.profile">)
      .then((resp) => {
        if (!resp || !resp.wallets) {
          throw new Error("wallets not found");
        }
        return resp.wallets;
      });
  }

  async create(dto: CreateWalletDTO) {
    const user = await this._userService.getCurrentUserOrRedirectToLogin();
    const wallet = await this._walletsRepository.create({
      ...dto,
      profile: user.id,
    } as any);
    return wallet;
  }

  update(dto: UpdateWalletDTO) {
    return this._walletsRepository.update(dto);
  }

  delete(id: string) {
    return this._walletsRepository.delete(id);
  }
}
