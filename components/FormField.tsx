import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { icons, images } from "../constants";

const FormField = ({
  title,
  placeholder,
  control,
  isError,
  name,
}: {
  title: string;
  placeholder: string;
  isError: boolean;
  control: any;
  name: string;
}) => {
  const isPassType = title.toLocaleLowerCase() == "password";
  const [isPassShown, setIsPassShown] = useState<boolean>(false);

  return (
    <View className="  my-2">
      <Text className=" text-lg mb-2 text-neutral-100 font-pmedium ">{title}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <View className="relative ">
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={placeholder}
              secureTextEntry={isPassType && !isPassShown}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="text-white  p-4 bg-black rounded-lg focus:border-secondary-200 border-2  text-xl on"
            />
            {isPassType && (
              <View className=" absolute  justify-center h-full  right-3">
                <TouchableOpacity onPress={() => setIsPassShown(!isPassShown)}>
                  {isPassShown ? (
                    <Image className=" h-8 w-8 " source={icons.eyeHide} />
                  ) : (
                    <Image className=" h-8 w-8 " source={icons.eye} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        name={name}
      />
      {isError && <Text className="text-red-600 text-lg mt-2">This is required.</Text>}
    </View>
  );
};

export default FormField;
