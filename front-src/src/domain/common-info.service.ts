import { injectable } from "tsyringe";
import CommonInfoRepository from "../infrastructure/common-info.repository";
import CommonInfo from "./common-info";

@injectable()
export default class CommonInfoService {
  constructor(private readonly _commonInfoRepo: CommonInfoRepository) {}

  getCommonInfo(): Promise<CommonInfo> {
    return this._commonInfoRepo.find();
  }
}
