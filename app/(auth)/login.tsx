import { AuthScreen } from "@/components/AuthScreen";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { SHA256 } from "crypto-js";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";

export default function LoginScreen() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const hashStorePassword = SecureStore.getItem("MYDIPLOM_PSWD");

  useEffect(() => {
    if (password.length >= 4) {
      const hashPassword = SHA256(password).toString();

      if (hashPassword === hashStorePassword) {
        setAuth(true);

        return router.replace("/(tabs)");
      }

      Toast.show({
        text1: "Помилка!",
        text2: "Неправильний пароль.",
        iconColor: "red",
        progressBarColor: "red",
      });

      setPassword("");
    }
  }, [password]);

  return (
    <AuthScreen title="Вхід" password={password} setPassword={setPassword} />
  );
}
