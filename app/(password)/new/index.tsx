import { PasswordForm } from "@/components/PasswordForm";
import { Stack, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native";
import { Toast } from "toastify-react-native";

export default function NewPasswordPage() {
  const db = useSQLiteContext();

  const router = useRouter();

  return <PasswordForm />;
}
