"use client";

import React, { useEffect, useState } from "react";
import { Deposit } from "../../../domain/deposit";
import IncomeHistoryCard from "./DepositItem";

export default function DepositsList({
  className,
  refreshTrigger,
}: {
  className?: string;
  refreshTrigger: unknown;
}) {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  useEffect(() => {
    fetch("/api/deposits")
      .then((r) => r.json())
      .then((respDeposits) => setDeposits(respDeposits));
  }, [refreshTrigger]);
  return (
    <div
      className={`mt-7 snap-y snap-mandatory flex flex-col gap-y-3 ${className}`}
    >
      {deposits.map((deposit) => (
        <IncomeHistoryCard
          key={deposit.id}
          id={deposit.deposit_id.toString()}
          income={deposit.amount.toString()}
          status={deposit.state}
          date={new Date(deposit.timestamp).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        />
      ))}
    </div>
  );
}
