import { useContext, useMemo, useCallback } from "react";

import { CalendarContext } from "..";
import SelectInput from "../../inputs/selectInput";
import { CalendarContextType } from "../calendarTypes";

import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "../helper/localizeDate";
import getAllDaysInMonth from "../helper/allDaysInMonth";
import { convertPersianDigitsToEnglish } from "../helper/digits";

const YearPicker = () => {
  const { locale } = useLocale();
  const { cursor, setCursor, yearCursor } = useContext(CalendarContext) as CalendarContextType;
  const { firstDayOfMonth } = getAllDaysInMonth(cursor, locale);

  const getLocalizedYear = (date: string, locale: "/fa" | "/en"): number => {
    const rawYear = localizeDate({
      date,
      locale,
      options: { year: "numeric" },
    });

    return Number(convertPersianDigitsToEnglish(rawYear));
  };

  const selectedYear = getLocalizedYear(firstDayOfMonth.toString(), locale);
  const currentYear = getLocalizedYear(new Date().toISOString(), locale);

  const handleSelectYear = useCallback(
    (year: number) => {
      const delta = selectedYear - year;
      setCursor(cursor - delta * 12);
    },
    [selectedYear, cursor, setCursor],
  );

  const years = useMemo(() => {
    const yearsArray: number[] = [];
    for (let i = 0; yearsArray.length <= 12; i++) {
      yearsArray.push(+currentYear - yearCursor * 16 - i);
    }
    return yearsArray.sort((a, b) => a - b);
  }, [currentYear, yearCursor]);

  const yearOptions = years.map((item) => ({ value: item.toString(), label: item.toString() }));

  return (
    <>
      <SelectInput
        isRow
        name="month"
        options={yearOptions}
        value={selectedYear.toString()}
        onValueChange={(value) => handleSelectYear(+value)}
      />
    </>
  );
};

export default YearPicker;
