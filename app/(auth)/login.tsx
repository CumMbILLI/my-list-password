import { AuthScreen } from "@/components/AuthScreen";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { SHA256 } from "crypto-js";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { LOCK_DURATION, MAX_ATTEMPTS } from "../../constants/Auth";

export default function LoginScreen() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const checkLock = async () => {
    const lastAttempt = await SecureStore.getItemAsync("LAST_ATTEMPT");
    if (lastAttempt) {
      const elapsed = Date.now() - parseInt(lastAttempt);
      if (elapsed < LOCK_DURATION) {
        setIsLocked(true);
        setTimeLeft(LOCK_DURATION - elapsed);
      } else {
        await SecureStore.deleteItemAsync("ATTEMPTS");
        await SecureStore.deleteItemAsync("LAST_ATTEMPT");
        setIsLocked(false);
      }
    }
  };

  useEffect(() => {
    checkLock();
  }, []);

  useEffect(() => {
    let interval: number;
    if (isLocked) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            setIsLocked(false);
            SecureStore.deleteItemAsync("ATTEMPTS");
            SecureStore.deleteItemAsync("LAST_ATTEMPT");
            clearInterval(interval);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isLocked]);

  useEffect(() => {
    if (password.length < 4 || isLocked) return;

    (async () => {
      const hashStorePassword = await SecureStore.getItemAsync("MYDIPLOM_PSWD");
      const hashPassword = SHA256(password).toString();

      if (hashPassword === hashStorePassword) {
        await SecureStore.deleteItemAsync("ATTEMPTS");
        await SecureStore.deleteItemAsync("LAST_ATTEMPT");
        setAuth(true);
        return router.replace("/(tabs)");
      }

      Toast.show({
        text1: "Помилка!",
        text2: "Неправильний пароль.",
        type: "error",
      });

      setPassword("");

      let attempts = await SecureStore.getItemAsync("ATTEMPTS");
      const currentAttempts = attempts ? parseInt(attempts) + 1 : 1;

      if (currentAttempts >= MAX_ATTEMPTS) {
        await SecureStore.setItemAsync("LAST_ATTEMPT", Date.now().toString());
        setIsLocked(true);
        setTimeLeft(LOCK_DURATION);
      }

      await SecureStore.setItemAsync("ATTEMPTS", currentAttempts.toString());
    })();
  }, [password]);

  return (
    <AuthScreen
      title={
        isLocked ? `Заблоковано на ${Math.ceil(timeLeft / 1000)} с` : "Вхід"
      }
      password={password}
      setPassword={setPassword}
      disabled={isLocked}
    />
  );
}
