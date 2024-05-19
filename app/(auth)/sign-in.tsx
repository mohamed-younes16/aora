import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { SignUpData } from "../..";
import { getCurentUser, signIn } from "../../lib/appwrite";
import useStore from "../../context/store";

const signInComp = () => {
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
    setIsLoading(true);

    try {
      await signIn(data);
      const user = await getCurentUser();
      setUser(user);
      setIsLoggedIn(true);
      toast.show("signed in", {
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
      <ScrollView>
        <View className=" w-full justify-start   h-[85vh] px-4 my-6">
          <Image
            resizeMode="contain"
            source={images.logo}
            className=" h-[50px] w-[150px]  "
          />
          <Text className=" text-white text-2xl my-8 font-psemibold">
            {" "}
            Sign In To Aora
          </Text>

          <FormField
            placeholder="your Email"
            control={control}
            title="Email"
            name="email"
            isError={!!(errors.email)}
          />
          <FormField
            placeholder="your Password"
            control={control}
            title="Password"
            name="password"
            isError={!!(errors.password)}
          />
          <View className="  mt-8 ">
            <CustomButton
              disabled={isLoading}
              name="Sign In"
              ContainerSt={`${isLoading && "opacity-50"}`}
              handlePress={() => onSubmit()}
            />
          </View>
          <View className=" items-center mt-8 ">
            <Link className="text-neutral-300  text-xl " href={"/sign-up"}>
              {" "}
              Don't have an Account ?{" "}
              <Text className=" text-secondary-100"> Sign-up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signInComp;
