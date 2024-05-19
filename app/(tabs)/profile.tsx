import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import useStore from "../../context/store";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyComp from "../../components/EmptyComp";
import Separator from "../../components/Separator";
import { useAppwrite } from "../../lib/useAppwrite";
import { getAllPosts, signOut } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";

const Profile = () => {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useStore();
  const { data: posts, refresh } = useAppwrite(() => getAllPosts(user?.$id));
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refresh();

  }, [user]);

  return (
    <SafeAreaView className=" h-full bg-primary">
      {isLoggedIn ? (
        <>
          <View className="mt-2 px-6">
            <View className=" w-full h-5 items-end">
              <TouchableOpacity onPress={()=>logout()} className=" border-red-600 border-[2px] px-1 py-2 rounded-2xl ">
                <LogOut size={35} className=" text-red-600" />
              </TouchableOpacity>
            </View>
            <View className=" items-center">
              <View className=" rounded-full border-2 border-secondary-100 ">
                <Image
                  className=" h-20 rounded-full w-20"
                  src={user?.avatar.toString()}
                />
              </View>

              <Text className=" text-white mb-4 capitalize text-2xl">
                {user?.username}
              </Text>
              <View className=" flex-row gap-14 ">
                <View className="items-center ">
                  <Text className=" text-3xl font-pbold text-white">
                    {posts.length}
                  </Text>
                  <Text className=" text-xl text-gray-100">Posts</Text>
                </View>
                <View className="items-center ">
                  <Text className=" text-3xl font-pbold text-white">1.5k</Text>
                  <Text className=" text-gray-100 text-xl">Views</Text>
                </View>
              </View>
              <Separator />
            </View>
          </View>
          {posts && (
            <FlatList
              renderItem={({ item }) => <VideoCard data={item} />}
              data={posts}
              className="w-full"
              keyExtractor={(e) => e?.$id}
              ListEmptyComponent={() => (
                <EmptyComp
                  subtitle="Be the first one to upload"
                  title="No Videos Found"
                />
              )}
            />
          )}
        </>
      ) : (
        <EmptyComp subtitle="you need to login" title="No User data" />
      )}
    </SafeAreaView>
  );
};

export default Profile;
