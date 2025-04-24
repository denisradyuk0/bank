export type BankParams = {
  id: string;

  name: string;

  icon: string;
};

export default class Bank {
  id: string;

  name: string;

  icon: string;

  constructor(params: BankParams) {
    this.id = params.id;
    this.name = params.name;
    this.icon = params.icon;
  }
}
