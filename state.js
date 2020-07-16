const { EventEmitter } = require('events');
const { merge, isEqual } = require('lodash');

class State extends EventEmitter {

	constructor(initial = {}) {
		super();

		this.data = initial;
	}

	get() {
		return merge({}, this.data);
	}

	set(data) {
		if (data === undefined) return;

		if (this.data === data) return;

		if (isEqual(this.data, data)) return;

		const prev = this.data;
		this.data = merge({}, data);

		this.emit('change', this.get(), prev);
	}

	merge(data) {
		this.set(merge({}, this.data, data));
	}

	link(state, convert = (data) => data) {
		const update = (data, prev) => state.set(convert(data, state.get(), prev));

		update(this.get());
		this.on('change', update);
	}

}

module.exports = { State };
