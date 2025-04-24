"use client";

import React, { useState } from "react";
import Image from "next/image";
import notification from "../../../public/icons/notification.svg";
import Modal from "../common/Modal";

export default function NotificationsButton({
  className,
}: {
  className?: string;
}) {
  const [modalShown, showModal] = useState(false);
  const toggleModal = () => showModal(!modalShown);
  return (
    <>
      <div onClick={toggleModal} className={`cursor-pointer ${className}`}>
        <Image src={notification} alt="Уведомления" />
      </div>
      <Modal show={modalShown} title="Уведомления" onClose={toggleModal}>
        <div className="px-16 py-12 text-[#5D7285] text-center opacity-50">
          У вас нет новых уведомлений
        </div>
      </Modal>
    </>
  );
}
