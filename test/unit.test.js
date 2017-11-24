'use strict';

const invert = require('../dist/invert.js');

/**
 *  Test Suite
 */
describe('test: invert-color', () => {

    const A_BLACK = [0, 0, 0];
    const A_WHITE = [255, 255, 255];
    const O_BLACK = { r: 0, g: 0, b: 0 };
    const O_WHITE = { r: 255, g: 255, b: 255 };
    const CUSTOM_BLACK = '#303030';
    const CUSTOM_WHITE = '#fafafa';
    const A_CUSTOM_BLACK = [48, 48, 48];
    const O_CUSTOM_BLACK = { r: 48, g: 48, b: 48 };
    const A_CUSTOM_WHITE = [250, 250, 250];
    const O_CUSTOM_WHITE = { r: 250, g: 250, b: 250 };
    const CUSTOM_BW_COLORS = {
        black: CUSTOM_BLACK,
        white: CUSTOM_WHITE,
    };

    test('invert & match photoshop inverted colors', () => {
        //            ORIGINAL            PHOTOSHOP
        //            COLORS              INVERTED
        // ---------------------------------------------
        expect(invert('#201395')).toEqual('#dfec6a');
        expect(invert('#840133')).toEqual('#7bfecc');
        expect(invert('#6ec6c8')).toEqual('#913937');
        expect(invert('#7fa1d3')).toEqual('#805e2c');
        expect(invert('#e0c04e')).toEqual('#1f3fb1');
        expect(invert('#3ad673')).toEqual('#c5298c');
        expect(invert('#edffe7')).toEqual('#120018');
        expect(invert('#a8f2f0')).toEqual('#570d0f');
        expect(invert('#da6aaa')).toEqual('#259555');
        expect(invert('#f9c6be')).toEqual('#063941');
        expect(invert('#2c2ea2')).toEqual('#d3d15d');
        expect(invert('#53456a')).toEqual('#acba95');
        expect(invert('#ab1b77')).toEqual('#54e488');
        expect(invert('#9288a4')).toEqual('#6d775b');
        expect(invert('#cf4a78')).toEqual('#30b587');
        expect(invert('#463069')).toEqual('#b9cf96');
        expect(invert('#ac6d63')).toEqual('#53929c');
        expect(invert('#be5a33')).toEqual('#41a5cc');
        expect(invert('#a07c96')).toEqual('#5f8369');
        expect(invert('#710cd1')).toEqual('#8ef32e');
        expect(invert('#676693')).toEqual('#98996c');
        expect(invert('#230be2')).toEqual('#dcf41d');
        expect(invert('#9481a4')).toEqual('#6b7e5b');
        expect(invert('#490cf8')).toEqual('#b6f307');
        expect(invert('#389847')).toEqual('#c767b8');
        expect(invert('#4898c2')).toEqual('#b7673d');
        expect(invert('#71d449')).toEqual('#8e2bb6');
        expect(invert('#61ad88')).toEqual('#9e5277');
        expect(invert('#bd3a5b')).toEqual('#42c5a4');
        expect(invert('#e32ac1')).toEqual('#1cd53e');
        expect(invert('#ac3ba9')).toEqual('#53c456');
        expect(invert('#c78ef0')).toEqual('#38710f');
        expect(invert('#48bdda')).toEqual('#b74225');
        expect(invert('#7855ae')).toEqual('#87aa51');
        expect(invert('#bf9845')).toEqual('#4067ba');
        expect(invert('#b2b766')).toEqual('#4d4899');
        expect(invert('#6ca3d9')).toEqual('#935c26');
        expect(invert('#b0af42')).toEqual('#4f50bd');
        expect(invert('#9fec76')).toEqual('#601389');
        expect(invert('#de79f1')).toEqual('#21860e');
        expect(invert('#5b7b0a')).toEqual('#a484f5');
        expect(invert('#27a5ec')).toEqual('#d85a13');
        expect(invert('#a3375e')).toEqual('#5cc8a1');
        expect(invert('#414176')).toEqual('#bebe89');
        expect(invert('#cde92f')).toEqual('#3216d0');
        expect(invert('#d13eb4')).toEqual('#2ec14b');
        expect(invert('#ee7d54')).toEqual('#1182ab');
        expect(invert('#35b9dc')).toEqual('#ca4623');
        expect(invert('#bf137b')).toEqual('#40ec84');
        expect(invert('#b7027c')).toEqual('#48fd83');
        expect(invert('#000')).toEqual('#ffffff');
        expect(invert('#fff')).toEqual('#000000');
        expect(invert('#282b35')).toEqual('#d7d4ca');
        expect(invert('#951a9d')).toEqual('#6ae562');
        expect(invert('#566394')).toEqual('#a99c6b');
    });

    test('accept [r,g,b] or {r,g,b}', () => {
        expect(invert([0, 0, 0])).toEqual('#ffffff');
        expect(invert([255, 255, 255])).toEqual('#000000');
        expect(invert([249, 119, 121])).toEqual('#068886');
        expect(invert([69, 191, 189])).toEqual('#ba4042');
        expect(invert([191, 19, 123])).toEqual('#40ec84');

        expect(invert({ r: 0, g: 0, b: 0 })).toEqual('#ffffff');
        expect(invert({ r: 255, g: 255, b: 255 })).toEqual('#000000');
        expect(invert({ r: 249, g: 119, b: 121 })).toEqual('#068886');
        expect(invert({ r: 69, g: 191, b: 189 })).toEqual('#ba4042');
        expect(invert({ r: 191, g: 19, b: 123 })).toEqual('#40ec84');
    });

    test('invert to black or white', () => {
        expect(invert('#631746', true)).toEqual('#ffffff');
        expect(invert('#655c42', true)).toEqual('#ffffff');
        expect(invert('#166528', true)).toEqual('#ffffff');
        expect(invert('#4c2946', true)).toEqual('#ffffff');
        expect(invert('#002d26', true)).toEqual('#ffffff');
        expect(invert('#e71398', true)).toEqual('#000000');
        expect(invert('#3ab3af', true)).toEqual('#000000');
        expect(invert('#76ff98', true)).toEqual('#000000');
        expect(invert('#bbb962', true)).toEqual('#000000');
        expect(invert('#52838b', true)).toEqual('#000000');
        expect(invert('#000', true)).toEqual('#ffffff');
        expect(invert('#fff', true)).toEqual('#000000');
    });

    test('invert to custom black and white colors', () => {
        expect(invert('#631746', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
        expect(invert('#655c42', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
        expect(invert('#166528', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
        expect(invert('#4c2946', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
        expect(invert('#002d26', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
        expect(invert('#e71398', CUSTOM_BW_COLORS)).toEqual(CUSTOM_BLACK);
        expect(invert('#3ab3af', CUSTOM_BW_COLORS)).toEqual(CUSTOM_BLACK);
        expect(invert('#76ff98', CUSTOM_BW_COLORS)).toEqual(CUSTOM_BLACK);
        expect(invert('#bbb962', CUSTOM_BW_COLORS)).toEqual(CUSTOM_BLACK);
        expect(invert('#52838b', CUSTOM_BW_COLORS)).toEqual(CUSTOM_BLACK);
        expect(invert('#000', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
        expect(invert('#fff', CUSTOM_BW_COLORS)).toEqual(CUSTOM_BLACK);
    });

    test('support true/false/object for black and white parameter', () => {
        expect(invert('#201395', true)).toEqual('#ffffff');
        expect(invert('#201395', false)).toEqual('#dfec6a');
        expect(invert('#201395', CUSTOM_BW_COLORS)).toEqual(CUSTOM_WHITE);
    });

    test('invert to/from array/object to B/W', () => {
        // this test also checks for object mutation

        // hex as array
        expect(invert.asRgbArray('#631746', true)).toEqual(A_WHITE);
        expect(invert.asRgbArray('#655c42', true)).toEqual(A_WHITE);
        expect(invert.asRgbArray('#e71398', true)).toEqual(A_BLACK);

        expect(invert.asRgbArray('#282b35', false)).toEqual([215, 212, 202]);

        // hex as object
        expect(invert.asRgbObject('#4c2946', true)).toEqual(O_WHITE);
        expect(invert.asRgbObject('#002d26', true)).toEqual(O_WHITE);
        expect(invert.asRgbObject('#76ff98', true)).toEqual(O_BLACK);

        expect(invert.asRgbObject('#282b35', false)).toEqual({ r: 215, g: 212, b: 202 });

        // array as array
        expect(invert.asRgbArray(A_WHITE, true)).toEqual(A_BLACK);
        expect(invert.asRgbArray(A_BLACK, true)).toEqual(A_WHITE);

        // object as array
        expect(invert.asRgbArray(O_BLACK, true)).toEqual(A_WHITE);
        expect(invert.asRgbArray(O_WHITE, true)).toEqual(A_BLACK);

        // object as object
        expect(invert.asRgbObject(O_BLACK, true)).toEqual(O_WHITE);
        expect(invert.asRgbObject(O_WHITE, true)).toEqual(O_BLACK);
    });

    test('invert to/from array/object to custom B/W', () => {
        // this test also checks for object mutation

        // hex as array
        expect(invert.asRgbArray('#631746', CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_WHITE);
        expect(invert.asRgbArray('#655c42', CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_WHITE);
        expect(invert.asRgbArray('#e71398', CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_BLACK);

        // hex as object
        expect(invert.asRgbObject('#4c2946', CUSTOM_BW_COLORS)).toEqual(O_CUSTOM_WHITE);
        expect(invert.asRgbObject('#002d26', CUSTOM_BW_COLORS)).toEqual(O_CUSTOM_WHITE);
        expect(invert.asRgbObject('#76ff98', CUSTOM_BW_COLORS)).toEqual(O_CUSTOM_BLACK);

        // array as array
        expect(invert.asRgbArray(A_WHITE, CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_BLACK);
        expect(invert.asRgbArray(A_BLACK, CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_WHITE);

        // object as array
        expect(invert.asRgbArray(O_BLACK, CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_WHITE);
        expect(invert.asRgbArray(O_WHITE, CUSTOM_BW_COLORS)).toEqual(A_CUSTOM_BLACK);

        // object as object
        expect(invert.asRgbObject(O_BLACK, CUSTOM_BW_COLORS)).toEqual(O_CUSTOM_WHITE);
        expect(invert.asRgbObject(O_WHITE, CUSTOM_BW_COLORS)).toEqual(O_CUSTOM_BLACK);
    });

    test('modulo exceeding RGB comps', () => {
        expect(invert([300, 300, 300])).toEqual('#2d2d2d');
        expect(invert({ r: -46, g: -46, b: -46 })).toEqual('#2d2d2d');
    });

    test('throw on invalid hex', () => {
        expect(() => { invert('#'); }).toThrow();
        expect(() => { invert('12'); }).toThrow();
        expect(() => { invert('#ff'); }).toThrow();
        expect(() => { invert('#1234'); }).toThrow();
        expect(() => { invert('12345'); }).toThrow();
        expect(() => { invert('1234567'); }).toThrow();
        expect(() => { invert('1#3'); }).toThrow();
        expect(() => { invert('##631746', true); }).toThrow();
    });

    test('not throw for valid hex with/out # prefix', () => {
        expect(() => { invert('123'); }).not.toThrow();
        expect(() => { invert('123456'); }).not.toThrow();
        expect(() => { invert('#aba'); }).not.toThrow();
    });

});
