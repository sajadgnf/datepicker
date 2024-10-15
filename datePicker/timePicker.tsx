import { LegacyRef, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import moment from "jalali-moment";
import { twMerge } from "tailwind-merge";

import { useLocale } from "@/customHooks/useLocale";

import { DateRangedType, SetDateRangedType } from "./caledarTypes";

const hoursArray = Array.from({ length: 24 }, (_, i) => i);
const minutesArray = Array.from({ length: 60 }, (_, i) => i);

const currentMin = moment(new Date()).locale("fa").format("mm");
const currentHour = moment(new Date()).locale("fa").format("HH");

const listWrapperClass = "no-scrollbar flex h-full w-full flex-col items-center overflow-y-scroll";

type ListItemType = {
  name: string;
  value: number;
  onClick: (name: string, value: string) => void;
};

const ListItem = ({ name, value, onClick }: ListItemType) => {
  const displayValue = value.toString().padStart(2, "0");

  return (
    <div
      onClick={() => onClick(name, displayValue)}
      className="flex w-full cursor-pointer items-center justify-center py-3 hover:bg-primaryBlueColor hover:text-white active:bg-primaryBlueColor"
    >
      <p>{displayValue}</p>
    </div>
  );
};

const TimeInput = ({ name, value, onChange, placeholder, className }: any) => (
  <input
    type="number"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(name, e.target.value)}
    className={twMerge(
      "text-end w-16 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
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
    hour: type === "start" ? (+currentHour === 0 ? 23 : +currentHour - 1) : currentHour,
    min: currentMin,
  });

  const { locale } = useLocale();

  const handleTabClick = (value: number) => {
    const inputs = Array.from(document.querySelectorAll("input"));
    const currentIndex = inputs.indexOf(document?.activeElement as HTMLInputElement);

    if (value >= 2 && currentIndex < inputs.length - 1) inputs[currentIndex + 1].focus();
    if (value === 0 && currentIndex >= 1) inputs[currentIndex - 1].focus();
  };

  const handleTimeChange = (name: string, value: string) => {
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
  };

  useEffect(() => {
    setDateRanged({
      start: {
        ...dateRanged.start,
        time: `${+currentHour === 0 ? 23 : +currentHour - 1}:${currentMin}`,
      },
      end: {
        ...dateRanged.end,
        time: `${currentHour}:${currentMin}`,
      },
    });
  }, []);

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
    <div
      className={twMerge("relative w-fit bg-white border rounded-lg h-fit py-1", locale === "/fa" ? "pl-2" : "pr-2")}
    >
      <div className="flex items-center justify-center gap-2">
        <div dir="ltr" className="flex items-center justify-center gap-2">
          <TimeInput
            name="hour"
            className={locale === "/fa" && "w-10"}
            placeholder="__"
            value={selectedTime.hour}
            onChange={handleTimeChange}
          />
          :
          <TimeInput
            name="min"
            placeholder="__"
            className={twMerge("text-start", locale === "/en" && "w-10")}
            value={selectedTime.min}
            onChange={handleTimeChange}
          />
        </div>
        <FaChevronDown size={18} onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer" />
      </div>

      {isOpen && (
        <div ref={ref as LegacyRef<HTMLDivElement>} className="absolute space-y-4 bg-white p-2 pb-0 z-10 left-0 w-full">
          <hr />
          <div className={twMerge("m-auto flex justify-between h-80", locale === "/en" && "flex-row-reverse")}>
            <div className={listWrapperClass}>
              {minutesArray.map((minute: number) => (
                <ListItem key={minute} name="min" value={minute} onClick={handleTimeChange} />
              ))}
            </div>
            <div className={listWrapperClass}>
              {hoursArray.map((hour) => (
                <ListItem key={hour} name="hour" value={hour} onClick={handleTimeChange} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
