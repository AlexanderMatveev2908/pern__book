import { isWeekend } from "date-fns";

export const getExpectedDeliveredDay = ({
  daysToAdd,
}: {
  daysToAdd: number;
}) => {
  const currDate = new Date();
  let addedDays = 0;

  while (addedDays < daysToAdd) {
    currDate.setDate(currDate.getDate() + 1);

    if (!isWeekend(currDate)) addedDays++;
  }

  return currDate.getTime();
};
