
const MusicInteraction = require('../../abstract/MusicInteraction.js');

class Pause extends MusicInteraction {
    get name() {
        return 'pause';
    }

    get description() {
        return 'Pauses the current playback!';
    }

    get playerCheck() {
        return { voice: true, dispatcher: true, channel: true };
    }

    async run({ interaction, dispatcher }) {
        dispatcher.player.setPaused(true);
        await interaction.reply('Teitoku, I paused the playback in this guild!');
    }
}
module.exports = Pause;