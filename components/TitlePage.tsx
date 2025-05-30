import { StyleSheet, Text } from "react-native";

export const TitltePage = ({ children }: { children: string }) => {
  return <Text style={[styles.title]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginVertical: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});
