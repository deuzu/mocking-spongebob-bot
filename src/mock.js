
const hasMockedToday = lastMockedDate => {
  const now = new Date();

  return now.getDate() === lastMockedDate.getDate();
}

const isTimeToMock = timeToMock => {
  const now = new Date();

  return now.getHours() === timeToMock.getHours() && now.getMinutes() === timeToMock.getMinutes();
};

// const shouldMock = (lastMockedDate, timeToMock) => !hasMockedToday(lastMockedDate) && isTimeToMock(timeToMock);
const shouldMock = (lastMockedDate, timeToMock) => (true);

const validateMessage = message => message.length > 6 && message.length < 100;

const mockMessage = message => {
  const mockedCharacters = message.split('').map(character => {
    const random = Math.floor((Math.random() * 2)); // 0 or 1

    return 1 === random ? character.toUpperCase() : character;
  });

  return mockedCharacters.join('');
};

module.exports = {
  shouldMock,
  validateMessage,
  mockMessage,
};
