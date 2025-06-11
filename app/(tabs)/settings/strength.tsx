import { TitltePage } from "@/components/TitlePage";
import { StyledInput } from "@/components/ui/StyledInput";
import { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PasswordRules } from "@/lib/validatePassword";
import { useFocusEffect } from "expo-router";
import { DEFAULT_CONFIG_VALIDATE_PASSWORD } from "@/constants/ConfigValidatePassword";
import { Toast } from "toastify-react-native";
import * as SecureStore from "expo-secure-store";

export default function PasswordStrength() {
  const [requireUppercase, setRequireUppercase] = useState<
    boolean | undefined
  >();
  const [requireLowercase, setRequireLowercase] = useState<
    boolean | undefined
  >();
  const [requireDigit, setRequireDigit] = useState<boolean | undefined>();
  const [requireSpecialChar, setRequireSpecialChar] = useState<
    boolean | undefined
  >();

  const [passwordLength, setPasswordLength] = useState<string>("");

  const loadConfigValidatePassword = () => {
    const configValidatePassword = SecureStore.getItem("ValidateConfig");

    let config;

    if (configValidatePassword) {
      config = JSON.parse(configValidatePassword) as Required<PasswordRules>;
    } else {
      config = DEFAULT_CONFIG_VALIDATE_PASSWORD;
    }

    setRequireUppercase(config.requireUppercase);
    setRequireLowercase(config.requireLowercase);
    setRequireDigit(config.requireDigit);
    setRequireSpecialChar(config.requireSpecialChar);
    setPasswordLength(config.minLength);
  };

  const updateConfigValidatePassword = async () => {
    if (!passwordLength.length) {
      return Toast.show({
        text1: "Помилка!",
        text2: "Поле з довжиною пароля не може бути пустим",
        type: "error",
      });
    }

    if (
      !requireUppercase &&
      !requireLowercase &&
      !requireDigit &&
      !requireSpecialChar
    ) {
      return Toast.show({
        text1: "Помилка!",
        text2: "Потрібно обрати хоча б одне правило",
        type: "error",
      });
    }

    const data = {
      minLength: passwordLength,
      requireUppercase,
      requireLowercase,
      requireDigit,
      requireSpecialChar,
    };

    try {
      SecureStore.setItem("ValidateConfig", JSON.stringify(data));

      Alert.alert("Успішно!");
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadConfigValidatePassword();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <TitltePage>Надійність пароля</TitltePage>

        <View>
          <Text style={styles.text}>Довжина паролю: </Text>
          <StyledInput
            value={passwordLength}
            setValue={setPasswordLength}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.list}>
          <View
            style={[
              styles.block,
              Platform.OS === "android" && {
                flex: 1,
                alignContent: "flex-start",
              },
            ]}
          >
            <Text style={styles.text}>Наявність великих літер: </Text>
            <Switch
              style={{ alignSelf: "flex-start" }}
              value={requireUppercase}
              onChange={() => setRequireUppercase((prev) => !prev)}
            />
          </View>

          <View style={styles.block}>
            <Text style={styles.text}>Наявність малих літер: </Text>
            <Switch
              value={requireLowercase}
              onChange={() => setRequireLowercase((prev) => !prev)}
            />
          </View>

          <View style={styles.block}>
            <Text style={styles.text}>Наявність чисел: </Text>
            <Switch
              value={requireDigit}
              onChange={() => setRequireDigit((prev) => !prev)}
            />
          </View>

          <View style={styles.block}>
            <Text style={styles.text}>Наявність спецсимволів: </Text>
            <Switch
              value={requireSpecialChar}
              onChange={() => setRequireSpecialChar((prev) => !prev)}
            />
          </View>
        </View>

        <Button title="Зберегти" onPress={updateConfigValidatePassword} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  list: {
    gap: 25,
    marginBottom: 10,
  },
  block: {
    gap: 15,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
