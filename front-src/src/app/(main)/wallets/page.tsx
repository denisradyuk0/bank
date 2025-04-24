import React from "react";
import { container } from "tsyringe";
import Wallet from "@/domain/wallet";
import Wallets from "@/app/(main)/wallets/Wallets";
import ProfileService from "@/domain/profile.service";
import { GET } from "@/app/api/wallets/route";

const profileService = container.resolve(ProfileService);

export default async function WalletsPage() {
  const userWallets: Wallet[] = await GET().then((response) => response.json());

  const profile = await profileService.getCurrentUserOrRedirectToLogin();

  return (
    <Wallets
      userWalletsJSON={JSON.stringify(userWallets)}
      profileCurrency={profile.currency}
      banks={(profile.banks ?? []).map((bank) => ({
        id: bank.id,
        name: bank.name,
        icon: bank.icon,
      }))}
    />
  );
}
