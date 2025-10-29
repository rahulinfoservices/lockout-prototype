import LogoImg from "@/assets/images/logo/lockoutusa.jpg";
import { Image } from "expo-image";

export interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo(props: LogoProps) {
  const { width = 150, height = 150 } = props;

  return (
    <Image
      source={LogoImg}
      style={{
        width: width,
        height: height,
        borderRadius: width / 2,
      }}
    />
  );
}
