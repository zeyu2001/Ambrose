const getScriptType = () => {
    // eslint-disable-next-line no-restricted-globals
    if (chrome && chrome.runtime && chrome.runtime.getURL('static/js/background.js') === location.href) {
        return 'BACKGROUND';
    // eslint-disable-next-line no-restricted-globals
    } else if (chrome && chrome.runtime && chrome.runtime.getURL('index.html') === location.href) {
        return 'POPUP';
    // eslint-disable-next-line no-restricted-globals
    } else if (chrome && chrome.runtime) {
        return 'CONTENT';
    } else {
        return 'WEB';
    }
}

export { getScriptType };