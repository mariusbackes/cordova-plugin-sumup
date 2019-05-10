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

public class SumUp extends CordovaPlugin {
    // TODO
}