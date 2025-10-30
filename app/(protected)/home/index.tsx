import { Text, View } from "react-native";

import { Container } from "@/shared/components/core/container";
import Button from "@/shared/components/core/form/button";
import { useAuth } from "@/shared/contexts/auth";

export default function Home() {
  const { signOut } = useAuth();

  return (
    <Container>
      <Text>Home</Text>

      <View className="m-8">
        <Button onPress={signOut}>Sign Out</Button>
      </View>
    </Container>
  );
}
