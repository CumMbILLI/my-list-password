import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/store/auth";

export default function TabLayout() {
  const STORE_PSWD_KEY = process.env.EXPO_PASSWORD_KEY;

  const colorScheme = useColorScheme();

  const isAuth = useAuthStore((state) => state.isAuth); // перевірка чи пройшов користувач автентифікацію
  const isRegister = SecureStore.getItem("MYDIPLOM_PSWD"); // перевіряємо чи наявний PIN-код в сховищи

  if (!isRegister) return <Redirect href="/(auth)/register" />;

  if (!isAuth) return <Redirect href="/(auth)/login" />;

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
          title: "Головна",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="check"
        options={{
          title: "Перевірка",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="verified" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Налаштування",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/strength"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
