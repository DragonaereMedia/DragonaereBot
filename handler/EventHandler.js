const glob = require("glob");

module.exports = function loadEvents(client) {
  const eventFiles = glob.sync("./events/**/*.js");
  client.logger.info("EVENTS", `Loading ${eventFiles.length} events...`);
  
  eventFiles.forEach((file) => {
    const event = require(`../${file}`);

    let type = "client";
    if (file.includes("player.")) type = "player";

    if (!event.execute) {
      throw new TypeError(`[ERROR] execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR] name is required for events! (${file})`);
    }

    
    if (type === "player") {
      client.player.on(event.name, event.execute.bind(null, client));
    } else if (event.once) {
      client.once(event.name, event.execute.bind(null, client));
    } else {
      client.on(event.name, event.execute.bind(null, client));
    }

    delete require.cache[require.resolve(`../${file}`)];

    client.logger.debug(`EVT DEBUG`, `Loaded ${event.name}.js`);

  });
};