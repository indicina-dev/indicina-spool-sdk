interface IndicinaSpool {
    openPopup: (widgetUrl: string, customerIdentifier?: string) => void;
    closePopup: () => void;
    onComplete: (callback: (result: string) => void) => void;
}
declare const IndicinaSpool: IIndicinaSpool;
