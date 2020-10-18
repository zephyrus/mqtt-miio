const Plug = require('./plug');

module.exports = class ChuangmiPlugHmi205 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.hmi206';
	}

	properties() {
		return {
			power: {
				get: {
					key: 'power',
					parse: (value) => (value === 'on' || value === true),
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

			wifi_led: {
				get: {
					key: 'wifi_led',
				},

                                set: {
                                        key: 'set_wifi_led',
                                        parse: (value) => (value ? 'on' : 'off'),
                                },			
			}
		};
	}

};
