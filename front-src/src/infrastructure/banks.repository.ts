import { injectable } from "tsyringe";
import Bank from "../domain/bank";
import ImageMapper from "./image-mapper";
import { StrapiGetManyRequestOptions } from "./strapi/request-options";
import StrapiClient from "./strapi/strapi-client";
import { PaginationMetadata, SingularTypeResponse } from "./strapi/types";

export type FindAllCategoryOptions = Omit<
  StrapiGetManyRequestOptions<"api::bank.bank">,
  "populate"
>;

@injectable()
export default class BanksRepository {
  constructor(private readonly _strapiClient: StrapiClient) {}

  findAll(
    options?: FindAllCategoryOptions,
  ): Promise<[Bank[], PaginationMetadata]> {
    return this._strapiClient
      .findAll("api::bank.bank", "banks", {
        populate: ["icon"],
        ...options,
      })
      .then((response) => [
        response.data.map((b) => this.map(b)),
        response.meta.pagination,
      ]);
  }

  public map(bank: SingularTypeResponse<"api::bank.bank">["data"]): Bank {
    return new Bank({
      id: bank.documentId,
      name: bank.name ?? "",
      icon: ImageMapper.strapiToImage(bank.icon).getBiggest()!,
    });
  }
}
