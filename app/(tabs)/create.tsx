import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import useStore from "../../context/store";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";
import { VideoInput } from "../..";
import { ResizeMode, Video } from "expo-av";
import { ImagePlus, LucideFileVideo } from "lucide-react-native";
import CustomButton from "../../components/CustomButton";
import * as DP from "expo-document-picker";
import { createVideo } from "../../lib/appwrite";
const Create = () => {
  const { setIsLoading, isLoading, user } = useStore();

  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<VideoInput>({
    defaultValues: {
      prompt: "",
      thumbnail: null,
      title: "",
      videoUrl: null,
      userId: user?.$id,
    },
  });
  useEffect(() => {
    user && setValue("userId", user?.$id);
  }, [user]);
  const { videoUrl, thumbnail } = watch();
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const { message, ok } = await createVideo(data);
      if (ok) {
        reset();
        toast.show(message, {
          animationType: "slide-in",
          type: "success",
          duration: 2000,
          successColor: "#00a94d",
        });
        setTimeout(() => {
          router.replace("/home");
          setIsLoading(false);
        }, 1000);
      } else {
        toast.show(message, {
          animationType: "slide-in",
          type: "warning",
          duration: 2000,
          warningColor: "red",
        });
      }
    } catch (error) {
      toast.show("error", {
        animationType: "slide-in",
        type: "warning",
        duration: 2000,
        warningColor: "red",
      });
    } finally {
      setIsLoading(false);
    }
  });
  const OpenPicker = async (fileType: "image" | "video") => {
    const typesList = {
      image: ["image/png", "image/jpg", "image/jpeg"],
      video: ["video/mp4", "video/gif"],
    };
    const selectedType = typesList[fileType];
    const file = await DP.getDocumentAsync({
      type: selectedType,
      copyToCacheDirectory: true,
    });
    console.log(selectedType);
    if (!file.canceled) {
      if (fileType == "image") {
        setValue("thumbnail", file.assets[0]);
      }
      if (fileType == "video") {
        setValue("videoUrl", file.assets[0]);
      }
    }
  };
  return (
    <SafeAreaView className="h-full pt-10 bg-primary ">
      <ScrollView className="  px-5">
        <Text className=" font-pbold text-white text-3xl">Upload video</Text>
        <View className=" mt-6">
          <FormField
            title="Video Title"
            control={control}
            name="title"
            placeholder="Give your video a title..."
            isError={!!errors.title}
          />
          <View className=" my-4 ">
            <Text className=" font-pbold text-white text-2xl">
              Upload Video
            </Text>
            <TouchableOpacity
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
              }}
              className="relative mt-3 border  border-dashed border-neutral-200/20 
              rounded-3xl  h-52 items-center justify-center"
              onPress={() => OpenPicker("video")}
            >
              {!!videoUrl ? (
                <Video
                  resizeMode={ResizeMode.COVER}
                  source={{ uri: videoUrl?.uri || "" }}
                  className=" w-52   h-52 rounded-xl"

                />
              ) : (
                <>
                  <View
                    style={{ borderStyle: "dashed" }}
                    className="bg-white/25 w-32 items-center absolute z-20 border border-dashed 
                border-secondary-200   rounded-2xl  p-3"
                  >
                    <LucideFileVideo
                      size={50}
                      className="   p-[20px]  text-secondary-100 "
                    ></LucideFileVideo>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View className=" my-4 ">
            <Text className=" font-pbold text-white text-2xl">
              Upload Image
            </Text>
            <TouchableOpacity
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
              }}
              className="relative mt-3 border  h-52   border-dashed border-neutral-200/20 rounded-3xl  items-center justify-center"
              onPressIn={() => OpenPicker("image")}
            >
              {!!thumbnail ? (
                <Image
                  resizeMode="cover"
                  source={{ uri: thumbnail.uri }}
                  className=" w-full   h-52 rounded-xl"
                  // onPlaybackStatusUpdate={(s: any) =>
                  //   s.didJustFinish && setPlaying(false)
                  // }
                />
              ) : (
                <>
                  <View
                    style={{ borderStyle: "dashed" }}
                    className="bg-white/25 w-32 items-center absolute z-20 border border-dashed 
                border-secondary-200   rounded-2xl  p-3"
                  >
                    <ImagePlus
                      size={50}
                      className="   p-[20px]  text-secondary-100 "
                    ></ImagePlus>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title="AI Prompt"
            control={control}
            name="prompt"
            placeholder="The prompt used to create the video..."
            isError={!!errors.prompt}
          />
          <CustomButton
            disabled={isLoading}
            name="Submit & Upload "
            ContainerSt={`${isLoading && "opacity-50"} my-6`}
            handlePress={() => onSubmit()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
