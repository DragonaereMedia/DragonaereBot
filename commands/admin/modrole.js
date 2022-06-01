const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'dragonaerebot',
  keyFilename: 'dragonaerebot-firebase-adminsdk-g1ing-09bedfd2c3.json',
});

module.exports = {
    name: "modrole",
    description: "set or change the mod role",
    category: "admin",
    adminOnly: true,
    options: [{
        name: "role",
        description: "Select the Mod Role",
        type: "ROLE",
        required: true
    }],
    async execute(client, interaction) {
        const setGuildModRole = db.collection('guilds').doc(interaction.guild.id);
        const modRole = interaction.options.getRole('role');

        await setGuildModRole.set({'modRoleId': modRole.id}, { merge: true });

        await client.say.successMessage(interaction, `Set ${modRole.name} as the Mod Role`, true);
    }
};