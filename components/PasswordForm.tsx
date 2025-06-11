import {
  Alert,
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyledInput } from "./ui/StyledInput";
import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { PasswordInput } from "./ui/PasswordInput";
import { useDbRequest } from "@/hooks/useDbRequest";
import { PasswordRules, validatePassword } from "@/lib/validatePassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generatePassword } from "@/lib/generatePassword";
import { DEFAULT_CONFIG_VALIDATE_PASSWORD } from "@/constants/ConfigValidatePassword";
import { Toast } from "toastify-react-native";

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
  const [validPasswordErrors, setValidPasswordErrors] = useState<string[]>([]);
  const [configValidPassword, setConfigValidPassword] = useState<
    PasswordRules | undefined
  >();

  const { createPassword, updatePassword } = useDbRequest();

  const router = useRouter();

  const loadConfigValidatePassword = async () => {
    const configValidatePassword = await AsyncStorage.getItem("validateConfig");

    if (configValidatePassword) {
      const config = JSON.parse(configValidatePassword) as PasswordRules;

      setConfigValidPassword(config);
    }
  };

  const handlePasswordSave = () => {
    if (!name) {
      return Toast.show({
        text1: "Помилка!",
        text2: "Ви не ввели назву пароля",
        type: "error",
      });
    }

    const isValidPassword = validatePassword(password, configValidPassword);

    if (!isValidPassword.isValid) {
      setValidPasswordErrors(isValidPassword.errors);

      return;
    }

    if (passwordId) {
      Alert.alert("Увага!", "Ви дійсно хочете змінити пароль?", [
        {
          text: "Підтвердити",
          onPress: () => {
            updatePassword(name, password, passwordId);

            router.back();
          },
        },
        {
          text: "Cкасувати",
          style: "cancel",
        },
      ]);
    } else {
      createPassword(name, password);

      router.back();
    }

    setValidPasswordErrors([]);
  };

  const handleGeneratePassword = () => {
    const newGeneratePassword = generatePassword(
      configValidPassword || DEFAULT_CONFIG_VALIDATE_PASSWORD
    );

    setPassword(newGeneratePassword);
  };

  useFocusEffect(
    useCallback(() => {
      loadConfigValidatePassword();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.containter}>
        <View>
          <Text style={styles.text}>Назва</Text>
          <StyledInput value={name} setValue={setName} />

          <Text
            style={[
              styles.text,
              validPasswordErrors.length > 0 && { color: "red" },
            ]}
          >
            Пароль
          </Text>
          <PasswordInput value={password} setValue={setPassword} />
        </View>

        {validPasswordErrors.length > 0 && (
          <View style={{ gap: 10 }}>
            {validPasswordErrors.map((item, index) => (
              <Text key={index} style={{ color: "red", marginHorizontal: 5 }}>
                {item}
              </Text>
            ))}
          </View>
        )}

        <Button title="Згенерувати пароль" onPress={handleGeneratePassword} />

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
    marginTop: 10,
    gap: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
