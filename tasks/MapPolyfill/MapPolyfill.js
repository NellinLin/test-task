/**
 * Iterator for MyMap
 * 
 * @param {MyMap} obj 
 * @param {string} keyType 
 */
function MyMapIterator(obj, keyType) {
    this.map = obj;
    this.keyType = String(keyType);
    this.index = 0;
}

MyMapIterator.prototype.next = function() {
    let value;

    if (this.map._keys.length > this.index) {
        switch(this.keyType) {
            case 'entries':
                value = [this.map._keys[this.index], this.map._values[this.index]];
                break;
            case 'keys':
                value = this.map._keys[this.index];
                break;
            case 'values':
                value = this.map._values[this.index];
                break;
            default:
                throw new TypeError('The key is not valid');
        }

        this.index++;
    }

    return value;
}


/**
 * Map polyfill
 * 
 * @param {*} iterable 
 */
function MyMap(iterable) {
    this._keys = [];
    this._values = [];

    if (iterable != null) {
        if (typeof iterable === 'string' || typeof Object(iterable)[Symbol.iterator] !== 'function') {
            throw new TypeError('Iterable is not iterable');
        }

        for (const value of iterable) {
            if (typeof value === 'string' || typeof value === 'function' || typeof value === 'number') {
                throw new TypeError('Iterator value is not an entry ');
            }

            if (value && value.length > 0) {
                this.set(value[0], value[1]);
            } else {
                this.set();
            }
        }
    }
}

Object.defineProperty(MyMap.prototype, 'size', {
    get: function() {
        return this._keys.length;
    }
});

MyMap.prototype.clear = function() {
    this._keys = [];
    this._values = [];
}

MyMap.prototype.delete = function(key) {
    const index = this._keys.indexOf(key);

    if (index !== -1) {
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        return true;
    }

    return false;
}

MyMap.prototype.entries = function() {
    return new MyMapIterator(this, 'entries');
}

MyMap.prototype.forEach = function(callback, args) {
    for (let key of this._keys) {
        (args) ? callback.call(args, key, this.get(key), this) : callback(key, this.get(key), this);
    }
}

MyMap.prototype.get = function(key) {
    const index = this._keys.indexOf(key);
    return (index !== -1) ? this._values[index] : undefined;
}

MyMap.prototype.has = function(key) {
    return this._keys.indexOf(key) !== -1;
}

MyMap.prototype.set = function(key=undefined, value=undefined) {
    const index = this._keys.indexOf(key);

    if (index === -1) {
        this._keys.push(key);
        this._values.push(value);
    } else {
        this._values[index] = value;
    }
}

MyMap.prototype.keys = function() {
    return new MyMapIterator(this, 'keys');
}

MyMap.prototype.values = function() {
    return new MyMapIterator(this, 'values');
}

module.exports = MyMap;
