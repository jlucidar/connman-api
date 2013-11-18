var ConnMan = require('../');
var async = require('async');

var connman = new ConnMan();
connman.init(function() {

	var wifi = connman.technologies['WiFi'];

	// Powered
	wifi.setProperty('Powered', true, function() {

		// Getting available connections
		wifi.getServices(function(err, services) {

			async.eachSeries(Object.keys(services), function(serviceName, next) {

				connman.getConnection(serviceName, function(err, conn) {

					// Establish a connection
					conn.connect(function(err) {
						next();
					});
					
				});
			}, function() {
				console.log('Enabled');
				process.exit();
			});
		});
	});
});
