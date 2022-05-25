module.exports = {
  name: "warn",
  execute(client, error) {
    return client.utils.sendErrorLog(client, error, "warning");
  }
};