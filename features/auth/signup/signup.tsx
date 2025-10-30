import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
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
import { SignupFormData, signupSchema } from "./_shared/util";

const UserIcon = styled(User);
const MailIcon = styled(Mail);
const LockIcon = styled(Lock);
const EyeIcon = styled(Eye);
const EyeOffIcon = styled(EyeOff);

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
            <AuthLogo />

            {/* Signup Form Card */}
            <View className="rounded-3xl bg-white p-8 shadow-2xl">
              <View className="gap-2">
                {/* Name Field */}
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Input
                        label="Name"
                        placeholder="John Doe"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.name?.message}
                        autoCapitalize="words"
                        autoComplete="name"
                        leftAdornment={
                          <UserIcon className="text-gray-400" size={20} />
                        }
                      />

                      <FormError>{errors.name?.message}</FormError>
                    </View>
                  )}
                />

                {/* Email Field */}
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

                {/* Confirm Password Field */}

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Input
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                        error={errors.confirmPassword?.message}
                        leftAdornment={
                          <LockIcon className="text-gray-400" size={20} />
                        }
                        rightAdornment={
                          <Pressable
                            className="p-1"
                            onPress={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOffIcon className="text-gray-400" size={20} />
                            ) : (
                              <EyeIcon className="text-gray-400" size={20} />
                            )}
                          </Pressable>
                        }
                      />
                      <FormError>{errors.confirmPassword?.message}</FormError>
                    </View>
                  )}
                />

                {/* Signup Button */}
                <Button onPress={handleSubmit(signUp)} disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Sign up"}
                </Button>
              </View>

              {/* Divider with text */}
              <LabelDivider label="OR" />

              {/* Login Link */}
              <View className="items-center">
                <View className="flex-row">
                  <Text className="text-lg text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" dismissTo>
                      <Text className="font-semibold text-teal-500">
                        Sign in
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
