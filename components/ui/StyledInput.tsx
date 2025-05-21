import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

//className="py-5 border-gray-400 border pl-4 rounded-md text-gray-200 my-6 focus:border-gray-100"

const primary = "#9ca3af";
const secondary = "#f3f4f6";

export function StyledInput({
  value,
  setValue,
  placeholder,
  onFocus,
  onBlur,
}: Props) {
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
      style={[style.input, { borderColor }]}
      onFocus={customOnFocus}
      onBlur={customOnBlur}
    />
  );
}

const style = StyleSheet.create({
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
