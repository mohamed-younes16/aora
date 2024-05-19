import { View, Text } from "react-native";
import React from "react";

const Separator = ({ className }: { className?: string }) => {
  return (
    <View
      className={` w-full my-4 bg-neutral-50/40 h-[1px] rounded-xl ${className}`}
    />
  );
};

export default Separator;
