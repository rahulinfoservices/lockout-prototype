import { Timestamp } from "@react-native-firebase/firestore";

export type DateTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type FirebaseTimestamps = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
