module.exports = {
    "transform": {
      "^.+\\.js$": "babel-jest"
    }
  };

  // jest.config.js
module.exports = {
  // ... tu configuración actual ...
  "setupFiles": [
    "jest-localstorage-mock"
  ]
};