export interface Facility {
  name: string;
  schoolId: string;
  district: string;
  zip: string;
  stateCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomDetails {
  name: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ZoneDetails {
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
