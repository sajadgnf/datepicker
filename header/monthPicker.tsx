import { useContext, useCallback } from "react";

import { CalendarContext } from "..";
import SelectInput from "../../inputs/selectInput";

import { useLocale } from "@/customHooks/useLocale";
import getAllDaysInMonth from "../helper/allDaysInMonth";

import { CalendarContextType } from "../calendarTypes";
import { gregorianMonthNames, persianMonthNames } from "../constants";

const MonthPicker = () => {
  const { locale } = useLocale();
  const { cursor, setCursor } = useContext(CalendarContext) as CalendarContextType;
  const { monthIndex } = getAllDaysInMonth(cursor, locale);

  const handleSelectMonth = useCallback(
    (index: number) => {
      const delta = monthIndex - index;
      setCursor(cursor - delta);
    },
    [monthIndex, cursor, setCursor],
  );

  const months = locale === "/fa" ? persianMonthNames : gregorianMonthNames;

  const options = months.map((item, index) => ({ value: index.toString(), label: item }));

  return (
    <SelectInput
      isRow
      name="month"
      options={options}
      value={monthIndex.toString()}
      onValueChange={(value) => handleSelectMonth(+value)}
    />
  );
};

export default MonthPicker;
