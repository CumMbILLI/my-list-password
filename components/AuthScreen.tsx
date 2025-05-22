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
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

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
  textContainer: {
    width: "100%",
    marginBottom: 20,
    paddingLeft: "12%",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
  },
});
