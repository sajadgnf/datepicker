import { Moment } from "jalali-moment";

const getDaysBetween = (startDay: Moment, endDay: Moment) => {
  var betweenDays = [];
  var currentDate = startDay.clone().add(1, "day");

  while (currentDate.isBefore(endDay, "day")) {
    betweenDays.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "day");
  }
  return betweenDays;
};
export default getDaysBetween;
