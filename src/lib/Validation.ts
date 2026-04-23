// src/utils/validations.ts

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.endsWith("@gmail.com"); // החוק שקבעת
};

export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
};

export const validatePhone = (phone: string): boolean => {
  return !isNaN(Number(phone)) && phone.length === 10;
};