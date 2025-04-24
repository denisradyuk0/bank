import React from "react";
import ButtonsContainer from "@/app/(main)/payments/ButtonsContainer/ButtonsContainer";

export default function PaymentsPage() {
  return (
    <div className="px-4 container mx-auto">
      <h1 className="font-bold text-3xl mt-12">Выплаты</h1>
      <div className="mt-5 bg-white rounded-lg py-6.25 px-5.5">
        <ButtonsContainer />
      </div>
    </div>
  );
}
