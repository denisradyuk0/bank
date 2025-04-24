import Link from "next/link";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  href: string;
  badge?: number;
  onClick: () => void;
}

export default function MenuItem(props: MenuItemProps) {
  const { icon, label, isActive, href, badge, onClick } = props;
  return (
    <Link
      className={`flex items-center cursor-pointer justify-between rounded-[0.375rem] pl-3.5 pr-4.5 py-2.75 transition-all ${isActive ? "bg-[#E9F5FE]" : ""}`}
      href={href}
      prefetch
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <span
          className={`${isActive ? "grayscale-0" : "grayscale-100 "} min-w-8 *:mx-auto scale-90`}
        >
          {icon}
        </span>
        <span
          className={
            isActive ? "text-[#2196F3] font-bold" : "text-[#5D7285] font-normal"
          }
        >
          {label}
        </span>
      </div>
      {badge !== 0 && (
        <span className="bg-[#2196F3] text-white text-xs font-bold rounded-md w-6 h-6 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
