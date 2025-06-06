import { Toast } from "toastify-react-native";
import SHA256 from "crypto-js/sha256";
import * as SecureStore from "expo-secure-store";

export const handleRegisterApp = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    Toast.show({
      type: "error",
      text1: "Помилка!",
      text2: "Пароль не співпадає.",
      visibilityTime: 5000,
      autoHide: true,
      textColor: "#fff",
      iconColor: "red",
      iconSize: 24,
      progressBarColor: "red",
    });

    return false;
  }

  Toast.show({
    type: "success",
    text1: "Успішно!",
    text2: "Пароль співпадає.",
    visibilityTime: 5000,
    autoHide: true,
    textColor: "#fff",
    iconColor: "#4CAF50",
    iconSize: 24,
    progressBarColor: "#4CAF50",
  });

  const hashPassword = SHA256(password).toString();
  SecureStore.setItem("MYDIPLOM_PSWD", hashPassword);

  const dateNow = Date.now().toString();

  const hashDate = SHA256(dateNow).toString();

  const secketKey = hashDate + hashPassword;

  SecureStore.setItem("MYDIPLOM_SK", secketKey);

  console.log(secketKey);

  return true;
};
