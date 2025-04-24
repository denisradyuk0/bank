"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "reflect-metadata";
import { container } from "tsyringe";
import ProfileService from "../../domain/profile.service";

const userService = container.resolve(ProfileService);

export default async function TrafficToggle(value: boolean) {
  const userCookies = await cookies();
  const token = userCookies.get("token");
  if (!token) redirect("/login");
  userService.setUserTraffic(token.value, value);
  return value;
}
