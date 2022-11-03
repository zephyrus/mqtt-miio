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
	
	// plugs
	"chuangmi.plug.v1": require('./plug/v1'),
	"chuangmi.plug.v2": require('./plug/v2'),
	"chuangmi.plug.v3": require('./plug/v3'),
	"chuangmi.plug.v3fw": require('./plug/v3fw'),
	"chuangmi.plug.m1": require('./plug/m1'),
	"chuangmi.plug.m3": require('./plug/m3'),
	"chuangmi.plug.hmi205": require('./plug/hmi205'),
	"chuangmi.plug.hmi206": require('./plug/hmi206'),
	"chuangmi.plug.hmi208": require('./plug/hmi208'),
};
