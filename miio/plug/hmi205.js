const ChuangmiPlugM1 = require('./m1');

module.exports = class ChuangmiPlugHmi205 extends ChuangmiPlugM1 {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.hmi205';
	}

};
