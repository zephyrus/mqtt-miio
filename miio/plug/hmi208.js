const ChuangmiPlugV3FW = require('./v3fw');

module.exports = class ChuangmiPlugHmi208 extends ChuangmiPlugV3FW {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.hmi208';
	}

};
