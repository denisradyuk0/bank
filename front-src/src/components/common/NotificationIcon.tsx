import { ReactNode } from "react";

export default function NotificationIcon({
  content,
}: {
  content: string | number | ReactNode;
}) {
  return (
    <div className="bg-[#85C5F9] w-[1.1rem] h-[1.2rem] text-white rounded-md text-[0.8rem] text-bold flex justify-center items-center">
      {content}
    </div>
  );
}
