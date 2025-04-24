"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../../components/common/Button";
import { cn } from "../../../lib/utils";
import spinner from "@/../public/icons/spinner.webp";

export default function Automatic({ className }: { className: string }) {
  const [init, setInit] = useState(false);
  const [automaticOn, setAutomaticOn] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }
    if (!loading) setAutomaticOn(!automaticOn);
    else setTimeout(() => setLoading(false), 3000);
  }, [loading]);

  return (
    <div className={className}>
      {loading ? (
        <div className="flex flex-col items-center">
          <Image
            className="h-9 w-9 object-contain mt-7"
            src={spinner}
            alt="spinner"
          />
          <div className="font-medium text-[#5D7285] text-center mt-2.5">
            {automaticOn ? "Отключение" : "Подключение"}...
          </div>
        </div>
      ) : (
        <AutomaticMessage automaticOn={automaticOn} />
      )}
      <div className="w-full text-center mt-8 font-semibold text-[#5D7285] opacity-60">
        Статус:
      </div>
      <AutomaticStatus className="mt-2" automaticOn={automaticOn} />
      <Button
        title={automaticOn ? "Выключить" : "Включить"}
        className="w-full !py-3.5 !rounded-lg"
        disabled={loading}
        onClick={() => setLoading(true)}
      />
    </div>
  );
}

function AutomaticMessage({ automaticOn }: { automaticOn: boolean }) {
  return (
    <div className="">
      <div className="bg-[#E9F5FE] border-2 font-medium border-blue-200 rounded-md p-2 text-[#5787AD] px-8">
        <p className="text-center text-sm">
          {automaticOn ? (
            <>
              Автоматика подключена успешно!
              <br />
              Не закрывайте браузер для
              <br />
              корректной работы
            </>
          ) : (
            "Включите для считывания уведомлений банкингов"
          )}
        </p>
      </div>
    </div>
  );
}

function AutomaticStatus({
  automaticOn,
  className,
}: {
  automaticOn: boolean;
  className: string;
}) {
  return (
    <div className={cn("w-full mb-4", className)}>
      <div
        className={`w-full px-4 py-2.5 rounded-sm text-sm font-medium flex justify-center items-center ${
          automaticOn
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-red-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>AUTOMATIC {automaticOn ? "ON" : "OFF"}</span>
          <span
            className={`w-2 h-2 rounded-full ${
              automaticOn ? "bg-green-600" : "bg-red-600"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
