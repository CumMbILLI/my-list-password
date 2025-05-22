import { AuthScreen } from "@/components/AuthScreen";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function LoginScreen() {
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (password.length >= 4) Alert.alert("Ваш пароль: " + password);
  }, [password]);

  return (
    <AuthScreen title="Логін" password={password} setPassword={setPassword} />
  );
}
