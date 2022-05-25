module.exports = {
  name: "channelEmpty",
  execute(client, queue) {
    return client.say.queueMessage(queue, "I have left the voice channel as I was left alone.");
  }
};