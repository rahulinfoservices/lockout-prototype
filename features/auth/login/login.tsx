import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { styled } from "nativewind";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { Container } from "@/shared/components/core/container";
import LabelDivider from "@/shared/components/core/divider/label-divider";
import Button from "@/shared/components/core/form/button";
import FormError from "@/shared/components/core/form/form-error";
import Input from "@/shared/components/core/form/input";
import { useAuth } from "@/shared/contexts/auth";

import AuthLogo from "../_shared/components/auth-logo";
import { LoginFormData, loginSchema } from "./_shared/util";

const EyeIcon = styled(Eye);
const EyeOffIcon = styled(EyeOff);
const LockIcon = styled(Lock);
const MailIcon = styled(Mail);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <View className="flex-1 bg-linear-to-br from-cyan-500 via-teal-500 to-cyan-600">
      <Container>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="never"
          contentContainerClassName="grow justify-center items-center"
        >
          <View className="w-full p-8">
            {/* Logo */}
            <AuthLogo />

            {/* Login Form Card */}
            <View className="rounded-3xl bg-white p-8 shadow-2xl">
              <View className="gap-2">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Input
                        label="Email"
                        placeholder="your@lockoutusa.com"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.email?.message}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        leftAdornment={
                          <MailIcon className="text-gray-400" size={20} />
                        }
                      />

                      <FormError>{errors.email?.message}</FormError>
                    </View>
                  )}
                />

                {/* Password Field */}
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                        error={errors.password?.message}
                        leftAdornment={
                          <LockIcon className="text-gray-400" size={20} />
                        }
                        rightAdornment={
                          <Pressable
                            className="p-1"
                            onPress={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="text-gray-400" size={20} />
                            ) : (
                              <EyeIcon className="text-gray-400" size={20} />
                            )}
                          </Pressable>
                        }
                      />

                      <FormError>{errors.password?.message}</FormError>
                    </View>
                  )}
                />

                {/* Forgot Password */}
                <View className="items-end">
                  <Pressable>
                    <Text className="text-lg font-medium text-teal-500">
                      Forgot password?
                    </Text>
                  </Pressable>
                </View>

                {/* Login Button */}
                <Button onPress={handleSubmit(signIn)} disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </View>

              {/* Divider with text */}
              <LabelDivider label="OR" />

              {/* Sign Up Link */}
              <View className="items-center">
                <View className="flex-row">
                  <Text className="text-lg text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" push>
                      <Text className="font-semibold text-teal-500">
                        Sign up
                      </Text>
                    </Link>
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
