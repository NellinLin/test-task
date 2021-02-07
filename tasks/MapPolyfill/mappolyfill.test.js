const MyMap = require('./MapPolyfill.js');

describe('Gолифилл MyMap', () => {
    test('Невалидные данные iterable в конструкторе', () => {
        expect(() => new MyMap(NaN)).toThrow('Iterable is not iterable');
        expect(() => new MyMap('')).toThrow('Iterable is not iterable');
        expect(() => new MyMap({})).toThrow('Iterable is not iterable');
        expect(() => new MyMap(() => { return 0; })).toThrow('Iterable is not iterable');
    });

    test('Невалидные данные элементов iterable в конструкторе', () => {
        expect(() => new MyMap([''])).toThrow('Iterator value is not an entry');
        expect(() => new MyMap([() => { return 0; }])).toThrow('Iterator value is not an entry');
    });

    test('Валидные данные iterable в конструкторе', () => {
        expect(new MyMap()).toMatchObject({'_keys': [], '_values': []});
        expect(new MyMap(null)).toMatchObject({'_keys': [], '_values': []});
        expect(new MyMap(undefined)).toMatchObject({'_keys': [], '_values': []});
        expect(new MyMap([])).toMatchObject({'_keys': [], '_values': []});
    });

    test('Валидные данные элементов iterable в конструкторе', () => {
        expect(new MyMap([[1], {}])).toMatchObject({'_keys': [1, undefined], '_values': [undefined, undefined]});
        expect(new MyMap([[1,2], ['1', 2]])).toMatchObject({'_keys': [1, '1'], '_values': [2, 2]});
    });

    test('MyMap.size', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4], ['one']]);

        expect(map.size).toEqual(3);
    });

    test('MyMap.set', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4], ['one']]);
        map.set('two', 2);
        map.set(5, 3);

        expect(map.size).toEqual(5);
        expect(map).toMatchObject({'_keys': [1, '1', 'one', 'two', 5], '_values': [2, 4, undefined, 2, 3]});
    });

    test('MyMap.get', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4], ['one']]);
        map.set('two', 2);
        map.set(5, 3);

        expect(map.get('two')).toEqual(2);
        expect(map.get('ok')).toEqual(undefined);
    });

    test('MyMap.has', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4], ['one']]);
        map.set('two', 2);
        map.set(5, 3);

        expect(map.has('two')).toEqual(true);
        expect(map.has('ok')).toEqual(false);
    });

    test('MyMap.delete', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4], ['one']]);
        map.set('two', 2);
        map.set(5, 3);

        expect(map.delete('two')).toEqual(true);
        expect(map.delete('ok')).toEqual(false);
    });

    test('MyMap.forEach', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4]]);
        
        let c = 0;

        map.forEach(function(key, value) {
            c += value;
        }, c);

        expect(c).toEqual(6);
    });

    test('MyMap.entries().next()', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4]]);
        
        const entries = map.entries();

        expect(entries.next()).toEqual([1, 2]);
        expect(entries.next()).toEqual(['1', 4]);
    });

    test('MyMap.keys().next()', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4]]);

        expect(map.keys().next()).toEqual(1);
    });

    test('MyMap.values().next()', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4]]);

        expect(map.values().next()).toEqual(2);
    });

    test('MyMap.clear()', () => {
        const map = new MyMap([[1, 2, 3], ['1', 4]]);

        expect(map.size).toEqual(2);

        map.clear();

        expect(map.size).toEqual(0);
    });

});
