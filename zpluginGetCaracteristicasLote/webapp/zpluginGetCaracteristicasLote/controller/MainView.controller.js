sap.ui.define([
    'jquery.sap.global',
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "./Utils/Commons",
    "./Utils/ApiPaths",
    "../model/formatter"
], function (jQuery, Controller, JSONModel, Commons, ApiPaths, formatter) {
    "use strict";

    return Controller.extend("serviacero.custom.plugins.zpluginGetCaracteristicasLote.zpluginGetCaracteristicasLote.controller.MainView", {
        onInit: function () {

        },

        onAfterRendering: function () {
            const oView = this.getView();
            oView.byId("scanInput").focus();
        },

        onBarcodeScan: function (oEvent) {
            const oView = this.getView(),
                oTable = oView.byId("batchCharcTable");
            oTable.setBusy(true);
            setTimeout(function () {
                const oSource = oEvent.getSource(),
                    oBatch = String(oSource.getValue()).split("?")[1],
                    oMaterial = String(oSource.getValue()).split("?")[0],
                    oPODParams = this.Commons.getPODParams(this.getOwnerComponent()),
                    oSapApi = this.getOwnerComponent().getManifestEntry("/sap.app/dataSources/sapApi-RestSource/uri"),
                    oParams = {
                        plant: oPODParams.PLANT_ID,
                        batchNumber: oBatch,
                        material: oMaterial
                    };
                if (oMaterial != "")
                    this.Commons.consumeApi(oSapApi + this.ApiPaths.BATCH_CHARS, "GET", oParams, function (oRes) {
                        oTable.setModel(new JSONModel({ ITEMS: oRes.batchCharacteristics }));
                        oView.byId("productionDate").setText(oRes.productionDate);
                        oTable.setBusy(false);
                    }.bind(this),
                        function (oRes) {
                            oTable.setBusy(false);
                            this.clearModel();
                        }.bind(this));
                else
                    oTable.setBusy(false);
            }.bind(this), 20);
        },
// PROBAR API ------------------------------------------------------------------------------------
        onPressApi: function (oEvent) {  //funcion de prueba 
            const oView = this.getView();
            const oSource = oEvent.getSource(),
                Iplant = "5510",
                oSapApi = this.getOwnerComponent().getManifestEntry("/sap.app/dataSources/sapApi-RestSource/uri"),
                oParams = {
                    plant: Iplant
                };

            this.Commons.consumeApi(oSapApi + this.ApiPaths.WORKCENTERS, "GET", oParams, function (oRes) {
                oTable.setModel(new JSONModel({ ITEMS: oRes.customValues }));
                oView.byId("productionDate").setText(oRes.productionDate);
                oTable.setBusy(false);
            });
        },

        onPressClear: function () {
            const oView = this.getView(),
                oResBun = oView.getModel("i18n").getResourceBundle();
            this.Commons.showConfirmDialog(function () {
                this.clearModel();
            }.bind(this), null, oResBun.getText("clearWarningMessage"));

        },

        clearModel: function () {
            const oView = this.getView();
            oView.byId("batchCharcTable").setModel(new JSONModel({}));
            oView.byId("productionDate").setText("");
            oView.byId("scanInput").setValue("");
            oView.byId("scanInput").focus();
        },

        onBeforeRenderingPlugin: function () {



        },

        isSubscribingToNotifications: function () {

            var bNotificationsEnabled = true;

            return bNotificationsEnabled;
        },


        getCustomNotificationEvents: function (sTopic) {
            //return ["template"];
        },


        getNotificationMessageHandler: function (sTopic) {

            //if (sTopic === "template") {
            //    return this._handleNotificationMessage;
            //}
            return null;
        },

        _handleNotificationMessage: function (oMsg) {

            var sMessage = "Message not found in payload 'message' property";
            if (oMsg && oMsg.parameters && oMsg.parameters.length > 0) {
                for (var i = 0; i < oMsg.parameters.length; i++) {

                    switch (oMsg.parameters[i].name) {
                        case "template":

                            break;
                        case "template2":


                    }



                }
            }

        },


        onExit: function () {
            PluginViewController.prototype.onExit.apply(this, arguments);


        }
    });
});