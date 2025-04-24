import { injectable } from "tsyringe";
import { Deposit } from "../domain/deposit";
import DepositStatus from "../domain/enums/deposit-status.enum";
import StrapiClient from "./strapi/strapi-client";
import { SingularTypeResponse } from "./strapi/types";

@injectable()
export default class DepositsRepository {
  constructor(private readonly _strapiCLient: StrapiClient) {}

  create(amount: number, userId: string) {
    return this._strapiCLient.create("api::deposit.deposit", "deposits", {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      profile: userId as any,
      amount,
      deposit_id: Math.round(Math.random() * 10000 + 10000),
    });
  }

  getUserDeposits(token: string) {
    return this._strapiCLient
      .findAll("api::deposit.deposit", "deposits", {
        filters: {
          profile: {
            token: { $eq: token },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        },
        sort: ["createdAt:desc"],
      })
      .then((resp) => resp.data.map((deposit) => this.map(deposit)));
  }

  private map(
    deposit: SingularTypeResponse<"api::deposit.deposit">["data"],
  ): Deposit {
    return new Deposit(
      deposit.documentId,
      deposit.deposit_id ?? 0,
      deposit.amount ?? 0,
      new Date(deposit.createdAt ?? new Date()),
      (deposit.state as DepositStatus) ?? DepositStatus.pending,
    );
  }
}
