import { LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Button from "../../button/button";

import { useLocale } from "@/customHooks/useLocale";

import { DateRangedType, SetDateRangedType } from "../calendarTypes";

const hoursArray = Array.from({ length: 24 }, (_, i) => i);
const minutesArray = Array.from({ length: 60 }, (_, i) => i);

const listWrapperClass = "thin-scrollbar flex h-full rounded-lg w-full flex-col items-center overflow-y-auto";

type ListItemType = {
  name: string;
  value: number;
  onClick: (name: string, value: string) => void;
};

const ListItem = ({ name, value, onClick }: ListItemType) => {
  const displayValue = value.toString().padStart(2, "0");

  return (
    <Button onClick={() => onClick(name, displayValue)} variant="ghost" extraClass="text-black">
      <p>{displayValue}</p>
    </Button>
  );
};

const TimeInput = ({ name, value, onChange, placeholder, className }: any) => (
  <input
    type="number"
    value={value}
    placeholder={placeholder}
    onFocus={(e) => e.target.select()}
    onChange={(e) => onChange(name, e.target.value)}
    className={twMerge(
      "text-end w-7 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
      className,
    )}
  />
);

const TimePicker = ({
  type,
  dateRanged,
  setDateRanged,
}: {
  type: "start" | "end";
  dateRanged: DateRangedType;
  setDateRanged: SetDateRangedType;
}) => {
  const ref = useRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState({
    hour: dateRanged[type].time?.split(":")[0] || "00",
    min: dateRanged[type].time?.split(":")[1] || "00",
  });

  const { locale } = useLocale();

  const handleTabClick = useCallback((value: number) => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const currentIndex = inputs.indexOf(document?.activeElement as HTMLInputElement);

    if (value >= 2 && currentIndex < inputs.length - 1) inputs[currentIndex + 1].focus();
    if (value === 0 && currentIndex >= 1) inputs[currentIndex - 1].focus();
  }, []);

  const handleTimeChange = useCallback(
    (name: string, value: string) => {
      if (value.length <= 2 && ((name === "hour" && +value <= 23) || (name === "min" && +value <= 59))) {
        setSelectedTime((prev) => ({ ...prev, [name]: value }));

        setDateRanged({
          ...dateRanged,
          [type]: {
            ...dateRanged[type],
            time: `${name === "hour" ? value : selectedTime.hour}:${name === "min" ? value : selectedTime.min}`,
          },
        });
      }
      handleTabClick(value.length);
    },
    [dateRanged, type, selectedTime.hour, selectedTime.min, setDateRanged, handleTabClick],
  );

  const minutesList = useMemo(
    () =>
      minutesArray.map((minute: number) => (
        <ListItem key={minute} name="min" value={minute} onClick={handleTimeChange} />
      )),
    [handleTimeChange],
  );

  const hoursList = useMemo(
    () => hoursArray.map((hour) => <ListItem key={hour} name="hour" value={hour} onClick={handleTimeChange} />),
    [handleTimeChange],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={twMerge("relative w-fit bg-white border rounded-lg h-fit p-1")}>
      <div className="flex items-center justify-center">
        <div dir="ltr" className="flex items-center justify-center gap-2">
          <TimeInput
            name="hour"
            placeholder="__"
            value={selectedTime.hour}
            onChange={handleTimeChange}
            className={twMerge("font-semibold")}
          />
          :
          <TimeInput
            name="min"
            placeholder="__"
            className={twMerge("text-start font-semibold")}
            value={selectedTime.min}
            onChange={handleTimeChange}
          />
        </div>
        <ChevronDown size={18} onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer" />
      </div>

      {isOpen && (
        <div
          ref={ref as LegacyRef<HTMLDivElement>}
          className="absolute space-y-4 bg-white overflow-hidden rounded-lg z-10 top-8 left-0"
        >
          <div className={twMerge("m-auto flex justify-between h-80", locale === "/en" && "flex-row-reverse")}>
            <div className={listWrapperClass}>{minutesList}</div>
            <div className={listWrapperClass}>{hoursList}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
