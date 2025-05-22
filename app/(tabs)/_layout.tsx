import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";

export default function TabLayout() {
  const isRegister = SecureStore.getItem("MYDIPLOM_PSWD");

  const colorScheme = useColorScheme();

  if (!isRegister) return <Redirect href="/(auth)/register" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="check"
        options={{
          title: "Check",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="verified" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="auth" />
    </Tabs>
  );
}
