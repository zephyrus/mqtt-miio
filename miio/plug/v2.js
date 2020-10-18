const ChuangmiPlugM1 = require('./m1');

module.exports = class ChuangmiPlugV2 extends ChuangmiPlugM1 {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'V2';
	}

};
