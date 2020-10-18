const Plug = require('./plug');

module.exports = class ChuangmiPlugM1 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'M1';
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
