import DepositStatus from "./enums/deposit-status.enum";

export class Deposit {
  id: string;

  deposit_id: number;

  amount: number;

  timestamp: Date;

  state: DepositStatus;

  constructor(
    id: string,
    depositNumber: number,
    amount: number,
    timestamp: Date,
    state: DepositStatus,
  ) {
    this.id = id;
    this.deposit_id = depositNumber;
    this.state = state;
    this.timestamp = timestamp;
    this.amount = amount;
  }
}
