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
  isAdmin?: boolean;
  eventsAttending?: string[];
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
    interestedCategories: [],
    isAdmin: false,
    eventsAttending: []
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

export function isValidPhone(inputNumber: string) {
  var cleaned = ("" + inputNumber).replace(/\D/g, "");
  const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,1})/);
  const inputLength = match[0].length;
  let input;
  let invalid;
  let helperText;
  switch (true) {
    case inputLength < 4:
      input = match[1];
      break;
    case inputLength < 7:
      input = match[1] + "-" + match[2];
      break;
    case inputLength === 7:
      input = match[1] + "-" + match[2] + match[3];
      break;
    case inputLength <= 10:
      input = match[1] + "-" + match[2] + "-" + match[3];
      break;
    case inputLength >= 11:
      input =
        match[1].charAt(0) +
        "-" +
        match[1].substr(1, 2) +
        match[2].charAt(0) +
        "-" +
        match[2].substr(1, 2) +
        match[3].charAt(0) +
        "-" +
        match[3].substr(1, 3) +
        match[4];
      break;
  }

  if (!(inputLength === 7) && !(inputLength > 9)) {
    invalid = true;
    helperText = "Phone number must be 7, 10, or 11 digits";
  } else {
    invalid = false;
    helperText = "";
  }

  return {
    input,
    invalid,
    helperText,
  };
}
