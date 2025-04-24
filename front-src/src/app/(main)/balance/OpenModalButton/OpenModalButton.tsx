"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import Image from "next/image";
import AddPendingDeposit from "../../../actions/add-pending-deposit";
import { State } from "../../../actions/auth";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import { useDebouncedCallback } from "@/app/helper/client-helpers";

const initialState: State = { message: "", error: false };

export default function OpenModalButton({
  walletKey,
  qr,
  onSubmit,
}: {
  walletKey: string;
  qr: string;
  onSubmit: () => void;
}) {
  const [addDepositState, formAction] = useActionState(
    AddPendingDeposit,
    initialState,
  );
  const [firstModalOpen, setFirstModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [depositValue, setDepositValue] = useState<number | undefined>();
  const [copied, setCopied] = useState(false);

  const debouncedSetUncopied = useDebouncedCallback(
    () => setCopied(false),
    3000,
  );

  const handleCopy = (
    setCopied: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setCopied(true);
    debouncedSetUncopied();
    navigator.clipboard.writeText(walletKey);
  };

  useEffect(() => {
    if (addDepositState.message === "") return;
    setFirstModalOpen(false);
    setSecondModalOpen(true);
  }, [addDepositState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length === 0) {
      setDepositValue(undefined);
      return;
    }

    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
      if (depositValue) return;

      setDepositValue(undefined);
      return;
    }
    setDepositValue(numberValue);
  };

  const inputPlaceholder = `Сумма USDT (TRC-20)`;

  return (
    <>
      <Button
        title="Пополнить"
        onClick={() => {
          setFirstModalOpen(true);
          document.body.style.overflow = "hidden";
        }}
        className="mt-5"
      />
      <Modal
        show={firstModalOpen}
        title="Введите сумму"
        onClose={() => {
          setFirstModalOpen(false);
          document.body.style.overflow = "auto";
        }}
      >
        <form action={formAction}>
          <div className="w-[min(23.1rem,calc(100vw-4rem))]">
            <Input
              placeholder={inputPlaceholder}
              className="mb-8"
              name="amount"
              onChange={handleChange}
              value={depositValue?.toString() ?? ""}
            />
          </div>
          <div className="h-[1px] w-full bg-(image:--color-separator-gradient) opacity-30 mb-5" />
          <Button
            title="Пополнить"
            className="w-full"
            disabled={!depositValue}
          />
        </form>
      </Modal>
      <Modal
        title="Депозит"
        show={secondModalOpen}
        onClose={() => {
          setSecondModalOpen(false);
          document.body.style.overflow = "auto";
          onSubmit();
        }}
      >
        <div className="w-[min(23.1rem,calc(100vw-4rem))] flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <Image src={qr} alt="QR" width={228} height={236} />
          </div>
          <span className="font-bold text-lg text-gray-text mb-1">
            Переведите
          </span>
          <span className="font-extrabold text-[1.5rem] text-gray-text mb-4">
            {depositValue?.toFixed(2).replace(".", ",")} USDT (TRC-20)
          </span>
          <span className="font-medium text-xs text-gray-text mb-5">
            На кошелек
          </span>
          <span />
          <div className="w-full relative">
            <input
              className="w-full p-3 border-2 border-gray-border rounded-md text-gray-500 uppercase"
              value={walletKey}
              disabled
            />
            <button
              className="absolute rounded-r-md p-2 top-2 right-2 cursor-pointer focus:outline-none"
              onClick={() => handleCopy(setCopied)}
            >
              <Image src="/icons/copy.svg" alt="Copy" width={18} height={18} />
            </button>
          </div>
        </div>
      </Modal>
      {secondModalOpen && (
        <div
          className={`flex justify-center gap-2 w-full fixed z-50 left-0 top-full py-4 ${copied && "-translate-y-full"} transition-transform bg-light-blue`}
        >
          <span className="text-text-main">Скопировано</span>
          <Image
            src="/icons/check.svg"
            alt="Скопировано"
            width={11}
            height={11}
          />
        </div>
      )}
    </>
  );
}
