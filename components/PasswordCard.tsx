import { PasswordState } from "@/interfaces/password.interface";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props extends PasswordState {
  onPressCard: (id: number) => void;
  onPressDelete: (id: number) => void;
}

export const PasswordCard = ({
  id,
  name,
  passwordLength,
  onPressCard,
  onPressDelete,
}: Props) => {
  return (
    <View style={styles.block}>
      <TouchableOpacity style={styles.card} onPress={() => onPressCard(id)}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardDesciption}>
            {passwordLength && "Password: " + "*".repeat(passwordLength)}
          </Text>
        </View>

        <MaterialIcons name="arrow-forward-ios" color="white" size={24} />
      </TouchableOpacity>

      <MaterialIcons
        name="delete"
        size={32}
        color="red"
        onPress={() => onPressDelete(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3B3B3B",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  textContainer: {
    gap: 5,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
  },
  cardDesciption: {
    fontSize: 16,
    color: "white",
  },
});
