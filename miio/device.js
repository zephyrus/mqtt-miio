const { EventEmitter } = require('events');
const { State } = require('../state');

class Device extends EventEmitter {

	constructor(platform, proto) {
		super();

		this.id = proto.handle.api.id;

		this.proto = proto;
		this.platform = platform;

		this.queue = Promise.resolve();

		this.state = new State();

		this.status = new State({
			online: true,
		});

		this.info = {
			manufacturer: this.manufacturer(),
			model: this.model(),
		};

		this.state.on('change', (...args) => this.emit('state', ...args));
		this.status.on('change', (...args) => this.emit('status', ...args));

		this.proto.updatePollDuration(this.polling());

		this.proto.propertyUpdated = (prop, value, prev) => {
			this.emit(`update:${prop}`, value, prev);
		};

		const properties = this.properties();

		Object.keys(properties).forEach((name) => {
			const property = properties[name];

			if (property.get) {
				this.proto.defineProperty(property.get.key, {
					name,
					mapper: property.get.parse,
				});

				const target = property.set
					? 'state'
					: 'status';

				this.on(`update:${name}`, (value) => {
					this[target].merge({ [name]: value });
				});
			}

			if (property.call) {
				this.queue = this.queue
					.then(() => this.proto.call(property.call.key))
					.then((result) => (typeof property.call.parse === 'function'
						? property.call.parse(result[0])
						: result[0]))
					.then((value) => this.status.merge({ [name]: value }));
			}

			if (property.listen) {
				const target = property.set
					? 'state'
					: 'status';

				const set = (value) => this[target].merge({
					[name]: typeof property.listen.parse === 'function'
						? property.listen.parse(value)
						: value,
				});

				set(this.proto.property(property.listen.key));

				this.on(`update:${property.listen.key}`, (value) => set(value));
			}

			if (property.set) {
				this.on(`set:${name}`, (value) => {
					if (typeof property.set === 'function') {
						const call = property.set(value)

						if (!call) return;

						this.queue = this.queue
							.then(() => this.proto.call(call.call, call.args))

						return;
					}

					const set = typeof property.set.parse === 'function'
						? property.set.parse(value)
						: value;

					this.queue = this.queue
						.then(() => this.proto.call(property.set.key, [set]))
						.then((result) => {
							if (!result || result[0] !== 'ok') return;
							this.state.merge({ [name]: value });
						})
						.catch((e) => this.emit('error', e));
				});
			}
		});
	}

	properties() {
		return {};
	}

	polling() {
		return 5000;
	}

	manufacturer() {
		return 'Xiaomi';
	}

	model() {
		return 'Generic';
	}

	init() {
		// make sure we've polled all props on init
		return this.refresh();
	}

	refresh() {
		this.queue = this.queue
			.then(() =>this.proto.poll())
			.catch((e) => this.emit('error', e));

		return this.queue;
	}

	set(data) {
		Object.keys(data).forEach((key) => {
			this.emit(`set:${key}`, data[key]);
		});
	}

}

module.exports = { Device };
