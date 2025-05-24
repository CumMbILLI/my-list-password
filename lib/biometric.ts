import * as LocalAuthentication from "expo-local-authentication";
import * as Haptics from "expo-haptics";
import { Alert, Platform } from "react-native";

export const biometricPress = async () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  if (Platform.OS === "ios") {
    Alert.alert("Помилка!", "Дана функція з'явиться пізніше!");

    return false;
  }

  const isAvaibleBiometricAuth = await LocalAuthentication.hasHardwareAsync();

  if (!isAvaibleBiometricAuth) {
    Alert.alert(
      "Помилка!",
      "Нажаль біометрична авторизація недоступна на вашому пристрої!"
    );

    return false;
  }

  const savedBiometric = await LocalAuthentication.isEnrolledAsync();
  if (!savedBiometric) {
    Alert.alert(
      "Помилка!",
      "На пристрої не знайдені дані для біометричної авторизації. Будь-ласка, додайте їх в налаштуваннях вашого пристрою."
    );

    return false;
  }

  const biometricAuthResponse = await LocalAuthentication.authenticateAsync({
    promptMessage: "Логін",
    cancelLabel: "Відмінити",
    disableDeviceFallback: true,
  });

  return biometricAuthResponse.success;
};
