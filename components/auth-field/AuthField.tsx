import { LEN_PASSWORD } from "@/constants/Auth";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title?: string;
  password: string;
}

export const AuthField = ({ title = "Введіть пароль", password }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 40,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#555",
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
