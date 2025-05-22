import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Platform,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as LocalAuth from "expo-local-authentication";
import { useAuthStore } from "@/store/auth";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";

interface Props {
  style: StyleProp<ViewStyle>;
}

export const AuthBiometricKey = ({ style }: Props) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const router = useRouter();

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

    if (biometricAuth.success) {
      setAuth(true);

      return router.push("/(tabs)");
    }

    Toast.error("Відбиток не підходить!");
  };

  return (
    <TouchableOpacity
      style={[style, Platform.OS === "ios" && { opacity: 0.3 }]}
      onPress={handleBiometricPress}
      disabled={Platform.OS === "ios"}
    >
      <Ionicons
        name="finger-print"
        size={28}
        color="#ccc"
        style={Platform.OS === "ios" && { opacity: 0.5 }}
      />
    </TouchableOpacity>
  );
};
