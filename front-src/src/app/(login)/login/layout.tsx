import { container } from "tsyringe";
import "reflect-metadata";
import { redirect } from "next/navigation";
import AuthService from "../../../domain/auth.service";

const authService = container.resolve(AuthService);

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (await authService.isAuthorized()) redirect("/dashboard");
  return children;
}
