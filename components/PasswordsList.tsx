import { useRouter } from "expo-router";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PasswordCard } from "./PasswordCard";
import { PasswordState } from "@/interfaces/password.interface";

interface Props {
  passwords: PasswordState[];
  onPressDelete: (id: number) => void;
}

export const PasswordsList = ({ passwords, onPressDelete }: Props) => {
  const router = useRouter();

  const redirectNewPassword = () => {
    router.push("/(password)/new");
  };

  const redirectChangePassword = (id: number) => {
    router.push(`/(password)/${id}`);
  };

  if (passwords.length <= 0) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#4b5563", fontSize: 20, fontWeight: 700 }}>
          Паролі не знайдено.
        </Text>
        <Button title="Додати пароль" onPress={redirectNewPassword} />
      </View>
    );
  }

  return (
    <ScrollView>
      <Pressable
        style={{
          marginBottom: 40,
          alignItems: "center",
          borderRadius: 15,
        }}
      >
        <Button
          title="Новий пароль"
          color="#4CBB17"
          onPress={redirectNewPassword}
        />
      </Pressable>
      <View style={styles.list}>
        {passwords.map((item) => (
          <PasswordCard
            {...item}
            key={item.id}
            onPressCard={redirectChangePassword}
            onPressDelete={onPressDelete}
          />
        ))}
      </View>
    </ScrollView>
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
