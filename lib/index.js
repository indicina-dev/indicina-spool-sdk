const PopupSDK = (() => {
    let overlayElement = null;
    let iframeElement = null;
    let onCompleteCallback = null;

    function handlePopupMessage(event) {
        if (event.data === 'closePopup') {
            closePopup();
        } else if (onCompleteCallback) {
            onCompleteCallback(event.data);
        }
    }

    function openPopup(widgetUrl, customerIdentifier) {
        if (typeof widgetUrl !== 'string' || typeof customerIdentifier !== 'string') {
            throw new Error('widgetUrl and customerIdentifier must be strings.');
        }

        const url = new URL(widgetUrl);
        if (url.search) {
            url.search += `&customer-identifier=${encodeURIComponent(customerIdentifier)}`;
        } else {
            url.search = `?customer-identifier=${encodeURIComponent(customerIdentifier)}`;
        }

        overlayElement = document.createElement('div');
        overlayElement.style.position = 'fixed';
        overlayElement.style.top = '0';
        overlayElement.style.left = '0';
        overlayElement.style.width = '100%';
        overlayElement.style.height = '100%';
        overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.appendChild(overlayElement);

        iframeElement = document.createElement('iframe');
        iframeElement.src = url.toString();
        iframeElement.style.position = 'fixed';
        iframeElement.style.top = '50%';
        iframeElement.style.left = '50%';
        iframeElement.style.transform = 'translate(-50%, -50%)';
        iframeElement.style.width = '30%';
        iframeElement.style.height = '90%';
        iframeElement.style.border = 'none';
        iframeElement.style.transition = 'opacity 0.2s ease 0s';
        overlayElement.appendChild(iframeElement);

        window.addEventListener('message', handlePopupMessage);
    }

    function closePopup() {
        if (overlayElement) {
            document.body.removeChild(overlayElement);
            overlayElement = null;
        }

        window.removeEventListener('message', handlePopupMessage);
    }

    function onComplete(callback) {
        onCompleteCallback = callback;
    }

    return {
        openPopup,
        closePopup,
        onComplete,
    };
})();

module.exports = PopupSDK;
