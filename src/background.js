'use strict';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'showNotification') {
        browser.notifications.create({
            type: 'basic',
            title: 'ReadWalk',
            message: message.message
        });
    }
});
