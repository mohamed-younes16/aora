import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { router, usePathname } from "expo-router";
import { Search } from "lucide-react-native";

const SearchInput = ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  const pathname = usePathname();

  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      query: searchQuery || "",
    },
  });

  const query = watch("query");
  const isEmpty = query.length === 0;

  return (
    <View className="  my-2">
      <Text className=" text-lg mb-2 text-neutral-100 font-pmedium ">
        Search
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }: any) => (
          <View className="relative ">
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={"search..."}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="text-white  p-4 border-black-200  bg-black-100 rounded-lg
               focus:!border-secondary-200 border-2 text-xl on"
            />

            <View className=" absolute  justify-center h-full  right-3">
              <TouchableOpacity
                disabled={isEmpty}
                onPress={() => {
                  pathname.startsWith("/search")
                    ? router.setParams({ query })
                    : router.push(`/search/${query}`);
                }}
              >
                <Search
                  className={`${
                    isEmpty && "opacity-50"
                  }  duration-300 transition-opacity text-white`}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        name={"query"}
      />
      {errors.query && (
        <Text className="text-red-600 text-lg mt-2">This is required.</Text>
      )}
    </View>
  );
};

export default SearchInput;
