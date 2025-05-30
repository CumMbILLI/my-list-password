import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyledInput } from "./ui/StyledInput";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Toast } from "toastify-react-native";
import { PasswordInput } from "./ui/PasswordInput";
import { useDbRequest } from "@/hooks/useDbRequest";

interface Props {
  initialData?: {
    id?: number;
    name: string;
    password: string;
  };
}

const defaultInitialData = {
  name: "",
  password: "",
};

export const PasswordForm = ({ initialData = defaultInitialData }: Props) => {
  const passwordId = initialData.id;
  const [name, setName] = useState(initialData.name);
  const [password, setPassword] = useState(initialData.password);

  const { createPassword, updatePassword } = useDbRequest();

  const router = useRouter();

  const handlePasswordSave = async () => {
    try {
      if (passwordId) {
        updatePassword(name, password, passwordId);

        Toast.show({
          text1: "Успішно!",
          text2: "Пароль успішно змінено",
          type: "success",
        });
      } else {
        createPassword(name, password);

        Toast.show({
          text1: "Успішно!",
          text2: "Пароль успішно збережено",
          type: "success",
        });
      }

      return router.back();
    } catch (error) {
      console.log(error);

      return Toast.show({
        text1: "Помилка",
        text2: "Виникла помилка при збереженні паролю!",
        type: "error",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.containter}>
        <View>
          <Text style={styles.text}>Назва</Text>
          <StyledInput value={name} setValue={setName} />

          <Text style={styles.text}>Пароль</Text>
          <PasswordInput value={password} setValue={setPassword} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Відмінити" onPress={() => router.back()} color="red" />
          <Button title="Зберегти" onPress={handlePasswordSave} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containter: {
    margin: 20,
    height: "100%",
  },
  titleContainer: {
    position: "relative",
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
