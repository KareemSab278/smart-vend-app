

// fake a fetch for receiving a 6 digit pin from the server
export { fetchNewPayPin };

const fetchNewPayPin = (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPin = Math.floor(100000 + Math.random() * 900000).toString();
            resolve(newPin);
        }, 2000); // simulate network delay
    });
};