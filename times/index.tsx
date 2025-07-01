import Trans from "../../common/trans";
import TimePicker from "./timePicker";

import { useLocale } from "@/customHooks/useLocale";
import { localizeDate } from "../helper/localizeDate";

import { DateRangedType, SetDateRangedType } from "../calendarTypes";

const Times = ({ dateRanged, setDateRanged }: { dateRanged: DateRangedType; setDateRanged: SetDateRangedType }) => {
  const { locale } = useLocale();

  return dateRanged?.start.date ? (
    <div className="flex items-center justify-between">
      <div className="text-center">
        <TimePicker setDateRanged={setDateRanged} dateRanged={dateRanged} type="start" />

        <span className="text-xs me-3">
          {localizeDate({
            locale,
            date: dateRanged?.start.date,
          })}
        </span>
      </div>

      <p className="mb-5 font-semibold">
        <Trans>to</Trans>
      </p>

      <div className="text-center">
        <TimePicker setDateRanged={setDateRanged} dateRanged={dateRanged} type="end" />

        <span className="text-xs me-3">
          {localizeDate({
            locale,
            date: dateRanged?.end.date,
          })}
        </span>
      </div>
    </div>
  ) : null;
};

export default Times;
