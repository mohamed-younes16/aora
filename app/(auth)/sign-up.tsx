import { View, Text, ScrollView, Image, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { SignUpData } from "../..";

import { ToastProvider, useToast } from "react-native-toast-notifications";
import { Loader2 } from "lucide-react-native";
import useStore from "../../context/store";

const signUp = () => {
  const { setUser, setIsLoading, setIsLoggedIn, isLoading } = useStore();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    defaultValues: {
      password: "",
      email: "",
      username: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    setIsLoggedIn(true);

    try {
      const { newUser } = await createUser(data);

      setUser(newUser);
      setIsLoggedIn(true);
      toast.show("signed Up", {
        animationType: "slide-in",
        type: "success",
        duration: 2000,
        successColor: "#00a94d",
      });
      setTimeout(() => {
        router.replace("/home");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.show("error", {
        animationType: "slide-in",
        type: "warning",
        duration: 2000,
        warningColor: "red",
      });
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <SafeAreaView className=" h-full bg-primary ">
      <ToastProvider>
        <ScrollView>
          <View className=" w-full justify-start   h-[85vh] px-4 my-6">
            <Image
              resizeMode="contain"
              source={images.logo}
              className=" h-[50px] w-[150px]  "
            />
            <Text className=" text-white text-2xl my-8 font-psemibold">
              {" "}
              Sign Up To Aora
            </Text>

            <FormField
              placeholder="your Email"
              control={control}
              title="Email"
              name="email"
              isError={Boolean(errors.email)}
            />
            <FormField
              placeholder="your Username"
              control={control}
              title="username"
              name="username"
              isError={Boolean(errors.username)}
            />
            <FormField
              placeholder="your Password"
              control={control}
              title="Password"
              name="password"
              isError={Boolean(errors.password)}
            />
            <View className="  mt-8 ">
              <CustomButton
                disabled={isLoading}
                name="Sign Up"
                ContainerSt={`${isLoading && "opacity-50"}`}
                handlePress={() => onSubmit()}
              />
            </View>
            <View className=" items-center mt-8 ">
              <Link className="text-neutral-300  text-xl " href={"/sign-in"}>
                {" "}
                have an Account already ?{" "}
                <Text className=" text-secondary-100"> Sign-in</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </ToastProvider>
    </SafeAreaView>
  );
};

export default signUp;
