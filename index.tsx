"use client";

import { createContext, useEffect, useState, useMemo } from "react";

import jMoment from "jalali-moment";

import Days from "./days";
import Times from "./times";
import Header from "./header";
import WeekDays from "./weekDays";

import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "./helper/localizeDate";
import { formatCustomDate } from "./helper/formatDate";

import { CalendarContextType, DatePickerProps, DateRangedType } from "@/components/datePicker/calendarTypes";

export const CalendarContext = createContext<CalendarContextType | null>(null);

const DatePicker = ({ onDayPress, selectedDates, setSelectedDates, ...props }: DatePickerProps) => {
  const [cursor, setCursor] = useState(0);
  const [yearCursor, setYearCursor] = useState(0);
  const [dateRanged, setDateRanged] = useState<DateRangedType>({
    start: { date: "", time: "" },
    end: { date: "", time: "" },
  });

  const { locale } = useLocale();

  const contextValue = useMemo(
    () => ({
      cursor: cursor,
      setCursor: setCursor,
      yearCursor: yearCursor,
      setYearCursor: setYearCursor,
    }),
    [cursor, yearCursor],
  );

  useEffect(() => {
    const today = new Date();
    const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

    if (selectedDates.start && selectedDates.end) {
      setDateRanged({
        start: {
          date: localizeDate({ date: selectedDates.start }),
          time: localizeDate({
            options: timeOptions,
            date: selectedDates.start,
          }),
        },
        end: {
          date: localizeDate({ date: selectedDates.end }),
          time: localizeDate({
            options: timeOptions,
            date: selectedDates.end,
          }),
        },
      });
    }

    if (selectedDates?.start && selectedDates.start !== "Invalid Date" && cursor === 0) {
      let yearDiff: number;
      let monthDiff: number;

      if (locale === "/fa") {
        const markedDate = jMoment(new Date(selectedDates.start));
        const todayJ = jMoment();

        yearDiff = markedDate.jYear() - todayJ.jYear();
        monthDiff = markedDate.jMonth() - todayJ.jMonth();
      } else {
        const markedDate = new Date(selectedDates.start);
        yearDiff = markedDate.getFullYear() - today.getFullYear();
        monthDiff = markedDate.getMonth() - today.getMonth();
      }

      const monthOffset = yearDiff * 12 + monthDiff;
      setCursor(monthOffset);
    }
  }, []);

  useEffect(() => {
    if (dateRanged.start.date && dateRanged.start.time)
      setSelectedDates({
        start: formatCustomDate({
          date: dateRanged.start.date,
          time: dateRanged.start.time,
        }),
        end: formatCustomDate({
          date: dateRanged.end.date,
          time: dateRanged.end.time as string,
        }),
      });
  }, [dateRanged, setSelectedDates]);

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={"grid w-[246px] sm:w-[260px] gap-2"}>
        <Header />
        <WeekDays />

        <div className="grid grid-cols-7 items-center">
          <Days
            dateRanged={dateRanged}
            setDateRanged={setDateRanged}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            {...props}
          />
        </div>
        <Times dateRanged={dateRanged} setDateRanged={setDateRanged} />
      </div>
    </CalendarContext.Provider>
  );
};

export default DatePicker;
