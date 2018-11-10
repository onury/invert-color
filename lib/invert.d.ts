/**
 *  RGB object type with red, green and blue components.
 */
export declare type RGB = {
    r: number;
    g: number;
    b: number;
};
/**
 *  RGB list (array) type with red, green and blue components.
 */
export declare type RgbArray = [number, number, number];
/**
 *  Hexadecimal representation of a color.
 */
export declare type HexColor = string;
/**
 *  Color represented as hexadecimal value or as RGB object or list.
 */
export declare type Color = RGB | RgbArray | HexColor;
/**
 *  Interface for defining black and white colors; used to amplify the contrast
 *  of the color inversion.
 */
export interface BlackWhite {
    black: HexColor;
    white: HexColor;
    threshold?: number;
}
/**
 *  Generates inverted (opposite) version of the given color.
 *  @param {Color} color - Color to be inverted.
 *  @param {BlackWhite|boolean} [bw=false] - Whether to amplify the inversion to
 *  black or white. Provide an object to customize black/white colors.
 *  @returns {HexColor} - Hexadecimal representation of the inverted color.
 */
declare function invert(color: Color, bw?: BlackWhite | boolean): HexColor;
/**
 *  Utility methods to generate inverted version of a color.
 *  @namespace
 */
declare namespace invert {
    /**
     *  Generates inverted (opposite) version of the given color, as a RGB object.
     *  @alias invert.asRgbObject
     *  @param {Color} color - Color to be inverted.
     *  @param {BlackWhite|boolean} [bw] - Whether to amplify the inversion to
     *  black or white. Provide an object to customize black/white colors.
     *  @returns {RGB} - RGB object representation of the inverted color.
     */
    function asRGB(color: Color, bw?: BlackWhite | boolean): RGB;
    /**
     *  Generates inverted (opposite) version of the given color, as a RGB array.
     *  @param {Color} color - Color to be inverted.
     *  @param {BlackWhite|boolean} [bw] - Whether to amplify the inversion to
     *  black or white. Provide an object to customize black/white colors.
     *  @returns {RGB} - RGB array representation of the inverted color.
     */
    function asRgbArray(color: Color, bw?: BlackWhite | boolean): RgbArray;
    /**
     *  Default luminance threshold used for amplifying inversion to black and
     *  white.
     *  @type {number}
     */
    const defaultThreshold: number;
    /**
     *  Alias of `.asRGB()`
     */
    const asRgbObject: typeof asRGB;
}
export default invert;
