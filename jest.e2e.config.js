module.exports = {
  preset: "jest-puppeteer",
  clearMocks: true,
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupFilesAfterEnv: ["<rootDir>/internals/jestSettings.e2e.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testPathIgnorePatterns: [
    "src",
    "lesson1",
    "lesson2",
    "lesson3",
    "lesson13",
    "lesson17",
  ],
  moduleDirectories: ["node_modules", "src"],
};
