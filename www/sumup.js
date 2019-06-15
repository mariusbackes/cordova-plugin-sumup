const CLASS = "SumUp";

module.exports = {
  login: (accessToken, success, failure) => {
    cordova.exec(
      success,
      failure,
      CLASS,
      "login",
      accessToken ? [accessToken] : []
    );
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
  closeConnection: (success, failure) => {
    cordova.exec(success, failure, CLASS, "closeConnection", []);
  },
  pay: (amount, currencycode, success, failure) => {
    cordova.exec(success, failure, CLASS, "pay", [amount, currencycode]);
  }
};
