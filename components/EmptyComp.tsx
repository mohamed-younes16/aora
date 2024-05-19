import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyComp = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className=" px-4 items-center text-white text-xl">
      <Image
        source={images.empty}
        className=" w-[280px] h-[280px] "
        resizeMode="contain"
      />
      <Text className=" text-gray-100 text-2xl font-bold"> {title}</Text>
        <Text className=" text-gray-100 text-base "> {subtitle}</Text>
        <CustomButton ContainerSt="mt-4" name="Create A Video " handlePress={()=>router.push("/create")}/>
    </View>
  );
};

export default EmptyComp;
