const ChuangmiPlugM1 = require('./m1');

module.exports = class ChuangmiPlugM3 extends ChuangmiPlugM1 {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'chuangmi.plug.m3';
	}

};
