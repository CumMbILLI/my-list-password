import * as LocalAuthentication from "expo-local-authentication";
import * as Haptics from "expo-haptics";
import { Alert, Platform } from "react-native";

export const handleBiometricPress = async () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  if (Platform.OS === "ios")
    return Alert.alert("Помилка!", "Дана функція з'явиться пізніше!");

  const isAvaibleBiometricAuth = await LocalAuthentication.hasHardwareAsync();

  if (!isAvaibleBiometricAuth) {
    return Alert.alert(
      "Помилка!",
      "Нажаль біометрична авторизація недоступна на вашому пристрої!"
    );
  }

  const savedBiometric = await LocalAuthentication.isEnrolledAsync();
  if (!savedBiometric) {
    return Alert.alert(
      "Помилка!",
      "На пристрої не знайдені дані для біометричної авторизації. Будь-ласка, додайте їх в налаштуваннях вашого пристрою."
    );
  }

  const biometricAuthResponse = await LocalAuthentication.authenticateAsync({
    promptMessage: "Логін",
    cancelLabel: "Відмінити",
    disableDeviceFallback: true,
  });
};
