import { Text, FlatList, View, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyComp from "../../components/EmptyComp";
import { useStore } from "../../context/store";
import { getAllPosts, getAllTrending } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import Separator from "../../components/Separator";
import { Redirect } from "expo-router";

const Home = () => {
  const { data: posts, refresh } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getAllTrending);
  const {user} = useStore()
  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className=" bg-[#161622] h-full ">
       {/* <Redirect href={"/create"} /> */}
      <FlatList
        renderItem={({ item }) => <VideoCard data={item} />}
        data={posts}
        keyExtractor={(e) => e?.$id}
        ListHeaderComponent={() => (
          <View className="  my-6 px-4  ">
            <View className="  flex-row  ">
              <View className=" flex-1">
                <Text className=" font-pmedium text-gray-100 text-sm">
                  Welcome back
                </Text>
                <Text className=" font-extrabold text-gray-100 text-3xl">
                  {user?.username}
                </Text>
              </View>
              <View>
                <Image
                  resizeMode="contain"
                  className=" w-20 h-20"
                  source={images.logoSmall}
                />
              </View>
            </View>

            <SearchInput />
            <Text className="text-center text-gray-100 text-lg">
              {" "}
              Latest Trending videos
            </Text>
            <Separator />
            <Trending posts={latestPosts} />
            <Separator/>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComp
            subtitle="Be the first one to upload"
            title="No Videos Found"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
