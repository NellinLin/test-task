const MyMap = require('./MapPolyfill.js');

console.log(new MyMap()); // MyMap { _keys: [], _values: [] }
console.log(new MyMap(undefined)); //MyMap { _keys: [], _values: [] }
// console.log(new MyMap('')); // Iterable is not iterable
// console.log(new MyMap({})); // TypeError: iterable is not iterable

console.log(new MyMap([[1,2], ['1', 2]])); // MyMap { _keys: [ 1, '1' ], _values: [ 2, 2 ] }
console.log(new MyMap([[1], {}])); // MyMap { _keys: [ 1, undefined ], _values: [ undefined, undefined ] }
// console.log(new MyMap(['', ''])); // Iterator value is not an entry 

const map = new MyMap([[1, 2, 3], ['1', 4], ['one']]);

console.log(map.size); // 3

map.set('two', 2);
map.set(5, 3);
console.log(map.size); // 5

console.log(map.get('two')); // 2
console.log(map.get('ok')); // undefined

console.log(map.has('two')); // true
console.log(map.has('ok')); // false

console.log(map.delete('two')); // true
console.log(map.delete('ok')); // false
console.log(map.size); // 4

map.forEach(function(value, key) {
    console.log(`${key} => ${value}`);
});
// 1 => 2
// 1 => 4
// one => undefined
// 5 => 3

const entries = map.entries();
console.log(entries.next()); // [1, 2]
console.log(entries.next()); // ["1", 4]

console.log(map.keys().next()); // 1

console.log(map.values().next()); // 2

map.clear();
console.log(map.size); // 0
