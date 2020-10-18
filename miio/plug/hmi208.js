const Plug = require('./plug');

module.exports = class ChuangmiPlugHmi208 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'HMI208';
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

                        usb_power: {
                                get: {
                                        key: 'usb_on',
                                        parse: (value) => value === 'on',
                                },

                                set: {
                                        key: 'set_usb_on',
					if (value === 'on') return { call: 'set_usb_on', args: [] };
                                        if (value === 'off') return { call: 'set_usb_off', args: [] };
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
