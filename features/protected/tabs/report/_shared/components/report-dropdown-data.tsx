export interface State {
  state_id: string;
  state_name: string;
}

export interface Facility {
  facility_id: string;
  facility_name: string;
  state_id: string;
}

// Static States
export const STATES: State[] = [
  { state_id: "1", state_name: "MI" }
];

// Static Facilities
export const FACILITIES: Facility[] = [
  { facility_id: "F1", facility_name: "St. Michael Elementary School", state_id: "1" },
  {
    facility_id: "F2",
    facility_name: "Montague High School",
    state_id: "1",
  },
  { facility_id: "F3", facility_name: "Holton High School", state_id: "1" },
  { facility_id: "F4", facility_name: "Springport Middle School", state_id: "1" },
 
];

export interface GlobalContextType {
  selectedState: State | null;
  selectedFacility: Facility | null;
  setSelectedState: (s: State | null) => void;
  setSelectedFacility: (f: Facility | null) => void;
}

export const withAllOption = <T extends object>(
  data: T[],
  keyField: keyof T,
  valueField: keyof T,
  allLabel = "All",
): T[] => {
  return [{ [keyField]: "ALL", [valueField]: allLabel } as T, ...data];
};
