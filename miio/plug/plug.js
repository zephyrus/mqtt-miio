const { Device } = require('../device');

module.exports = class Plug extends Device {

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
			temperature: {
				get: {
					key: 'temperature',
				},
			},
		};
	}

};
