import Trans from "@/components/common/trans";
import { Label } from "@/components/ui/label";

import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "../helper/localizeDate";

import { SelectedDatesType } from "../calendarTypes";

const ModalTrigger = ({
  isOpen,
  setIsOpen,
  selectedDates,
}: {
  isOpen: boolean;
  selectedDates: SelectedDatesType;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { locale } = useLocale();

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    month: "2-digit",
    minute: "2-digit",
  };

  return (
    <>
      <Label>
        <Trans>date_select</Trans>
      </Label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-between gap-2 h-9 rounded-lg border 
        border-gray-200 bg-transparent px-3 py-1 shadow-sm transition-colors 
        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border 
        focus-visible:border-primaryBlueColor focus:border-primaryBlueColor 
        disabled:cursor-not-allowed disabled:opacity-50 w-[286px]"
      >
        {selectedDates.start && selectedDates.start !== "Invalid date" && selectedDates.end !== "Invalid date" ? (
          <>
            <span>
              {localizeDate({
                locale,
                options,
                date: selectedDates.start,
              })}
            </span>
            <Trans>to</Trans>
            <span>
              {localizeDate({
                locale,
                options,
                date: selectedDates.end,
              })}
            </span>
          </>
        ) : (
          <Trans>select_your_desired_time_range</Trans>
        )}
      </button>
    </>
  );
};

export default ModalTrigger;
