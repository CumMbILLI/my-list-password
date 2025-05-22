import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const hadnleRemovePassword = () => {
    SecureStore.deleteItemAsync("MYDIPLOM_PSWD");
    router.push("/(auth)/register");
  };

  return (
    <SafeAreaView>
      <Text className="text-white">HomePage</Text>
      <Button title="Видалити пароль!" onPress={hadnleRemovePassword} />
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
