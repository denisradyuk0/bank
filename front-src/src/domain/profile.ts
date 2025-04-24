import Bank from "./bank";
import Wallet from "./wallet";

export type ProfileParams = {
  api_token: string;
  balance: number;
  comment?: string | undefined;
  currency: string;
  token: string;
  traffic_enabled: boolean;
  id: string;
  wallets?: Wallet[];
  api_enabled: boolean;
  rate_in: number;
  rate_out: number;
  qr_code: string;
  banks: Bank[];
  wallet_code: string;
};

export default class Profile {
  id: string;

  api_token: string;

  balance: number;

  comment: string;

  currency: string;

  rate_in: number;

  rate_out: number;

  qr_code: string;

  banks: Bank[];

  token: string;

  traffic_enabled: boolean;

  wallets?: Wallet[] | undefined;

  api_enabled: boolean;

  wallet_code: string;

  constructor(data: ProfileParams) {
    this.id = data.id;
    this.api_token = data.api_token;
    this.balance = data.balance;
    this.comment = data.comment ?? "";
    this.currency = data.currency;
    this.token = data.token;
    this.traffic_enabled = data.traffic_enabled;
    this.wallets = data.wallets;
    this.api_enabled = data.api_enabled;
    this.rate_in = data.rate_in;
    this.rate_out = data.rate_out;
    this.qr_code = data.qr_code;
    this.banks = data.banks;
    this.wallet_code = data.wallet_code;
  }
}
