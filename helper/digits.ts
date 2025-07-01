export const convertPersianDigitsToEnglish = (input: string): string => {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  return input.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d).toString());
};
