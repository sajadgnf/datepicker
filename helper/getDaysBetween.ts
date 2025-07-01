import { localizeDate } from "./localizeDate";

const daysBetweenCache = new Map<string, string[]>();

export const getDaysBetween = (startDay: string, endDay: string) => {
  const cacheKey = `${startDay}-${endDay}`;

  if (daysBetweenCache.has(cacheKey)) {
    const cached = daysBetweenCache.get(cacheKey);
    if (cached) return cached;
  }

  const betweenDays = [];
  let currentDate = new Date(startDay);
  const finalDate = new Date(endDay);

  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate < finalDate) {
    betweenDays.push(localizeDate({ date: currentDate }));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  daysBetweenCache.set(cacheKey, betweenDays);

  if (daysBetweenCache.size > 100) {
    const firstKey = daysBetweenCache.keys().next().value;
    if (firstKey) daysBetweenCache.delete(firstKey);
  }

  return betweenDays;
};