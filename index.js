const { connect } = require('mqtt');
const { config } = require('./config');
const { version } = require('./package');
const { Platform } = require('./miio');

const topics = {
	platform: () => `${config.mqtt.path}/state`,
	device: () => `${config.mqtt.path}/device`,
	info: (id) => `${config.mqtt.path}/${id}`,
	status: (id) => `${config.mqtt.path}/${id}/status`,
	state: (id) => `${config.mqtt.path}/${id}/state`,
	set: (id) => `${config.mqtt.path}/${id}/set`,
};

const mqtt = connect(config.mqtt.host, {
	username: config.mqtt.username,
	password: config.mqtt.password,
	clientId: config.mqtt.id,
	will: {
		topic: topics.platform(),
		payload: JSON.stringify({ online: false }),
		retain: true,
	},
});

const miio = new Platform(config.miio);

const format = (type, args) => [
	`[${type.toUpperCase()}]`,
	...args,
].join(' ');

const log = (type, ...args) => console.log(format(type, args));

const error = (type, ...args) => console.error(format(type, args));

mqtt.on('connect', () => {
	log('mqtt', `connected to ${config.mqtt.host}`);

	mqtt.subscribe(`${config.mqtt.path}/+/+`);

	mqtt.publish(topics.platform(), JSON.stringify({
		online: true,
		version,
	}), { retain: true });
});

miio.on('device', (device) => {
	log('miio', `registed device at ${topics.info(device.id)}`);
	log('miio', `  > ${JSON.stringify(device.info)}`);

	// const topic = topics.set(device.id);
	// mqtt.subscribe(topic);
	// subsciptions[topic] = device;

	mqtt.publish(topics.device(), JSON.stringify(device.info), {
		retain: true,
	});

	mqtt.publish(topics.info(device.id), JSON.stringify(device.info), {
		retain: true,
	});
});

miio.on('state', (device) => {
	const state = device.state.get();

	log('miio', `received state update for ${topics.info(device.id)}`);
	log('miio', `  > ${JSON.stringify(state)}`);

	mqtt.publish(topics.state(device.id), JSON.stringify(state), {
		retain: true,
	});
});

miio.on('status', (device) => {
	const status = device.status.get();

	log('miio', `received status update for ${topics.info(device.id)}`);
	log('miio', `  > ${JSON.stringify(status)}`);

	mqtt.publish(topics.status(device.id), JSON.stringify(status), {
		retain: true,
	});
});

mqtt.on('message', (topic, data) => {
	const path = topic.split('/');

	if (path.shift() !== config.mqtt.path) return;

	const device = miio.device(path.shift());

	if (!device) return;

	const method = path.shift();

	if (typeof device[method] !== 'function') return;

	try {
		const payload = data.toString();

		log('mqtt', `received data for ${topic}`);

		if (payload.length) log('mqtt', `  > ${payload}`);

		device[method](payload.length ? JSON.parse(payload) : undefined);
	} catch (e) {
		error('mqtt', 'not able to parse incoming message');
		console.log(e);
	}
});

mqtt.on('error', (e) => {
	error('mqtt', 'error');
	error('mqtt', `  > ${e.toString()}`);
});

miio.on('error', (device, e) => {
	error('miio', `device #${device.id} error`);
	error('miio', `  > ${e.toString()}`);
});
