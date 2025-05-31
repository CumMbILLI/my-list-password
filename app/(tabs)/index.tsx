import { PasswordsList } from "@/components/PasswordsList";
import { TitltePage } from "@/components/TitlePage";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDbRequest } from "@/hooks/useDbRequest";
import { PasswordState } from "@/interfaces/password.interface";

export default function HomeScreen() {
  const [passwords, setPasswords] = useState<PasswordState[]>([]);

  const { getAllPasswords, deletePassword } = useDbRequest();

  const db = useSQLiteContext();

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
        onPressDelete={handleDeletePassword}
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
