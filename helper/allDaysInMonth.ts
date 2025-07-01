import gMoment from "moment";
import jMoment from "jalali-moment";

const daysCache = new Map<string, any>();

export default function getAllDaysInMonth(cursor: number, locale: "/fa" | "/en") {
  const cacheKey = `${cursor}-${locale}`;

  if (daysCache.has(cacheKey)) {
    return daysCache.get(cacheKey);
  }

  const moment: any = locale === "/fa" ? jMoment : gMoment;

  let jToday = jMoment();
  let gToday = gMoment();
  jToday = jToday.clone().add(cursor, "jMonth");
  gToday = gToday.clone().add(cursor, "month");

  const currentMonth = locale === "/fa" ? jToday.jMonth() + 1 : gToday.month() + 1;
  const currentYear = locale === "/fa" ? jToday.jYear() : gToday.year();

  const firstDayOfMonth = locale === "/fa" ? jToday.clone().startOf("jMonth") : gToday.clone().startOf("month");

  const daysArray = [];

  const daysInMonth =
    locale === "/fa" ? jToday.clone().startOf("jMonth").jDaysInMonth() : gToday.clone().startOf("month").daysInMonth();

  const firstDayIndex =
    locale === "/fa" ? jToday.clone().startOf("jMonth").jDay() : gToday.clone().startOf("month").day();

  for (let day = 0; day < firstDayIndex; day++) {
    daysArray.push({
      dayOfMonth: null,
      date: null,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment(`${currentYear}-${currentMonth}-${day}`, locale === "/fa" ? "jYYYY-jM-jD" : "YYYY-M-D");
    daysArray.push({
      dayOfMonth: day,
      date: date,
    });
  }

  const result = {
    daysArray,
    monthIndex: locale === "/fa" ? jToday.jMonth() : gToday.month(),
    firstDayOfMonth,
    yearWithMonth:
      locale === "/fa"
        ? jToday.locale(locale.substring(1)).format("jMMMM jYYYY")
        : gToday.locale(locale.substring(1)).format("jMMMM jYYYY"),
  };

  daysCache.set(cacheKey, result);

  if (daysCache.size > 100) {
    const firstKey = daysCache.keys().next().value;
    if (firstKey) daysCache.delete(firstKey);
  }

  return result;
}
