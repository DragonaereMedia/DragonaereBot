
const MusicInteraction = require('../../abstract/MusicInteraction.js');

class Pause extends MusicInteraction {
    get name() {
        return 'resume';
    }

    get description() {
        return 'Resumes the current playback!';
    }

    get playerCheck() {
        return { voice: true, dispatcher: true, channel: true };
    }

    async run({ interaction, dispatcher }) {
        dispatcher.player.setPaused(false);
        await interaction.reply('Teitoku, I resumed the playback in this guild!');
    }
}
module.exports = Pause;