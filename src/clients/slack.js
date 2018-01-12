const SlackWebClient = require('@slack/client').WebClient;
const slackClient = new SlackWebClient('REDACTEDLOL');

const channelName = 'piscine'; // todo
const historyOptions = { count: 50 };

const getChannelId = channelName => (
  new Promise((resolve, reject) => {
      slackClient.channels.list(function(error, res) {
          if (error) {
              reject(`Failed to retrieve channel list.`);
          }

          res.channels.forEach(channel => {
              if (channelName === channel.name) {
                  resolve(channel.id);

                  return;
              }
          });

          reject(`No channel found with the name ${channelName}.`);
      });
  })
);

const getMessageToMock = () => (
  new Promise(async (resolve, reject) => {
    const channelId = await getChannelId(channelName);

    slackClient.channels.history(channelId, historyOptions, (error, res) => {
      if (error) {
        reject(`Failed to retrieve channel history for ${channel}: ${channelId}.`);
      }

      res.messages.forEach(message => {
        if (!message.subtype) {
          resolve(message.text);
        }
      });
    });
  })
);

const sendMessage = (message, options) => new Promise((resolve, reject) => {
  console.log(message);
  resolve(message);
});

module.exports = {
  getMessageToMock,
  sendMessage,
};
