import { container } from "tsyringe";
import Header from "../../components/header/header";
import TrafficToggle from "../actions/traffic-toggle";
import "reflect-metadata";
import ProfileService from "../../domain/profile.service";
import CommonInfoService from "../../domain/common-info.service";

const profileService = container.resolve(ProfileService);
const commonInfoService = container.resolve(CommonInfoService);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profilePromise = profileService.getCurrentUserOrRedirectToLogin();
  const infoPromise = commonInfoService.getCommonInfo();
  const [profile, info] = await Promise.all([profilePromise, infoPromise]);

  return (
    <div className="bg-[#F5F7F8] min-h-screen">
      <Header
        trafficOn={profile.traffic_enabled}
        onTrafficToggle={TrafficToggle}
        token={profile.token}
        apiKey={profile.api_token}
        apiOn={profile.api_enabled}
        bot={info.bot}
        betEntry={profile.rate_in}
        betOutput={profile.rate_out}
      />
      {children}
    </div>
  );
}
