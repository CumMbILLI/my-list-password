import { useSQLiteContext } from "expo-sqlite";
import CryptoJS from "crypto-js";
import * as SecureStore from "expo-secure-store";
import { PasswordState } from "@/interfaces/password.interface";
import { showErrorSecretKeyEmpty } from "@/utils/showErrorSecretKeyEmpty";
import { Toast } from "toastify-react-native";

export const useDbRequest = () => {
  const db = useSQLiteContext();

  const secketKey = SecureStore.getItem("MYDIPLOM_SK");

  const getAllPasswords = async () => {
    return await db.getAllAsync<PasswordState>("SELECT * FROM password;");
  };

  const getPasswordById = async (id: string) => {
    if (!secketKey) {
      return showErrorSecretKeyEmpty();
    }

    try {
      const response = await db.getFirstAsync<PasswordState>(
        "SELECT id, name, password FROM password WHERE id = ?;",
        [parseInt(id as string)]
      );

      const bytesDecryptPassword = CryptoJS.AES.decrypt(
        response!.password,
        secketKey
      );
      const decryptPassword = bytesDecryptPassword.toString(CryptoJS.enc.Utf8);

      return response ? { ...response, password: decryptPassword } : null;
    } catch (error) {
      console.error(error);

      Toast.show({
        text1: "Помилка!",
        text2: "Щось пішло не так :(\n Будь-ласка, спробуйте пізніше.",
        type: "error",
      });
    }
  };

  const updatePassword = async (name: string, password: string, id: number) => {
    if (!secketKey) {
      return showErrorSecretKeyEmpty();
    }

    try {
      const encryptPassword = CryptoJS.AES.encrypt(
        password,
        secketKey
      ).toString();

      await db.runAsync(
        "UPDATE password SET name = ?, password = ?, passwordLength = ? WHERE id = ?;",
        [name, encryptPassword, password.length, id]
      );
    } catch (error) {
      console.error(error);

      Toast.show({
        text1: "Помилка!",
        text2: "Щось пішло не так :(\n Будь-ласка, спробуйте пізніше.",
        type: "error",
      });
    }
  };

  const createPassword = async (name: string, password: string) => {
    if (!secketKey) {
      return showErrorSecretKeyEmpty();
    }

    try {
      const encryptPassword = CryptoJS.AES.encrypt(
        password,
        secketKey
      ).toString();

      await db.runAsync(
        "INSERT INTO password (name, password, passwordLength) VALUES (?, ?, ?);",
        [name, encryptPassword, password.length]
      );
    } catch (erorr) {
      console.error(erorr);

      Toast.show({
        text1: "Помилка!",
        text2: "Щось пішло не так :(\n Будь-ласка, спробуйте пізніше.",
        type: "error",
      });
    }
  };

  const deletePassword = (id: number) => {
    db.runAsync("DELETE FROM password WHERE id = ?;", [id]);
  };

  const deleteAllPasswords = () => {
    db.runAsync("DELETE FROM password");
  };

  return {
    getAllPasswords,
    getPasswordById,
    createPassword,
    updatePassword,
    deletePassword,
    deleteAllPasswords,
  };
};
