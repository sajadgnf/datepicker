import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useLocale } from "@/customHooks/useLocale";

import { CalendarContext, CalendarContextType } from ".";
import MonthPicker from "./monthPicker";
import YearPicker from "./yearPicker";

const Header = () => {
  const { locale } = useLocale();
  const { cursor, setCursor } = useContext(CalendarContext) as CalendarContextType;

  return (
    <div className="flex items-center justify-between">
      <button onClick={() => setCursor(cursor - 1)}>{locale === "/fa" ? <FaChevronRight /> : <FaChevronLeft />}</button>
      <div className="flex items-center gap-2">
        <MonthPicker />
        <YearPicker />
      </div>
      <button onClick={() => setCursor(cursor + 1)}>{locale === "/fa" ? <FaChevronLeft /> : <FaChevronRight />}</button>
    </div>
  );
};

export default Header;
