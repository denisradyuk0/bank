"use client";

import { useState } from "react";

export interface ISwitchProps {
  className?: string;
  onToggle: (value: boolean) => void;
  value: boolean;
  disabled?: boolean;
}

export default function Switch(props: ISwitchProps) {
  const { className, onToggle, value: initialValue, disabled } = props;
  const toggle = () => {
    if (disabled) return;
    setValue(!value);
    onToggle(!value);
  };
  const [value, setValue] = useState(initialValue);
  return (
    <div
      onClick={toggle}
      className={`transition-all ${disabled ? "cursor-default" : "cursor-pointer"} w-12 rounded-full ${value ? "bg-[#2196F3]" : "bg-[#5D7285]"} p-1 ${className}`}
    >
      <div
        className={`rounded-full transition-all bg-[#E9F5FE] w-4 h-4 ${value ? "ml-[calc(100%-1rem)]" : "ml-0"}`}
      />
    </div>
  );
}
