import { getScriptType } from "../utils/scriptType";
import { populateQuizStorage, getQuizLastAttempted, setQuizLastAttempted } from "../utils/storage";

(() => {

    // Run as background script only
    if (getScriptType() !== 'BACKGROUND')
        return;

    populateQuizStorage();

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === 'quiz-completed') {
            console.log(`Quiz completed: ${request.quiz}`);
            setQuizLastAttempted(request.quiz, Date.now());
            sendResponse({ message: 'success' });
        }
    })

})();