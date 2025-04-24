"use client";

import { Dispatch, SetStateAction, useState } from "react";
import SelectButton from "../payments/SelectButton/SelectButton";

export default function ButtonsContainer() {
  const [active, setActive] = useState("Активные");

  const handleClick = (
    setActive: Dispatch<SetStateAction<string>>,
    title: string,
  ) => {
    setActive(title);
  };

  const buttons = [
    "Активные",
    "На проверке",
    "Пересчитанные",
    "Завершённые",
    "Отмененные",
    "Все",
  ];

  return (
    <div className=" mx-auto flex flex-wrap gap-2.5">
      {buttons.map((b) => (
        <SelectButton
          key={b}
          title={b}
          active={active === b}
          onClick={() => handleClick(setActive, b)}
        />
      ))}
      <SelectButton
        title="CSV"
        active={active === "CSV"}
        onClick={() => handleClick(setActive, "CSV")}
        disabled
      />
    </div>
  );
}
