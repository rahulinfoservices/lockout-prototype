import { DateTimestamps, FirebaseTimestamps } from "./timestamps";

export interface Facility {
  name: string;
  schoolId: string;
  district: string;
  zip: string;
  stateCode: string;
  fullName: string;
  address: string;
  phone: string;
}

export type FacilityDocument = Facility & FirebaseTimestamps;

export type FacilityData = Facility & DateTimestamps;

export interface RoomDetails {
  name: string;
  roomId: string;
}

export type RoomDetailsDocument = RoomDetails & FirebaseTimestamps;

export type RoomDetailsData = RoomDetails & DateTimestamps;

export interface ZoneDetails {
  name: string;
  color: string;
}

export type ZoneDetailsDocument = ZoneDetails & FirebaseTimestamps;

export type ZoneDetailsData = ZoneDetails & DateTimestamps;
