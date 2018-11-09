import invert from '../lib/invert';

describe('test: import / require', () => {

    test('import (default)', () => {
        let err = null;
        try {
            expect(invert('#000')).toEqual('#ffffff');
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

    test('require', () => {
        let err = null;
        try {
            const inv = require('../lib/invert');
            expect(inv(('#000'))).toEqual('#ffffff');
        } catch (e) {
            err = e;
        }
        expect(err).toEqual(null);
    });

});