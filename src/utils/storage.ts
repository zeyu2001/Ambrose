const quizData = require('../data/answers.json');

let defaultQuizState: { [key: string]: { [key: string]: number | null } } = {};
for (let quizName of Object.keys(quizData)) {
    defaultQuizState[quizName] = { lastAttempted: null };
}

const populateQuizStorage = async () => {
    const result = await chrome.storage.sync.get(['quizzes']);
    let toStore;
    if (result.quizzes === undefined) {
        toStore = defaultQuizState;
    } else {
        for (let quizName of Object.keys(defaultQuizState)) {
            if (!result.quizzes[quizName])
                result.quizzes[quizName] = defaultQuizState[quizName];
        }
        toStore = result.quizzes;
    }
    return await chrome.storage.sync.set({ quizzes: toStore });
}

const setQuizLastAttempted = async (quizName: string, lastAttempted: number) => {
    const result = await chrome.storage.sync.get(['quizzes']);
    result.quizzes[quizName].lastAttempted = lastAttempted;
    return await chrome.storage.sync.set({ quizzes: result.quizzes });
}

const getQuizLastAttempted = async (quizName: string) => {
    const result = await chrome.storage.sync.get(['quizzes']);
    return result.quizzes[quizName].lastAttempted;
}

const getAllQuizLastAttempted = async () => {
    const result = await chrome.storage.sync.get(['quizzes']);
    return result.quizzes;
}

export { populateQuizStorage, setQuizLastAttempted, getQuizLastAttempted, getAllQuizLastAttempted };