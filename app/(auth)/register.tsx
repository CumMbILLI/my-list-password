import { AuthScreen } from "@/components/AuthScreen";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { handleResiterApp } from "@/lib/register";
import { LEN_PASSWORD } from "@/constants/Auth";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (
      password.length !== LEN_PASSWORD ||
      confirmPassword.length !== LEN_PASSWORD
    )
      return;

    if (!handleResiterApp(password, confirmPassword)) {
      setPassword("");
      setConfirmPassword("");

      return;
    }

    router.push("/(tabs)");
  }, [password, confirmPassword]);

  if (password.length >= 4)
    return (
      <AuthScreen
        title="Регестрація"
        titlePasswordField="Підтвердіть пароль"
        password={confirmPassword}
        setPassword={setConfirmPassword}
      />
    );

  return (
    <AuthScreen
      title="Регестрація"
      password={password}
      setPassword={setPassword}
    />
  );
}
