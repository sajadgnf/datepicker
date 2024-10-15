import { useTranslations } from "next-intl";

import { useContext, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import jMoment, { Moment } from "jalali-moment";
import gMoment from "moment";
import { twMerge } from "tailwind-merge";

import { useLocale } from "@/customHooks/useLocale";

import { CalendarContext, CalendarContextType } from ".";
import CustomModal from "../modal/customModal";
import getAllDaysInMonth from "./helper";

const YearPicker = () => {
  const years = [];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { locale } = useLocale();

  const moment: any = locale === "/fa" ? jMoment : gMoment;

  const { cursor, setCursor, yearCursor, setYearCursor } = useContext(CalendarContext) as CalendarContextType;
  const { firstDayOfMonth } = getAllDaysInMonth(cursor, locale);

  const t = useTranslations();

  const handleClose = () => setIsOpen(false);

  const handleSelectYear = (year: number) => {
    setCursor(
      cursor -
      (+(firstDayOfMonth as Moment).locale(locale.substring(1)).format(locale === "/fa" ? "jYYYY" : "YYYY") - year) *
      12,
    );
    handleClose();
  };

  const currentYear = moment(new Date())
    .locale(locale.substring(1))
    .format(locale === "/fa" ? "jYYYY" : "YYYY");

  for (let i = 0; years.length <= 15; i++) {
    years.push(+currentYear - yearCursor * 16 - i);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <p>{(firstDayOfMonth as Moment).locale(locale.substring(1)).format(locale === "/fa" ? "jYYYY" : "YYYY")}</p>
      </button>

      <CustomModal
        open={isOpen}
        title={t("choose_year")}
        handleClose={handleClose}
        contentWrapperExtraClass="flex"
        wrapperExtraClass="w-full md:w-2/3 xl:w-1/2"
      >
        <button
          disabled={yearCursor === 7}
          className={yearCursor === 7 ? "text-gray-400" : ""}
          onClick={() => setYearCursor(yearCursor + 1)}
        >
          {locale === "/fa" ? <BiChevronRight size={34} /> : <BiChevronLeft size={34} />}
        </button>

        <div className="flex flex-wrap">
          {years.reverse().map((year) => (
            <button
              key={year}
              onClick={() => handleSelectYear(year)}
              className={twMerge(
                "p-4",
                year ===
                  +(firstDayOfMonth as Moment).locale(locale.substring(1)).format(locale === "/fa" ? "jYYYY" : "YYYY")
                  ? "text-white bg-black"
                  : "text-black bg-gray-200",
              )}
            >
              {year}
            </button>
          ))}
        </div>

        <button
          disabled={yearCursor === 0}
          className={yearCursor === 0 ? "text-gray-400" : ""}
          onClick={() => setYearCursor(yearCursor - 1)}
        >
          {locale === "/fa" ? <BiChevronLeft size={34} /> : <BiChevronRight size={34} />}
        </button>
      </CustomModal>
    </>
  );
};

export default YearPicker;
