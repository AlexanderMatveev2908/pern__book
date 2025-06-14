import Title from "@/components/elements/Title";
import type { FC } from "react";
import { dummyCards, legend } from "./fields";
import WrapToolTipCard from "./components/WrapToolTipCard";
import SpanInfoCard from "@/components/elements/cards/shared/spans/SpanInfoCard";

const DummyCards: FC = () => {
  return (
    <div className="form__size grid grid-cols-1 justify-items-center justify-self-center w-full gap-y-5 h-fit">
      <Title {...{ title: "dummy cards", styleTxt: "txt__4" }} />

      <div className=" border-[3px] border-neutral-800 p-5 rounded-xl w-full grid grid-cols-1 gap-y-3 h-fit">
        <span className="txt__2 opacity-50">
          The app is currently using Stripe test mode and will not collect any
          real payments or card information.
        </span>
        <span className="txt__2 opacity-50">
          You can use the card numbers below to test different cases. For the
          expiration date, enter any future date, and for the CVC, use any
          random 3-digit number.
        </span>

        <div className="w-full grid grid-cols-1 gap-y-3 justify-items-start items-center">
          {legend.map((el) => (
            <SpanInfoCard key={el.id} {...el} />
          ))}
        </div>

        <div className="w-full grid grid-cols-1 gap-y-3 border-t-2 border-blue-600 pt-4 h-fit">
          {dummyCards.map((el) => (
            <WrapToolTipCard key={el.label} {...el} />
          ))}
        </div>

        <div className="w-full border-t-2 pt-4 border-blue-600 grid grid-cols-1 gap-y-2">
          <span className="txt__2">
            For additional information about Stripe test cards 💳, visit
          </span>

          <a
            className="txt__2 el__after_below el__flow hover:text-blue-600"
            href="https://docs.stripe.com/testing"
            target="_blank"
          >
            - https://docs.stripe.com/testing
          </a>
        </div>
      </div>
    </div>
  );
};

export default DummyCards;
