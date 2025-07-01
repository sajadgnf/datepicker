import Trans from "../common/trans";

import { useLocale } from "@/customHooks/useLocale";

import { gregorianDaysNames, persianDaysNames } from "./constants";

const WeekDays = () => {
  const { locale } = useLocale();

  const weekDays = locale === "/fa" ? persianDaysNames : gregorianDaysNames;

  return (
    <div className="grid grid-cols-7">
      {weekDays.map((item) => (
        <p key={item} className="m-auto flex justify-center text-gray-600 capitalize">
          <Trans>{item}</Trans>
        </p>
      ))}
    </div>
  );
};

export default WeekDays;
