import React, { ReactNode } from "react";
import Image from "next/image";
import cross from "../../../public/icons/cross.svg";
import SectionTitle from "./SectionTitle";

export default function Modal({
  className,
  title,
  children,
  show,
  onClose,
}: {
  className?: string;
  title: string;
  children: ReactNode | ReactNode[];
  show: boolean;
  onClose: () => void;
}) {
  if (!show) return null;
  return (
    <div
      className={`${className} fixed bg-[#75757566] left-0 right-0 top-0 bottom-0 z-50`}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        <div
          className="absolute top-0 right-0 left-0 bottom-0"
          onClick={onClose}
        />
        <div className="bg-white rounded-xl py-6 px-5.5 mx-4 relative">
          <div
            className="absolute top-7 right-6 p-1 cursor-pointer"
            onClick={onClose}
          >
            <Image src={cross} alt="Закрыть" />
          </div>
          <SectionTitle className="w-full">{title}</SectionTitle>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
