/* eslint-disable no-irregular-whitespace */
import Image from "next/image";
import Link from "next/link";

import logo from "../../public/dandypay.svg";
import person from "../../public/icons/person.svg";
import FAQ from "@/components/home/FAQ";
import FeatureItem from "@/components/landing/FeatureItem";

export default function IndexPage() {
  return (
    <>
      <header className="py-6 shadow-xl font-graphhiklcg text-[#2c2c2c]">
        <div className="flex w-full items-center justify-between mx-auto max-w-[90rem] lg:px-10 px-4">
          <div className="flex items-center gap-3.5">
            <Image src={logo} alt="Dandypay" />
            <span className="font-bold font-manrope text-gray-text text-xl">
              DANDYPAY
            </span>
          </div>
          <div className="sm:flex gap-2.5 sm:flex-row flex-col hidden">
            <Link
              href="/dashboard"
              className="rounded-[5.625rem]! text-sm pl-5! pr-7! py-2.5! bg-text-main! font-medium text-[#E6E5E5] border-2 border-text-main"
            >
              <div className="flex items-center gap-2.5">
                <Image src={person} alt="person" />
                Войти
              </div>
            </Link>
            <Link
              href="https://t.me/DandyPayAdmin1"
              className="rounded-[5.625rem]! px-7! py-2.5! text-sm  bg-text-main/10 border-2 border-text-main text-text-main! font-medium"
            >
              Стать клиентом
            </Link>
          </div>
          <div className="flex gap-2.5 sm:flex-row flex-col sm:hidden">
            <Link
              href="/dashboard"
              className="rounded-[5.625rem]! text-sm pl-5! pr-7! py-2.5! bg-text-main! font-medium text-[#E6E5E5] border-2 border-text-main"
            >
              <div className="flex items-center gap-2.5">
                <Image src={person} alt="person" />
                Войти
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="font-graphhiklcg text-[#2c2c2c]">
        <section className="container sm:pt-[10.125rem] pt-[5rem] lg:px-10 px-4 mx-auto flex sm:flex-row flex-col flex-nowrap">
          <div className="sm:flex-1 relative block sm:hidden h-[15rem]">
            <Image
              src="/images/holder.webp"
              fill
              alt="holder"
              className="object-contain"
            />
          </div>
          <div className="mx-auto flex-1 sm:block flex flex-col items-center">
            <h1 className="xl:text-[3.6rem] lg:text-[2.5rem] text-[1.5rem] uppercase mb-7">
              Прием платежей для вашего онлайн-бизнеса
            </h1>
            <p className="mb-11 text-[#707070] lg:text-base text-sm">
              Автоматизированная система приема платежей для высокорисковых
              вертикалей: казино, беттинга, гемблинга. Без чарджбеков и холда.
            </p>
            <Link
              href="https://t.me/DandyPayAdmin1"
              className="max-w-[15.875rem] w-full bg-(image:--color-button) py-4 text-white text-center rounded-xl cursor-pointer disabled:bg-gray-border disabled:cursor-default flex justify-center items-center gap-1.5"
            >
              Стать клиентом
            </Link>
          </div>
          <div className="flex-1 relative sm:block hidden">
            <Image
              src="/images/holder.webp"
              fill
              alt="holder"
              className="object-contain"
            />
          </div>
        </section>
        <section className="container sm:pt-[10.125rem] pt-[5rem] lg:px-10 px-4 mx-auto">
          <div className="flex justify-center sm:mb-[4.625rem] mb-10">
            <h2 className="sm:text-3xl text-xl text-center font-medium ">
              Полноценное решение для приема платежей на вашем сайте
            </h2>
          </div>
          <div className="flex flex-wrap md:flex-row flex-col justify-center gap-8 px-4">
            <div className="lg:flex-1 flex-1/3">
              <h3 className="font-medium text-2xl mb-2 relative after:content-[''] after:absolute after:w-3 after:h-7 after:bg-text-main after:rounded-sm after:-left-5 after:top-0">
                Выплаты в криптовалюте
              </h3>
              <p className="text-[#707070]">
                Мы принимаем P2P переводы,Вы получаете выплаты в криптовалюте.
                Поддерживаем Pay-in и Pay-out.
              </p>
            </div>
            <div className="lg:flex-1 flex-1/3">
              <h3 className="font-medium text-2xl mb-2 relative after:content-[''] after:absolute after:w-3 after:h-7 after:bg-text-main after:rounded-sm after:-left-5 after:top-0">
                Работаем в странах СНГ
              </h3>
              <p className="text-[#707070]">
                Принимаем платежи с карт Visa, Mastercard, HUMO, UZCard и любые
                карты других стран.
              </p>
            </div>
            <div className="lg:flex-1 flex-3/4 flex flex-col md:items-center">
              <h3 className="font-medium text-2xl mb-2 relative after:content-[''] after:absolute after:w-3 after:h-7 after:bg-text-main after:rounded-sm after:-left-5 after:top-0">
                Высокая конверсия в оплату
              </h3>
              <p className="text-[#707070]">
                Наша технически совершенная и стабильная платформа имеет
                рекордную конверсию в 84%, тогда как похожие площадки испытывают
                перебои и едва ли набирают конверсию в 60%.
              </p>
            </div>
          </div>
        </section>
        <section className="container sm:pt-[10.125rem] pt-[5rem] lg:px-10 px-4 mx-auto">
          <FeatureItem
            image="/images/1.webp"
            title="Автоматическая система приема платежей"
            text="Для каждой транзакции генерируем реквизиты нужного банка, на которые пользователь делает перевод. Поступившие средства обрабатываются автоматически. Среднее время закрытия транзакции менее 1 минуты."
          />
          <FeatureItem
            image="/images/2.webp"
            title="Начнте работу за час"
            text="Подключение DANDYPAY займет один час. Мы разработали для вас функциональный личный кабинет, и удобный АРІ. Возникнут вопросы? Напишите, и подключим профессионального инженера."
          />
          <FeatureItem
            image="/images/3.webp"
            title="Выведем средства моментально"
            text="Регулярные выплаты на ваш криптовалютный USDT (TRC-20) кошелек. Максимальная прозрачность каждой транзакции в личном кабинете. Выгрузки в СЅѴ для анализа."
          />
          <FeatureItem
            image="/images/4.webp"
            title="Огромный опыт работы"
            text="Наша команда занимается проектом полтора года, имея за плечами опыт в разработке сложнейших высоконагруженных систем. Доверьтесь сильной команде профессионалов."
          />
        </section>
        <section className="w-full max-w-[90rem] lg:px-10 px-4 mx-auto mb-10">
          <h1 className="text-3xl font-bold">Частые вопросы</h1>
          <FAQ
            questions={[
              "Как работает DandyPay?",
              "В каких странах вы работаете?",
              "Вы поддерживаете обратные выплаты пользователям?",
              "Сколько стоит?",
              "В чем ваши преимущества?",
            ]}
            answers={[
              `После подключения наш менеджер выдаст вам специальный API ключ, 
                  с помощью которого вы можете создавать заявки на получение денежных средств. 
                  Для каждой заявки генерируется страница оплаты с уникальными реквизитами для перевода. 
                  Средства зачисляются мгновенно, и вам автоматически
                  поступает коллбек об успешной оплате. 
                  В любой момент времени вы можете оформить выплату на ваш криптокошелек, 
                  средства поступят в течение 24 часов.`,
              `Основные страны - это Россия, Казахстан,Узбекистан, Азербайджан, Таджикистан. Для получения более подробной 
                  информации о других странах и условиях оставьте заявку на нашем сайте.`,
              `Да, мы поддерживаем выплаты на реквизиты пользователей. 
                  С помощью API ключа вы создаете заявку на выплату,
                  передав реквизиты пользователя. 
                  Каждая заявка обрабатывается вручную. 
                  В большинстве случаев пользователь получает средства в течение 1 часа.`,
              `Все зависит от типа вашего бизнеса, гео и объема трафика. 
                  Чаще всего это комиссия в несколько процентов.`,
              `Основное наше преимущество – стабильная и технически совершенная платформа. 
                  Большинство конкурентов в данной сфере не имеют достаточно технического опыта и часто работают с перебоями, 
                  однако наша команда имеет большой опыт в разработке высоконагруженных систем и финансовых проектов, 
                  включая проекты для Кремниевой долины. Наше решение работает безотказно.
                  На текущий момент обрабатываем более $500K в сутки.`,
            ]}
          />
        </section>
        <section className="w-full max-w-[90rem] lg:px-10 px-4 mx-auto sm:mb-[2rem] mb-[1rem]">
          <div className="w-full bg-cover flex items-center justify-center flex-col py-15 px-8 bg-[url(/images/footer-bg.webp)] bg-no-repeat rounded-4xl">
            <h2 className="text-white font-medium md:text-5xl sm:text-3xl text-2xl mb-5 text-center">
              Остались вопросы? Пишите
            </h2>
            <p className="text-white text-center mb-9 md:text-base text-sm">
              Станьте нашим клиентом, и получите безопасную и быструю платформу
              для приема платежей
            </p>
            <Link
              href="https://t.me/DandyPayAdmin1"
              className="py-4 px-6 bg-white rounded-xl text-text-main md:text-xl font-manrope"
            >
              Стать клиентом
            </Link>
          </div>
        </section>
        <footer className="flex w-full flex-col items-center mx-auto max-w-[90rem] lg:px-10 px-4 sm:gap-[7.125rem] gap-10">
          <div className="flex w-full sm:justify-between justify-center">
            <div className="flex items-center gap-3.5">
              <Image src={logo} alt="Dandypay" />
              <span className="font-bold font-manrope text-gray-text text-xl">
                DANDYPAY
              </span>
            </div>
            <div className="sm:flex gap-2.5 sm:flex-row flex-col hidden">
              <Link
                href="/dashboard"
                className="rounded-[5.625rem]! text-sm pl-5! pr-7! py-2.5! bg-text-main! font-medium text-[#E6E5E5] border-2 border-text-main"
              >
                <div className="flex items-center gap-2.5">
                  <Image src={person} alt="person" />
                  Войти
                </div>
              </Link>
              <Link
                href="/dashboard"
                className="rounded-[5.625rem]! px-7! py-2.5! text-sm  bg-text-main/10 border-2 border-text-main text-text-main font-medium"
              >
                Стать клиентом
              </Link>
            </div>
          </div>
          <p className="text-[0.875rem] text-[#656565] font-light">
            © All rights reserved DandyPay 2025
          </p>
        </footer>
      </main>
    </>
  );
}
