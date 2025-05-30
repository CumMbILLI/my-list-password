import { StyleSheet, TextInput, View } from "react-native";
import { StyledInput, StyledInputProps } from "./StyledInput";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Props extends StyledInputProps {}

export const PasswordInput = ({ value, setValue }: Props) => {
  const [isSecurity, setIsSecurity] = useState(true);

  const toggleSecurityPassword = () => {
    setIsSecurity((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <StyledInput
        value={value}
        setValue={setValue}
        secureTextEntry={isSecurity}
        style={{ paddingRight: 50 }}
      />

      <MaterialIcons
        name={isSecurity ? "visibility-off" : "visibility"}
        size={24}
        color="grey"
        style={styles.icon}
        onPress={toggleSecurityPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "40%",
    right: 20,
  },
});
