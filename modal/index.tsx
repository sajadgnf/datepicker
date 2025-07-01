import { LegacyRef, useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

import ModalTrigger from "./trigger";
import PeriodSection from "./periodSection";
import DatepickerSection from "./datepickerSection";
import { SelectedDatesType, SetSelectedDatesType } from "../calendarTypes";

const DatePickerModal = ({
  selectedDates,
  modalClassName,
  setSelectedDates,
}: {
  modalClassName?: string;
  selectedDates: SelectedDatesType;
  setSelectedDates: SetSelectedDatesType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedDates, setLocalSelectedDates] = useState<SelectedDatesType>(selectedDates);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (selectedDates.start) setLocalSelectedDates(selectedDates);
    else {
      const dates = {
        start: new Date(new Date().getTime() - 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      };
      setSelectedDates(dates);
      setLocalSelectedDates(dates);
    }
  }, [selectedDates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      const isInsideModal = ref.current && ref.current.contains(target);

      if (!isInsideModal && target.tagName !== "HTML") handleCancel();
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleCancel = () => {
    setLocalSelectedDates(selectedDates);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setSelectedDates(localSelectedDates);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <ModalTrigger isOpen={isOpen} setIsOpen={setIsOpen} selectedDates={selectedDates} />
      {isOpen && (
        <div
          className={twMerge("z-50 absolute top-full translate-y-1 flex gap-0.5", modalClassName)}
          ref={ref as LegacyRef<HTMLDivElement>}
        >
          <DatepickerSection
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            selectedDates={selectedDates}
            localSelectedDates={localSelectedDates}
            setLocalSelectedDates={setLocalSelectedDates}
          />
          <PeriodSection handleClose={() => setIsOpen(false)} setSelectedDates={setSelectedDates} />
        </div>
      )}
    </div>
  );
};

export default DatePickerModal;
