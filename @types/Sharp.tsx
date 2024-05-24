export namespace Sharp {
    export interface OutputInfo {
        name: string;
        format: string;
        size: number;
        width: number;
        height: number;
        channels: 1 | 2 | 3 | 4;
        /** indicating if premultiplication was used */
        premultiplied: boolean;
        /** Only defined when using a crop strategy */
        cropOffsetLeft?: number | undefined;
        /** Only defined when using a crop strategy */
        cropOffsetTop?: number | undefined;
        /** Only defined when using a trim method */
        trimOffsetLeft?: number | undefined;
        /** Only defined when using a trim method */
        trimOffsetTop?: number | undefined;
        /** DPI the font was rendered at, only defined when using `text` input */
        textAutofitDpi?: number | undefined;
        /** When using the attention crop strategy, the focal point of the cropped region */
        attentionX?: number | undefined;
        attentionY?: number | undefined;
    }
}
