import { ButtonHTMLAttributes, useMemo, useCallback } from "react";

import { twMerge } from "tailwind-merge";

import Button from "../../button/button";
import { MarkedDaysType } from "@/components/datePicker/calendarTypes";

import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "../helper/localizeDate";

export type DayProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled: boolean;
  date?: string | Date | null;
  markedDay: MarkedDaysType[number];
};

const Day = ({ date, markedDay, disabled, ...props }: DayProps) => {
  const { locale } = useLocale();

  const formattedDate = useMemo(
    () =>
      date
        ? localizeDate({
          date,
          locale,
          options: {
            day: "numeric",
          } as Intl.DateTimeFormatOptions,
        })
        : "",
    [date, locale],
  );

  const today = useMemo(() => localizeDate({ locale, date: new Date().toISOString() }), [locale]);

  const day = useMemo(() => localizeDate({ locale, date: date || "" }), [locale, date]);

  const _onClick = useCallback(
    (date: any) => {
      props?.onClick?.(date);
    },
    [date],
  );

  const buttonClass = useMemo(
    () =>
      twMerge(
        `m-auto flex h-8 w-8 items-center justify-center !px-0 my-0.5 font-semibold text-black`,
        day === today && markedDay?.date !== today && "rounded-full border-primaryBlueColor border",
        markedDay?.className,
      ),
    [day, today, markedDay?.date, markedDay?.className],
  );

  return (
    <Button variant="ghost" disabled={disabled} onClick={() => _onClick(date)} extraClass={buttonClass} {...props}>
      {formattedDate}
    </Button>
  );
};

export default Day;
