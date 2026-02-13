import { NullableSecurityAlert } from "./alert";
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
  state: string;
  street: string;
  zipcode: string;
  alert?: NullableSecurityAlert;
  directContacts ?: DirectContacts;
   facilityInfo?: FacilityInfo;
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



export interface  DirectContacts  {
  admin?: ContactInput;
  principal?: ContactInput;
  };

  export interface FacilityInfo {
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}


export type ContactInput = {
  name?: string;
  Name?: string;
  nam?: string;
  phone?: string | number;
  Phone?: string | number;
};

export type Contact = {
  name: string;
  phone: string;
  role: string;
};
