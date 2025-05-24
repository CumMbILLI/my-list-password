import { Button, StyleSheet, Text, View } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HomePage</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Видалити пароль"
          color="red"
          onPress={hadnleRemovePassword}
        />
        <Button title="Вихід" onPress={handleExit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
});
