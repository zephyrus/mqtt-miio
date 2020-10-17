const Plug = require('./plug');

module.exports = class ChuangmiPlugV1 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'V1';
	}

};
