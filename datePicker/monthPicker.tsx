import { useTranslations } from "next-intl";

import { useContext, useState } from "react";

import jMoment, { Moment } from "jalali-moment";
import gMoment from "moment";
import { twMerge } from "tailwind-merge";

import { useLocale } from "@/customHooks/useLocale";

import { CalendarContext, CalendarContextType } from ".";
import CustomModal from "../modal/customModal";
import getAllDaysInMonth from "./helper";

const MonthPicker = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const moment: any = locale === "/fa" ? jMoment : gMoment;

  const { cursor, setCursor } = useContext(CalendarContext) as CalendarContextType;
  const { firstDayOfMonth } = getAllDaysInMonth(cursor, locale);

  const handleClose = () => setIsOpen(false);

  const handleSelectMonth = (index: number) => {
    setCursor(
      cursor -
      (+(firstDayOfMonth as Moment).locale(locale.substring(1)).format(locale === "/fa" ? "jM" : "M") - index - 1),
    );
    handleClose();
  };

  const months = [];

  for (let i = 0; months.length <= 11; i++) {
    locale === "/fa"
      ? months.push(moment().locale(locale.substring(1)).clone().jMonth(i).format("jMMMM"))
      : months.push(moment().locale(locale.substring(1)).clone().month(i).format("MMMM"));
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <p>{(firstDayOfMonth as Moment).locale(locale.substring(1)).format(locale === "/fa" ? "jMMMM" : "MMMM")}</p>
      </button>

      <CustomModal
        open={isOpen}
        handleClose={handleClose}
        title={t("choose_month")}
        wrapperExtraClass="w-full sm:w-1/2 md:w-fit"
      >
        <div className="flex flex-col md:flex-row">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleSelectMonth(index)}
              className={twMerge(
                "p-4",
                month ===
                  (firstDayOfMonth as Moment).locale(locale.substring(1)).format(locale === "/fa" ? "jMMMM" : "MMMM")
                  ? "text-white bg-black"
                  : "text-black bg-gray-200",
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </CustomModal>
    </>
  );
};

export default MonthPicker;
