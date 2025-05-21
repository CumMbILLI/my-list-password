import { Dispatch, SetStateAction } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";

interface Props {
  symbol: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  keyStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

export const AuthKey = ({
  symbol,
  keyStyle,
  textStyle,
  password,
  setPassword,
}: Props) => {
  const handlePressNumber = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
  };

  return (
    <TouchableOpacity
      style={keyStyle}
      onPress={() => handlePressNumber(symbol)}
    >
      <Text style={textStyle}>{symbol}</Text>
    </TouchableOpacity>
  );
};
