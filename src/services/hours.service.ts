import { WEEK_DAYS } from "../constants";
import { DailyHours, Days, WorkingHours } from "../types/hours.types";

export const transformToDailyHours = (days: Days): DailyHours[] => {
  const hoursWithMissingDays = WEEK_DAYS.map((day) => {
    const workingHours = days[day as keyof typeof days];

    return {
      day,
      workingHours: workingHours || [],
    };
  });

  return hoursWithMissingDays.reduce<DailyHours[]>((prev, curr) => {
    if (!prev.length) return [curr];

    const lastElem = prev[prev.length - 1];

    if (compareWorkingHours(lastElem.workingHours, curr.workingHours)) {
      lastElem.day = `${lastElem.day.split(" - ")[0]} - ${curr.day}`;
    } else {
      prev.push(curr);
    }

    return prev;
  }, []);
};

export const compareWorkingHours = (a: WorkingHours[], b: WorkingHours[]) => {
  if (a.length !== b.length) return false;

  for (let index = 0; index < a.length; index++) {
    if (a[index].start !== b[index].start || a[index].end !== b[index].end)
      return false;
  }

  return true;
};
