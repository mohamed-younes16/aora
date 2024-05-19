import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../../components/VideoCard";
import { useAppwrite } from "../../../lib/useAppwrite";
import { searchQuery } from "../../../lib/appwrite";
import { images } from "../../../constants";
import SearchInput from "../../../components/SearchInput";
import Separator from "../../../components/Separator";
import EmptyComp from "../../../components/EmptyComp";

const Search = () => {
  const params = useGlobalSearchParams();
  const query = params.query as string;
  const { data: posts, refresh } = useAppwrite(() => searchQuery({ query }));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };
  useEffect(() => {

    refresh()
  }, [query]);

  return (
    <SafeAreaView className=" bg-[#161622] h-full ">
      <FlatList
        renderItem={({ item }) => <VideoCard data={item} />}
        data={posts}
        keyExtractor={(e) => e?.$id}
        ListHeaderComponent={() => (
          <View className="  my-6 px-4  ">
            <View className="  flex-row  ">
              <View className=" flex-1">
                <Text className=" font-pmedium text-gray-100 text-lg">
                  Search Results
                </Text>
                <Text className=" font-extrabold text-gray-100 text-3xl">
                  {query}
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

            <SearchInput searchQuery={query} />
          
            <Separator />
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

export default Search;
