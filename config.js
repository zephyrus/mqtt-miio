module.exports.config = {

	mqtt: {
		host: process.env.MQTT_HOST,
		username: process.env.MQTT_USERNAME,
		password: process.env.MQTT_PASSWORD,
		id: process.env.MQTT_ID,
		path: process.env.MQTT_PATH || 'miio',
	},

	miio: Object.keys(process.env)
		.filter((name) => name.match(/^DEVICE_/))
		.map((name) => name.match(/^DEVICE_(\d+)/)[1])
		.reduce((result, id) => {
			result[id] = process.env[`DEVICE_${id}`];
			return result;
		}, {}),

};
