/* eslint-disable global-require */
module.exports = {
	// humidifiers
	'zhimi.humidifier.cb1': require('./humidifier/cb1'),

	// vacuums
	'rockrobo.vacuum.v1': require('./vacuum/v1'),
	'roborock.vacuum.s5': require('./vacuum/s5'),
	'roborock.vacuum.s5e': require('./vacuum/s5e'),
	'roborock.vacuum.c1': require('./vacuum/c10'),
	"roborock.vacuum.s6": require('./vacuum/s6'),
	"roborock.vacuum.t6": require('./vacuum/v1'),
	"roborock.vacuum.e2": require('./vacuum/v1'),
	"roborock.vacuum.s4": require('./vacuum/v1'),
	"roborock.vacuum.a10": require('./vacuum/v1'),

	// light bulbs
	'philips.light.cbulb': require('./bulb/philips_cbulb')
};
