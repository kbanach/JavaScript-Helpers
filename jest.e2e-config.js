const jestConfig = require("./jest.config");

module.exports = {
    ...jestConfig,

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        "<rootDir>/tests"
    ],

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['core-js'],
    
};