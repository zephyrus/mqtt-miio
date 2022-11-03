// https://github.com/marcelrv/openhab2/blob/miio-plughmi/bundles/org.openhab.binding.miio/src/main/resources/database/chuangmi.plug.v3fw.json

const Plug = require('./plug');

module.exports = class ChuangmiPlugV3FW extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.v3fw';
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
                                        if (value) return { call: 'set_usb_on', args: [] }
                                        else return { call: 'set_usb_off', args: [] };
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
