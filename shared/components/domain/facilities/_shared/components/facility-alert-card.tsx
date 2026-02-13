import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, isValid } from "date-fns";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, LayoutChangeEvent, Linking, Platform, Pressable, Animated as RNAnimated, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { cn } from "tailwind-variants/lite";

import { SecurityAlert } from "@/shared/types/alert";
import { Contact, ContactInput, FacilityData } from "@/shared/types/facility";

import { MetaItem } from "./facilities-meta";
import { StatusBadge } from "./facilities-status-badge";

const { width } = Dimensions.get("window");




interface FacilityCardProps {
  item: FacilityData;
  status?: SecurityAlert["alertType"];
  statusUpdatedAt?: Date;
  error?: string;
}

export const FacilityCard = ({
  item,
  status,
  statusUpdatedAt,
  error,
}: FacilityCardProps) => {
  const router = useRouter();
const isLockdown = ["408","409","407","0002","469","417"].includes(item?.alert?.alert);
  const [parentWidth, setParentWidth] = useState<number>(0);


  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  // const timeAgo = formatDistanceToNow(new Date(statusUpdatedAt), {
  //   addSuffix: true, // adds "ago" to the end
  // });
 const date = item?.alert?.time ? new Date(item.alert.time) : null;

  const lastStatusTimeAgo =
  date && isValid(date) ? format(date, "dd MMM yy hh:mm a") : null;


  const onPress = useCallback(() => {
    router.push({
      pathname: `/security-alerts/[school-id]`,
      params: { "school-id": item.schoolId, zipCode: item.zip },
    });
  }, [item.schoolId, item.zip, router]);

  useEffect(() => {
    if (isLockdown) {
      // Pulsing animation
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );

      // Subtle scale animation
      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, {
            duration: 800,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [isLockdown, opacity, scale]);

  useEffect(() => {
    if (error) {
      // Fade out card
      Alert.alert(
        "Oops!",
        `There seems to be an issue fetching security alerts for ${item.name}. ${error}`,
      );
    }
  }, [error, item.name]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!isLockdown) return {};

    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const openMaps = (address?: string) => {
    if (!address) return;

    const encodedAddress = encodeURIComponent(address);

    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?q=${encodedAddress}`
        : `geo:0,0?q=${encodedAddress}`;

    Linking.openURL(url).catch(err =>
      console.error("Failed to open maps:", err)
    );
  };

   const contacts: Contact[] = [
    normalizeContact(item?.directContacts?.admin,"Admin"),
    normalizeContact(item?.directContacts?.principal,"Principal"),
  ].filter(Boolean) as Contact[];

    const scaleAnim = React.useRef(new RNAnimated.Value(1)).current;

  const onCallPress = (phone: string) => {
    if (phone && phone !== "N/A") {
      RNAnimated.sequence([
        RNAnimated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
        RNAnimated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
      Linking.openURL(`tel:${phone}`);
    }
  };
  

   const CARD_WIDTH = parentWidth > 0 ? (parentWidth - 32) / 2 : 150; // fallback

  // ---------- Layout Callback ----------
  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setParentWidth(width);
  };
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
       onLayout={onLayout} 
        className={cn(
          "mb-3 rounded-xl border p-4 shadow-sm active:opacity-70",
          {
            "border-red-500 bg-red-50 shadow-md": isLockdown,
            "border-gray-200 bg-white shadow-sm": !isLockdown,
          },
        )}
        activeOpacity={0.7}
        onPress={onPress}
      >
        {/* <Text className="mb-1 w-full text-base text-gray-500">
          Updated {timeAgo}
        </Text> */}

        <View className="flex-row items-center">
  <Text
    numberOfLines={1}
    ellipsizeMode="tail"
    className={cn("flex-1 pr-3 text-xl font-bold text-gray-800", {
              "flex-1 pr-3 text-xl font-bold text-red-800": isLockdown,
            })}
  >
    {item.name}
  </Text>

  <StatusBadge status={item?.alert?.alert} />
</View>

<View className="flex-row flex-wrap justify-between items-center mt-1">
  <MetaItem
    icon="map-marker"
    value={item?.zip }
    isLockdown={isLockdown}
  />
  {false && ( <MetaItem
    icon="office-building-marker"
    value={item?.district}
    isLockdown={isLockdown} 
  /> )}

    {true && (<MetaItem
    icon="calendar"
    value={lastStatusTimeAgo || ""}
       isLockdown={isLockdown} 
  />)}

    {false && (<MetaItem
    icon="devices"
    value={ "0"}
       isLockdown={isLockdown} 
  />)}
</View>
  {(item?.address )? 
  <Pressable onPress={() => openMaps(item?.address)}>
      <View className="flex-row items-center mr-4 mb-1">
        <MaterialCommunityIcons
          name={"map-check"}
          size={14}
          color={isLockdown ? "#dc2626" : "#6b7280"}
          style={{ marginRight: 4 }}
        />
        <Text 
        className={cn("text-base font-sm text-gray-700", {
                        "text-red-800": isLockdown,
                      })}
        >
          {item?.address}
        </Text>
    </View>
  </Pressable> : null}


 {/* CONTACT UI */}
       {(isLockdown && contacts.length > 0 )?  
        <FlatList
      data={contacts}
      keyExtractor={(_, idx) => String(idx)}
       renderItem={({ item }) => <ContactCard contact={item} cardWidth={CARD_WIDTH} />}
      numColumns={2}
      scrollEnabled={false} // disable inner scroll to let parent scroll
      contentContainerStyle={{ paddingHorizontal: 4 }}
    /> : null}

      
      </TouchableOpacity>
    </Animated.View>
  );
};

function normalizeContact(input?: ContactInput, role?: string): Contact | null {
  if (!input) return null;
  const name =
    typeof input.name === "string"
      ? input.name
      : typeof input.Name === "string"
      ? input.Name
      : typeof input.nam === "string"
      ? input.nam
      : "Unknown";
  const phoneRaw = input.phone ?? input.Phone;
  const phone = phoneRaw != null ? String(phoneRaw) : "N/A";
  return { name, phone, role: role ?? "Unknown" };
}


// ---------- Single Card ----------
const ContactCard: React.FC<{ contact: Contact; cardWidth: number }> = ({ contact, cardWidth }) => {
  const scaleAnim = React.useRef(new RNAnimated.Value(1)).current;

  const onCallPress = (phone: string) => {
    if (!phone || phone === "N/A") return;

    RNAnimated.sequence([
      RNAnimated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      RNAnimated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View
      style={{
        width: cardWidth,
        margin: 4,
        borderRadius: 12,
        backgroundColor: "#111111", // black background
        padding: 8,
      }}
    >
      {/* Row: Icon left | Text right */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Call Icon */}

          <TouchableOpacity onPress={() => onCallPress(contact.phone)} style={{ padding: 2 }}>
            <MaterialCommunityIcons name="phone" size={25} color="#fff" />
          </TouchableOpacity>
     

        {/* Text Column */}
        <View style={{ flex: 1 , marginLeft: 8}}>
          {/* Role */}
         
            <Text style={{ color: "white", fontSize: 10, fontWeight: "600" }} numberOfLines={1} ellipsizeMode="tail">
              {contact.role}
            </Text>
        

          {/* Name */}
          <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }} numberOfLines={1} ellipsizeMode="tail">
            {contact.name}
          </Text>

          {/* Phone */}
          <Text style={{ color: "#d1d5db", fontSize: 12, marginTop: 2 }} numberOfLines={1} ellipsizeMode="tail">
            {contact.phone}
          </Text>
        </View>
      </View>
    </View>
  );
};
