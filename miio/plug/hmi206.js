const ChuangmiPlugM1 = require('./m1');

module.exports = class ChuangmiPlugHmi206 extends ChuangmiPlugM1 {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'HMI206';
	}

};
