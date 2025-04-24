"use server";

import "reflect-metadata";
import { container } from "tsyringe";
import CommonInfoService from "../../../domain/common-info.service";

const commonInfoService = container.resolve(CommonInfoService);

export async function GET() {
  const commonInfo = await commonInfoService.getCommonInfo();
  return Response.json(commonInfo, { status: 200 });
}
