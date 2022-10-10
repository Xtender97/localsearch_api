export interface DailyHours {
  day: string;
  workingHours: WorkingHours[];
}

export interface WorkingHours {
  start: string;
  end: string;
  type: string;
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
