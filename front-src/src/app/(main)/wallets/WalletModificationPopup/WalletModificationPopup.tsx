"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { State } from "../../../actions/auth";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Modal from "@/components/common/Modal";
import Bank from "@/domain/bank";
import WalletStatus from "@/domain/enums/wallet-status.enum";

interface IWalletModificationPopupProps {
  profileCurrency: string;
  walletProps?: {
    walletName: string;
    walletBank: Bank;
    cardNumber: string;
    expireDate: string;
    fullName: string;
    state: WalletStatus;
    spendLimit: string;
    tickets: number;
    id: string;
  };
  modalOpen: boolean;
  banks: Bank[];
  setIsModalOpen: (open: boolean) => void;

  updateMethod: (_: State, data: FormData) => Promise<State>;
}

export default function WalletModificationPopup(
  props: IWalletModificationPopupProps,
) {
  const {
    walletProps,
    modalOpen,
    setIsModalOpen,
    profileCurrency,
    updateMethod,
    banks,
  } = props;

  const [_state, formAction] = useActionState(updateMethod, {
    message: "",
    error: false,
  });
  const router = useRouter();
  useEffect(() => {
    setIsModalOpen(false);
    router.refresh();
  }, [_state]);

  const currency = profileCurrency;

  const [modificationValue, setModificationValue] = useState<
    Partial<IWalletModificationPopupProps["walletProps"]>
  >({
    ...({
      walletName: walletProps?.walletName,
      walletBank: walletProps?.walletBank,
      cardNumber: walletProps?.cardNumber,
      expireDate: walletProps?.expireDate,
      fullName: walletProps?.fullName,
      spendLimit: walletProps?.spendLimit,
      tickets: walletProps?.tickets,
      bank: walletProps?.walletBank,
    } as Partial<IWalletModificationPopupProps["walletProps"]>),
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const disabled =
      modificationValue?.walletBank &&
      modificationValue?.walletName &&
      modificationValue?.fullName &&
      modificationValue?.spendLimit &&
      modificationValue?.tickets;
    setDisabled(!disabled);
  }, [
    modificationValue?.cardNumber,
    modificationValue?.expireDate,
    modificationValue?.walletBank,
    modificationValue?.walletName,
    modificationValue?.fullName,
    modificationValue?.spendLimit,
    modificationValue?.tickets,
  ]);

  return (
    <Modal
      title="Новый кошелек"
      show={modalOpen}
      onClose={() => {
        document.body.style.overflowY = "auto";
        setIsModalOpen(false);
      }}
      className="overflow-y-auto"
    >
      <div className="bg-white rounded-lg px-5.5 h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar w-[min(23.1rem,calc(100vw-4rem))]">
        <div className="snap-x snap-mandatory overflow-x-scroll *:snap-start no-scrollbar">
          <form
            action={formAction}
            onSubmit={() => setDisabled(true)}
            className="flex flex-col gap-5"
          >
            <input
              name="id"
              className="hidden"
              value={walletProps?.id ?? ""}
              onChange={() => undefined}
            />
            <input
              name="active"
              className="hidden"
              value={walletProps?.state}
              onChange={() => undefined}
            />
            <Input
              name="name"
              placeholder="Назовите кошелек"
              maxLength={50}
              label="Название"
              className="bg-background"
              value={modificationValue?.walletName}
              onChange={(e) => {
                const { value } = e.target;
                setModificationValue((prev) => ({
                  ...prev,
                  walletName: value,
                }));
              }}
            />
            <Select
              placeholder="Выберите банк"
              label="Банк / Платежная система"
              options={banks}
              onChange={(_e, value) => {
                setModificationValue((prev) => ({
                  ...prev,
                  walletBank: value,
                }));
              }}
              value={modificationValue?.walletBank}
              name="bank"
            />
            <Input
              // placeholder="0000 0000 0000 0000"
              label="Номер карты/телефона"
              className="bg-background"
              value={modificationValue?.cardNumber}
              onChange={(e) => {
                const { value } = e.target;
                setModificationValue((prev) => ({
                  ...prev,
                  cardNumber: value,
                }));
              }}
              name="card"
            />
            <Input
              placeholder="ММ / YY"
              label="Срок действия."
              sublabel="*Если используете номер, пропустите пункт"
              maxLength={5}
              minLength={5}
              className="bg-background"
              value={modificationValue?.expireDate}
              formatInput={(value) => {
                // Удаляем всё, кроме цифр
                const digits = value.replace(/\D/g, "");
                // Ограничиваем до 4 символов (MMYY)
                const limitedDigits = digits.slice(0, 4);
                // Добавляем слеш после первых двух цифр
                if (limitedDigits.length <= 2) return limitedDigits;
                return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2)}`;
              }}
              onChange={(e) => {
                const { value } = e.target;
                setModificationValue((prev) => ({
                  ...prev,
                  expireDate: value,
                }));
              }}
              name="expiration"
            />
            <Input
              placeholder="Иванов Иван"
              label="ФИО получателя"
              maxLength={50}
              className="bg-background"
              value={modificationValue?.fullName}
              onChange={(e) => {
                const { value } = e.target;
                setModificationValue((prev) => ({
                  ...prev,
                  fullName: value,
                }));
              }}
              name="fullname"
            />
            <Input
              placeholder="0,0"
              label={`Лимит в день (${currency})`}
              className="bg-background"
              value={modificationValue?.spendLimit}
              onChange={(e) => {
                const { value } = e.target;
                setModificationValue((prev) => ({
                  ...prev,
                  spendLimit: value,
                }));
              }}
              name="limit"
            />
            <Input
              placeholder="0"
              label="Заявок в день"
              className="bg-background"
              value={modificationValue?.tickets?.toString()}
              onChange={(e) => {
                const { value } = e.target;
                setModificationValue((prev) => ({
                  ...prev,
                  tickets: Number(value),
                }));
              }}
              name="requests_per_day"
            />
            <Button
              title="Сохранить"
              disabled={disabled}
              className="cursor-pointer"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}
