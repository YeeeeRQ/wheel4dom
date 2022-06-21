function JQ() {
  this.prevObject = null;
  this.length = 0;
}
inherit(JQ, Object);
JQ.fn = JQ.prototype;

function inherit(child, parent) {
  function F() {}
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
}

window.$ = window.jQuery = function (selectorOrArray) {
  let _el = new JQ();

  if (typeof selectorOrArray === "string") {
    if (selectorOrArray.length > 0) {
      let nodeLists = document.querySelectorAll(selectorOrArray);
      Object.assign(_el, { ...nodeLists, length: nodeLists.length });
    }
  }
  return _el;
};

/*
// 主要函数封装
*/

JQ.fn.addClass = function (className) {
  console.assert(typeof className === "string");

  for (let i = 0; i < this.length; i++) {
    this[i].classList.add(className);
  }

  return this;
};

JQ.fn.find = function (selector) {
  console.assert(typeof selector === "string");

  let _el = new JQ();
  _el.prevObject = this;

  if (_el.prevObject.length == 1 && selector.length > 0) {
    let nodeLists = document.querySelectorAll(selector);
    Object.assign(_el, { ...nodeLists, length: nodeLists.length });
  } 

  return _el;
};

JQ.fn.next = function () {};

JQ.fn.prev = function () {};

JQ.fn.each = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn.call(null, this[i], i);
  }
  return this;
};

// Todo: 重载实现.css
JQ.fn.css = function () {};

JQ.fn.parent = function () {

  let _el = new JQ();
  _el.prevObject = this;

  const array = [];
  _el.prevObject.each((node) => {
    if (array.indexOf(node.parentNode) === -1) {
      array.push(node.parentNode);
    }
  });

  Object.assign(_el, { ...array, length: array.length });

  return _el;
};

JQ.fn.children = function () {
  let _el = new JQ();
  _el.prevObject = this;
  
  const array = [];
  _el.prevObject.each((node) => {
    if (array.indexOf(node.parentNode) === -1) {
      array.push(...node.children);
    }
  });

  Object.assign(_el, { ...array, length: array.length });

  return _el;
};

JQ.fn.end = function () {
  return this.prevObject;
};

JQ.fn.text = function (text) {
  if (typeof text === "string") {
    this.each((node) => {
      node.innerText = text;
    });
    return this;
  }

  let s = "";
  for (let i = 0; i < this.length; i++) {
    s += this[i].innerText;
  }
  return s;
};

JQ.fn.html = function (text) {
  if (typeof text === "string") {
    this.each((node) => {
      node.innerHTML = text;
    });
    return this;
  }

  return this[0].innerHtml;
};


JQ.fn.remove = function(){
  for(let i = 0; i< this.length; i++){
    this[i].remove()
  }
}
/*

// Todo

[x] | get

is

append | prepend
after | before

attr | prop

filter
map


first | last

slice

css

width
height

// 事件
on
.click
.onclick

*/
