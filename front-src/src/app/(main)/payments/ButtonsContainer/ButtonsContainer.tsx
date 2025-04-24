"use client";

import { Dispatch, SetStateAction, useState } from "react";
import SelectButton from "../SelectButton/SelectButton";

export default function ButtonsContainer() {
  const [active, setActive] = useState("Активные");

  const handleClick = (
    setActive: Dispatch<SetStateAction<string>>,
    title: string,
  ) => {
    setActive(title);
  };

  return (
    <div className=" mx-auto flex flex-wrap gap-2.5">
      <SelectButton
        title="Активные"
        active={active === "Активные"}
        onClick={() => handleClick(setActive, "Активные")}
      />
      <SelectButton
        title="Мои заявки"
        active={active === "Мои заявки"}
        onClick={() => handleClick(setActive, "Мои заявки")}
      />
      <SelectButton
        title="На проверке"
        active={active === "На проверке"}
        onClick={() => handleClick(setActive, "На проверке")}
      />
      <SelectButton
        title="Отмененные"
        active={active === "Отмененные"}
        onClick={() => handleClick(setActive, "Отмененные")}
      />
      <SelectButton
        title="Завершенные"
        active={active === "Завершенные"}
        onClick={() => handleClick(setActive, "Завершенные")}
      />
    </div>
  );
}
