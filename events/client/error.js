module.exports = {
  name: "error",
  execute(client, error) {
    return client.utils.sendErrorLog(client, error, "error");
  }
};