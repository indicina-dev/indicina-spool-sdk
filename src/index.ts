export {};

interface IIndicinaSpool {
    openPopup: (widgetUrl: string, customerIdentifier?: string) => void;
    closePopup: () => void;
    onComplete: (callback: (result: string) => void) => void;
}

const IndicinaSpool: IIndicinaSpool = (() => {
    let overlayElement: HTMLDivElement | null = null;
    let iframeElement: HTMLIFrameElement | null = null;
    let onCompleteCallback: ((result: string) => void) | null = null;

    function handlePopupMessage(event: MessageEvent): void {
        if (event.data === 'closePopup') {
            closePopup();
        } else if (onCompleteCallback) {
            onCompleteCallback(event.data);
        }
    }

    function openPopup(widgetUrl: string, customerIdentifier?: string): void {
        if (typeof widgetUrl !== 'string') {
            throw new Error('widgetUrl must be a string.');
        }

        const url = new URL(widgetUrl);
        if (customerIdentifier) {
            url.search += `&customer-identifier=${encodeURIComponent(customerIdentifier)}`;
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

    function closePopup(): void {
        if (overlayElement) {
            document.body.removeChild(overlayElement);
            overlayElement = null;
        }

        window.removeEventListener('message', handlePopupMessage);
    }

    function onComplete(callback: (result: string) => void): void {
        onCompleteCallback = callback;
    }

    return {
        openPopup,
        closePopup,
        onComplete,
    };
})();

module.exports = IndicinaSpool
