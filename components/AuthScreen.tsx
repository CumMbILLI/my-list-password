import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthField } from "./auth-field/AuthField";
import { AuthKeyList } from "./auth-keys/AuthKeyList";

interface Props {
  title: string;
  titlePasswordField?: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

export function AuthScreen({
  title,
  titlePasswordField,
  password,
  setPassword,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <AuthField password={password} title={titlePasswordField} />
      <AuthKeyList password={password} setPassword={setPassword} />
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
    textAlign: "left",
    color: "#fff",
  },
});
