/* eslint-disable dot-notation */
import * as dotenv from "dotenv";

dotenv.config();

export default function getConfig() {
  return {
    strapi: {
      baseUrl: process.env["STRAPI_BASE_URL"] ?? "http://localhost:1337",
      apiToken: process.env["STRAPI_TOKEN"] ?? "",
    },
  };
}
