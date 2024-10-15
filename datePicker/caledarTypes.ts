import { Moment } from "jalali-moment";

export type MarkedDaysType = {
  className: string;
  date: Moment | string;
}[];
export type SetMarkedDaysType = ([{ date, className }]: MarkedDaysType) => void;

export type DateRangedType = {
  start: { date: Moment | string; time?: string };
  end: { date: Moment | string; time?: string };
};
export type SetDateRangedType = ({ start, end }: DateRangedType) => void;

export type SelectedDatesType = { start: string | Date; end: string | Date };

export type SetSelectedDatesType = ({ start, end }: SelectedDatesType) => void;
