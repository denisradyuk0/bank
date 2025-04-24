"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../components/common/SectionTitle";
import DepositsList from "./DepositsList";
import BalanceItemCard from "./BalanceItem";
import OpenModalButton from "@/app/(main)/balance/OpenModalButton/OpenModalButton";
import money from "@/../public/icons/money.svg";
import hold from "@/../public/icons/hold.svg";

export default function BalancePage({
  balance,
  wallet_code,
  qr,
}: {
  balance: number;
  wallet_code: string;
  qr: string;
}) {
  const [refreshTrigger, setRefreshTrigger] = useState(true);

  const refresh = () => setRefreshTrigger(!refreshTrigger);
  return (
    <div className="px-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg py-6.25 px-5.5 mt-5">
          <SectionTitle>Текущий баланс</SectionTitle>
          <div className="mt-7 snap-x snap-mandatory flex flex-col gap-x-3">
            <BalanceItemCard
              iconColor="#B7E4CE"
              icon={<Image src={money} alt="Balance" />}
              title="Доступно USDT"
              value={balance}
            />
            <BalanceItemCard
              iconColor="#CDBEFE"
              icon={<Image src={hold} alt="Holded" />}
              title="В холде USDT"
              value={0}
            />
            <OpenModalButton
              onSubmit={refresh}
              walletKey={wallet_code}
              qr={qr}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg py-6.25 px-5.5 mt-5">
          <SectionTitle>История пополнений</SectionTitle>
          <DepositsList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
