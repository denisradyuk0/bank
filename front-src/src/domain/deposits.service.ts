import { injectable } from "tsyringe";
import DepositsRepository from "../infrastructure/deposits.repository";
import Profile from "./profile";

@injectable()
export default class DepositsService {
  constructor(private readonly _depositsRepo: DepositsRepository) {}

  async getUserDeposits(token: string) {
    return this._depositsRepo.getUserDeposits(token);
  }

  async addPendingDeposit(amount: number, user: Profile) {
    return this._depositsRepo.create(amount, user.id);
  }
}
