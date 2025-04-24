import DepositStatus from "../../../domain/enums/deposit-status.enum";

interface IIncomeHistoryCardProps {
  id: string;
  income: string;
  date: string;
  status: DepositStatus;
}

export default function IncomeHistoryCard(props: IIncomeHistoryCardProps) {
  const { id, income, date, status } = props;
  return (
    <div className="w-full bg-[#F5F7F8] rounded-xl px-5 py-3.5">
      <div className="flex justify-between h-full">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-gray-text font-semibold text-[0.8rem] opacity-60">
              ID
            </span>
            <span className="text-gray-text font-bold text-[0.93rem]">
              {id}
            </span>
          </div>
          <span
            className={`font-bold px-1.5 py-0.5 rounded-sm ${status === DepositStatus.pending ? "bg-[#a9e0fb]" : "bg-[#B7E4CE]"} text-xs mt-2 self-end`}
          >
            {status === DepositStatus.pending ? "В ожидании" : "Успешно"}
          </span>
        </div>
        <div className="flex flex-col justify-between shrink-0">
          <span
            className={`${status === DepositStatus.success ? "text-[#1ACF6F]" : "text-[#5D7285]"} text-xl font-bold text-end`}
          >
            +$
            {Number(income).toLocaleString("en-US")}
          </span>
          <span className="text-gray-text font-semibold text-[0.8rem] opacity-60 w-full text-end text- block">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
