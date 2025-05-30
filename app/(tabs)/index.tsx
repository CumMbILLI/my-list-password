import { PasswordsList } from "@/components/PasswordsList";
import { TitltePage } from "@/components/TitlePage";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewPassword from "../(password)/new";
import { useDbRequest } from "@/hooks/useDbRequest";

export interface UserPasswords {
  id: number;
  name: string;
  password: string;
}

export default function HomeScreen() {
  const [passwords, setPasswords] = useState<UserPasswords[]>([]);

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
