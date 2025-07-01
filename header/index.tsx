import { useContext } from "react";

import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CalendarContext } from "../";
import YearPicker from "./yearPicker";
import MonthPicker from "./monthPicker";
import Button from "@/components/button/button";

import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "../helper/localizeDate";

import { CalendarContextType } from "../calendarTypes";

const Header = () => {
  const t = useTranslations();
  const { locale } = useLocale();
  const { cursor, setCursor } = useContext(CalendarContext) as CalendarContextType;

  return (
    <>
      <Button onClick={() => setCursor(0)} disabled={cursor === 0} variant="ghost" size="sm">
        {t("today")} : {localizeDate({ date: Date(), locale })}
      </Button>

      <div className="flex items-center justify-between">
        <Button
          size="icon"
          variant="outline"
          extraClass="text-black border-gray-200"
          onClick={() => setCursor(cursor - 1)}
        >
          <ChevronRight size="18" className={locale === "/en" ? "rotate-180" : ""} />
        </Button>

        <div className="flex items-center gap-2">
          <MonthPicker />
          <YearPicker />
        </div>

        <Button
          size="icon"
          variant="outline"
          extraClass="text-black border-gray-200"
          onClick={() => setCursor(cursor + 1)}
        >
          <ChevronLeft className={locale === "/en" ? "rotate-180" : ""} />
        </Button>
      </div>
    </>
  );
};

export default Header;
