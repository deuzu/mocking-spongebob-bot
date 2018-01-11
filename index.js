const run = () => {
    if (!shouldMock()) {
        return;
    }

    mock();
};

const shouldMock = () => {
    return true;
};

const mock = () => {
    const messageToMock = getLastMessage();
    const mockingMessage = mockMessage($messageToMock);
    const options = {};

    sendMessage($mockingMessage, $options);
};

const mockMessage = message => {
    const mockedCharacters = message.split('').map(character => {
        const random = Math.floor((Math.random() * 2)); // 0 or 1

        return 1 === random ? character.toUpperCase() : character;
    });

    return mockedCharacters.join('');
};

const testMessage = mockMessage('test');
