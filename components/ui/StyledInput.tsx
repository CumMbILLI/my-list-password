import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export interface StyledInputProps extends TextInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const primary = "#9ca3af";
const secondary = "#f3f4f6";

export function StyledInput({
  value,
  setValue,
  style,
  placeholder,
  onFocus,
  onBlur,
  keyboardType,
  secureTextEntry,
}: StyledInputProps) {
  const [borderColor, setBorderColor] = useState(primary);

  const customOnFocus = () => {
    onFocus;
    setBorderColor(secondary);
  };

  const customOnBlur = () => {
    onBlur;
    setBorderColor(primary);
  };

  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style, { borderColor }]}
      onFocus={customOnFocus}
      onBlur={customOnBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 20,
    marginVertical: 24,
    borderWidth: 1,
    paddingLeft: 16,
    borderRadius: 6,
    color: "#e5e7eb",
    transitionProperty: "borderColor",
    transitionDuration: "300ms",
  },
});
