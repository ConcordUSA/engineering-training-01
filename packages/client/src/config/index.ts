/**
 * Gets configs per environment, as set by the environment variable NODE_ENV
 *
 * Note: This is checked in to version control, and is NOT intended for secrets.
 *       ONLY public config variables should be managed here.
 */

interface Configs {
  name: string;
  apiUrl: string;
  appUrl: string;
  firebaseConfig: Object;
  useEmulators?: Boolean;
}

const environments = {
  test: {
    name: "test",
    apiUrl: "http://localhost:5001/et-2021a-dev/us-central1/api/v1",
    appUrl: "http://localhost:3000",
    testUid: "jAW706OIycfuN632Sv3nqJLz0Z93",
    firebaseConfig: {
      apiKey: "AIzaSyCzAzy1AU1MAY7QGE-j7Ej2dWqcYrh0CHU",
      authDomain: "et-2021a-dev.firebaseapp.com",
      projectId: "et-2021a-dev",
      storageBucket: "et-2021a-dev.appspot.com",
      messagingSenderId: "775376675934",
      appId: "1:775376675934:web:4a5cc5bf5c1bf0508780cf",
      measurementId: "G-YD4H5MR5RG",
    },
    useEmulators: true,
  },
  development: {
    name: "development",
    apiUrl: "https://us-central1-et-2021a-dev.cloudfunctions.net/api/v1",
    appUrl: "https://et-2021a-dev.web.app",
    testUid: "jAW706OIycfuN632Sv3nqJLz0Z93",
    firebaseConfig: {
      apiKey: "AIzaSyCzAzy1AU1MAY7QGE-j7Ej2dWqcYrh0CHU",
      authDomain: "et-2021a-dev.firebaseapp.com",
      projectId: "et-2021a-dev",
      storageBucket: "et-2021a-dev.appspot.com",
      messagingSenderId: "775376675934",
      appId: "1:775376675934:web:4a5cc5bf5c1bf0508780cf",
      measurementId: "G-YD4H5MR5RG",
    },
  },
  staging: {
    name: "staging",
    apiUrl: "https://us-central1-et-2021a-stage.cloudfunctions.net/api/v1",
    appUrl: "https://et-2021a-stage.web.app",
    firebaseConfig: {
      apiKey: "AIzaSyCyu0nOPQIaH-1086Wa1_3ASfUUwarwdX8",
      authDomain: "et-2021a-stage.firebaseapp.com",
      projectId: "et-2021a-stage",
      storageBucket: "et-2021a-stage.appspot.com",
      messagingSenderId: "782401746633",
      appId: "1:782401746633:web:bc984abd607b9dab1f3f18",
      measurementId: "G-XCLY3ZK457",
    },
  },
  production: {
    name: "production",
    apiUrl: "https://us-central1-et-2021a-prod.cloudfunctions.net/api/v1",
    appUrl: "https://et-2021a-prod.web.app",
    firebaseConfig: {
      apiKey: "AIzaSyA5tpaOilpydF3X7bIffgjGX-Xr_AiUE1g",
      authDomain: "et-2021a-prod.firebaseapp.com",
      projectId: "et-2021a-prod",
      storageBucket: "et-2021a-prod.appspot.com",
      messagingSenderId: "121102883730",
      appId: "1:121102883730:web:585928414b5cf2c8ca3f4b",
      measurementId: "G-JETXSDRCMW",
    },
  },
};

const getConfigsPerEnvironment = (): Configs => {
  // If running in browser, or cypress browser
  const hostname = global?.window?.location?.hostname;
  let environment;
  switch (hostname) {
    case "localhost":
      environment = environments.test;
      break;
    case "et-2021a-dev.web.app":
      environment = environments.development;
      break;
    case "et-2021a-stage.web.app":
      environment = environments.staging;
      break;
    case "et-2021a-prod.web.app":
      environment = environments.production;
      break;
    default:
      environment = environments.test;
  }
  return environment;
};
export default getConfigsPerEnvironment;
