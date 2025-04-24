"use client";

import Image from "next/image";
import { useState } from "react";
import "reflect-metadata";
import { useRouter } from "next/navigation";
import WalletStatus from "../../../../domain/enums/wallet-status.enum";
import Button from "@/components/common/Button";
import Switch from "@/components/common/Switch";
import WalletModificationPopup from "@/app/(main)/wallets/WalletModificationPopup/WalletModificationPopup";
import Wallet from "@/domain/wallet";
import { updateWallet } from "@/app/api/wallets/_action/wallet-server-actions";
import Bank from "@/domain/bank";

export interface IWalletCardProps {
  profileCurrency: string;
  walletProps: {
    number: string;
    bank: string;
    transactionsCount: number;
    transactionsLimit: number;
    // Сумма за сегодня
    todayTotal: number;
    totalLimit: number;
    balance: number;
    holdTotal: number;
    total: number;
    state: WalletStatus;
  };
  wallet: Wallet;
  banks: Bank[];
}

export default function WalletCard(props: IWalletCardProps) {
  const { walletProps, wallet, profileCurrency, banks } = props;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    number,
    bank,
    transactionsCount,
    transactionsLimit,
    todayTotal,
    totalLimit,
    balance,
    holdTotal,
    total,
    state,
  } = walletProps;

  const handleToggle = async (value: boolean) => {
    const formData = new FormData();
    formData.append("id", wallet.id ?? "");
    formData.append("card", wallet.card ?? "");
    formData.append(
      "state",
      value ? WalletStatus.active : WalletStatus.disabled,
    );
    formData.append("name", wallet.name ?? "");
    formData.append("expiration", wallet.expiration ?? "");
    formData.append("fullname", wallet.fullname ?? "");
    formData.append("limit", wallet.limit.toString());
    formData.append("requests_per_day", wallet.requests_per_day.toString());
    formData.append("bank", wallet.bank.id);
    updateWallet({ message: "", error: false }, formData);
    router.refresh();
  };

  const handleRestoreWallet = async () => {
    const formData = new FormData();
    formData.append("id", wallet.id ?? "");
    formData.append("card", wallet.card ?? "");
    formData.append("state", WalletStatus.active);
    formData.append("name", wallet.name ?? "");
    formData.append("expiration", wallet.expiration ?? "");
    formData.append("fullname", wallet.fullname ?? "");
    formData.append("limit", wallet.limit.toString());
    formData.append("requests_per_day", wallet.requests_per_day.toString());
    formData.append("bank", wallet.bank.id);
    updateWallet({ message: "", error: false }, formData);
    router.refresh();
  };

  const handleArchiveWallet = async () => {
    const formData = new FormData();
    formData.append("id", wallet.id ?? "");
    formData.append("card", wallet.card ?? "");
    formData.append("state", WalletStatus.archived);
    formData.append("name", wallet.name ?? "");
    formData.append("expiration", wallet.expiration ?? "");
    formData.append("fullname", wallet.fullname ?? "");
    formData.append("limit", wallet.limit.toString());
    formData.append("requests_per_day", wallet.requests_per_day.toString());
    formData.append("bank", wallet.bank.id);
    updateWallet({ message: "", error: false }, formData);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-5">
      <WalletModificationPopup
        profileCurrency={profileCurrency}
        walletProps={{
          walletName: wallet.name,
          walletBank: wallet.bank,
          cardNumber: wallet.card,
          expireDate: wallet.expiration,
          fullName: wallet.fullname,
          state: wallet.state,
          spendLimit: wallet.limit.toString(),
          tickets: wallet.requests_per_day,
          id: wallet.id ?? "",
        }}
        modalOpen={isModalOpen}
        setIsModalOpen={(value) => {
          document.body.style.overflowY = "auto";
          setIsModalOpen(value);
        }}
        updateMethod={updateWallet}
        banks={banks}
      />
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-gray-text font-semibold opacity-80">
            Реквизиты
          </span>
          <span className="text-[$323232] font-bold text-base">{number}</span>
        </div>
        <div className="flex flex-col justify-start gap-1">
          <Switch
            value={state === WalletStatus.active}
            disabled={state === WalletStatus.archived}
            onToggle={handleToggle}
          />
          <span className="text-gray-text font-semibold opacity-80 text-[0.8rem] -ml-1">
            Выкл/Вкл
          </span>
        </div>
      </div>

      <div className="bg-[#B5E2CD] rounded-md px-8 py-2 w-fit font-bold text-[1rem] text-[#3E4C45]">
        {bank}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-text font-semibold opacity-80">
          Сделок за сегодня
        </span>
        <span className="text-gray-text font-bold text-base">
          {transactionsCount} / {transactionsLimit}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-text font-semibold opacity-80">
          Сумма за сегодня
        </span>
        <span className="text-gray-text font-bold text-base">
          {todayTotal} / {totalLimit}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-text font-semibold opacity-80">Баланс</span>
        <span className="text-gray-text font-bold text-base">{balance}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-text font-semibold opacity-80">
          Сумма в холде
        </span>
        <span className="text-gray-text font-bold text-base">{holdTotal}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-text font-semibold opacity-80">
          Общая сумма
        </span>
        <span className="text-gray-text font-bold text-base">{total}</span>
      </div>

      <div className="flex gap-2">
        <Button
          color="white"
          trailingIcon={
            <Image src="/icons/edit.svg" alt="edit" width={25} height={25} />
          }
          className="w-[3.4rem] h-[2.9rem] border-2 border-gray-border"
          onClick={() => {
            document.body.style.overflowY = "hidden";
            setIsModalOpen(true);
          }}
        />
        {wallet.state === WalletStatus.archived && (
          <Button
            color="white"
            trailingIcon={
              <Image
                src="/icons/restore.svg"
                alt="edit"
                width={25}
                height={25}
              />
            }
            className="w-[3.4rem] h-[2.9rem] border-2 border-gray-border"
            onClick={() => {
              handleRestoreWallet();
            }}
          />
        )}
        <Button
          color="white"
          trailingIcon={
            <Image src="/icons/trash.svg" alt="edit" width={25} height={25} />
          }
          className="w-[3.4rem] h-[2.9rem] border-2 border-gray-border"
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("Вы действительно хотите удалить кошелек?");
            if (!result) {
              setIsModalOpen(false);
              return;
            }
            handleArchiveWallet();
          }}
        />
      </div>
    </div>
  );
}
