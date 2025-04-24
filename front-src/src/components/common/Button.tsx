"use client";

import { ReactNode } from "react";

export interface IButtonProps {
  title?: string;
  color?: string;
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button(props: IButtonProps) {
  const {
    title,
    color,
    trailingIcon,
    onClick,
    className,
    disabled,
    leadingIcon,
  } = props;
  const backgroundColor = color ? `bg-${color}` : "bg-(image:--color-button)";

  return (
    <button
      onClick={onClick}
      className={`${className} py-4 ${!disabled && backgroundColor} text-white text-center rounded-xl cursor-pointer disabled:bg-gray-border disabled:cursor-default flex justify-center items-center gap-1.5`}
      disabled={disabled}
    >
      {leadingIcon}
      {title}
      {trailingIcon}
    </button>
  );
}
