'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.portal = exports.addEventListener = exports.contains = exports.isArray = exports.isObject = void 0;

var tslib_1 = require('tslib');

var react_dom_1 = tslib_1.__importDefault(require('react-dom'));

exports.isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

exports.isArray = function (arr) {
  return Array.isArray(arr);
};

function contains(root, n) {
  var node = n;

  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

exports.contains = contains;

function addEventListener(target, eventType, cb, option) {
  if (option === void 0) {
    option = {};
  }

  if (target.addEventListener) {
    target.addEventListener(eventType, cb, option);
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    },
  };
}

exports.addEventListener = addEventListener;

function portal(container, children) {
  return {
    add: function add() {
      return react_dom_1['default'].createPortal(children, container);
    },
    remove: function remove() {
      if (container) {
        container.parentNode.removeChild(container);
      }
    },
  };
}

exports.portal = portal;
