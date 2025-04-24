"use client";

import Image from "next/image";
import React, { useActionState } from "react";
import Auth from "../../actions/auth";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";

const initialState = {
  message: "Вам необходимо войти в систему или зарегистрироваться.",
  error: false,
};

export default function LoginPage() {
  const [state, formAction] = useActionState(Auth, initialState);
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <div className="w-full flex justify-center pt-7">
        <div className="flex gap-3 items-center">
          <Image src="/dandypay.svg" alt="dandypay" width={34} height={34} />
          <span className="text-gray-text font-bold text-xl">DANDYPAY</span>
        </div>
      </div>
      <div>
        <div className="max-w-[22.625rem] mx-auto flex flex-col items-center">
          <h1 className="font-bold text-2xl text-gray-text mb-4">Вход</h1>
          <form action={formAction}>
            <p
              className={`${state.error ? "text-red-600 bg-red-300 border-red-400" : "text-blue-text bg-light-blue border-[#BBE1FF]"} font-medium text-base text-center px-10 py-2.5  border-solid border-2 rounded-md  mb-4`}
            >
              {state.message}
            </p>
            <Input name="email" placeholder="Email" type="email" className="mb-4" />
            <Input name="password" placeholder="Пароль" type="password" className="mb-4" />

            <Checkbox
              id="login"
              name="name"
              className="mb-9"
              label="Запомнить меня"
            />

            <Button title="Войти" className="w-full" />
          </form>
        </div>
      </div>
      <span className="font-light text-gray-text text-sm text-center mb-5">
        © All rights reserved DANDYPAY 2025
      </span>
    </div>
  );
}
