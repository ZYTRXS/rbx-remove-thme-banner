function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function waitForElementWithObserver(xpath, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            const element = getElementByXpath(xpath);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error("Timeout: Element not found."));
        }, timeout);
    });
}

window.onload = async function() {
    try {
        const element = await waitForElementWithObserver('//*[@id="place-list"]/div/div/div[2]/div/div');
        element.remove();
    } catch (error) {
        console.log("Couldn't find element.");
    }
};
