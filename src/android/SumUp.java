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
            case login:
                result = login(args, callbackContext); break;
            case auth:
                result = auth(args, callbackContext); break;
            case getSettings:
                result = getSettings(args, callbackContext); break;
            case logout:
                result = logout(args, callbackContext); break;
            case isLoggedIn:
                result = isLoggedIn(args, callbackContext); break;
            case prepare:
                result = prepare(args, callbackContext); break;
            case close:
                result = close(args, callbackContext); break;
            case pay:
                result = pay(args, callbackContext); break;
        }

        return result;
    }

    // tries to login sumup user with credentials or acces token
    private boolean login(JSONArray args, CallbackContext callbackContext) {
        Runnable runnable = () -> {
            Object accessToken = null;
            try {
                accessToken = args.get(0);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            SumUpLogin sumUpLogin;
            if (accessToken != null) {
                sumUpLogin = SumUpLogin.builder(affiliateKey).accessToken(accessToken.toString()).build();
            } else {
                sumUpLogin = SumUpLogin.builder(affiliateKey).build();
            }
            SumUpAPI.openLoginActivity(cordova.getActivity(), sumUpLogin, REQUEST_CODE_LOGIN);
        };

        callback = callbackContext;
        cordova.setActivityResultCallback(this);
        cordova.getActivity().runOnUiThread(runnable);

        return true;
    }

    // authenticate with the terminal
    private boolean auth(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    // reads the settings from the logged in user account
    private boolean getSettings(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    // logs an user out
    private boolean logout(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    // checkes whether an user is logged in to proceed some action
    private boolean isLoggedIn(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    // wakes up the terminal to make a payment
    private boolean prepare(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    // closes the connection to the card reader
    private boolean close(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    // executes a payment
    private boolean pay(JSONArray args, CallbackContext callbackContext) {
        // TODO
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        if (requestCode == REQUEST_CODE_LOGIN) {
            try {
                if (data != null) {
                    Bundle extras = data.getExtras();
                    Integer code = extras.getInt(SumUpAPI.Response.RESULT_CODE);
                    String message = extras.getString(SumUpAPI.Response.MESSAGE);

                    JSONObject obj = createReturnObject(code, message);
                    if (code == 1) {
                        returnCordovaPluginResult(PluginResult.Status.OK, obj, false);
                    } else {
                        returnCordovaPluginResult(PluginResult.Status.ERROR, obj, false);
                    }
                } else {
                    JSONObject obj = createReturnObject(101, "Login canceled");
                    returnCordovaPluginResult(PluginResult.Status.ERROR, obj, false);
                }
            } catch (Exception e) {
                JSONObject obj = createReturnObject(100, e.getMessage());
                returnCordovaPluginResult(PluginResult.Status.ERROR, obj, true);
            }
        }
    }

    // creates a return object with all needed information
    private JSONObject createReturnObject(int code, string message) {
        JSONObject obj = new JSONObject();
        obj.put("code", code);
        obj.put("message", message);
        return obj;
    }

    // returns the plugin result to javascript interface
    private void returnCordovaPluginResult(Status status, JSONObject obj, boolean setKeepCallback) {
        PluginResult result = new PluginResult(status, obj);
        if(!setKeepCallback) {
            result.setKeepCallback(false);
        }
        callback.sendPluginResult(result);
    }
}