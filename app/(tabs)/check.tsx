import { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SHA1 from "crypto-js/sha1";
import { StyledInput } from "@/components/ui/StyledInput";

export default function TestComponent() {
  const [password, setPassword] = useState<string>("");

  const request = async () => {
    const hash = SHA1(password).toString().toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`
    );
    const data = response.text();

    const dataLines = (await data).split("\r\n");

    const match = dataLines.find((dataLine) => {
      const [dataSuffix] = dataLine.split(":");

      return dataSuffix === suffix;
    });

    if (match) {
      const [, count] = match.split(":");

      return Alert.alert(`Ваш пароль зламано ${count}`);
    }

    return Alert.alert("Ваш пароль не зламано ;)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={style.safeContainer}>
        <View style={style.container}>
          <Text style={style.title}>Перевірте ваш пароль!</Text>
          <Text style={style.text}>
            Перевірте, чи знаходиться ваш пароль в базі даних хакерів. Напишіть
            пароль та натисніть кнопку відправити!
          </Text>

          <StyledInput
            value={password}
            setValue={setPassword}
            placeholder="Ваш пароль...."
            //className="py-5 border-gray-400 border pl-4 rounded-md text-gray-200 my-6 focus:border-gray-100"
          />

          <Button onPress={request} title="Перевірити" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 32,
  },
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 30,
    color: "#9ca3af",
    fontWeight: 900,
  },
  text: {
    fontSize: 18,
    color: "#4b5563",
  },
  input: {
    marginHorizontal: 24,
    paddingVertical: 20,
    paddingLeft: 16,
    borderColor: "#9ca3af",
    borderWidth: 1,
    borderRadius: 6,
    color: "#e5e7eb",
  },
});
