import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth";

export default function HomeScreen() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const router = useRouter();

  const hadnleRemovePassword = () => {
    SecureStore.deleteItemAsync("MYDIPLOM_PSWD");
    setAuth(false);
    router.push("/(auth)/register");
  };

  const handleExit = () => {
    setAuth(false);
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView>
      <Text className="text-white">HomePage</Text>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
