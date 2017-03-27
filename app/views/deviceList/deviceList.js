var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

var bt = require("nativescript-bluetooth");

var devices = new ObservableArray([]);

var pageData = new observableModule.fromObject({
	deviceList: devices
});

function scan() {
	console.log("Scanning...");
	devices.length = 0;
	bt.startScanning({
		serviceUUIDs: [],
		seconds: 60,
		onDiscovered: function (peripheral) {
			devices.push(peripheral)
			console.log("Periperhal found with UUID: " + peripheral.UUID);
		}
	}).then(function() {
		console.log("Scanning complete");
	}, function (err) {
		console.log("error while scanning: " + err);
	});
}

module.exports = {
	loaded: function(args) {
		var page = args.object;
		page.bindingContext = pageData;
	},
	scan: scan
}
