module.exports = {
  name: "queueEnd",
  execute(client, queue) {
    return client.say.queueMessage(queue, "No more songs to play. Left the voice channel.");
  }
};