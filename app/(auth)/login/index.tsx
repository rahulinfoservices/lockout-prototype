import { Container } from "@/shared/components/core/container";
import Input from "@/shared/components/core/form/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login");
  };

  return (
    <View className="flex-1 bg-linear-to-br from-cyan-500 via-teal-500 to-cyan-600">
      <Container>
        <KeyboardAwareScrollView contentContainerClassName="grow justify-center items-center">
          <View className="w-full p-8">
            {/* Login Form Card */}
            <View className="rounded-3xl bg-white p-8 shadow-2xl">
              <View className="gap-6">
                <View>
                  <Input
                    label="Email"
                    placeholder="your@lockoutusa.com"
                    leftAdornment={<Mail color="#9ca3af" size={20} />}
                  />
                </View>

                {/* Password Field */}
                <View>
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

                {/* Forgot Password */}
                <View className="items-end">
                  <Pressable>
                    <Text className="text-lg font-medium text-teal-500">
                      Forgot password?
                    </Text>
                  </Pressable>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  className="w-full rounded-xl bg-teal-500 py-4 shadow-lg active:opacity-80"
                >
                  <Text className="text-center text-xl font-semibold text-white">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up Link */}
              <View className="items-center">
                <View className="flex-row">
                  <Text className="text-lg text-gray-600">
                    Don't have an account?{" "}
                    <Text className="font-semibold text-teal-500">Sign Up</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    </View>
  );
}
