export interface User {
  uid?: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  companyPhone: string;
  personalPhone?: string;
  password?: string;
  interestedCategories?: string[];
}

export function UserFactory(user?: User): User {
  const defaults: User = {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    companyPhone: "",
    personalPhone: "",
    password: "",
    interestedCategories: []
  };

  return { ...defaults, ...user };
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
      helperText: "Please enter a valid 10-digit phone number",
    };

  return { input, invalid: false, helperText: "" };
}

export function formatPhone(input:string) {
    var updateObj = isValidPhone(input);
    var cleaned = ("" + input).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) {
      return updateObj;
    }
    const inputLength = match[0].length;
    let returnNumber;
    switch (true) {
      case inputLength < 4:
        returnNumber = match[1];
        break;
      case inputLength < 7:
        returnNumber = match[1] + "-" + match[2];
        break;
      default:
        returnNumber = match[1] + "-" + match[2] + "-" + match[3];
    }
    return { ...updateObj, input: returnNumber };




}

