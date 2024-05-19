import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ViewToken,
} from "react-native";
import React, { useEffect, useState } from "react";
import { VideoObject } from "..";
import * as A from "react-native-animatable";
import { Play } from "lucide-react-native";
import { ResizeMode, Video } from "expo-av";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: { scale: 1 },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: { scale: 0.9 },
};
const TrendingItem = ({
  isActive,
  item,
}: {
  item: VideoObject;
  isActive: boolean;
}) => {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    !isActive && setPlay(false);
  }, [isActive]);
  return (
    //@ts-ignore
    <A.View
      className=""
      // animation={isActive ? zoomIn : zoomOut}
      duration={500}
    >
      {play && isActive ? (
        <Video
          isLooping
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          source={{ uri: item.video }}
          className="  w-[70vw] relative bg-primary   h-[60vh] rounded-xl"
          onPlaybackStatusUpdate={(s: any) => s.didJustFinish && setPlay(false)}
        ></Video>
      ) : (
        <TouchableOpacity
          className="relative  items-center justify-center"
          onPressIn={() => setPlay(true)}
        >
          <View className="bg-white/25 absolute z-20   rounded-full p-3">
            <Play size={50} className="   p-[20px]  text-black-200"></Play>
          </View>

          <Image
            src={item.thumbnail}
            className=" h-[60vh] w-[70vw] rounded-xl "
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </A.View>
  );
};
const Trending = ({ posts }: { posts: VideoObject[] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewAbleItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };
  return (
    <FlatList
      data={posts}
      scrollEnabled
      keyExtractor={(e, i) => i.toString()}
      renderItem={({ item }) => (
        <View className="  text-3xl mx-3 w-[70vw] text-white ">
          <TrendingItem isActive={item.$id === activeItem.$id} item={item} />
        </View>
      )}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      onViewableItemsChanged={viewAbleItemsChanged}
      horizontal
    />
  );
};

export default Trending;
