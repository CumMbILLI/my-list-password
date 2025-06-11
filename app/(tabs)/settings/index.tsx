import { TitltePage } from "@/components/TitlePage";
import { StyleSheet, Button, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { useDbRequest } from "@/hooks/useDbRequest";

const STORE_PSWD_KEY = process.env.EXPO_PUBLIC_PASSWORD_KEY as string;
const STORE_SK_KEY = process.env.EXPO_EXPO_SECRET_KEY as string;

export default function TabTwoScreen() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { deleteAllPasswords } = useDbRequest();

  const router = useRouter();

  const hadnleRemovePassword = () => {
    deleteAllPasswords();

    SecureStore.deleteItemAsync("MYDIPLOM_PSWD");
    SecureStore.deleteItemAsync("MYDIPLOM_SK");

    setAuth(false);

    router.replace("/(auth)/register");
  };

  const handleExit = () => {
    setAuth(false);
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.containter}>
      <TitltePage>Налаштування</TitltePage>

      <View style={styles.block}>
        <Text style={styles.text}>Пароль</Text>
        <Button
          title="Надійність пароля"
          onPress={() => router.navigate("./settings/strength")}
        />
      </View>

      <Button
        title="Видалити акаунт"
        color="red"
        onPress={() =>
          Alert.alert(
            "Увага!",
            "Ви дійсно хочете акаунт? Ваші паролі також будуть видалені",
            [
              {
                text: "Підтвердити",
                onPress: hadnleRemovePassword,
              },
              {
                text: "Cкасувати",
                style: "cancel",
              },
            ]
          )
        }
      />
      <Button title="Вихід" onPress={handleExit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containter: {
    marginHorizontal: 30,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  block: {
    gap: 20,
    borderBottomWidth: 1,
    borderColor: "#9ca3af",
    paddingBottom: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: 700,
  },
});
