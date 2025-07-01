import DatePicker from "..";
import Trans from "@/components/common/trans";
import Button from "@/components/button/button";

import { localizeDate } from "../helper/localizeDate";

import { SelectedDatesType, SetSelectedDatesType } from "../calendarTypes";

const DatepickerSection = ({
  handleSubmit,
  handleCancel,
  selectedDates,
  localSelectedDates,
  setLocalSelectedDates,
}: {
  handleCancel: () => void;
  handleSubmit: () => void;
  selectedDates: SelectedDatesType;
  localSelectedDates: SelectedDatesType;
  setLocalSelectedDates: SetSelectedDatesType;
}) => {
  return (
    <section className="bg-white py-2 px-3 border rounded-2xl shadow-lg">
      <DatePicker
        selectedDates={localSelectedDates}
        setSelectedDates={setLocalSelectedDates}
        disableDaysAfter={localizeDate({ date: Date() })}
      />
      <div className="flex items-center gap-2 justify-end mt-2">
        <Button onClick={handleCancel} variant="outline" extraClass="w-full">
          <Trans>cancel</Trans>
        </Button>
        <Button
          onClick={handleSubmit}
          extraClass="w-full"
          disabled={localSelectedDates.start === selectedDates.start && localSelectedDates.end === selectedDates.end}
        >
          <Trans>submit</Trans>
        </Button>
      </div>
    </section>
  );
};

export default DatepickerSection;
