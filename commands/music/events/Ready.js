const MusicEvent = require('../abstract/MusicEvent.js');

class Ready extends MusicEvent {
    get name() {
        return 'ready';
    }

    get once() {
        return true;
    }

    async run() {
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${this.client.guilds.cache.size} guild(s) with ${this.client.users.cache.size} user(s)`);
        if (!this.interval) {
            await this.client.user.setActivity('Dragonare by Dragonaere');
        }
    }
}
module.exports = Ready;
