import invert from '..';

describe('test: import / require', () => {

    test('import invert', () => {
        let err = null;
        try {
            expect(invert('#000')).toEqual('#ffffff');
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('require(\'../lib/invert\')', () => {
        let err = null;
        try {
            const inv = require('../lib/invert');
            expect(inv(('#000'))).toEqual('#ffffff');
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('require(\'../lib/invert.min\')', () => {
        let err = null;
        try {
            const inv = require('../lib/invert.min');
            expect(inv(('#000'))).toEqual('#ffffff');
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('require(\'../lib/cjs/invert\').default', () => {
        let err = null;
        try {
            const inv = require('../lib/cjs/invert').default;
            expect(inv(('#000'))).toEqual('#ffffff');
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

});