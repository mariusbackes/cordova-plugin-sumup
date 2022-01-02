declare module "cordova-sumup-plugin" {
  export interface SumUpResponse {
    code: number;
    message: string;
  }

  export interface SumUpLoginStatus {
    code: number;
    isLoggedIn: boolean;
  }

  export interface SumUpPayment {
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

  export interface SumUpKeys {
    accessToken?: string;
    affiliateKey?: string;
  }

  /**
   * Login to SumUp
   * Supports an optional access token.
   * If no access token available, a login screen is shown
   *
   * @export
   * @param {SumUpKeys} [sumUpKeys]
   */
  export function login(sumUpKeys: SumUpKeys): void;

  /**
   * Access token needed to authenticate
   * @export
   * @param {string} [accessToken]
   */
  export function auth(accessToken: string): void;

  /**
   * Opens the settings dialog
   *
   * @export
   */
  export function getSettings(): void;

  /**
   * Logout of SumUp
   *
   * @export
   */
  export function logout(): void;

  /**
   * Check whether the user is logged in
   *
   * @export
   */
  export function isLoggedIn(): void;

  /**
   * Will awake the terminal for a transaction.
   * Use a bit before the transaction is expected to take place, to make the process faster.
   *
   * @export
   */
  export function prepare(): void;

  /**
   * Will setup the SumUP SDK.
   * This action is required before using other functions.
   *
   * @export
   */
  export function setup(): void;

  /**
   * Test the SumUp integration using SDK tests.
   *
   * @export
   */
  export function test(): void;

  /**
   * Closes the connection to the payment terminale
   *
   * @export
   */
  export function closeConnection(): void;

  /**
   * Proceed a payment
   *
   * @export
   * @param {number} amount
   * @param {string} title (optional)
   * @param {string} currencyCode (optional)
   */
  export function pay(
    amount: number,
    title?: string,
    currencyCode?: string
  ): void;
}
