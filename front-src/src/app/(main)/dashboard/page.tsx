import Image, { StaticImageData } from "next/image";
import { container } from "tsyringe";
import requestsIcon from "../../../../public/icons/requests.svg";
import turnoverUsdtIcon from "../../../../public/icons/turnover-usdt.svg";
import turnoverUzsIcon from "../../../../public/icons/turnover-uzs.svg";
import SectionTitle from "../../../components/common/SectionTitle";
import ProfileService from "@/domain/profile.service";

const profileService = container.resolve(ProfileService);

export default async function DashboardPage() {
  const profile = await profileService.getCurrentUserOrRedirectToLogin();

  return (
    <div className="container px-4 mx-auto">
      <h1 className="font-bold text-3xl mt-12">Дашборд</h1>
      <div className="mt-5 bg-white rounded-lg py-6.25 px-5.5">
        <SectionTitle>Текущий баланс</SectionTitle>
        <div className="mt-9 snap-x snap-mandatory overflow-x-scroll flex flex-row gap-x-3 *:snap-start no-scrollbar">
          <Card
            icon={requestsIcon}
            mainText="0"
            subText="Заявок"
            bgColor="#C9E0FF"
          />
          <Card
            icon={turnoverUsdtIcon}
            mainText="0"
            subText="Оборот USDT"
            bgColor="#E0EFDC"
          />
          <Card
            icon={turnoverUzsIcon}
            mainText="0"
            subText={`Оборот ${profile.currency}`}
            bgColor="#E3D6FF"
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  mainText,
  subText,
  bgColor,
}: {
  icon: StaticImageData;
  mainText: string;
  subText: string;
  bgColor: string;
}) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="relative pt-5 pr-5 pb-6 pl-5.5 rounded-lg min-h-44 min-w-66"
    >
      <div className="absolute top-5 right-5 w-6 h-6">
        <Image src={icon} alt={mainText} />
      </div>
      <div className="absolute left-5.5 bottom-6">
        <div className="font-bold text-4xl text-[#2C3237]">{mainText}</div>
        <div className="font-extrabold text-sm opacity-60 text-[#2C3237]">
          {subText}
        </div>
      </div>
    </div>
  );
}
