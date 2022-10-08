import { Business, BusinessData, Days } from "../models/business.model";
import * as UpstreamService from "./upstream.service";

export async function getBusiness(id: string) {
  const businessData = await UpstreamService.getBusiness(id);

  const business = stripBusinessData(businessData);

  return business;
}

function stripBusinessData(data: BusinessData): Business {
  return {
    opening_hours: data.opening_hours,
    displayed_what: data.displayed_what,
    displayed_where: data.displayed_where,
  };
}
