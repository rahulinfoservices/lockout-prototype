import { Redirect } from "expo-router";

export default function Protected() {
  return <Redirect href="/home" />;
}
