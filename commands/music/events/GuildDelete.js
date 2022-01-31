const MusicEvent = require('../abstract/MusicEvent.js');


class GuildDelete extends MusicEvent {
    get name() {
        return 'guildDelete';
    }

    get once() {
        return false;
    }

    async run(guild) {
        if (!guild.available) return;
        this.client.logger.log(this.constructor.name, `Removed guild => ${guild.name} with ${guild.memberCount} members`);
    }
}
module.exports = GuildDelete;
