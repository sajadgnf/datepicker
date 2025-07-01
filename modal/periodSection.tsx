import Button from "@/components/button/button";
import Trans from "@/components/common/trans";
import SelectInput from "@/components/input/select";
import React, { useState } from "react";
import { SelectedDatesType, SetSelectedDatesType } from "../calendarTypes";

const periodOptions = [
  {
    value: "5 minutes",
    label: "five_minutes",
    minutes: 5,
  },
  {
    value: "15 minutes",
    label: "fifteen_minutes",
    minutes: 15,
  },
  {
    value: "1 hour",
    label: "one_hour",
    minutes: 60,
  },
  {
    value: "6 hours",
    label: "six_hours",
    minutes: 6 * 60,
  },
  {
    value: "12 hours",
    label: "twelve_hours",
    minutes: 12 * 60,
  },
  {
    value: "1 day",
    label: "one_day",
    minutes: 24 * 60,
  },
  {
    value: "7 days",
    label: "seven_days",
    minutes: 7 * 24 * 60,
  },
  {
    value: "1 month",
    label: "one_month",
    minutes: 30 * 24 * 60,
  },
  {
    value: "3 months",
    label: "three_months",
    minutes: 3 * 30 * 24 * 60,
  },
];

const PeriodSection = ({
  handleClose,
  setSelectedDates,
}: {
  handleClose: () => void;
  setSelectedDates: SetSelectedDatesType;
}) => {
  const handlePeriodChange = (selectedPeriod: number) => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - selectedPeriod * 60 * 1000);

    setSelectedDates({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    });

    handleClose();
  };

  return (
    <section className="bg-white px-4 border rounded-2xl shadow-lg w-40 hidden sm:block">
      <h6 className="text-center font-medium py-3.5 text-primaryBlueColor">
        <Trans>period</Trans>
      </h6>
      <hr />

      {periodOptions.map((option) => (
        <Button
          variant="ghost"
          key={option.value}
          extraClass="w-full text-black mt-1"
          onClick={() => handlePeriodChange(option.minutes)}
        >
          <Trans>{option.label}</Trans>
        </Button>
      ))}
    </section>
  );
};

export default PeriodSection;
