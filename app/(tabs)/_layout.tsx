import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ name, icon, focused, color }:any) => {
  return (
    <View className="  justify-center  items-center">
      <Image
        source={icon}
        className=" h-6 w-6 "
        resizeMode="contain"
        tintColor={color}
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs 
         mt-1`}
        style={{color}}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{

          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarStyle: {
            height: 70,
            paddingVertical: 10,
            backgroundColor: "#161622",
            
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home"
                icon={icons.home}
                color={color}
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>
                <Tabs.Screen
          name="search/[query]"
          options={{
            headerShown: false,
            title: "search",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="search"
                icon={icons.search}
                color={color}
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            title: "create",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="create"
                icon={icons.plus}
                color={color}
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>
        {/* <Tabs.Screen
          name="bookmarks"
          options={{
            headerShown: false,
            title: "Book Mark",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Book Mark"
                icon={icons.bookmark}
                color={color}
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen> */}
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="profile"
                icon={icons.profile}
                color={color}
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </>
  );
};

export default TabsLayout;
