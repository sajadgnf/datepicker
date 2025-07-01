import { localizeDate } from "./localizeDate";

const formatCache = new Map<string, string>();

export function formatCustomDate({ date, time }: { date: string; time: string }) {
  const cacheKey = `${date}-${time}`;

  if (formatCache.has(cacheKey)) {
    const cached = formatCache.get(cacheKey);
    if (cached) return cached;
  }

  const [month, day, year] = date.split("/");
  const [hour, minute] = time.split(":");
  const isoString = `${year}-${month}-${day}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
  const isoStringDate = new Date(isoString);

  const ddd = localizeDate({ date: isoString, options: { weekday: "short" } });
  const MMM = localizeDate({ date: isoString, options: { month: "short" } });
  const DD = String(isoStringDate.getDate()).padStart(2, "0");
  const YYYY = isoStringDate.getFullYear();
  const HH = String(isoStringDate.getHours()).padStart(2, "0");
  const mm = String(isoStringDate.getMinutes()).padStart(2, "0");
  const ss = String(isoStringDate.getSeconds()).padStart(2, "0");

  const tz = isoStringDate.toTimeString().match(/GMT[+-]\d{4}/)?.[0] || "GMT+0000";

  const result = `${ddd} ${MMM} ${DD} ${YYYY} ${HH}:${mm}:${ss} ${tz}`;

  formatCache.set(cacheKey, result);

  if (formatCache.size > 200) {
    const firstKey = formatCache.keys().next().value;
    if (firstKey) formatCache.delete(firstKey);
  }

  return result;
}