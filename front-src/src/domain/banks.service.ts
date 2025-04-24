import { injectable } from "tsyringe";
import BanksRepository from "../infrastructure/banks.repository";

@injectable()
export default class BanksService {
  constructor(private readonly _banksRepository: BanksRepository) {}

  findAll() {
    return this._banksRepository.findAll();
  }
}
