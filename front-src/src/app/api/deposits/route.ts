"use server";

import "reflect-metadata";

import { container } from "tsyringe";
import DepositsService from "../../../domain/deposits.service";
import TokenService from "../../../domain/token.service";

const depositService = container.resolve(DepositsService);
const tokenService = container.resolve(TokenService);

export async function GET() {
  const token = await tokenService.getTokenOrRedirectToLogin();
  const deposits = await depositService.getUserDeposits(token);

  return new Response(JSON.stringify(deposits), {
    status: 200,
  });
}
