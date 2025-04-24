"use server";

import { NextRequest } from "next/server";
import "reflect-metadata";
import { container } from "tsyringe";
import WalletsService from "../../../../domain/wallet.service";

const walletsService = container.resolve(WalletsService);

export async function DELETE(req: NextRequest) {
  const id = req.url.split("/").pop() ?? "";
  return walletsService
    .delete(id)
    .then(() => new Response(null, { status: 200 }));
}
