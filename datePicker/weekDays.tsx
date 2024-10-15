import { useLocale } from "@/customHooks/useLocale";
import Trans from "../common/trans";

const WeekDays = () => {
  const { locale } = useLocale()

  const weekDays = locale === "/fa" ? ["sa", "su", "mo", "tu", "we", "th", "fr"] : ["su", "mo", "tu", "we", "th", "fr", "sa"];

  return (
    <div className="grid grid-cols-7">
      {weekDays.map((item) => (
        <p key={item} className="m-auto flex justify-center text-grey-main">
          <Trans>{item}</Trans>
        </p>
      ))}
    </div>
  );
};

export default WeekDays;
