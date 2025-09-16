sap.ui.define([
    "../controller/Utils/Commons"
], function (Commons) {
    "use strict";
    return {
        getBatchValue: function (batchCharcValues) {

            if (batchCharcValues) {
                if (batchCharcValues.length > 0) {
                    let oCharcValue = batchCharcValues[0].charcValue !== null ? batchCharcValues[0].charcValue : batchCharcValues[0].fltpValueFrom !== null ? batchCharcValues[0].fltpValueFrom : batchCharcValues[0].decimalValueFrom !== null ? batchCharcValues[0].decimalValueFrom : "";
                    return oCharcValue;
                } else
                    return "";
            } else return "";

        }
    };
});
