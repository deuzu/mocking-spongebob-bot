const { getMessageToMock, sendMessage } = require('./clients/slack');
const { shouldMock, validateMessage, mockMessage } = require('./mock');

let timeToMock = new Date('2017-01-01');
let lastMockedDate = new Date('2017-01-01');

const run = () => new Promise(async (resolve, reject) => {
  init();

  if (!shouldMock(lastMockedDate, timeToMock)) {
    resolve(`It's not time to mock. We will mock at ${timeToMock}`);

    return;
  }

  const messageToMock = await getMessageToMock();

  if (!validateMessage(messageToMock)) {
    refreshTimeToMock();
    resolve(`Message to mock is not valid: ${messageToMock}. Mocking later at ${timeToMock}...`);

    return;
  }

  const mockingMessage = mockMessage(messageToMock);
  const options = {};

  sendMessage(mockingMessage, options).then(() => {
    lastMockedDate = new Date();
    resolve(`Mocking bot finished its job. It said: ${mockingMessage}. Sleeping now...`);
  });
});

const init = () => {
  const now = new Date();
  const timeToMockIsPast = now > timeToMock;

  if (!timeToMockIsPast) {
    return;
  }

  const start = new Date();
  const end = new Date();
  start.setUTCHours(8, 30, 0, 0);
  end.setUTCHours(22, 30, 0, 0);

  const timeInRange = now > start && now < end;

  if (!timeInRange) {
    return;
  }

  timeToMock = getRandomTime();
  console.log(`Time to mock initialized at ${timeToMock}`);
};

const getRandomTime = () => {
  const start = new Date();
  const end = new Date();

  end.setUTCHours(17, 30, 0, 0);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const refreshTimeToMock = () => timeToMock.setMinutes((new Date().getMinutes()) + 1);

const getTimeout = (timeout) => (
  new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  })
);

const loop = () => {
  Promise.all([run(), getTimeout(5000)])
    .then(values => {
      console.log(values[0]);
      loop();
    })
    .catch(error => {
      console.log(error);
      loop();
    })
  ;
};

loop();
