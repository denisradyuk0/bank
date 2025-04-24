import React from "react";
import Input from "../../../components/common/Input";
import ButtonsContainer from "./ButtonsContainer";
import "reflect-metadata";

export default function DepositsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="font-bold text-3xl mt-12">Депозиты</h1>
      <div className="mt-5 bg-white rounded-lg py-6.25 px-5.5">
        {["ID заявки", "Сумма", "Реквизиты"].map((i) => (
          <Input
            name={i}
            key={i}
            placeholder={i}
            className="!rounded-xl !py-3.5 !px-4.5 !bg-[#F5F7F8] !font-semibold !text-base !text-[#5D7285] !mt-3"
          />
        ))}
      </div>
      <div className="mt-5 bg-white rounded-lg py-6.25 px-5.5">
        <ButtonsContainer />
      </div>
    </div>
  );
}
