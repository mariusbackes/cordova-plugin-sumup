# Cordova plugin for SumUp SDK

## Description

This plugin provides the functionality from the SumUp API for the
SumUp payment terminals.

If something is wrong with the plugin feel free to open an issue or make a pull request.

Many thanks to [Peter Meester](https://github.com/petermeester) for helping maintaining the plugin
and adding support for iOS!

## Installation

Add the plugin with the following command:

`cordova plugin add cordova-sumup-plugin --variable SUMUP_API_KEY=INSERT_YOUR_KEY`

SUMUP_API_KEY is the **Affiliate Key** which was created in the SumUp Dashboard.

If you want to change your **Affiliate Key** on runtime, just install the plugin like this:

`cordova plugin add cordova-sumup-plugin --variable SUMUP_API_KEY=""`

Make sure, the SUMUP_API_KEY value is an empty string.

[SumUp Dashboard](https://me.sumup.com/developers)

### Test credentials

If you are in development you can request test credentials.
With this credentials your card (Debit- or creditcard) will not be charged.
Just write a mail to:

[SumUp integration team](mailto:integration@sumup.com)

## Usage

Get global access to the plugin methods with the keyword **SumUp**.

#### Awesome Cordova Plugins (previously "Ionic Native")

If you are using Ionic , use the Awesome Cordova Plugins wrapper. Install it with `npm install @awesome-cordova-plugins/sum-up`.

Import the plugin in your app.module:

```ts
 import { SumUp } from "@awesome-cordova-plugins/sum-up/ngx";

 @NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    SumUp,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
```

And import and use it in every of your components:

```ts
import { SumUp } from "@awesome-cordova-plugins/sum-up/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
})
export class HomePage {
  private access_token: string = "YOUR_ACCESS_TOKEN";

  constructor(private sumUp: SumUp) {}

  private async login(): Promise<void> {
    try {
      await this.sumUp.login(this.access_token);
    } catch (e) {
      console.log(e);
    }
  }
}
```

If you want to try the example first, you can read more [here](#ionic-framework)

### Methods

If you get access to the plugin with plain JavaScript by using **SumUp** the plugin will return
a success and an error callback. Example:

```js
SumUp.methodName(
  [parameter],
  function (success) {
    console.log(success);
  },
  function (error) {
    console.log(error);
  }
);
```

#### Login

```js
SumUpKeys {
    accessToken?: number;
    affiliateKey?: string;
}
```

`SumUp.login(sumUpKeys: SumUpKeys)`

User will be logged in, in his SumUp account. The parameter for the login method is a SumUpKeys Object.
Default, it contains two empty string values. Both values are optional.

##### AccessToken

- If the accessToken is not provided, the user has to type in his SumUp Login credentials.
- If it is provided, to login will be done automatically if the access token is valid.

Read more how to create and renew an access token: [Create an access token](#create-an-access-token)

##### AffiliateKey

If you want to change your affiliateKey on runtime, make sure you've added the plugin in the correct way.
Like described in [Installation](#installation).

Now you can set your **affiliate key** value on the object.

#### auth

`SumUp.auth(accessToken: string)`

Authenticates the account with the given access token.
Parameter **accessToken** is required.

#### getSettings

`SumUp.getSettings()`

Opens a new window with the all account settings of an logged in user.

#### logout

`SumUp.logout()`

Logout a user from the account.

#### isLoggedIn

`SumUp.isLoggedIn()`

Checks whether the user is logged in or not and returns an object with the field **isLoggedIn** which is a boolean value.

#### prepare

`SumUp.prepare()`

Prepares the terminal for a payment. Checks whether the CardReader is ready to tramsmit
and if an instance of the CardReaderManager is available.

#### setup

`SumUp.setup()`

Will setup/initiate the SumUP SDK. Usely after App launch.
For iOS, this is **required** before using other functions.

#### test

`SumUp.test()`

Test the SumUp SDK integration.
Currently only for iOS.

#### closeConnection

`SumUp.closeConnection()`

Tries to close the connection to the card terminal.

#### pay

`SumUp.pay(amount: number, title?: string, currencyCode?: string)`

Opens a native SumUp window to proceed a payment.
Parameter **amount** is required.
Parameter **title** and **currencyCode** are optional.
If no `title` is provided, the title is empty.
If no `currencyCode` is provided, the default currency from logged in user is chosen.
If the Payment was successful it returns an SumUpPayment object with information about the payment.

**NOTE:** At the moment just the required parameter amount and currencycode are available in this plugin.
SumUp supports some optional parameter like:

- title(string)
- receiptSMS(string)
- receiptEmail(string)
- foreignTransactionId(string)
- additionalInfo(string, string)

**additionalInfo** can has any amount.

### Respones

There are 3 types of responses from the plugin:

**SumUpResponse**: This response is fired from the plugin at every call. You'll get an code
and an description message.
In case of an exception the exception message is set to SumUpResponse.

```js
SumUpResponse {
    code: number;
    message: string;
}
```

**SumUpLoginStatus**: It contains the code of the Response and an boolean value whether the user is logged in or not.

```js
SumUpLoginStatus {
    code: number;
    isLoggedIn: boolean;
}
```

**SumUpPayment**: You'll get this response after a successful payment

```js
SumUpPayment {
    transaction_code: string;
    card_type: string;
    merchant_code: string;
    amount: number;
    tip_amount: number;
    vat_amount: number;
    currency: string;
    status: string;
    payment_type: string;
    entry_mode: string;
    installments: number;
    last_4_digits: number;
}
```

## Create an access token

In the **SumUp Dashboard** in the developer section create an app id.

- At the bottom of this page create **OAuth - Create Client Credentials**
- Select an application type, an application name and provide a callback URL
- Download the created JSON-File
- In the browser paste the following link with your client credentials and callback URL:

```
https://api.sumup.com/authorize
    ?response_type=code
    &client_id=YOUR_CLIENT_ID
    &redirect_uri=YOUR_CALLBACK_URL
```

- You'll be redirected to a SumUp Login page where you have to enter the credentials of your SumUp Account
- After the successful login you have to authorize the action to get an access token
- You'll be redirected to the provided URL. An code is set as a query paramter.
- This code is now valid for **60 seconds**
- Copy the code an make an curl request with the following information

```
curl -X POST \
  https://api.sumup.com/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code'\
  -d 'client_id=YOUR_CLIENT_ID'\
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'code=CODE_FROM_QUERY_STRING'
```

- The response from this request is your access token. In the response object there is also an parameter called **refresh_token**. This refresh_token is valid for **6 months**.
- The access token is valid for **60 minutes**
- After the access token expired you can renew it with the following command:

```
curl -X POST \
  https://api.sumup.com/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=refresh_token'\
  -d 'client_id=YOUR_CLIENT_ID'\
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'refresh_token=YOUR_REFRESH_TOKEN'
```

- If the refresh token is valid for less than **30 days** and you make an access token request, the refresh token will also be renewed.
- If the refresh token is also invalid, you have to run through the process again

## Response Codes

### SumUp API Response Codes

These are all the response codes from the native SumUp SDK. They are also returned to your JavaScript
App.

| Code | Description               |
| ---- | ------------------------- |
| 1    | Success                   |
| 2    | Transaction failed        |
| 3    | Geolocation required      |
| 4    | Invalid param             |
| 5    | Invalid Token             |
| 6    | No connectivity           |
| 7    | Permission denied         |
| 8    | Not logged in             |
| 9    | Duplicate foreign tx id   |
| 10   | Invalid affiliate key     |
| 11   | User is already logged in |

### Plugin specific response codes

This plugins always returns an object with a status code to recognize if the operation was successful
or not. These codes are starting at 100.

Here are all additional codes:

| Code | Description                            |
| ---- | -------------------------------------- |
| 100  | Login error                            |
| 101  | Login canceled                         |
| 102  | Check for login status failed          |
| 103  | Logout failed                          |
| 104  | Failed to close card reader connection |
| 105  | CardReader instance is not defined     |
| 106  | Error while stop card reader           |
| 107  | Show settings failed                   |
| 108  | Settings done                          |
| 109  | Prepare payment error                  |
| 110  | Card reader is not ready to transmit   |
| 111  | Error while preparing checkout         |
| 112  | Authenticate error                     |
| 113  | No access token                        |
| 114  | Authenticate was successful            |
| 115  | Can't parse amount                     |
| 116  | Can't parse currency                   |
| 117  | Payment error                          |
| 118  | No affiliate key available             |

## Common problems

### Invalid affiliate key

If you want to make a payment and get the "Invalid affiliate key" error
in this process it could be, you have provided the false app id.

Make sure the app id you created in your SumUp dashboard is equal to the
id from your config.xml

## Examples

### Plain javascript

In the folder **examples/javasript** you can find a plain Javascript application to communicate with
a SumUp Terminal.
Just insert your **affiliate key** in **package.json** and install the package with **npm install**.

If you want to login with an access token, you must generate an access token like [described here](#create-an-access-token).
After generating a valid access token insert it in **index.js**.

### Ionic Framework

In **examples/ionic** is an example app with Ionic.

1.  Insert your own API_KEY (Affiliate Key) in the **examples/ionic/package.json**.
2.  Generate an access token if needed.
3.  Install the dependencies with `npm install`.
4.  Add a platform: `ionic cordova platform add [android, ios]`.
5.  Build the App: `ionic cordova build [android, ios]`.
6.  Install the .apk File on an Android device with `adb install` or open the `xcworkspace` to run it on an iOS device.
7.  You can also run the app directly with `ionic cordova run [android, ios]`.

## Changelog

- 2.0.0: Added support for iOS
- 1.3.0: Added "last_4_digits" on payment and fixed an issue on login (Check missing accessToken)
- 1.2.0: Provide the SUMUP_API_KEY (Affiliate Key) from JavaScript
- 1.1.1: Updated SumUp Android SDK to version 3.2.1
- 1.1.0: Updated SumUp Android SDK to version 3.2.0
- 1.0.4: Added Ionic example app
- 1.0.3: Added example for plain JavaScript app
- 1.0.2: Bugfix on successful payment response
- 1.0.1: Bugfix on CardReader transmission state
- 1.0.0: Initial version support for Android
