import { useContext, useEffect, useState, useMemo, useCallback } from "react";

import { twMerge } from "tailwind-merge";

import Day from "./day";
import handleDayPress from "../helper/handleDayPress";

import { CalendarContext } from "..";
import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "../helper/localizeDate";
import getAllDaysInMonth from "../helper/allDaysInMonth";
import { getDaysBetween } from "../helper/getDaysBetween";
import { isDateEqual, isDateHigher, isDateLower } from "../helper/comparisonDates";

import {
  CalendarContextType,
  DatePickerProps,
  DateRangedType,
  MarkedDaysType,
  SetDateRangedType,
} from "@/components/datePicker/calendarTypes";

type PropsType = {
  dateRanged: DateRangedType;
  setDateRanged: SetDateRangedType;
} & DatePickerProps;

export const markedDaysStyles = {
  leftSideRounded: "rounded-tl-lg rounded-bl-lg",
  rightSideRounded: "rounded-tr-lg rounded-br-lg",
  oneDateSelected: "rounded-lg bg-primaryBlueColor text-white",
  middleDateStyle: "bg-primaryBlueColor/10 rounded-none border-none w-full",
  selectedDates: "bg-primaryBlueColor rounded-none border-none w-full text-white",
};

export const startDateStyle = (locale: string) =>
  twMerge(
    markedDaysStyles.selectedDates,
    locale === "/fa" ? markedDaysStyles.rightSideRounded : markedDaysStyles.leftSideRounded,
  );
export const endDateStyle = (locale: string) =>
  twMerge(
    markedDaysStyles.selectedDates,
    locale === "/fa" ? markedDaysStyles.leftSideRounded : markedDaysStyles.rightSideRounded,
  );

const Days = ({ dateRanged, setDateRanged, ...props }: PropsType) => {
  const [markedDays, setMarkedDays] = useState<MarkedDaysType>([]);

  const { locale } = useLocale();
  const { cursor } = useContext(CalendarContext) as CalendarContextType;

  const { daysArray } = getAllDaysInMonth(cursor, locale);

  const markedDaysMap = useMemo(() => {
    const map = new Map<string, MarkedDaysType[number]>();
    markedDays.forEach((day) => {
      map.set(day.date, day);
    });
    return map;
  }, [markedDays]);

  useEffect(() => {
    const start = localizeDate({ date: props.selectedDates.start });
    const end = localizeDate({ date: props.selectedDates.end });

    if (start === end) {
      setMarkedDays([
        {
          date: start,
          className: markedDaysStyles.oneDateSelected,
        },
      ]);
    } else if (start && end) {
      const middleDays = getDaysBetween(start, end);

      setMarkedDays([
        {
          date: start,
          className: startDateStyle(locale),
        },
        ...middleDays.map((day) => ({
          date: localizeDate({ date: day }),
          className: markedDaysStyles.middleDateStyle,
        })),
        {
          date: end,
          className: endDateStyle(locale),
        },
      ]);
    }
  }, [props.selectedDates]);

  function findMarkedDay(date: string) {
    const localizedDate = localizeDate({ date });
    return markedDaysMap.get(localizedDate) || null;
  }

  function shouldDisable(date: string) {
    return (
      isDateLower(props.disableDaysAfter || "", date) ||
      isDateHigher(props.disableDaysBefore || "", date) ||
      props.disableDaysIn?.find((disableDate) => isDateEqual(disableDate, date))
    );
  }

  const _onDayPress = useCallback(
    (dayPressed: string) => {
      handleDayPress({
        dateRanged,
        dayPressed,
        markedDays,
        setDateRanged,
      });
    },
    [locale, dateRanged, markedDays, setDateRanged, setMarkedDays],
  );

  const daysList = useMemo(
    () =>
      daysArray?.map((item: any, index: number) => {
        const markedDay = findMarkedDay(item.date);

        return (
          <Day
            date={item.date}
            key={`${cursor}-${index}`}
            onClick={() => _onDayPress(item.date)}
            markedDay={markedDay as MarkedDaysType[number]}
            disabled={(shouldDisable(item.date) as boolean) || !item.date}
          />
        );
      }),
    [daysArray, markedDaysMap, _onDayPress, cursor],
  );

  return daysList;
};

export default Days;
