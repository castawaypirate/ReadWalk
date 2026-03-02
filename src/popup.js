document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('mouse-toggle');

    browser.storage.local.get('mouseModeEnabled').then((result) => {
        toggle.checked = result.mouseModeEnabled || false;
    }).catch(() => {
        toggle.checked = false;
    });

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                if (tabs[0]) {
                    browser.tabs.sendMessage(tabs[0].id, { action: 'checkVisualMode' }).then((response) => {
                        if (response && response.isVisual) {
                            browser.runtime.sendMessage({
                                type: 'showNotification',
                                message: 'Cannot enable Mouse Mode while Visual Mode is active. Please exit Visual Mode first.'
                            });
                            toggle.checked = false;
                        } else {
                            browser.storage.local.set({ mouseModeEnabled: true });
                        }
                    }).catch(() => {
                        browser.storage.local.set({ mouseModeEnabled: toggle.checked });
                    });
                }
            });
        } else {
            browser.storage.local.set({ mouseModeEnabled: false });
        }
    });
});
