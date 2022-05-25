module.exports = {
  name: "tracksAdd",
  execute(client, queue, tracks) {
    return client.say.queueMessage(queue, `Enqueued ${tracks.length} tracks.`);
  }
};