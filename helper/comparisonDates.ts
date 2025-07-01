const comparisonCache = new Map<string, boolean>();

export const isDateLower = (date1: string, date2: string) => {
  const cacheKey = `lower-${date1}-${date2}`;

  if (comparisonCache.has(cacheKey)) {
    const cached = comparisonCache.get(cacheKey);
    if (cached !== undefined) return cached;
  }

  const result = new Date(date1).getTime() < new Date(date2).getTime();
  comparisonCache.set(cacheKey, result);

  if (comparisonCache.size > 300) {
    const firstKey = comparisonCache.keys().next().value;
    if (firstKey) comparisonCache.delete(firstKey);
  }

  return result;
};

export const isDateHigher = (date1: string, date2: string) => {
  const cacheKey = `higher-${date1}-${date2}`;

  if (comparisonCache.has(cacheKey)) {
    const cached = comparisonCache.get(cacheKey);
    if (cached !== undefined) return cached;
  }

  const result = new Date(date1).getTime() > new Date(date2).getTime();
  comparisonCache.set(cacheKey, result);

  if (comparisonCache.size > 300) {
    const firstKey = comparisonCache.keys().next().value;
    if (firstKey) comparisonCache.delete(firstKey);
  }

  return result;
};

export const isDateEqual = (date1: string, date2: string) => {
  const cacheKey = `equal-${date1}-${date2}`;

  if (comparisonCache.has(cacheKey)) {
    const cached = comparisonCache.get(cacheKey);
    if (cached !== undefined) return cached;
  }

  const result = new Date(date1).getTime() === new Date(date2).getTime();
  comparisonCache.set(cacheKey, result);

  if (comparisonCache.size > 300) {
    const firstKey = comparisonCache.keys().next().value;
    if (firstKey) comparisonCache.delete(firstKey);
  }

  return result;
};