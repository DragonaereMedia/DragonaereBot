
const MusicInteraction = require('../../abstract/MusicInteraction.js');
const MusicDispatcher = require('../../modules/MusicDispatcher.js');
const { MessageEmbed } = require('discord.js');

class Queue extends MusicInteraction {
    get name() {
        return 'queue';
    }

    get description() {
        return 'Shows the current queue for this guild!';
    }

    get playerCheck() {
        return { voice: false, dispatcher: true, channel: false };
    }

    async run({ interaction, dispatcher }) {
        const queue = dispatcher.queue.length > 9 ? dispatcher.queue.slice(0, 9) : dispatcher.queue;
        const embed = new MessageEmbed()
            .setColor(this.client.color)
            .setTitle('Now Playing')
            .setThumbnail(`https://img.youtube.com/vi/${dispatcher.current.info.identifier}/default.jpg`)
            .setDescription(`[${dispatcher.current.info.title}](${dispatcher.current.info.uri}) [${MusicDispatcher.humanizeTime(dispatcher.current.info.length)}]`)
            .setFooter(`• ${dispatcher.queue.length} total songs in queue`);
        if (queue.length) embed.addField('Up Next', queue.map((track, index) => `**${index + 1}.)** \`${track.info.title}\``).join('\n'));
        await interaction.reply({ embeds: [ embed ] });
    }
}
module.exports = Queue;