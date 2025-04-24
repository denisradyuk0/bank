export type CommonInfoParams = {
  id: string;
  rate_in: number;
  rate_out: number;
  wallet_code: string;
  wallet_qr: string;
  bot: string;
};

export default class CommonInfo {
  id: string;

  rate_in: number;

  rate_out: number;

  wallet_code: string;

  wallet_qr: string;

  bot: string;

  constructor(params: CommonInfoParams) {
    this.id = params.id;
    this.rate_in = params.rate_in;
    this.rate_out = params.rate_out;
    this.wallet_code = params.wallet_code;
    this.wallet_qr = params.wallet_qr;
    this.bot = params.bot;
  }
}
