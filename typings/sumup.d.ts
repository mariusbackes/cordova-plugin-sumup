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
  }

  /**
   * Login to SumUp
   * Supports an optional access token.
   * If no access token available, a login screen is shown
   *
   * @export
   * @param {string} [accessToken]
   * @returns {Promise<SumUpResponse>}
   */
  export function login(accessToken?: string): Promise<SumUpResponse>;

  /**
   * Access token needed to authenticate
   * @export
   * @param {string} [accessToken]
   * @returns {Promise<SumUpResponse>}
   */
  export function auth(accessToken: string): Promise<SumUpResponse>;

  /**
   * Opens the settings dialog
   *
   * @export
   * @returns {Promise<SumUpResponse>}
   */
  export function getSettings(): Promise<SumUpResponse>;

  /**
   * Logout of SumUp
   *
   * @export
   * @returns {Promise<SumUpResponse>}
   */
  export function logout(): Promise<SumUpResponse>;

  /**
   * Check whether the user is logged in
   *
   * @export
   * @returns {Promise<SumUpLoginStatus>}
   */
  export function isLoggedIn(): Promise<SumUpLoginStatus>;

  /**
   * Will awake the terminal for a transaction.
   * Use a bit before the transaction is expected to take place, to make the process faster.
   *
   * @export
   * @returns {Promise<void>}
   */
  export function prepare(): Promise<SumUpResponse>;

  /**
   * Closes the connection to the payment terminale
   *
   * @export
   * @returns {Promise<void>}
   */
  export function closeConnection(): Promise<SumUpResponse>;

  /**
   * Proceed a payment
   *
   * @export
   * @param {number} amount
   * @param {string} currencycode
   * @returns {Promise<SumUpPayment>} If the payment is successful
   */
  export function pay(
    amount: number,
    currencycode: string
  ): Promise<SumUpPayment>;
}
