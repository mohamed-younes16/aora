import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VideoObject } from "..";
import { icons } from "../constants";
import { GripVertical } from "lucide-react-native";
import { ResizeMode, Video } from "expo-av";
import Separator from "./Separator";
import useStore from "../context/store";

const VideoCard = ({
  data: {
    title,
    creator: { avatar, username },
    thumbnail,
    video,
    $id,
  },
}: {
  data: VideoObject;
}) => {
  const { videoPlayed, setVideo } = useStore();

  return (
    <View className=" px-4 my-4 w-full">
      <View className="gap-6 flex-row items-center">
        <View className=" rounded-xl p-[1px] overflow-hidden border-2 border-secondary-200 ">
          <Image className=" h-14 w-14 rounded-lg  " src={avatar} />
        </View>
        <View className=" flex-1 pr-2 items-center flex-row">
          <View className=" flex-1 ">
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              className="font-psemibold  text-base text-ellipsis text-gray-100"
            >
              {title}
            </Text>
            <Text className=" text-gray-100 text-base">{username}</Text>
          </View>
          <TouchableOpacity>
            <GripVertical className="text-white h-12 w-12"></GripVertical>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4 ">
        {videoPlayed == $id+"card" ? (
          <Video
            isLooping
            shouldPlay
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            source={{ uri: video }}
            className=" w-full bg-black  h-60 rounded-xl"
            onPlaybackStatusUpdate={(s: any) => s.didJustFinish && setVideo("")}
          ></Video>
        ) : (
          <TouchableOpacity
            className="items-center justify-center  relative h-60 w-full"
            onPress={() => setVideo($id+"card")}
          >
            <Image
              className=" h-full w-full rounded-2xl "
              src={thumbnail}
              resizeMode="cover"
            />
            <Image
              className="absolute  h-20 w-20 rounded-2xl "
              source={icons.play}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
      <Separator />
    </View>
  );
};

export default VideoCard;
