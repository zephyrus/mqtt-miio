const Plug = require('./plug');

module.exports = class ChuangmiPlugM1 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'M1';
	}

};
