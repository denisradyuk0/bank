"use server";

import { redirect } from "next/navigation";
import "reflect-metadata";
import { container } from "tsyringe";
import AuthService from "../../domain/auth.service";

const authService = container.resolve(AuthService);

export type State = { message: string; error: boolean };

export default async function Auth(_: State, body: FormData): Promise<State> {
  const token = body.get("token") as string;
  if (!token?.trim())
    return { message: 'Поле "токен" является обязательным', error: true };
  const err = await authService
    .auth(token)
    .then(() => undefined)
    .catch(() => ({
      message:
        "Пользователь с таким токеном не найден. Проверьте правильность токена и попробуйте ещё раз.",
      error: true,
    }));
  if (err) return err;
  redirect("/dashboard");
}
