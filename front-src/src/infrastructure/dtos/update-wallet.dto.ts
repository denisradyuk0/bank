import WalletStatus from "../../domain/enums/wallet-status.enum";

export default class UpdateWalletDTO {
  id!: string;

  name?: string | undefined;

  bank?: string | undefined;

  state?: WalletStatus | undefined;

  card?: string | undefined;

  expiration?: string | undefined;

  fullname?: string | undefined;

  limit?: string | undefined;

  requests_per_day?: string | undefined;

  telegram?: string | undefined;
}
