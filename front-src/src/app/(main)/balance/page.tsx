import { container } from "tsyringe";
import ProfileService from "../../../domain/profile.service";
import BalancePage from "./Balance";
import "reflect-metadata";

const profileService = container.resolve(ProfileService);

export default async function BalancePageWrapper() {
  const userInfo = await profileService.getCurrentUserOrRedirectToLogin();
  return (
    <BalancePage
      balance={userInfo.balance}
      qr={userInfo.qr_code}
      wallet_code={userInfo.wallet_code}
    />
  );
}
