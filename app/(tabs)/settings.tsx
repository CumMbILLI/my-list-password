import { TitltePage } from "@/components/TitlePage";
import { StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { useSQLiteContext } from "expo-sqlite";

export default function TabTwoScreen() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const db = useSQLiteContext();

  const router = useRouter();

  const hadnleRemovePassword = async () => {
    await db.runAsync("DELETE FROM password");

    SecureStore.deleteItemAsync("MYDIPLOM_PSWD");
    setAuth(false);

    router.replace("/(auth)/register");
  };

  const handleExit = () => {
    setAuth(false);
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView>
      <TitltePage>Settings</TitltePage>
      <Button
        title="Видалити пароль"
        color="red"
        onPress={hadnleRemovePassword}
      />
      <Button title="Вихід" onPress={handleExit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
