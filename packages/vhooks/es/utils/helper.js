import ReactDom from 'react-dom';
export var isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
export var isArray = function isArray(arr) {
  return Array.isArray(arr);
};
export function contains(root, n) {
  var node = n;

  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}
export function addEventListener(target, eventType, cb, option) {
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
export function portal(container, children) {
  return {
    add: function add() {
      return /*#__PURE__*/ ReactDom.createPortal(children, container);
    },
    remove: function remove() {
      if (container) {
        container.parentNode.removeChild(container);
      }
    },
  };
}
