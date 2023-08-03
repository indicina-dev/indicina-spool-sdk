interface IPopupSDK {
    openPopup: (widgetUrl: string, customerIdentifier: string) => void;
    closePopup: () => void;
    onComplete: (callback: (result: string) => void) => void;
}
declare const PopupSDK: IPopupSDK;
