
// fetch a fake micromarket 4 digit pin from the server, simulating a network request

export { fetchUserPin };

const fetchUserPin = (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPin = Math.floor(1000 + Math.random() * 9000).toString();
            resolve(newPin);
        }, 2000); // simulate network delay
    });
};