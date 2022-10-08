export interface Business {
  displayed_what: string;
  displayed_where: string;
  opening_hours: {
    days: Days | DayWorkingHours[];
    closed_on_holidays: boolean;
    open_by_arrangement: boolean;
  };
}

export interface BusinessData extends Business {
  [key: string]: any;
}

export interface Days {
  monday?: WorkingHours[];
  tuesday?: WorkingHours[];
  wednesday?: WorkingHours[];
  thursday?: WorkingHours[];
  friday?: WorkingHours[];
  saturday?: WorkingHours[];
  sunday?: WorkingHours[];
}

export interface WorkingHours {
  start: string;
  end: string;
  type: string;
}

export interface DayWorkingHours extends WorkingHours {
  day: string;
}

export class InvalidBusinessIdError extends Error {}
