import { Ionicons } from "@expo/vector-icons";
import { Dispatch } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

interface Props {
  style: StyleProp<ViewStyle>;
  setPassword: Dispatch<React.SetStateAction<string>>;
}

export const AuthDeleteKey = ({ style, setPassword }: Props) => {
  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <TouchableOpacity style={style} onPress={handleDelete}>
      <Ionicons name="backspace" size={24} color="#ccc" />
    </TouchableOpacity>
  );
};
