// https://github.com/marcelrv/openhab2/blob/miio-plughmi/bundles/org.openhab.binding.miio/src/main/resources/database/chuangmi.plug.v1.json
// Seems to also support temperature: https://github.com/syssi/xiaomiplug

const Plug = require('./plug');

module.exports = class ChuangmiPlugV1 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.v1';
	}

	properties() {
		return {
			power: {
				get: {
					key: 'power',
					parse: (value) => value === 'on',
				},

				set: (value) => {
					if (value) return { call: 'set_on', args: [] }
                                        else return { call: 'set_off', args: [] };
				},
			},

                        usb_power: {
                                get: {
                                        key: 'usb_on',
                                },

                                set: (value) => {
                                        if (value) return { call: 'set_usb_on', args: [] }
                                        else return { call: 'set_usb_off', args: [] };
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
