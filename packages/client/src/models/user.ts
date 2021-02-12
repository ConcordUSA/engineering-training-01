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

export function isValidPhone(input:string) {
    var cleaned = ("" + input).replace(/\D/g, "");
    const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,1})/);
    if (!match) {
      return {
      input,
      invalid: true,
      helperText: "Please enter a valid phone number",
    };
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
      case inputLength === 7:
        returnNumber = match[1] + "-" + match[2] + match[3];
        break;
      case inputLength <= 10:
        returnNumber = match[1] + "-" + match[2] + "-" + match[3];
        break;
      case inputLength >= 11:
        returnNumber = match[1].charAt(0) + "-" + match[1].substr(1,2) + match[2].charAt(0) + "-" + match[2].substr(1,2) + match[3].charAt(0) + "-" + match[3].substr(1,3) + match[4]
        break;
    }
    return {
      input: returnNumber,
      invalid: false,
      helperText: "",
    };




}

