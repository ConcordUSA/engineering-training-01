/**
 * Gets configs per environment, as set by the environment variable NODE_ENV
 *
 * Note: This is checked in to version control, and is NOT intended for secrets.
 *       ONLY public config variables should be managed here.
 */

import environments from "../../config";

const getConfigsPerEnvironment = () => {
  // If running in headless cypress
  const Cypress = global.window["Cypress"];
  if (Cypress && Cypress.env) {
    const baseUrl = Cypress.env("CYPRESS_BASE_URL");
    switch (baseUrl) {
      case "http://localhost:3000":
        return environments.development;
      case "https://et-2021a-dev.web.app/":
        return environments.development;
      case "https://et-2021a-stage.web.app/":
        return environments.staging;
      case "https://et-2021a-prod.web.app/":
        return environments.production;
    }
  }

  // If running in browser, or cypress browser
  const hostname = global?.window?.location?.hostname;
  switch (hostname) {
    case "localhost":
      return environments.development;
    case "et-2021a-dev.web.app":
      return environments.development;
    case "et-2021a-stage.web.app":
      return environments.staging;
    case "et-2021a-prod.web.app":
      return environments.production;
  }
};
export default getConfigsPerEnvironment;
