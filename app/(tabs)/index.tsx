import { PasswordsList } from "@/components/PasswordsList";
import { TitltePage } from "@/components/TitlePage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDbRequest } from "@/hooks/useDbRequest";
import { PasswordState } from "@/interfaces/password.interface";

export default function HomeScreen() {
  const [passwords, setPasswords] = useState<PasswordState[]>([]);

  const { getAllPasswords, deletePassword } = useDbRequest();

  const loadData = async () => {
    const response = await getAllPasswords();

    setPasswords(response);
  };

  const handleDeletePassword = async (id: number) => {
    try {
      await deletePassword(id);

      const updateData = await getAllPasswords();

      setPasswords(updateData);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  if (!passwords) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <TitltePage>Паролі</TitltePage>

      <PasswordsList
        passwords={passwords}
        onPressDelete={(id) =>
          Alert.alert("Увага!", "Ви дійсно хочете видалити пароль?", [
            {
              text: "Підтвердити",
              onPress: () => handleDeletePassword(id),
            },
            {
              text: "Cкасувати",
              style: "cancel",
            },
          ])
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    marginHorizontal: 10,
  },
});
