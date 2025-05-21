import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import * as LocalAuth from "expo-local-authentication";

interface Props {
  key: string;
  style: StyleProp<ViewStyle>;
}

export const AuthBiometricKey = ({ key, style }: Props) => {
  const handleBiometricPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const isAvaibleBiometricAuth = await LocalAuth.hasHardwareAsync();

    let supportBiometricAuth;
    if (isAvaibleBiometricAuth) {
      supportBiometricAuth =
        await LocalAuth.supportedAuthenticationTypesAsync();
    }

    if (!supportBiometricAuth) {
      return Alert.alert("Недоступна биометрическая автроризация!");
    }

    const savedBiometric = await LocalAuth.isEnrolledAsync();
    if (!savedBiometric) {
      return Alert.alert("Нет сохраненных биометрических данных!");
    }

    const biometricAuth = await LocalAuth.authenticateAsync({
      promptMessage: "Login",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    console.log(biometricAuth);
  };

  return (
    <TouchableOpacity key={key} style={style} onPress={handleBiometricPress}>
      <Ionicons name="finger-print" size={28} color="#ccc" />
    </TouchableOpacity>
  );
};
