import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Platform,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useAuthStore } from "@/store/auth";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
import { biometricPress } from "@/lib/biometric";

interface Props {
  style: StyleProp<ViewStyle>;
}

export const AuthBiometricKey = ({ style }: Props) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const router = useRouter();

  const handleBiometricPress = async () => {
    const isSuccessBiometric = await biometricPress();

    if (isSuccessBiometric) {
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
