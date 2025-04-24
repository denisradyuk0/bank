"use server";

import { container } from "tsyringe";
import WalletStatus from "../../../../domain/enums/wallet-status.enum";
import WalletsService from "../../../../domain/wallet.service";
import { State } from "../../../actions/auth";

const walletsService = container.resolve(WalletsService);
const DATEFORMAT = /^(0[1-9]|1[0-2])\/\d{2}$/;

export async function createWallet(_: State, data: FormData): Promise<State> {
  const card = data.get("card") as string;
  const expiration = data.get("expiration") as string;
  const fullname = data.get("fullname") as string;
  const limit = (data.get("limit") as string).replace(",", "");
  const requestsPerDay = data.get("requests_per_day") as string;
  const bank = data.get("bank") as string;
  const name = data.get("name") as string;
  const state = data.get("state") ?? WalletStatus.disabled;

  if ((expiration && !DATEFORMAT.test(expiration)) || limit === undefined) {
    return {
      error: true,
      message: "card, expiration, fullname are required",
    };
  }

  await walletsService
    .create({
      card: card ?? undefined,
      expiration: expiration ?? undefined,
      fullname: fullname ?? undefined,
      limit,
      name,
      requests_per_day: requestsPerDay ?? undefined,
      bank: bank ?? undefined,
      state: (state as WalletStatus) ?? WalletStatus.disabled,
    })
    .catch((e: Error) => ({ error: true, message: e.message }));

  return { message: "Создано", error: false };
}

export async function updateWallet(_: State, data: FormData): Promise<State> {
  const id = data.get("id") as string;
  const card = data.get("card") as string;
  const expiration = data.get("expiration") as string;
  const fullname = data.get("fullname") as string;
  const limit = data.get("limit") as string;
  const requestsPerDay = data.get("requests_per_day") as string;
  const state = data.get("state") as WalletStatus;
  const name = data.get("name") as string;
  const bank = data.get("bank") as string;

  if (!id) return { error: true, message: "id is required" };

  await walletsService
    .update({
      id,
      card: card ?? undefined,
      expiration: expiration ?? undefined,
      fullname: fullname ?? undefined,
      name,
      limit: limit ?? undefined,
      requests_per_day: requestsPerDay ?? undefined,
      bank: bank ?? undefined,
      state: state ?? undefined,
    })
    .catch((e: Error) => ({ error: true, message: e.message }));

  return { message: "Обновлено", error: false };
}
