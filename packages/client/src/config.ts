/**
 * Gets configs per environment, as set by the environment variable NODE_ENV
 *
 * Note: This is checked in to version control, and is NOT intended for secrets.
 *       ONLY public config variables should be managed here.
 */

interface Configs {
  apiUrl: string;
}

const environments = {
  test: {
    apiUrl: "http://localhost:5001/et-2021a-dev/us-central1/api/v1",
  },
  development: {
    apiUrl: "https://us-central1-et-2021a-dev.cloudfunctions.net/api",
  },
  staging: {
    apiUrl: "https://us-central1-et-2021a-stage.cloudfunctions.net/api",
  },
  production: {
    apiUrl: "https://us-central1-et-2021a-prod.cloudfunctions.net/api",
  },
};

const getConfigsPerEnvironment = (): Configs => {
  const environment = process.env.NODE_ENV;
  return environments[environment];
};

export default getConfigsPerEnvironment;
