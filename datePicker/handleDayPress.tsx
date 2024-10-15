import moment, { Moment } from "jalali-moment";
import { twMerge } from "tailwind-merge";

import { DateRangedType, MarkedDaysType, SetDateRangedType, SetMarkedDaysType } from "./caledarTypes";
import getDaysBetween from "./getDaysBetween";

const handleDayPress = ({
  locale,
  dateRanged,
  dayPressed,
  markedDays,
  setDateRanged,
  setMarkedDays,
}: {
  locale: "/fa" | "/en";
  dateRanged: DateRangedType;
  markedDays: MarkedDaysType;
  dayPressed: Moment | string;
  setDateRanged: SetDateRangedType;
  setMarkedDays: SetMarkedDaysType;
}) => {
  const date = moment(dayPressed).format("YYYY-MM-DD");
  const startDate = moment(dateRanged?.start?.date);

  const startDateStyle = twMerge(
    "bg-[#333] rounded-none border-none w-full text-white",
    locale === "/fa" ? "rounded-tr-lg rounded-br-lg" : "rounded-tl-lg rounded-bl-lg",
  );
  const endDateStyle = twMerge(
    "rounded-none border-none bg-[#333] w-full text-white",
    locale === "/fa" ? "rounded-tl-lg rounded-bl-lg" : "rounded-tr-lg rounded-br-lg",
  );
  const middleDateStyle = "bg-[#afafaf] rounded-none border-none w-full text-white";

  if (markedDays.length === 0) {
    setDateRanged({ start: { ...dateRanged.start, date }, end: { ...dateRanged.end, date } });
    setMarkedDays([
      {
        date,
        className: "rounded-none bg-[#333] w-[45px] text-[#fff]",
      },
    ]);
  } else if (markedDays.length === 1 && moment(startDate).isBefore(dayPressed)) {
    setDateRanged({ ...dateRanged, end: { ...dateRanged.end, date } });
    const middleDays = getDaysBetween(moment(startDate), moment(dayPressed));

    setMarkedDays([
      {
        date: startDate,
        className: startDateStyle,
      },
      ...middleDays.map((day) => ({
        date: moment(day).format("YYYY-MM-DD"),
        className: middleDateStyle,
      })),
      {
        date: date,
        className: endDateStyle,
      },
    ]);
  } else if (markedDays.length === 1 && moment(startDate).isAfter(dayPressed)) {
    setDateRanged({
      ...dateRanged,
      end: { ...dateRanged.end, date: dateRanged.start.date },
      start: { ...dateRanged.start, date },
    });

    const middleDays = getDaysBetween(moment(dayPressed), moment(startDate));

    setMarkedDays([
      {
        date,
        className: startDateStyle,
      },
      ...middleDays.map((day) => ({
        date: moment(day).format("YYYY-MM-DD"),
        className: middleDateStyle,
      })),
      {
        date: startDate,
        className: endDateStyle,
      },
    ]);
  } else {
    setDateRanged({ start: { date: "" }, end: { date: "" } });
    setMarkedDays([]);
  }
};

export default handleDayPress;
