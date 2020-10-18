// https://github.com/marcelrv/openhab2/blob/miio-plughmi/bundles/org.openhab.binding.miio/src/main/resources/database/chuangmi.plug.v2.json
// Also seems to support temperature:  https://github.com/rytilahti/python-miio/blob/master/miio/chuangmi_plug.py#L27

const Plug = require('./plug');

module.exports = class ChuangmiPlugV2 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.v2';
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

                        usb_power: {
                                get: {
                                        key: 'usb_on',
                                },

                                set: (value) => {
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
