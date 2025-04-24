"use server";

import "reflect-metadata";
import { container } from "tsyringe";
import ProfileService from "../../../domain/profile.service";
import TokenService from "../../../domain/token.service";

const tokenService = container.resolve(TokenService);
const profileService = container.resolve(ProfileService);

export async function GET() {
  const token = await tokenService.getTokenOrRedirectToLogin();
  const profile = await profileService.getUserInfo(token);

  return Response.json(profile.banks, { status: 200 });
}
