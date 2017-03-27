var bt = require("nativescript-bluetooth");
var appSettings = require("application-settings");

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();
var loaderOptions = {
	message: 'Connecting...',
	android: {
		indeterminate: true,
		cancelable: false
	}
};

var device;

function init(args) {
	var deviceUUID = appSettings.getString("lempUUID");

	loader.show(loaderOptions);

	bt.connect({
		UUID: deviceUUID,
		onConnected: function (peripheral) {
			loader.hide();
			device = peripheral;
		},
		onDisconnected: function (peripheral) {
			loader.hide();
			console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
		}
	});
}

function turnOn() {
	bt.write({
		peripheralUUID: device.UUID,
		serviceUUID: '2600',
		characteristicUUID: '2A58',
		value: '0x255'
	});
}

function turnOff() {
	bt.write({
		peripheralUUID: device.UUID,
		serviceUUID: '2600',
		characteristicUUID: '2A58',
		value: '0x00'
	});

}

module.exports = {
	loaded: init,
	turnOn: turnOn,
	turnOff: turnOff
}
