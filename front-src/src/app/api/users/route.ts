"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "reflect-metadata";
import { container } from "tsyringe";
import ProfileService from "../../../domain/profile.service";

const profileService = container.resolve(ProfileService);

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token || !token.value) {
    redirect("/login");
  }

  const user = await profileService.getUserInfo(token.value);

  return Response.json(user, { status: 200 });
}
