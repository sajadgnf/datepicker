import { localizeDate } from "./localizeDate";
import { isDateHigher, isDateLower } from "./comparisonDates";

import { DateRangedType, MarkedDaysType, SetDateRangedType } from "../calendarTypes";

const handleDayPress = ({
  dateRanged,
  dayPressed,
  markedDays,
  setDateRanged,
}: {
  dayPressed: string;
  dateRanged: DateRangedType;
  markedDays: MarkedDaysType;
  setDateRanged: SetDateRangedType;
}) => {
  const date = localizeDate({ date: dayPressed });
  const startDate = localizeDate({ date: dateRanged?.start?.date || "" });

  const setOneDateSelected = () =>
    setDateRanged({ start: { ...dateRanged.start, date }, end: { ...dateRanged.end, date } });

  if (markedDays.length === 0) setOneDateSelected();
  else if (markedDays.length === 1 && isDateLower(startDate, dayPressed)) {
    setDateRanged({ ...dateRanged, end: { ...dateRanged.end, date } });
  } else if (markedDays.length === 1 && isDateHigher(startDate, dayPressed)) {
    setDateRanged({
      ...dateRanged,
      end: { ...dateRanged.end, date: dateRanged.start.date },
      start: { ...dateRanged.start, date },
    });
  } else setOneDateSelected();
};

export default handleDayPress;
