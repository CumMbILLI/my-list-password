import { UserPasswords } from "@/app/(tabs)";
import { PasswordForm } from "@/components/PasswordForm";
import { useDbRequest } from "@/hooks/useDbRequest";
import { Stack } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Toast } from "toastify-react-native";

export default function ChangePasswordPage() {
  const { id } = useLocalSearchParams();

  const { getPasswordById } = useDbRequest();

  const [data, setData] = useState<
    { name: string; password: string } | null | undefined
  >();

  const loadUserPassword = async () => {
    try {
      const response = await getPasswordById(id as string);

      setData(response);
    } catch (error) {
      console.error(error);

      Toast.show({
        text1: "Помилка!",
        text2: "Щось пішло не так :(\n Будь-ласка, спробуйте пізніше.",
      });
    }
  };

  useEffect(() => {
    loadUserPassword();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return <PasswordForm initialData={data} />;
}
