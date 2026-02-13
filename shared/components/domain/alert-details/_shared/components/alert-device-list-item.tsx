import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, isValid } from "date-fns";
import { Text, View } from "react-native";
import { cn } from "tailwind-variants/lite";

import { NullableSecurityAlert } from "@/shared/types/alert";
import { DeviceDetails } from "@/shared/types/device";
import { RoomDetails, ZoneDetails } from "@/shared/types/facility";
import { parseTimestampDateFns } from "@/shared/utils/common";

export interface AlertDeviceListItemProps {
  item: DeviceDetails;
  zone: ZoneDetails;
  room: RoomDetails;
  alert: NullableSecurityAlert;
  position: number;
}

export const AlertDeviceListItem = (props: AlertDeviceListItemProps) => {
  const { item, alert, zone, room, position } = props;

  const date = item?.date ? parseTimestampDateFns(item?.date) : null;

  const lastStatusTimeAgo =
    date && isValid(date) ? format(date, "dd MMM yy hh:mm a") : null;
  console.warn(
    "Device Item Date:",
    item.date,
    "Parsed Date:",
    date,
    "Formatted:",
    lastStatusTimeAgo,
  );

  const isAlert =
    alert?.alertType === "full_lockdown_mode" &&
    item.deviceId === alert.deviceId;

  return (
    <View className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <View className="">
        <View>
          {/* Tablet-specific display */}
          {item?.deviceType === "TABLET" ? (
            <>
              <View className="flex-row items-center">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="flex-1 pr-3 text-xl font-bold text-gray-800"
                >
                  {item.deviceType}- {item.type}
                </Text>

                {item?.status && item?.status.trim() ? (
                  <View className="mt-2 flex items-center">
                    <View
                      className={cn(
                        "self-start rounded-full bg-green-100 px-4 py-1.5",
                      )}
                    >
                      <Text
                        className={cn("text-sm font-semibold text-green-700")}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>

                 <View className="flex-row items-center">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="flex-1 pr-3 text-xl font-bold text-gray-800"
                >
                  {item.name} 
                </Text>

                
                  <View className="mt-2 flex-row items-center">
              <MaterialCommunityIcons
                name="calendar"
                size={14}
                color="#6b7280"
                style={{ marginRight: 4 }}
              />
              <Text className="text-sm text-gray-500">{lastStatusTimeAgo}</Text>
            </View>
               
              </View>
              

            
             
              {/* <Text className="text-sm text-gray-700">Type : {item.type}</Text> */}
            </>
          ) : (
            <>

            <View className="flex-row items-center">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="flex-1 pr-3 text-xl font-bold text-gray-800"
                >
                   {item.deviceType} - {item?.location}
                </Text>

                {item?.status && item?.status.trim() ? (
                  <View className="mt-2 flex items-center">
                    <View
                      className={cn(
                        "self-start rounded-full bg-green-100 px-4 py-1.5",
                      )}
                    >
                      <Text
                        className={cn("text-sm font-semibold text-green-700")}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>


               <View className="flex-row items-center">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="flex-1 pr-3 text-xl font-bold text-gray-800"
                >
                  Zone : {item?.zone}
                </Text>

                
                  <View className="mt-2 flex-row items-center">
              <MaterialCommunityIcons
                name="calendar"
                size={14}
                color="#6b7280"
                style={{ marginRight: 4 }}
              />
              <Text className="text-sm text-gray-500">{lastStatusTimeAgo}</Text>
            </View>
               
              </View>
             
              {/* <Text className="text-lg font-semibold text-gray-800">
                {item.deviceId}
              </Text> */}
            
            </>
          )}
        </View>

        {/* <View
        className={cn("rounded-full px-3 py-1.5", {
          "bg-red-100": isAlert,
          "bg-green-100": !isAlert,
        })}
      >
        <Text
          className={cn("text-sm font-semibold", {
            "text-red-700": isAlert,
            "text-green-700": !isAlert,
          })}
        >
          {isAlert ? "LOCKDOWN" : "ALL CLEAR"}
        </Text>
      </View>
    </View> */}

      
      </View>

      {/* Zone & Location only for non-tablet devices */}
      {/* {item.deviceType !== "TABLET" && (
        <View className="mb-2 flex-row items-center gap-2">
          <Text className="text-sm text-gray-600">Zone : {item?.zone}</Text>
          <Text className="text-sm text-gray-400">•</Text>
          <Text className="text-sm text-gray-600">
          Location : {item?.location}
        </Text>
        </View>
      )} */}
    </View>
  );
};
