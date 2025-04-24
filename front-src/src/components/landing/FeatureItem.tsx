import Image from "next/image";

interface IFeatureItemProps {
  image: string;
  title: string;
  text: string;
}

export default function FeatureItem(props: IFeatureItemProps) {
  const { image, title, text } = props;
  return (
    <div className="flex md:mb-[20rem] mb-[5rem] w-full gap-10 md:flex-row flex-col-reverse">
      <div className="md:flex-1 relative md:h-auto h-[20rem] w-full">
        <Image src={image} fill alt="" className="object-contain" />
      </div>
      <div className="mt-5 flex-1">
        <h2 className="font-semibold lg:text-5xl text-3xl mb-5">{title}</h2>
        <p className="text-black xl:h-[30rem] lg:h-[20rem] md:h-[13rem]">
          {text}
        </p>
      </div>
    </div>
  );
}
