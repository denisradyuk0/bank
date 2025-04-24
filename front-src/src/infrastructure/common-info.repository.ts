import { injectable } from "tsyringe";
import CommonInfo from "../domain/common-info";
import ImageMapper from "./image-mapper";
import StrapiClient from "./strapi/strapi-client";
import { SingularTypeResponse } from "./strapi/types";

@injectable()
export default class CommonInfoRepository {
  constructor(private readonly _strapiClient: StrapiClient) {}

  find(): Promise<CommonInfo> {
    return this._strapiClient
      .getTheOne("api::config.config", "config", { populate: ["wallet_qr"] })
      .then((resp) => this.map(resp.data));
  }

  private map(info: SingularTypeResponse<"api::config.config">["data"]) {
    return new CommonInfo({
      id: info.documentId,
      rate_in: info.rate_in ?? 0,
      rate_out: info.rate_out ?? 0,
      wallet_code: info.wallet_code ?? "",
      wallet_qr: ImageMapper.strapiToImage(info.wallet_qr).getBiggest()!,
      bot: info.bot ?? "",
    });
  }
}
