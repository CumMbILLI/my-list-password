import { LEN_PASSWORD } from "@/constants/Auth";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";

interface Props {
  password: string;
}

export const AuthField = ({ password }: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleShowingPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    setIsShowPassword((prev) => !prev);
  };

  const renderPasswordDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {Array(LEN_PASSWORD)
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
      {renderPasswordDots()}
      <TouchableOpacity
        style={{ position: "absolute", top: 0, right: 40 }}
        onPress={toggleShowingPassword}
      >
        <Ionicons
          name={isShowPassword ? "eye" : "eye-off"}
          color="#fff"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    position: "relative",
    flexDirection: "row",
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
