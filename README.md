# Cordova plugin for SumUp SDK

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

| Code | Description               |
| ---- | ------------------------- |
| 100  | Login error               |
| 101  | Login canceled            |