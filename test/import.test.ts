import invert from '..';

describe('test: import / require', () => {

    function checkObj(obj) {
        expect(typeof obj).toEqual('function');
        expect(typeof obj.defaultThreshold).toEqual('number');
        expect(typeof obj.asRGB).toEqual('function');
        expect(typeof obj.asRgbArray).toEqual('function');
        expect(obj(('#000'))).toEqual('#ffffff');
    }

    test('TS » import invert from', () => {
        let err = null;
        try {
            checkObj(invert);
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('UMD » import(\'../lib/invert\') » default', async () => {
        expect.assertions(6);
        let err = null;
        try {
            const inv = await import('../lib/invert');
            checkObj(inv.default);
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('UMD » require(\'../lib/invert\')', () => {
        let err = null;
        try {
            const inv = require('../lib/invert');
            checkObj(inv);
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('UMD » require(\'../lib/invert.min\')', () => {
        let err = null;
        try {
            const inv = require('../lib/invert.min');
            checkObj(inv);
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('CJS » require(\'../lib/cjs/invert\') » default', () => {
        let err = null;
        try {
            const inv = require('../lib/cjs/invert');
            checkObj(inv.default);
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

});