import axios from "axios";
import { BusinessData, InvalidBusinessIdError } from "../models/business.model";

const UPSTREAM_URL = "https://storage.googleapis.com/coding-session-rest-api/";
const BUSINESS_IDS = ["GXvPAor1ifNfpF0U5PTG0w", "ohGSnJtMIC5nPfYRi_HTAg"];

const upstreamApi = axios.create({
  baseURL: UPSTREAM_URL,
});

export async function getBusiness(id: string) {
  if (!BUSINESS_IDS.includes(id))
    throw new InvalidBusinessIdError("Resource not found.");

  const { data: business } = await upstreamApi.get<BusinessData>(`/${id}`);

  return business;
}

export function getBusinessesIds() {
  return BUSINESS_IDS;
}
