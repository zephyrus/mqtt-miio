const Plug = require('./plug');

module.exports = class ChuangmiPlugHmi205 extends Plug {

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'HMI205';
	}

};
