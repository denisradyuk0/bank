"use client";

import React from "react";
import Image from "next/image";
import NotificationsButton from "@/components/header/notifications";
import Switch from "@/components/common/Switch";
import Sidebar from "@/components/sidebar/sidebar";

export default function Header({
  onTrafficToggle,
  trafficOn,
  token,
  apiKey,
  apiOn,
  bot,
  betEntry,
  betOutput,
}: {
  onTrafficToggle: (on: boolean) => void;
  trafficOn: boolean;
  token: string;
  apiKey: string;
  apiOn: boolean;
  bot: string;
  betEntry: number;
  betOutput: number;
}) {
  const [isOpened, setIsOpened] = React.useState(false);
  const handleOpen = () => {
    setIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpened(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className="bg-white flex flex-row pt-6 pb-5.5 px-5">
        <div className="text-sm font-semibold opacity-60">Трафик</div>
        <Switch className="ml-2" onToggle={onTrafficToggle} value={trafficOn} />
        <NotificationsButton className="ml-9" />
        <button
          className="ml-auto w-6 h-6 relative p-1 cursor-pointer"
          onClick={handleOpen}
        >
          <Image src="icons/burger.svg" alt="Menu" fill />
        </button>
      </div>
      <Sidebar
        isOpened={isOpened}
        onClose={handleClose}
        token={token}
        apiKey={apiKey}
        apiOn={apiOn}
        bot={bot}
        betEntry={betEntry}
        betOutput={betOutput}
      />
    </>
  );
}
