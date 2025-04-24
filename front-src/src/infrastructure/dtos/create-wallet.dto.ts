import WalletStatus from "../../domain/enums/wallet-status.enum";

export default class CreateWalletDTO {
  bank?: string;

  name?: string;

  card?: string;

  expiration?: string;

  fullname?: string;

  limit!: string;

  requests_per_day?: string;

  telegram?: string;

  state!: WalletStatus;
}
