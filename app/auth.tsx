import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthKeyList } from "@/components/auth-keys/AuthKeyList";
import { AuthField } from "@/components/auth-field/AuthField";

const AuthScreen = () => {
  const [password, setPassword] = useState("");

  const renderPasswordDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {Array(4)
          .fill(null)
          .map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                { backgroundColor: idx < password.length ? "#fff" : "#555" },
              ]}
            />
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите пароль</Text>
      <AuthField password={password} />
      <AuthKeyList password={password} setPassword={setPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 40,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#555",
  },
});

export default AuthScreen;
