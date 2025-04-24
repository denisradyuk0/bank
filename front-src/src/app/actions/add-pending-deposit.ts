"use server";

import { container } from "tsyringe";
import DepositsService from "../../domain/deposits.service";
import ProfileService from "../../domain/profile.service";
import { State } from "./auth";

const depositService = container.resolve(DepositsService);
const profileService = container.resolve(ProfileService);

export default async function AddPendingDeposit(
  _: State,
  formData: FormData,
): Promise<State> {
  const amount = Number.parseInt(formData.get("amount")?.toString() ?? "", 10);
  if (Number.isNaN(amount) || amount <= 0)
    return { error: true, message: "Сумма должна быть положительным числом." };
  const user = await profileService.getCurrentUserOrRedirectToLogin();
  depositService.addPendingDeposit(amount, user);
  return { message: "Создано", error: false };
}
