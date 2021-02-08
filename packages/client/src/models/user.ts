export interface User {
  uid?: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  companyPhone: string;
  password?: string;
}

// validate
export function isValidEmail(input: string) {
  const isValid = input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  if (!isValid)
    return {
      input,
      invalid: true,
      helperText: "Please enter a valid email",
    };

  return { input, invalid: false, helperText: "" };
}

export function isValidPhone(input: string) {
  const isValid =
    input.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/) ||
    input.match(/^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/);

  if (!isValid)
    return {
      input,
      invalid: true,
      helperText: "Please enter a valid phone number",
    };

  return { input, invalid: false, helperText: "" };
}
