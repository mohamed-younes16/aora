import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Redirect } from "expo-router";
import useStore from "../context/store";

export default function Index() {
  const {  isLoggedIn, isLoading } = useStore();
  if ( isLoggedIn) return <Redirect href={"/home"} />
  return (
    <SafeAreaView className="  h-full  bg-primary  ">
      <ScrollView contentContainerStyle={{ height: "100%" }} className="w-full">

        <View className="w-full  items-center justify-center px-4 h-[85vh]">
          <Image
            source={images.logo}
            className=" h-[80px] w-[100px]  bg-contain"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className=" h-[300px] w-[380px]   bg-contain"
            resizeMode="contain"
          />
          <View className="  relative mt-8 ">
            <Text className=" text-3xl font-pbold text-center text-white">
              Discover undless possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image 
              source={images.path}
              resizeMode="contain"
              className="absolute w-[80px] h-6  -right-0 -bottom-3"
            />

          </View>
          <Text className="text-white font-pregular  mt-4 text-center  px-4 text-sm">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <View className=" w-full mt-6">
            <CustomButton  handlePress={()=>router.push("/sign-in")} name="Continue With Email " />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622"></StatusBar>
    </SafeAreaView>
  );
}
