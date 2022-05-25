const glob = require("glob");
module.exports = async function loadCommands(client) {
  const commandFiles = glob.sync("./commands/**/*.js");

  client.logger.info("COMMANDS", `Loading ${commandFiles.length} commands... (This may take a while)`)

  for await (const file of commandFiles) {
    const command = require(`../${file}`);

    if (!command.name) {
      throw new TypeError(`[ERROR] name is required for commands! (${file})`);
    }

    if (!command.execute) {
      throw new TypeError(
        `[ERROR] execute function is required for commands! (${file})`
      );
    }

    if (!command.category) {
      client.logger.warn("[COMMANDS]", `${command.name} command will not be shown in the help command because no category is set.`);
    }

    const data = {
      name: command.name,
      description: command?.description ?? "Empty description",
      options: command?.options ?? []
    };

    
    const cmd = client.application?.commands.cache.find((c) => c.name === command.name);
    if (!cmd) {
      await client.application?.commands.create(data);
    }

    client.logger.debug(`CMD DEBUG`, `Loaded ${command.name}.js`);

    delete require.cache[require.resolve(`../${file}`)];
    client.commands.set(command.name, command);
  }
};