// https://github.com/marcelrv/openhab2/blob/751788024f787d94df7d8903df915b011ffed9d3/bundles/org.openhab.binding.miio/src/main/resources/database/philips.light.cbulb.json

const Bulb = require('./bulb');

module.exports = class PhilipsLightCbulb extends Bulb {

	manufacturer() {
		return 'Philips';
	}

	model() {
		return 'philips.light.cbulb';
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

			delay_off: {
                                set: {
                                        key: 'delay_off',
                                        // When set: lamp will start dimming down in X seconds
                                },
                        },

			brightness: {
				get: {
					key: 'bright',
				},

				set: {
                                        key: 'set_bright',
                                },
			},

			cct: {
			        // Correlated Color Temperature
				get: {
					key: 'cct',
				},

                                set: {
                                        key: 'set_cct',
                                        // range: 1882-7000
                                },			
			},

			scene: {
				get: {
					key: 'scene',
				},

                                set: {
                                        key: 'apply_fixed_scene',
                                        // range: 1-4 
                                },			
			},

                        cid: {
                                // Color
                                get: {
                                        key: 'cid',
                                },

                                set: {
                                        key: 'set_cid',
                                        // range: 0-360
                                },
                        },                        			
		};
	}

};
