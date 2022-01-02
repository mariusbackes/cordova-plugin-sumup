const CLASS = "SumUp";

module.exports = {
  login: (sumUpKeys, success, failure) => {
    cordova.exec(success, failure, CLASS, "login", [sumUpKeys]);
  },
  auth: (accessToken, success, failure) => {
    cordova.exec(
      success,
      failure,
      CLASS,
      "auth",
      accessToken ? [accessToken] : []
    );
  },
  getSettings: (success, failure) => {
    cordova.exec(success, failure, CLASS, "getSettings", []);
  },
  logout: (success, failure) => {
    cordova.exec(success, failure, CLASS, "logout", []);
  },
  isLoggedIn: (success, failure) => {
    cordova.exec(success, failure, CLASS, "isLoggedIn", []);
  },
  prepare: (success, failure) => {
    cordova.exec(success, failure, CLASS, "prepare", []);
  },
  setup: (success, failure) => {
    cordova.exec(success, failure, CLASS, "setup", []);
  },
  test: (success, failure) => {
    cordova.exec(success, failure, CLASS, "test", []);
  },
  closeConnection: (success, failure) => {
    cordova.exec(success, failure, CLASS, "closeConnection", []);
  },
  pay: (amount, title, currencyCode, success, failure) => {
    cordova.exec(success, failure, CLASS, "pay", [amount, title, currencyCode]);
  },
};
