import { Business } from "../types/business.types";
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
    },
    next,
  };
}
