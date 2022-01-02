var app = {
  ACCESS_TOKEN: "INSERT_YOUR_ACCESS_TOKEN",

  // Application Constructor
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );

    // Click listener
    document
      .getElementById("button_login_with_access_token")
      .addEventListener("click", this.loginWithAccessToken);

    document
      .getElementById("button_login_without_access_token")
      .addEventListener("click", this.loginWithoutAccessToken);

    document.getElementById("button_auth").addEventListener("click", this.auth);

    document
      .getElementById("button_get_settings")
      .addEventListener("click", this.getSettings);

    document
      .getElementById("button_logout")
      .addEventListener("click", this.logout);

    document
      .getElementById("button_is_logged_in")
      .addEventListener("click", this.isLoggedIn);

    document
      .getElementById("button_prepare")
      .addEventListener("click", this.prepare);

    document
      .getElementById("button_close_connection")
      .addEventListener("click", this.closeConnection);

    document.getElementById("button_pay").addEventListener("click", this.pay);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent("deviceready");
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector(".listening");
    var receivedElement = parentElement.querySelector(".received");

    listeningElement.setAttribute("style", "display:none;");
    receivedElement.setAttribute("style", "display:block;");

    console.log("Received Event: " + id);
  },

  /*
        SumUp Plugin methods
     */
  loginWithoutAccessToken() {
    SumUp.login(
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  loginWithAccessToken() {
    SumUp.login(
      this.ACCESS_TOKEN,
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  auth() {
    SumUp.auth(
      this.ACCESS_TOKEN,
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  getSettings() {
    SumUp.getSettings(
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  logout() {
    SumUp.logout(
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  isLoggedIn() {
    SumUp.isLoggedIn(
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  prepare() {
    SumUp.prepare(
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  closeConnection() {
    SumUp.closeConnection(
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  },

  pay() {
    SumUp.pay(
      10.0,
      "Title",
      "EUR",
      function(success) {
        console.log(success);
      },
      function(error) {
        console.log(error);
      }
    );
  }
};

app.initialize();
