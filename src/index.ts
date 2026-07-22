/**
 *  invert-color
 *  Generates the inverted (opposite) version of a given color.
 *  @author Onur Yıldırım <onur@cutepilot.com>
 *  @license MIT
 */

// ---------------------------------------------------------------------------
//  TYPES
// ---------------------------------------------------------------------------

/** RGB color as an object with red, green and blue components (`0`–`255`). */
export type RGB = {
  r: number;
  g: number;
  b: number;
};

/** RGB color as a `[red, green, blue]` tuple (`0`–`255`). */
export type RgbArray = [number, number, number];

/** Hexadecimal color string, with or without a leading `#` (`'#282b35'`, `'fff'`). */
export type HexColor = string;

/** A color expressed as a {@link HexColor}, {@link RgbArray} or {@link RGB} object. */
export type Color = RGB | RgbArray | HexColor;

/**
 *  Black/white pair (with an optional luminance threshold) used to amplify the
 *  inversion to a high-contrast color. Passed as the `bw` argument of
 *  {@link invert} and friends.
 */
export interface BlackWhite {
  /** Color returned for light sources. */
  black: HexColor;
  /** Color returned for dark sources. */
  white: HexColor;
  /**
   *  Relative-luminance cutoff (`0`–`1`) deciding black vs. white.
   *  Defaults to {@link invert.defaultThreshold}.
   */
  threshold?: number;
}

// ---------------------------------------------------------------------------
//  CONSTANTS
// ---------------------------------------------------------------------------

// WCAG-derived luminance midpoint (≈ 0.179) that best separates a color into
// "pair with black" vs. "pair with white". See https://stackoverflow.com/a/3943023
const DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;

const RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i;

const DEFAULT_BW: Required<BlackWhite> = {
  black: '#000000',
  white: '#ffffff',
  threshold: DEFAULT_THRESHOLD
};

// ---------------------------------------------------------------------------
//  HELPERS
// ---------------------------------------------------------------------------

/** Formats a channel value as a 2-digit hex pair (last 2 hex digits, matching legacy overflow behavior). */
function toHex(n: number): string {
  return n.toString(16).padStart(2, '0').slice(-2);
}

function hexToRgbArray(hex: HexColor): RgbArray {
  let h = hex.startsWith('#') ? hex.slice(1) : hex;
  if (!RE_HEX.test(h)) throw new Error(`Invalid HEX color: "${hex}"`);
  // Expand shorthand: #abc → #aabbcc.
  if (h.length === 3) h = h.replace(/./g, '$&$&');
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16)
  ];
}

function toRgbArray(color: Color): RgbArray {
  if (!color) throw new Error('Invalid color value');
  if (Array.isArray(color)) return color;
  return typeof color === 'string' ? hexToRgbArray(color) : [color.r, color.g, color.b];
}

function toRGB([r, g, b]: RgbArray): RGB {
  return { r, g, b };
}

// Per-channel WCAG relative luminance (linearized sRGB).
function channelLuminance(c: number): number {
  const x = c / 255;
  // Stryker disable next-line EqualityOperator: the sRGB knee (x = 0.03928) is unreachable for 0–255 channels, so `<` vs `<=` is an equivalent mutant.
  return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

function getLuminance([r, g, b]: RgbArray): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

// Amplifies to the high-contrast black/white color chosen by luminance.
function invertToBW(rgb: RgbArray, bw: BlackWhite | true, asArr?: boolean): RgbArray | HexColor {
  const { black, white, threshold = DEFAULT_THRESHOLD } = bw === true ? DEFAULT_BW : bw;
  const hex = getLuminance(rgb) > threshold ? black : white;
  return asArr ? hexToRgbArray(hex) : hex;
}

function invertToArray(color: Color, bw?: BlackWhite | boolean): RgbArray {
  const rgb = toRgbArray(color);
  return bw ? (invertToBW(rgb, bw, true) as RgbArray) : (rgb.map((c) => 255 - c) as RgbArray);
}

// ---------------------------------------------------------------------------
//  PUBLIC API
// ---------------------------------------------------------------------------

/**
 *  Generates the inverted (opposite) version of the given color.
 *  @param color - Color to invert, as a HEX string, RGB array or RGB object.
 *  @param bw - When truthy, amplifies the result to black or white (per the
 *  source luminance) for maximum contrast. Pass a {@link BlackWhite} object to
 *  customize the two colors and/or the luminance `threshold`.
 *  @returns The inverted color as a HEX string.
 *  @example
 *  ```ts
 *  invert('#282b35');                          // → '#d7d4ca'
 *  invert([69, 191, 189]);                     // → '#ba4042'
 *  invert({ r: 249, g: 119, b: 121 });         // → '#068886'
 *  invert('#282b35', true);                    // → '#ffffff'  (amplified)
 *  invert('#282b35', { black: '#111', white: '#eee' });  // → '#eeeeee'
 *  ```
 */
function invert(color: Color, bw: BlackWhite | boolean = false): HexColor {
  const rgb = toRgbArray(color);
  if (bw) return invertToBW(rgb, bw) as HexColor;
  return `#${rgb.map((c) => toHex(255 - c)).join('')}`;
}

/**
 *  Inverts the given color and returns it as an RGB object.
 *  @param color - Color to invert.
 *  @param bw - See {@link invert}'s `bw` argument.
 *  @returns The inverted color as an `{ r, g, b }` object.
 *  @example
 *  ```ts
 *  invert.asRGB('#ffffff');   // → { r: 0, g: 0, b: 0 }
 *  ```
 */
invert.asRGB = (color: Color, bw?: BlackWhite | boolean): RGB => toRGB(invertToArray(color, bw));

/**
 *  Inverts the given color and returns it as an RGB array.
 *  @param color - Color to invert.
 *  @param bw - See {@link invert}'s `bw` argument.
 *  @returns The inverted color as a `[r, g, b]` tuple.
 *  @example
 *  ```ts
 *  invert.asRgbArray('#000000');   // → [255, 255, 255]
 *  ```
 */
invert.asRgbArray = (color: Color, bw?: BlackWhite | boolean): RgbArray => invertToArray(color, bw);

/** Alias of {@link invert.asRGB}. */
invert.asRgbObject = invert.asRGB;

/** Default relative-luminance threshold (≈ `0.179`) used to amplify to black or white. */
invert.defaultThreshold = DEFAULT_THRESHOLD;

export default invert;
export { invert };
