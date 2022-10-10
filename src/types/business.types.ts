import { DailyHours, Days } from "./hours.types";

export interface Business {
  displayed_what: string;
  displayed_where: string;
  opening_hours: {
    hours: DailyHours[];
    closed_on_holidays: boolean;
    open_by_arrangement: boolean;
  };
}

export interface BusinessData {
  [key: string]: any;
  displayed_what: string;
  displayed_where: string;
  opening_hours: {
    days: Days;
    closed_on_holidays: boolean;
    open_by_arrangement: boolean;
  };
}

export class InvalidBusinessIdError extends Error {}
