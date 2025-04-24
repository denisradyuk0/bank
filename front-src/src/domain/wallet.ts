import Bank from "./bank";
import WalletStatus from "./enums/wallet-status.enum";

export type WalletParams = {
  id: string;
  name: string;
  bank: Bank;
  state: WalletStatus;
  card: string;
  expiration: string;
  fullname: string;
  limit: number;
  requestsPerDay: number;
};

export default class Wallet {
  id: string | undefined;

  bank: Bank;

  card: string;

  expiration: string;

  name: string;

  state: WalletStatus;

  fullname: string;

  limit: number;

  requests_per_day: number;

  constructor(params: WalletParams) {
    this.id = params.id;
    this.bank = params.bank;
    this.card = params.card;
    this.expiration = params.expiration;
    this.fullname = params.fullname;
    this.limit = params.limit;
    this.requests_per_day = params.requestsPerDay;
    this.state = params.state;
    this.name = params.name;
  }
}
