"use server";

import "reflect-metadata";
import { container } from "tsyringe";
import TokenService from "../../../domain/token.service";
import WalletsService from "../../../domain/wallet.service";

const walletsService = container.resolve(WalletsService);
const tokenService = container.resolve(TokenService);

export async function GET() {
  const token = await tokenService.getTokenOrRedirectToLogin();
  const wallets = await walletsService.getUserWallets(token);

  return Response.json(wallets, { status: 200 });
}
