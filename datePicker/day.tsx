import { ButtonHTMLAttributes } from "react";

import jMoment, { Moment } from "jalali-moment";
import gMoment from "moment";
import { twMerge } from "tailwind-merge";

import { MarkedDaysType } from "@/components/datePicker/caledarTypes";
import { useLocale } from "@/customHooks/useLocale";

export type DayProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  date?: Moment | string;
  markedDay: MarkedDaysType[number];
};

const Day = ({ date, markedDay, ...props }: DayProps) => {
  const { locale } = useLocale();
  const moment: any = locale === "/fa" ? jMoment : gMoment;

  const formattedDate = date
    ? moment(date, "YYYY-M-D")
      .locale(locale.substring(1))
      .format(locale === "/fa" ? "jD" : "D")
    : "";

  const today = moment(new Date()).format("YYYY-MM-DD");
  const day = moment(date).format("YYYY-MM-DD");

  const _onClick = (date: any) => {
    props?.onClick?.(date);
  };

  return (
    <button
      onClick={() => _onClick(date)}
      className={twMerge(
        `m-auto flex h-10 w-10 items-center justify-center !px-0`,
        day === today && markedDay?.date !== today && "rounded-full border-primaryColor border",
        markedDay?.className,
      )}
      {...props}
    >
      {formattedDate}
    </button>
  );
};

export default Day;
