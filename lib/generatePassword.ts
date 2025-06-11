import {
  LOWERCASE,
  NUMBERS,
  SYMBOLS,
  UPPERCASE,
} from "@/constants/GeneratePassword";
import { PasswordRules } from "./validatePassword";

export const generatePassword = ({
  minLength = "6",
  requireUppercase = true,
  requireLowercase = true,
  requireDigit = true,
  requireSpecialChar = true,
}: PasswordRules): string => {
  let characterPool = "";
  let requiredChars: string[] = [];

  if (requireUppercase) {
    characterPool += UPPERCASE;

    requiredChars.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (requireLowercase) {
    characterPool += LOWERCASE;

    requiredChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }
  if (requireDigit) {
    characterPool += NUMBERS;

    requiredChars.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  }
  if (requireSpecialChar) {
    characterPool += SYMBOLS;

    requiredChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  if (characterPool.length === 0) return "";

  const remainingLength = Number(minLength) - requiredChars.length;
  const passwordChars = [...requiredChars];

  for (let i = 0; i < remainingLength; i++) {
    const randomChar =
      characterPool[Math.floor(Math.random() * characterPool.length)];
    passwordChars.push(randomChar);
  }

  return shuffleArray(passwordChars).join("");
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
