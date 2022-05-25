module.exports = {
  name: "connectionError",
  execute(client, queue, error) {
    client.utils.sendErrorLog(client, error, "error");

    return client.say.queueMessage(queue, `An error occurred while playing.\nReason: ${error.message}`, "RED");
  }
};