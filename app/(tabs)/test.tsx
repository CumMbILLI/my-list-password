import { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SHA1 from "crypto-js/sha1";

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

    console.log(dataLines);

    console.log("SUffix: " + suffix);

    if (match) {
      const [, count] = match.split(":");

      return Alert.alert(`Ваш пароль зламано ${count}`);
    }

    return Alert.alert("Ваш пароль не зламано ;)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 px-4 my-8">
        <View className="flex-1 gap-4 px-2">
          <Text className="text-3xl text-gray-400 font-bold">
            Перевірте ваш пароль!
          </Text>
          <Text className="text-lg text-gray-600">
            Перевірте чи знаходиться ваш пароль в базі даних хакерів. Напишіть
            пароль та натисніть кнопку відправити!
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Ваш пароль...."
            className="py-5 border-gray-400 border pl-4 rounded-md text-gray-200 my-6 focus:border-gray-100"
          />

          <View className="bg-blue-500 rounded-md active:bg-blue-700">
            <Button onPress={request} title="Перевірити" color="#fff" />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
