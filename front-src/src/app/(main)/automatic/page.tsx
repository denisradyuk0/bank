import SectionTitle from "../../../components/common/SectionTitle";
import Automatic from "./Automatic";

export default function AutomaticPage() {
  return (
    <div className="px-4">
      <div className="container mx-auto bg-white rounded-lg py-6.25 px-5.5 mt-5">
        <SectionTitle>Подключение автоматики</SectionTitle>
        <Automatic className="mt-4" />
      </div>
    </div>
  );
}
