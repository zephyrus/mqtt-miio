const Plug = require('./plug');

module.exports = class ChuangmiPlugHmi206 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'HMI206';
	}

};
