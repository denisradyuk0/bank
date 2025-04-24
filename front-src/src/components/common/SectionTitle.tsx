import React, { ReactNode } from "react";

export default function SectionTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode[] | ReactNode;
}) {
  return (
    <div className={`${className} flex flex-row items-center`}>
      <div className="bg-[#2196F3] w-3.5 h-8 rounded-md inline-block" />
      <h2 className="ml-3 font-bold text-xl text-[#5D7285] inline-block w-full">
        {children}
      </h2>
    </div>
  );
}
