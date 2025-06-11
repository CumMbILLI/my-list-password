import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthField } from "./auth-field/AuthField";
import { AuthKeyList } from "./auth-keys/AuthKeyList";
import { TitltePage } from "./TitlePage";

interface Props {
  title: string;
  titlePasswordField?: string;
  disabled: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export function AuthScreen({
  title,
  titlePasswordField,
  disabled,
  password,
  setPassword,
}: Props) {
  return (
    <View style={styles.container}>
      <TitltePage>{title}</TitltePage>

      <AuthField password={password} title={titlePasswordField} />
      <AuthKeyList
        password={password}
        setPassword={setPassword}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#121212",
  },

  title: {
    fontSize: 30,
    marginVertical: 40,
    fontWeight: "bold",
    color: "#fff",
  },
});
