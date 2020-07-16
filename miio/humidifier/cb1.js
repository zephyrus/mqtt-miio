const { Device } = require('../device');

module.exports = class ZhimiHumidifier extends Device {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'Humidifier';
	}

	polling() {
		return 1000;
	}

	init() {
		return Promise.all([
			this.refresh(),

			this.proto.call('miIO.info')
				.then((info) => {
					this.info = {
						...this.info,
						firmware: info.fw_ver,
					};
				})
				.catch((e) => this.emit('error', e)),
		]);
	}

	properties() {
		return {
			temperature: {
				get: {
					key: 'temperature',
				},
			},

			humidity: {
				get: {
					key: 'humidity',
				},
			},

			water: {
				get: {
					key: 'depth',
					parse: (value) => value / 1.2,
				},
			},

			power: {
				get: {
					key: 'power',
					parse: (value) => value === 'on',
				},

				set: {
					key: 'set_power',
					parse: (value) => (value ? 'on' : 'off'),
				},
			},

			target: {
				get: {
					key: 'limit_hum',
				},

				set: {
					key: 'set_limit_hum',
				},
			},

			mode: {
				get: {
					key: 'mode',
				},

				set: {
					key: 'set_mode',
				},
			},

			mute: {
				get: {
					key: 'buzzer',
					parse: (value) => value !== 'on',
				},

				set: {
					key: 'set_buzzer',
					parse: (value) => (value ? 'off' : 'on'),
				},
			},

			dry: {
				get: {
					key: 'dry',
					parse: (value) => value === 'on',
				},

				set: {
					key: 'set_dry',
					parse: (value) => (value ? 'on' : 'off'),
				},
			},

			lock: {
				get: {
					key: 'child_lock',
					parse: (value) => value === 'on',
				},

				set: {
					key: 'set_child_lock',
					parse: (value) => (value ? 'on' : 'off'),
				},
			},
		};
	}

};
