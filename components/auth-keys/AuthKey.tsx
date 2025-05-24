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
}

export const AuthKey = ({
  symbol,
  keyStyle,
  textStyle,
  password,
  setPassword,
}: Props) => {
  const handlePressNumber = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (password.length < LEN_PASSWORD) {
      setPassword((prev) => prev + symbol);
    }
  };

  return (
    <TouchableOpacity style={keyStyle} onPress={handlePressNumber}>
      <Text style={textStyle}>{symbol}</Text>
    </TouchableOpacity>
  );
};
