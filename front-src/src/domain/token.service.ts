import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { injectable } from "tsyringe";

@injectable()
export default class TokenService {
  getToken() {
    return cookies().then((cookies) => cookies.get("token")?.value);
  }

  getTokenOrRedirectToLogin() {
    return cookies().then(
      (cookies) => cookies.get("token")?.value ?? redirect("/login"),
    );
  }
}
