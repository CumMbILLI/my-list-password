import { UserPasswords } from "@/app/(tabs)";
import { useSQLiteContext } from "expo-sqlite";

export const useDbRequest = () => {
  const db = useSQLiteContext();

  const getAllPasswords = () => {
    return db.getAllAsync<UserPasswords>("SELECT * FROM password;");
  };

  const getPasswordById = (id: string) => {
    return db.getFirstAsync<UserPasswords>(
      "SELECT id, name, password FROM password WHERE id = ?;",
      [parseInt(id as string)]
    );
  };

  const updatePassword = (name: string, password: string, id: number) => {
    db.runAsync("UPDATE password SET name = ?, password = ? WHERE id = ?;", [
      name,
      password,
      id,
    ]);
  };

  const createPassword = (name: string, password: string) => {
    db.runAsync("INSERT INTO password (name, password) VALUES (?, ?);", [
      name,
      password,
    ]);
  };

  const deletePassword = (id: number) => {
    db.runAsync("DELETE FROM password WHERE id = ?;", [id]);
  };

  return {
    getAllPasswords,
    getPasswordById,
    createPassword,
    updatePassword,
    deletePassword,
  };
};
