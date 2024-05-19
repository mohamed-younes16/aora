import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  name,
  ContainerSt,
  handlePress,
  TextSt,
  isLoading = false,
  disabled=false
}: {
  TextSt?: string;
  ContainerSt?: string;
  name: string;
  handlePress: () => void;
  isLoading?: boolean;
  disabled?:boolean
}) => {
  return (
    <TouchableOpacity
    disabled={disabled}
      onPress={() => {
        handlePress();
      }}
      activeOpacity={0.8}
      className={`${ContainerSt} bg-secondary-200 min-h-[60px] w-full 
      rounded-2xl flex items-center justify-center ${
        isLoading && "opacity-50"
      }`}
    >
      <Text className={`${TextSt} text-2xl font-bold text-primary`}>
        {" "}
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
