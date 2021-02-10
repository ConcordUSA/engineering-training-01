module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
  testEnvironment: "node",
  coverageReporters: ["json", "lcov", "text", "clover"],
};
