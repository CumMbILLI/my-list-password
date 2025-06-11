import { StyleSheet, View } from "react-native";
import { AuthBiometricKey } from "./AuthBiometricKey";
import { AuthDeleteKey } from "./AuthDeleteKey";
import { AuthKey } from "./AuthKey";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { KEYS } from "@/constants/Auth";

interface Props {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}

export function AuthKeyList({ password, setPassword, disabled }: Props) {
  return (
    <View style={styles.keyboard}>
      {KEYS.map((key) => {
        if (key === "biometric") {
          return (
            <AuthBiometricKey
              key={key}
              style={styles.key}
              disabled={disabled}
            />
          );
        }

        if (key === "del") {
          return (
            <AuthDeleteKey
              key={key}
              style={styles.key}
              setPassword={setPassword}
              disabled={disabled}
            />
          );
        }

        return (
          <AuthKey
            key={key}
            symbol={key}
            password={password}
            setPassword={setPassword}
            keyStyle={styles.key}
            textStyle={styles.keyText}
            disabled={disabled}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  key: {
    width: "28%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#1E1E1E",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  keyText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
});
