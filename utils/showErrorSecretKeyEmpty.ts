import { Toast } from "toastify-react-native";

export const showErrorSecretKeyEmpty = () => {
  Toast.show({
    text1: "Помилка!",
    text2: "Ключ для шифрування не знайдено. Перезавантажне додаток.",
    type: "error",
  });
};
