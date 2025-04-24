interface ISelectButtonProps {
  title: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function SelectButton(props: ISelectButtonProps) {
  const { title, active, disabled, className } = props;
  let { onClick } = props;
  let style = active
    ? "bg-light-blue text-text-main"
    : "bg-background text-gray-text";
  if (disabled) {
    style =
      "bg-white border-2 border-[#DEDEDE] !cursor-not-allowed text-gray-text";
    onClick = () => undefined;
  }

  return (
    <button
      className={`py-3 px-3 grow shrink-0 font-semibold  rounded-md cursor-pointer ${style} ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
