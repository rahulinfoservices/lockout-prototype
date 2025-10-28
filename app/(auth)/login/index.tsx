import { Container } from "@/shared/components/core/container";
import Input from "@/shared/components/core/form/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-linear-to-br from-cyan-500 via-teal-500 to-cyan-600">
      <Container>
        <KeyboardAwareScrollView className="grow justify-center p-4">
          <View className="w-full p-8">
            {/* Login Form Card */}
            <View className="rounded-3xl bg-white p-8 shadow-2xl">
              <View className="space-y-6">
                <Input
                  label="Email"
                  placeholder="your@lockoutusa.com"
                  leftAdornment={<Mail color="#9ca3af" size={20} />}
                />

                {/* Password Field */}
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  leftAdornment={<Lock color="#9ca3af" size={20} />}
                  rightAdornment={
                    <Pressable
                      className="p-1"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff color="#9ca3af" size={20} />
                      ) : (
                        <Eye color="#9ca3af" size={20} />
                      )}
                    </Pressable>
                  }
                  error=""
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    </View>
  );
}
