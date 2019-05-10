package de.mariusbackes.cordova.sumup;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import com.sumup.merchant.api.SumUpState;
import com.sumup.merchant.api.SumUpAPI;
import com.sumup.merchant.api.SumUpLogin;
import com.sumup.merchant.api.SumUpPayment;
import com.sumup.merchant.cardreader.ReaderLibManager;
import com.sumup.merchant.CoreState;
import com.sumup.merchant.Models.TransactionInfo;
import com.sumup.readerlib.CardReaderManager;
import com.sumup.merchant.Models.UserModel;

import java.math.BigDecimal;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @author Marius Backes
 */
public class SumUp extends CordovaPlugin {

    // SumUp Methods
    public enum Action {
        login,
        auth,
        getSettings,
        logout,
        isLoggedIn,
        prepare,
        close,
        pay
    }

    private static final int REQUEST_CODE_LOGIN = 1;
    private static final int REQUEST_CODE_PAYMENT = 2;
    private static final int REQUEST_CODE_PAYMENT_SETTINGS = 3;

    private CallbackContext callback = null;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        cordova.getActivity().runOnUiThread(() -> SumUpState.init(cordova.getActivity().getApplicationContext()));
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        boolean result = false;

        switch(Action.valueOf(action)){
            case login: result = true;
                login(args, callbackContext); break;
            case auth: result = true;
                auth(args, callbackContext);
                break;
            case getSettings: result = true;
                getSettings(args, callbackContext);
                break;
            case logout: result = true;
                logout(args, callbackContext);
                break;
            case isLoggedIn: result = true;
                isLoggedIn(args, callbackContext);
                break;
            case prepare: result = true;
                prepare(args, callbackContext);
                break;
            case close: result = true;
                close(args, callbackContext);
                break;
            case pay: result = true;
                pay(args, callbackContext);
                break;
        }

        return result;
    }

    // tries to login sumup user with credentials or acces token
    private boolean login(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // authenticate with the terminal
    private boolean auth(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // reads the settings from the logged in user account
    private boolean getSettings(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // logs an user out
    private boolean logout(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // checkes whether an user is logged in to proceed some action
    private boolean isLoggedIn(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // wakes up the terminal to make a payment
    private boolean prepare(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // closes the connection to the card reader
    private boolean close(JSONArray args, CallbackContext callbackContext){
        // TODO
    }

    // executes a payment
    private boolean pay(JSONArray args, CallbackContext callbackContext){
        // TODO
    }
}