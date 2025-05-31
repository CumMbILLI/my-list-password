import { PasswordForm } from "@/components/PasswordForm";
import { useDbRequest } from "@/hooks/useDbRequest";
import { PasswordState } from "@/interfaces/password.interface";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Toast } from "toastify-react-native";

export default function ChangePasswordPage() {
  const { id } = useLocalSearchParams();

  const { getPasswordById } = useDbRequest();

  const [data, setData] = useState<PasswordState | null | undefined>();

  const loadUserPassword = async () => {
    const response = await getPasswordById(id as string);

    if (!response) {
      return;
    }

    setData(response);
  };

  useEffect(() => {
    loadUserPassword();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return <PasswordForm initialData={data} />;
}
