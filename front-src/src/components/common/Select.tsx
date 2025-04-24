"use client";

import { MouseEvent, useState } from "react";

interface ISelectProps {
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: MouseEvent<HTMLButtonElement>, value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  name: string;
}

export default function Select(props: ISelectProps) {
  const { placeholder, options, onChange, label, value, name } = props;

  const [selected, setSelected] = useState(value?.name ?? "");
  const [open, setIsOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: MouseEvent<HTMLButtonElement>, value: any) => {
    setSelected(value.name);
    setIsOpen(false);
    onChange(e, value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-text text-base font-semibold">{label}</label>
      <div className="relative">
        <div className="relative">
          <button
            className="w-full text-left text-gray-text focus:outline-none border-2 border-gray-border rounded-md pl-6 py-4 text-base font-medium bg-background"
            onClick={() => {
              setIsOpen(!open);
            }}
            type="button"
          >
            {selected.length ? selected : placeholder}
          </button>
          <input
            value={value?.id ?? ""}
            onChange={() => undefined}
            name={name}
            className="hidden"
          />
          <ArrowIcon className="absolute right-5 top-1/2 -translate-y-1/2 transition-transform" />
        </div>
        {open && (
          <div className="absolute z-50 w-full bg-white rounded-md border-2 border-gray-border overflow-y-auto max-h-[15rem]">
            {options.length ? (
              options.map((option, index) => (
                <button
                  key={index}
                  className="w-full hover:bg-gray-100 cursor-pointer text-left focus:outline-none text-gray-text pl-6 py-4 text-base font-medium not-last:border-b-2 border-gray-border "
                  onClick={(e) => handleClick(e, option)}
                >
                  {option.name}
                </button>
              ))
            ) : (
              <div className="w-full text-left focus:outline-none text-gray-text pl-6 py-4 text-base font-medium not-last:border-b-2 border-gray-border ">
                Список пуст
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L6.5 6L12 1" stroke="#8E94AA" strokeWidth="2" />
    </svg>
  );
}
