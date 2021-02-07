// https://rubaxa.github.io/playground/#extend

function Class() {}

Class.extend = function (desc) {
    var parent = this;
    var child;

    if (!desc.hasOwnProperty('constructor')) {
        desc.constructor = function() {
            parent.apply(this, arguments);
        }
    }

    child = desc.constructor;

    child.prototype = Object.create(parent.prototype, Object.getOwnPropertyDescriptors(desc));
    child.extend = this.extend;
    
    return child;
};

/** @class Widget */
var Widget = Class.extend(/** @lends Widget.prototype */{
    constructor: function (el, options) {
        this.el = el;
        this.options = options;
    },

    find: function (selector) {
        return this.el.querySelector(selector);
    }
});

/** @class Dropdown */
/** @extends Widget */
var Dropdown = Widget.extend(/** @lends Dropdown.prototype */{
    constructor: function () {
        Widget.apply(this, arguments);
        this.find('.js-ctrl').addEventListener('click', this);
    },

    handleEvent: function (evt) {
        this.toggle();
    },

    toggle: function () {
        var menu = this.find('.js-menu');
        menu.classList.toggle('collapsed');
    }
});


// Используем
var dd = new Dropdown(menu);


// Тесты
console.log('dd is Class:', dd instanceof Class);
console.log('dd is Widget:', dd instanceof Widget);
console.log('dd is Dropdown:', dd instanceof Dropdown);
