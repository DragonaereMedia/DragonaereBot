const MusicEvent = require('../abstract/MusicEvent.js');


class GuildCreate extends MusicEvent {
    get name() {
        return 'guildCreate';
    }

    get once() {
        return false;
    }

    async run(guild) {
        this.client.logger.log(this.constructor.name, `New guild => ${guild.name} with ${guild.memberCount} members`);
    }
}
module.exports = GuildCreate;
