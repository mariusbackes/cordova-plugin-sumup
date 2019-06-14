@objc(SumUp) class SumUp : CDVPlugin {
    @objc(login:)
    func login(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["code": 100, "message": "Login method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(auth:)
    func auth(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 112, "message": "Auth method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(getSettings:)
    func getSettings(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 7, "message": "Get settings method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(logout:)
    func logout(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 103, "message": "Logout method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(isLoggedIn:)
    func isLoggedIn(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 102, "message": "Is logged in method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(prepare:)
    func prepare(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 109, "message": "Prepare method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(closeConnection:)
    func closeConnection(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 104, "message": "Close connection method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

    @objc(pay:)
    func pay(command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: ["code": 117, "message": "Pay method will be implemented soon"] as [AnyHashable : Any]);
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }
}
