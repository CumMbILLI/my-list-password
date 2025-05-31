import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import ToastManager from "toastify-react-native";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

import "react-native-reanimated";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS password (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, passwordLength INTEGER);"
    );

    console.log("Creating db if needed");
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <SQLiteProvider databaseName="mypassword.db" onInit={createDbIfNeeded}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(password)/[id]/index"
            options={{
              headerTitle: "Змінити пароль",
              headerBackTitle: "Назад",
            }}
          />
          <Stack.Screen
            name="(password)/new/index"
            options={{
              headerTitle: "Новий пароль",
              headerBackTitle: "Назад",
            }}
          />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/register"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SQLiteProvider>
      <StatusBar style="light" />

      <ToastManager theme="dark" />
    </ThemeProvider>
  );
}
