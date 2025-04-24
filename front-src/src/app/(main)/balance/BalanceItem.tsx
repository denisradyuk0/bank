import { ReactNode } from "react";

interface IBalanceItemCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  iconColor: string;
}

export default function BalanceItemCard(props: IBalanceItemCardProps) {
  const { icon, title, value, iconColor } = props;
  return (
    <>
      <div className="flex pb-10 mt-7 gap-5">
        <div
          style={{ backgroundColor: iconColor }}
          className="p-4 rounded-full w-14 h-14 flex items-center justify-center"
        >
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-sm text-gray-text opacity-60">
            {title}
          </h2>
          <span className="font-bold text-[2.8rem] text-gray-text">
            {value}
          </span>
        </div>
      </div>
      <div className="h-[1px] w-full bg-(image:--color-separator-gradient) opacity-30" />
    </>
  );
}
