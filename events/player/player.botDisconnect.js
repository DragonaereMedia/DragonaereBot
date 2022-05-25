module.exports = {
  name: "botDisconnect",
  execute(client, queue) {
    return client.say.queueMessage(queue, "Music has been stopped as I was disconnected from the voice channel.", "RED");
  }
};