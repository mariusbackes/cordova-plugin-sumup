# Cordova plugin for SumUp SDK

## Description
This plugin provides the functionality from the SumUp API for the
SumUp payment terminals.

At the moment the plugin is only available for **Android**.
**iOS** support will be added soon.

If something is wrong with the plugin feel free to open an issue or make a pull request.

## Installation

Add the plugin with the following command:

`
cordova plugin add https://github.com/mariusbackes/cordova-plugin-sumup --variable SUMUP_API_KEY=INSERT_YOUR_KEY
`

SUMUP_API_KEY is the **Affiliate Key** which was created in the SumUp Dashboard.

[SumUp Dashboard](https://me.sumup.com/developers)

### Test credentials
If you are in development you can request test credentials.
With this credentials your card (Debit- or creditcard) will not be charged.
Just write a mail to: 

`
integration@sumup.com
` 

## Usage

You can use this plugin in every JavaScript (ES 2015) or TypeScript application.
Just import the plugin:

`import * as SumUp from 'cordova-plugin-sumup';`

There is also a ionic wrapper available to include this plugin in your Ionic 3+ App:

// TODO: ionic wrapper import

### Methods

#### Login
`SumUp.login(accessToken?: string): Promise<SumUpResponse>`

User will be logged in, in his SumUp account. The parameter **accessToken** is optional.

* If the accessToken is not provided, the user has to type in his SumUp Login credentials.
* If it is provided, to login will be done automatically if the access token is valid.

Read more how to create and renew an access token: // TODO: link 

#### auth
`SumUp.auth(accessToken: string): Promise<SumUpResponse>`

Authenticates the account with the given access token.
Parameter **accessToken** is required.

#### getSettings
`SumUp.getSettings(): Promise<SumUpResponse>`

Opens a new window with the all account settings of an logged in user.

#### logout
`SumUp.logout(): Promise<SumUpResponse>`

Logout a user from the account.

#### isLoggedIn
`SumUp.isLoggedIn(): Promise<SumUpLoginStatus>`

Checks whether the user is logged in or not and returns an object with the field **isLoggedIn** which is a boolean value.

#### prepare
`SumUp.prepare(): Promise<SumUpResponse>`

Prepares the terminal for a payment. Checks whether the CardReader is ready to tramsmit
and if an instance of the CardReaderManager is available.

#### closeConnection
`SumUp.closeConnection(): Promise<SumUpResponse>`

Tries to close the connection to the card terminal.

#### pay
`SumUp.pay(amount: number, currencycode: string): Promise<SumUpPayment>`

Opens a native SumUp window to proceed a payment.
Parameter **amount** and **currencycode** are required.
If the Payment was successful it returns an SumUpPayment object with information about the payment.

**NOTE:** At the moment just the required parameter amount and currencycode are available in this plugin.
SumUp supports some optional parameter like:

* title(string)
* receiptSMS(string)
* receiptEmail(string)
* foreignTransactionId(string)
* additionalInfo(string, string)

**additionalInfo** can has any amount.

### Respones
There are 3 types of responses from the plugin:

**SumUpResponse**: This response is fired from the plugin at every call. You'll get an code
and an description message.
In case of an exception the exception message is set to SumUpResponse.
~~~~
SumUpResponse {
    code: number;
    message: string;
}
~~~~

**SumUpLoginStatus**: It contains the code of the Response and an boolean value whether the user is logged in or not.
~~~~
SumUpLoginStatus {
    code: number;
    isLoggedIn: boolean;
}
~~~~

**SumUpPayment**: You'll get this response after a successful payment
~~~~
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
}
~~~~

## Create an access token

In the **SumUp Dashboard** in the developer section create an app id.
* At the bottom of this page create **OAuth - Create Client Credentials**
* Select an application type, an application name and provide a callback URL
* Download the created JSON-File
* In the browser paste the following link with your client credentials and callback URL:

~~~~
https://api.sumup.com/authorize
    ?response_type=code
    &client_id=YOUR_CLIENT_ID
    &redirect_uri=YOUR_CALLBACK_URL
~~~~

* You'll be redirected to a SumUp Login page where you have to enter the credentials of your SumUp Account
* After the successful login you have to authorize the action to get an access token
* You'll be redirected to the provided URL. An code is set as a query paramter.
* This code is now valid for **60 seconds**
* Copy the code an make an curl request with the following information

~~~~
curl -X POST \
  https://api.sumup.com/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code'\
  -d 'client_id=YOUR_CLIENT_ID'\
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'code=CODE_FROM_QUERY_STRING'
~~~~

* The response from this request is your access token. In the response object there is also an parameter called **refresh_token**. This refresh_token is valid for **6 months**.
* The access token is valid for **60 minutes**
* After the access token expired you can renew it with the following command:

~~~~
curl -X POST \
  https://api.sumup.com/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=refresh_token'\
  -d 'client_id=YOUR_CLIENT_ID'\
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'refresh_token=YOUR_REFRESH_TOKEN'
~~~~

* If the refresh token is valid for less than **30 days** and you make an access token request, the refresh token will also be renewed.
* If the refresh token is also invalid, you have to run through the process again

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

| Code | Description                    |
| ---- | ------------------------------ |
| 100  | Login error                    |
| 101  | Login canceled                 |
| 102  | Check for login status failed  |
| 103  | Logout failed                  |
| 104  | Failed to close card reader connection |
| 105  | CardReader instance is not defined |
| 106  | Error while stop card reader |
| 107  | Show settings failed |
| 108  | Settings done |
| 109  | Prepare payment error |
| 110  | Card reader is not ready to transmit |
| 111  | Error while preparing checkout |
| 112  | Authenticate error |
| 113  | No access token |
| 114  | Authenticate was successful |
| 115  | Can't parse amount |
| 116  | Can't parse currency |
| 117  | Payment error |

## Sample App

// TODO

## Support

If you like this plugin and want to support me you can donate by PayPal.

// TODO: PayPal donate
