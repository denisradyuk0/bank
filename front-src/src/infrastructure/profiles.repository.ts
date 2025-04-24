/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from "crypto";
import { injectable } from "tsyringe";
import Bank from "../domain/bank";
import Profile from "../domain/profile";
import Wallet from "../domain/wallet";
import ImageMapper from "./image-mapper";
import { StrapiGetOneRequestOptions } from "./strapi/request-options";
import StrapiClient from "./strapi/strapi-client";
import { SingularTypeResponse } from "./strapi/types";

@injectable()
export default class ProfilesRepository {
  constructor(private readonly _stapiClient: StrapiClient) {}

  save(profile: Profile): Promise<void> {
    const { id, qr_code, banks, ...updateData } = profile;
    return this._stapiClient
      .update("api::profile.profile", "profiles", profile.id, updateData as any)
      .then(() => undefined);
  }

  addWallet(userId: string, walletId: string): Promise<void> {
    return this._stapiClient
      .update("api::profile.profile", "profiles", userId, {
        wallets: { connect: walletId } as any,
      })
      .then(() => undefined);
  }

  findOne(
    options: StrapiGetOneRequestOptions<"api::profile.profile">,
  ): Promise<Profile> {
    return this._stapiClient
      .findAll("api::profile.profile", "profiles", options)
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          throw new Error("{ statusCode: 404, message: 'Profile not found' }");
        }
        return this.map(response.data[0]!);
      });
  }

  map(profile: SingularTypeResponse<"api::profile.profile">["data"]): Profile {
    return new Profile({
      id: profile.documentId,
      api_token: profile.api_token ?? "",
      balance: profile.balance ?? 0,
      comment: profile.comment,
      currency: profile.currency ?? "usdt",
      token: profile.token ?? randomUUID(),
      traffic_enabled: profile.traffic_enabled ?? true,
      api_enabled: profile.api_enabled ?? false,
      rate_in: profile.rate_in as any,
      rate_out: profile.rate_out as any,
      wallet_code: profile.wallet_code,
      qr_code: ImageMapper.strapiToImage(profile?.qr_code).getBiggest() ?? "",
      wallets: profile.wallets?.map(
        ((
          wallet: SingularTypeResponse<"api::payment-method.payment-method">["data"],
        ) =>
          new Wallet({
            id: wallet.documentId,
            bank: new Bank({
              id: wallet.bank?.documentId,
              name: wallet.bank?.name,
              icon: ImageMapper.strapiToImage(
                wallet.bank?.icon as any,
              ).getBiggest(),
            } as any),
            card: wallet.card,
            name: wallet.name,
            state: wallet.state,
            expiration: wallet.expiration,
            fullname: wallet.fullname,
            limit: wallet.limit,
            requestsPerDay: wallet.requests_per_day,
            telegram: wallet.telegram,
          } as any) as any) as any,
      ) as any,
      banks: profile?.banks?.map(
        ((bank: SingularTypeResponse<"api::bank.bank">["data"]) =>
          new Bank({
            id: bank?.documentId,
            name: bank?.name,
            icon: ImageMapper.strapiToImage(bank?.icon as any).getBiggest(),
          } as any)) as any,
      ),
    } as any);
  }
}
