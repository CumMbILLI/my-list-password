import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

interface Props {
  key: string;
  style: StyleProp<ViewStyle>;
}

export const AuthBiometricKey = ({ key, style }: Props) => {
  const handleBiometricPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert(
      "Биометрия",
      "Функция биометрической аутентификации еще не реализована."
    );
  };

  return (
    <TouchableOpacity key={key} style={style} onPress={handleBiometricPress}>
      <Ionicons name="finger-print" size={28} color="#ccc" />
    </TouchableOpacity>
  );
};
