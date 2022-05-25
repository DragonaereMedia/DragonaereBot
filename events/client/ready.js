module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    //initializing commands
    require("../../handler/CommandHandler")(client);

    const formatNum = client.utils.formatNumber;

    const serverCount = formatNum(client.guilds.cache.size);
    const channelCount = formatNum(client.channels.cache.size);
    const userCount = formatNum(
      client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    );

    const statuses = [
      { "name": `${serverCount} servers & ${userCount} users and ${channelCount} channels`, "type": "WATCHING" },
      { "name": "\/play", "type": "LISTENING" },
      { "name": "\/help", "type": "PLAYING" }
    ];

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status.name, { type: status.type });
    }, 60000);
  }
};