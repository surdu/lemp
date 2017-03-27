var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModule = require("ui/frame");
var appSettings = require("application-settings");

var bt = require("nativescript-bluetooth");

var pageData = new observableModule.fromObject({
	devices: new ObservableArray([]),
	scanTextBtn: "Scan"
});

var scanning = false;

function scan() {
	if (!scanning) {
		scanning = true;
		pageData.set("scanTextBtn", "Stop scanning");
		while (pageData.devices.length > 0) {
			pageData.devices.pop();
		}

		bt.startScanning({
			serviceUUIDs: [],
			seconds: 60,
			onDiscovered: function (device) {
				pageData.devices.push(device)
			}
		}).then(function() {
			pageData.set("scanTextBtn", "Scan");
		})
		.catch(function (err) {
			console.log("error while scanning: " + err);
			pageData.set("scanTextBtn", "Scan");
		});
	}
	else {
		scanning = false;
		bt.stopScanning().then(function() {
			pageData.set("scanTextBtn", "Scan");
		});
	}
}

function connect(args) {
	var device = args.object.bindingContext;

	appSettings.setString("lempUUID", device.UUID);
	var topmost = frameModule.topmost();
	topmost.navigate("views/main/main");
}

module.exports = {
	loaded: function(args) {
		var page = args.object;
		page.bindingContext = pageData;
	},
	scan: scan,
	connect: connect
}
