import { LegacyRef, useEffect, useRef, useState } from "react";

import { default as gMoment, default as jMoment } from "jalali-moment";
import { twMerge } from "tailwind-merge";

import { useLocale } from "@/customHooks/useLocale";

import DatePicker from ".";
import Trans from "../common/trans";
import { SelectedDatesType, SetSelectedDatesType } from "./caledarTypes";

const DatePickerModal = ({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates: SelectedDatesType;
  setSelectedDates: SetSelectedDatesType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>();

  const { locale } = useLocale();

  const moment: any = locale === "/fa" ? jMoment : gMoment;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <p className="text-gray-400 mx-2 capitalize select-none block font-semibold">
        <Trans>date_select</Trans>
      </p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mx-2 cursor-pointer flex items-center justify-center border border-black p-2 rounded-2xl"
      >
        {selectedDates.start && selectedDates.start !== "Invalid date" && selectedDates.end !== "Invalid date" ? (
          `${moment(selectedDates.start)
            .locale(locale.substring(1))
            .format(locale === "/fa" ? "HH:mm YYYY/MM/DD" : "HH:mm MM/DD/YYYY")} - ${moment(selectedDates.end)
              .locale(locale.substring(1))
              .format(locale === "/fa" ? "HH:mm YYYY/MM/DD" : "HH:mm MM/DD/YYYY")}`
        ) : (
          <Trans>select_your_desired_time_range</Trans>
        )}
      </button>

      <div
        className={twMerge("absolute top-20 z-50 bg-white p-4 border rounded-2xl", isOpen ? "flex" : "hidden")}
        ref={ref as LegacyRef<HTMLDivElement>}
      >
        <DatePicker selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
      </div>
    </div>
  );
};

export default DatePickerModal;
