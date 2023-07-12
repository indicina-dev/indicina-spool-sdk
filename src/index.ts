interface IPopupSDK {
    openPopup: (widgetUrl: string, customerIdentifier: string) => void;
    closePopup: () => void;
}

const PopupSDK: IPopupSDK = (() => {
    let overlayElement: HTMLDivElement | null = null;
    let iframeElement: HTMLIFrameElement | null = null;

    function handlePopupMessage(event: MessageEvent): void {
        if (event.data === 'closePopup') {
            closePopup();
        }
    }

    function openPopup(widgetUrl: string, customerIdentifier: string): void {
        overlayElement = document.createElement('div');
        overlayElement.style.position = 'fixed';
        overlayElement.style.top = '0';
        overlayElement.style.left = '0';
        overlayElement.style.width = '100%';
        overlayElement.style.height = '100%';
        overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.body.appendChild(overlayElement);

        iframeElement = document.createElement('iframe');
        iframeElement.src = `${widgetUrl}?customer-identifier=${customerIdentifier}`;
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

    return {
        openPopup,
        closePopup,
    };
})();

module.exports = PopupSDK

// Usage example
PopupSDK.openPopup(
    'https://www.example.com/widget',
    'spool@gmail.com',
);
// Close the popup after 5 seconds
setTimeout(() => {
    PopupSDK.closePopup();
}, 5000);
