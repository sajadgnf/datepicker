const localizeCache = new Map<string, string>();

export const localizeDate = ({
  date,
  locale,
  options = { year: "numeric", month: "2-digit", day: "2-digit" },
}: {
  date: string | Date;
  locale?: "/fa" | "/en";
  options?: Intl.DateTimeFormatOptions;
}) => {
  const cacheKey = `${date}-${locale}-${JSON.stringify(options)}`;

  if (localizeCache.has(cacheKey)) {
    const cached = localizeCache.get(cacheKey);
    if (cached) return cached;
  }

  const d = new Date(date);
  const currentLocale = locale === "/fa" ? "fa-IR" : "en-US";

  const result = d.toLocaleString(currentLocale, options);

  localizeCache.set(cacheKey, result);

  if (localizeCache.size > 500) {
    const firstKey = localizeCache.keys().next().value;
    if (firstKey) localizeCache.delete(firstKey);
  }

  return result;
};