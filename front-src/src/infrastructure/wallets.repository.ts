/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from "tsyringe";
import Bank from "../domain/bank";
import Wallet from "../domain/wallet";
import CreateWalletDTO from "./dtos/create-wallet.dto";
import UpdateWalletDTO from "./dtos/update-wallet.dto";
import ImageMapper from "./image-mapper";
import StrapiClient from "./strapi/strapi-client";
import { SingularTypeResponse } from "./strapi/types";

@injectable()
export default class WalletsRepository {
  constructor(private readonly _strapiClient: StrapiClient) {}

  create(dto: CreateWalletDTO): Promise<Wallet> {
    return this._strapiClient
      .create(
        "api::payment-method.payment-method",
        "payment-methods",
        dto as any,
      )
      .then((resp) => this.map(resp.data));
  }

  delete(id: string) {
    return this._strapiClient.delete("payment-methods", id);
  }

  update(dto: UpdateWalletDTO) {
    const { id, ...data } = dto;
    return this._strapiClient
      .update(
        "api::payment-method.payment-method",
        "payment-methods",
        id,
        data as any,
      )
      .then((resp) => this.map(resp.data));
  }

  private map(
    wallet: SingularTypeResponse<"api::payment-method.payment-method">["data"],
  ) {
    return new Wallet({
      id: wallet.documentId,
      bank: new Bank({
        id: wallet.bank?.documentId,
        name: wallet.bank?.name,
        icon: wallet.bank?.icon
          ? ImageMapper.strapiToImage(wallet.bank?.icon).getBiggest()
          : "",
      } as any),
      card: wallet.card,
      expiration: wallet.expiration,
      fullname: wallet.fullname,
      limit: wallet.limit,
      requestsPerDay: wallet.requests_per_day,
      telegram: wallet.telegram,
      state: wallet.state,
      name: wallet.name,
    } as any);
  }
}
