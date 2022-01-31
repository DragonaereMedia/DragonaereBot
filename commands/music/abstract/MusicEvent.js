const EventEmitter = require('events');

class MusicEvent extends  EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        if (this.constructor === MusicEvent) throw new TypeError('Abstract class "MusicEvent" cannot be instantiated directly.');
        if (this.name === undefined) throw new TypeError('Classes extending MusicEvent must have a getter "name"');
        if (this.once === undefined) throw new TypeError('Classes extending MusicEvent must have a getter "once"');
        if (this.run === undefined) throw new TypeError('Classes extending MusicEvent must implement an async function "run"');
        if (this.run.constructor.name !== 'AsyncFunction') throw new TypeError('Classes extending MusicEvent must implement "run" as async function');
        this.on('error', (error) => client.logger.error(error));
    }

    exec(...args) {
        this.run(...args)
            .catch(error => this.emit('error', error));
    }
}
module.exports = MusicEvent;
