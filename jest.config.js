module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/internals/jestSettings.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^smart/(.*)$": "<rootDir>/src/smart/$1",
  },
  testPathIgnorePatterns: ["e2e"],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: -85,
    },
  },
};
