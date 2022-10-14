import { Business, BusinessData } from "../types/business.types";
import { Days } from "../types/hours.types";
import { LinkedResponse } from "../types/response.types";
import { transformToDailyHours } from "./hours.service";
import * as UpstreamService from "./upstream.service";

export async function getBusiness(
  id: string
): Promise<LinkedResponse<Business>> {
  const { data: businessData, next } = await UpstreamService.getBusiness(id);

  return {
    data: {
      displayed_what: businessData.displayed_what,
      displayed_where: businessData.displayed_where,
      opening_hours: {
        closed_on_holidays: businessData.opening_hours.closed_on_holidays,
        open_by_arrangement: businessData.opening_hours.open_by_arrangement,
        hours: transformToDailyHours(businessData.opening_hours.days),
      },
      isOpen: isOpen(businessData),
    },
    next,
  };
}

const DAYS_MAP = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "sunday",
};

function isOpen(business: BusinessData) {
  let currentDay = DAYS_MAP[new Date().getDay() as keyof typeof DAYS_MAP];
  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentTime = `${
    currentHours >= 10 ? currentHours : `0${currentHours}`
  }:${currentMinutes >= 10 ? currentMinutes : `0${currentMinutes}`}`;

  const openHours = business.opening_hours.days[currentDay as keyof Days];

  if (!openHours) return false;

  return openHours.some(({ start, end }) => {
    return start <= currentTime && end > currentTime;
  });
}
