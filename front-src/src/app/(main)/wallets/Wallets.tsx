"use client";

import "reflect-metadata";
import Image from "next/image";
import { useState } from "react";
import WalletStatus from "../../../domain/enums/wallet-status.enum";
import WalletModificationPopup from "@/app/(main)/wallets/WalletModificationPopup/WalletModificationPopup";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import NotificationIcon from "@/components/common/NotificationIcon";
import WalletCard from "@/app/(main)/wallets/WalletCard/WalletCard";
import Wallet from "@/domain/wallet";
import { createWallet } from "@/app/api/wallets/_action/wallet-server-actions";
import Bank from "@/domain/bank";

export default function Wallets({
  userWalletsJSON,
  profileCurrency,
  banks,
}: {
  userWalletsJSON: string;
  profileCurrency: string;
  banks: Bank[];
}) {
  const userWallets: Wallet[] = JSON.parse(userWalletsJSON);
  const activeAmount = userWallets.filter(
    (wallet) => wallet.state === WalletStatus.active,
  ).length;

  const [selectedWallets, setSelectedWallets] = useState<WalletStatus>(
    WalletStatus.active,
  );

  const inactiveAmount = userWallets.filter(
    (wallet) => wallet.state === WalletStatus.disabled,
  ).length;

  const archivedAmount = userWallets.length - activeAmount - inactiveAmount;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="mt-12 flex justify-between items-center">
          <h1 className="font-bold text-3xl">Кошельки</h1>
          <Button
            title="Создать новый"
            className="sm:px-12 px-8"
            onClick={() => {
              document.body.style.overflowY = "hidden";
              setIsModalOpen(true);
            }}
          />
          <WalletModificationPopup
            modalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            profileCurrency={profileCurrency}
            updateMethod={createWallet}
            banks={banks}
          />
        </div>
        <div className="mt-5 bg-white rounded-lg py-6.25 px-5.5">
          <Input
            name="name"
            maxLength={50}
            className="pl-10"
            placeholder="Реквизит / название"
            leadingIcon={
              <Image
                src="/icons/search.svg"
                alt="search"
                width={22}
                height={22}
              />
            }
            onChange={() => undefined}
          />
          <div className="mt-9 snap-x snap-mandatory overflow-x-scroll flex flex-wrap gap-5 *:snap-start no-scrollbar">
            <Button
              title="Активные"
              className={`font-semibold ${selectedWallets === WalletStatus.active ? "text-text-main!" : "text-gray-text!"}  md:flex-1 flex-1/3`}
              color={
                selectedWallets === WalletStatus.active
                  ? "light-blue"
                  : "background"
              }
              trailingIcon={
                activeAmount !== 0 && (
                  <NotificationIcon content={activeAmount} />
                )
              }
              onClick={() => setSelectedWallets(WalletStatus.active)}
            />
            <Button
              title="Архив"
              className={`font-semibold ${selectedWallets === WalletStatus.archived ? "text-text-main!" : "text-gray-text!"}  md:flex-1 flex-1/3`}
              color={
                selectedWallets === WalletStatus.archived
                  ? "light-blue"
                  : "background"
              }
              trailingIcon={
                archivedAmount !== 0 && (
                  <NotificationIcon content={archivedAmount} />
                )
              }
              onClick={() => setSelectedWallets(WalletStatus.archived)}
            />
            <Button
              title="Отлюченные"
              className={`font-semibold ${selectedWallets === WalletStatus.disabled ? "text-text-main!" : "text-gray-text!"}  md:flex-1 flex-1/3`}
              color={
                selectedWallets === WalletStatus.disabled
                  ? "light-blue"
                  : "background"
              }
              trailingIcon={
                inactiveAmount !== 0 && (
                  <NotificationIcon content={inactiveAmount} />
                )
              }
              onClick={() => setSelectedWallets(WalletStatus.disabled)}
            />
          </div>
        </div>

        {userWallets.map((wallet) => {
          if (wallet.state !== selectedWallets) return null;

          return (
            <div
              key={wallet.id}
              className="mt-5 bg-white rounded-lg py-6.25 px-5.5"
            >
              <WalletCard
                profileCurrency={profileCurrency}
                walletProps={{
                  number: wallet.card,
                  bank: wallet.bank.name,
                  transactionsCount: 0,
                  transactionsLimit: wallet.requests_per_day,
                  todayTotal: 0,
                  totalLimit: wallet.limit,
                  balance: 0,
                  holdTotal: 0,
                  total: 0,
                  state: wallet.state,
                }}
                wallet={wallet}
                banks={banks}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
