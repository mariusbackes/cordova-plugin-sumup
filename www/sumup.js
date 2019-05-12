"use strict";

const CLASS = "SumUp";

let module;
module.exports = {
  login: accessToken => {
    return new Promise((resolve, reject) =>
      cordova.exec(
        resolve,
        reject,
        CLASS,
        "login",
        accessToken ? [accessToken] : []
      )
    );
  },
  auth: accessToken => {
    return new Promise((resolve, reject) =>
      cordova.exec(
        resolve,
        reject,
        CLASS,
        "auth",
        accessToken ? [accessToken] : []
      )
    );
  },
  getSettings: () => {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, CLASS, "getSettings", [])
    );
  },
  logout: () => {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, "SumUp", "logout", [])
    );
  },
  isLoggedIn: () => {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, CLASS, "isLoggedIn", [])
    );
  },
  prepare: () => {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, CLASS, "prepare", [])
    );
  },
  closeConnection: () => {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, CLASS, "closeConnection", [])
    );
  },
  pay: (amount, currencycode) => {
    return new Promise((resolve, reject) =>
      cordova.exec(resolve, reject, CLASS, "pay", [amount, currencycode])
    );
  }
};
