export type MarkedDaysType = {
  date: string;
  className: string;
}[];
export type SetMarkedDaysType = ([{ date, className }]: MarkedDaysType) => void;

export type DateRangedType = {
  start: { date: string; time?: string };
  end: { date: string; time?: string };
};
export type SetDateRangedType = ({ start, end }: DateRangedType) => void;

export type SelectedDatesType = { start: string; end: string };

export type SetSelectedDatesType = ({ start, end }: SelectedDatesType) => void;

export type DatePickerProps = {
  disableDaysIn?: string[];
  disableDaysAfter?: string;
  disableDaysBefore?: string;
  selectedDates: SelectedDatesType;
  setSelectedDates: SetSelectedDatesType;
  onDayPress?: (dayPressed: string | Date) => void;
};

export type CalendarContextType = {
  cursor: number;
  yearCursor: number;
  setCursor: (cursor: number) => void;
  setYearCursor: (cursor: number) => void;
};
