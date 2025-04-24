"use client";

import React, { ChangeEvent, ReactNode, useState } from "react";

export interface IInputProps {
  placeholder?: string;
  value?: string | undefined;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  leadingIcon?: ReactNode;
  name?: string;
  type?: string;
  maxLength?: number;
  minLength?: number;
  formatInput?: (value: string) => string;
  sublabel?: string;
}

export default function Input(props: IInputProps) {
  const {
    onChange,
    className,
    value: initValue,
    placeholder,
    label,
    leadingIcon,
    name,
    maxLength,
    minLength,
    formatInput,
    sublabel,
  } = props;
  const [value, setValue] = useState(initValue);
  const [prettyValue, setPrettyValue] = useState(initValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let formattedValue = rawValue;
    if (formatInput) formattedValue = formatInput(rawValue);
    setValue(rawValue);
    setPrettyValue(formattedValue);
    if (onChange) onChange(e);
  };
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-gray-text text-base font-semibold">
          {label}
        </label>
      )}
      {sublabel && (
        <label className="text-gray-text text-xs font-semibold">
          {sublabel}
        </label>
      )}
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-4">
          {leadingIcon}
        </div>
        <input
          maxLength={maxLength}
          minLength={minLength}
          type={props.type ?? "text"} // 👈 сюда подтягиваем переданный type
          name={name}
          value={value ?? ""}
        />
        <input
          className={`w-full focus:outline-none border-2 border-gray-border rounded-md pl-6 py-4 text-base font-medium ${className}`}
          placeholder={placeholder}
          value={prettyValue}
          onChange={handleChange}
          maxLength={maxLength}
          minLength={minLength}
        />
      </div>
    </div>
  );
}
