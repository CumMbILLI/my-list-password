export type PasswordRules = {
  minLength?: string;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireDigit?: boolean;
  requireSpecialChar?: boolean;
};

type PasswordValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const validatePassword = (
  password: string,
  rules: PasswordRules = {
    minLength: "8",
    requireUppercase: true,
    requireLowercase: true,
    requireDigit: true,
    requireSpecialChar: true,
  }
): PasswordValidationResult => {
  const errors: string[] = [];

  if (rules.minLength && password.length < Number(rules.minLength)) {
    errors.push(`Пароль має містити щонайменше ${rules.minLength} символів.`);
  }

  if (rules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Пароль має містити хоча б одну велику літеру.");
  }

  if (rules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Пароль має містити хоча б одну малу літеру.");
  }

  if (rules.requireDigit && !/[0-9]/.test(password)) {
    errors.push("Пароль має містити хоча б одну цифру.");
  }

  if (
    rules.requireSpecialChar &&
    !/[!@#$%^&*()_+{}\[\]:;"'<>,.?/~\\-]/.test(password)
  ) {
    errors.push("Пароль має містити хоча б один спеціальний символ.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
