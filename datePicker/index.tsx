"use client";

import { createContext, useEffect, useState } from "react";

import { Moment, default as gMoment, default as jMoment } from "jalali-moment";

import {
  DateRangedType,
  MarkedDaysType,
  SelectedDatesType,
  SetSelectedDatesType,
} from "@/components/datePicker/caledarTypes";
import { useLocale } from "@/customHooks/useLocale";

import Trans from "../common/trans";
import Day from "./day";
import handleDayPress from "./handleDayPress";
import Header from "./header";
import getAllDaysInMonth from "./helper";
import TimePicker from "./timePicker";
import WeekDays from "./weekDays";

type DatePickerProps = {
  disableDaysIn?: moment.Moment[];
  disableDaysAfter?: moment.Moment;
  selectedDates: SelectedDatesType;
  disableDaysBefore?: moment.Moment;
  setSelectedDates: SetSelectedDatesType;
  onDayPress?: (dayPressed: Moment) => void;
};

export type CalendarContextType = {
  cursor: number;
  yearCursor: number;
  setCursor: (cursor: number) => void;
  setYearCursor: (cursor: number) => void;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);

const DatePicker = ({ onDayPress, selectedDates, setSelectedDates, ...props }: DatePickerProps) => {
  const { locale } = useLocale();
  const moment: any = locale === "/fa" ? jMoment : gMoment;

  const [cursor, setCursor] = useState(0);
  const [yearCursor, setYearCursor] = useState(0);
  const [markedDays, setMarkedDays] = useState<MarkedDaysType>([]);
  const [dateRanged, setDateRanged] = useState<DateRangedType>({
    start: { date: "", time: "" },
    end: { date: "", time: "" },
  });

  const { daysArray } = getAllDaysInMonth(cursor, locale);

  function findMarkedDay(date: moment.Moment) {
    for (let i = 0; i < (markedDays as [])?.length; i++) {
      if (moment(markedDays?.[i].date, "YYYY-MM-DD").isSame(date)) {
        return markedDays?.[i];
      }
    }
    return null;
  }

  function shouldDisable(date: moment.Moment) {
    return (
      props.disableDaysAfter?.isBefore(date) ||
      props.disableDaysBefore?.isAfter(date) ||
      props.disableDaysIn?.find((disableDate) => moment(disableDate).isSame(date))
    );
  }

  const _onDayPress = (dayPressed: Moment) => {
    handleDayPress({
      locale,
      dateRanged,
      dayPressed,
      markedDays,
      setDateRanged,
      setMarkedDays,
    });
  };

  useEffect(() => {
    if (markedDays?.length !== 0 && cursor === 0) {
      let a =
        (+moment(markedDays?.[0]?.date).locale(locale.substring(1)).format("YYYY") -
          +moment(new Date()).locale(locale.substring(1)).format("YYYY")) *
        12 +
        (+moment(markedDays?.[0]?.date).locale(locale.substring(1)).format("M") -
          +moment(new Date()).locale(locale.substring(1)).format("M"));
      setCursor(a);
    }
  }, [cursor, locale, markedDays, moment]);

  useEffect(() => {
    if (dateRanged.start.date && dateRanged.start.time) {
      setSelectedDates({
        start: moment(dateRanged.start.date + " " + (dateRanged.start.time as string)).format(
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ",
        ),
        end: moment(dateRanged.end.date + " " + (dateRanged.end.time as string)).format(
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ",
        ),
      });
    } else {
      setDateRanged({
        start: {
          date: moment(new Date()).format("YYYY-MM-DD"),
        },
        end: { date: moment(new Date()).format("YYYY-MM-DD") },
      });
    }
  }, [dateRanged, moment, setSelectedDates]);

  return (
    <CalendarContext.Provider
      value={{
        cursor: cursor,
        setCursor: setCursor,
        yearCursor: yearCursor,
        setYearCursor: setYearCursor,
      }}
    >
      <div className={"grid w-[350px] gap-7"}>
        <Header />
        <WeekDays />

        <div className="grid grid-cols-7 items-center">
          {daysArray?.map((item, index) => {
            const markedDay = markedDays && markedDays.length && findMarkedDay(item.date as moment.Moment);

            return (
              <Day
                key={index}
                date={item.date as Moment}
                markedDay={markedDay as MarkedDaysType[number]}
                onClick={() => _onDayPress(item.date as Moment)}
                disabled={shouldDisable(item.date as moment.Moment) as boolean}
              />
            );
          })}
        </div>
        {dateRanged?.start.date && (
          <>
            <div className="flex items-center gap-2">
              <Trans>from</Trans>
              <TimePicker setDateRanged={setDateRanged} dateRanged={dateRanged} type="start" />
              {moment(dateRanged?.start.date)
                .locale(locale.substring(1))
                .format(locale === "/fa" ? "YYYY/MM/DD" : "MM/DD/YYYY")}
            </div>
            <div className="flex items-center gap-2">
              <Trans>to</Trans>
              <TimePicker setDateRanged={setDateRanged} dateRanged={dateRanged} type="end" />
              {moment(dateRanged?.end.date)
                .locale(locale.substring(1))
                .format(locale === "/fa" ? "YYYY/MM/DD" : "MM/DD/YYYY")}
            </div>
          </>
        )}
      </div>
    </CalendarContext.Provider>
  );
};

export default DatePicker;
