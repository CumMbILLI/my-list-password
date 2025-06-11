import { Dispatch, SetStateAction } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import * as Haptics from "expo-haptics";
import { LEN_PASSWORD } from "@/constants/Auth";

interface Props {
  symbol: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  keyStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  disabled: boolean;
}

export const AuthKey = ({
  symbol,
  keyStyle,
  textStyle,
  password,
  setPassword,
  disabled,
}: Props) => {
  const handlePressNumber = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (password.length < LEN_PASSWORD) {
      setPassword((prev) => prev + symbol);
    }
  };

  return (
    <TouchableOpacity
      style={keyStyle}
      onPress={handlePressNumber}
      disabled={disabled}
    >
      <Text style={textStyle}>{symbol}</Text>
    </TouchableOpacity>
  );
};
