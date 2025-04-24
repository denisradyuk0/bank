"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import MenuItem from "@/components/sidebar/MenuItem/MenuItem";
import dandypay from "@/../public/dandypay.svg";
import dashboard from "@/../public/icons/dashboard.svg";
import deposits from "@/../public/icons/deposits.svg";
import tg from "@/../public/icons/tg.svg";
import payouts from "@/../public/icons/payouts.svg";
import balance from "@/../public/icons/balance.svg";
import cross from "@/../public/icons/cross.svg";
import wallets from "@/../public/icons/wallets.svg";
import automatic from "@/../public/icons/automatic.svg";
import { useDebouncedCallback } from "@/app/helper/client-helpers";

interface ISidebarProps {
  isOpened: boolean;
  onClose: () => void;
  token: string;
  apiKey: string;
  apiOn: boolean;
  bot: string;
  betEntry: number;
  betOutput: number;
}

export default function Sidebar(props: ISidebarProps) {
  const { isOpened, onClose, token, apiKey, apiOn, bot, betEntry, betOutput } =
    props;
  const pathname = usePathname().slice(1);
  const [copied, setCopied] = useState(false);
  const debouncedSetUncopied = useDebouncedCallback(
    () => setCopied(false),
    3000,
  );

  const notifications = {
    dashboard: 0,
    deposits: 0,
    payments: 0,
    balance: 0,
    wallets: 0,
    automatic: 0,
  };

  const handleCopy = (
    setCopied: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setCopied(true);
    debouncedSetUncopied();
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <>
      <div
        className={`absolute overflow-y-auto px-5 transition-transform z-50 top-0 left-0 right-0 bottom-0 w-full mx-auto bg-white rounded-lg shadow-md ${isOpened ? "translate-x-0" : "-translate-x-[100vw]"}`}
      >
        <div className="flex flex-col h-full w-full">
          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3 ml-2">
              <div className="relative">
                <Image src={dandypay} alt="dandypay" />
              </div>
              <span className="text-[#5D7285] font-bold text-xl">DANDYPAY</span>
            </div>
            <button className="cursor-pointer" onClick={onClose}>
              <Image src={cross} alt="Закрыть" />
            </button>
          </div>

          <div className="flex flex-col justify-between h-full pb-14 mt-10">
            {/* Navigation Menu */}
            <nav className="flex flex-col space-y-4">
              <MenuItem
                onClick={onClose}
                icon={<Image src={dashboard} alt="Дашборд" />}
                label="Дашборд"
                isActive={pathname === "dashboard"}
                href="/dashboard"
                badge={notifications.dashboard}
              />

              <MenuItem
                onClick={onClose}
                icon={
                  <Image src={deposits} alt="Deposits" className="-mt-0.5" />
                }
                label="Депозиты"
                isActive={pathname === "deposits"}
                href="/deposits"
                badge={notifications.deposits}
              />

              <MenuItem
                onClick={onClose}
                icon={<Image src={payouts} alt="Payouts" />}
                label="Выплаты"
                isActive={pathname === "payments"}
                href="/payments"
                badge={notifications.payments}
              />

              <MenuItem
                onClick={onClose}
                icon={<Image src={balance} alt="Balance" />}
                label="Баланс"
                isActive={pathname === "balance"}
                href="/balance"
                badge={notifications.balance}
              />

              <MenuItem
                onClick={onClose}
                icon={<Image src={wallets} alt="Wallets" />}
                label="Кошельки"
                isActive={pathname === "wallets"}
                href="/wallets"
                badge={notifications.wallets}
              />

              <MenuItem
                onClick={onClose}
                icon={<Image src={automatic} alt="Automatic" />}
                label="Автоматика"
                isActive={pathname === "automatic"}
                href="/automatic"
                badge={notifications.automatic}
              />
            </nav>

            {/* Information Section */}
            <div className="p-4 space-y-6 mt-12">
              <InfoItem label="Токен" value={token} />
              <InfoItem label="Ставка вход" value={`${betEntry}%`} />
              <InfoItem label="Ставка выплат" value={`${betOutput}%`} />
              <div className="flex justify-between">
                <APIStatus apiOn={apiOn} />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">API Key</label>
                <div className="flex items-center gap-2.5 mt-2">
                  <div className="grow relative">
                    <input
                      className="w-full p-3 border-2 border-gray-border rounded-md text-gray-500"
                      value={apiKey ?? ""}
                      disabled
                      type={copied ? "input" : "password"}
                    />
                    <button
                      className="absolute rounded-r-md p-2 top-2 right-2 cursor-pointer"
                      onClick={() => handleCopy(setCopied)}
                    >
                      <Image
                        src="/icons/copy.svg"
                        alt="Copy"
                        width={18}
                        height={18}
                      />
                    </button>
                  </div>

                  <div className="shrink-0 flex">
                    <Link
                      href={bot}
                      className="bg-[#31A7DF] text-white pl-2.5 pt-3.5 pb-3 pr-3 rounded-md cursor-pointer"
                    >
                      <Image src={tg} alt="Telegram бот" className="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center gap-2 w-full absolute z-50 top-full py-4 ${copied && "-translate-y-full"} ${isOpened ? "translate-x-0" : "-translate-x-[100vw]"} transition-transform bg-light-blue`}
      >
        <span className="text-text-main">Скопировано</span>
        <Image
          src="/icons/check.svg"
          alt="Скопировано"
          width={11}
          height={11}
        />
      </div>
    </>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="space-y-1">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-gray-700 font-medium">{value}</div>
    </div>
  );
}

// eslint-disable-next-line react/function-component-definition
const APIStatus = ({ apiOn }: { apiOn: boolean }) => {
  const isActive = apiOn;
  return (
    <div className="flex justify-between items-center">
      <div
        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
          isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-red-600"
        }`}
      >
        <span>API {isActive ? "ON" : "OFF"}</span>
        <span
          className={`ml-2 w-2 h-2 rounded-full ${
            isActive ? "bg-green-600" : "bg-red-600"
          }`}
        />
      </div>
    </div>
  );
};
