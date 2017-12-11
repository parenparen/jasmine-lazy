'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lazy;
function lazy(name, func) {
  if (typeof func != 'function') {
    throw ['Bad lazy! ', name, ' is not a function'].join('');
  }
  var env, lazyFuncStacks, lazyValues;
  env = jasmine.getEnv();
  lazyFuncStacks = env.lazyFuncStacks || (env.lazyFuncStacks = {});
  lazyValues = env.lazyValues || (env.lazyValues = {});
  beforeAll(function () {
    var stack;
    stack = lazyFuncStacks[name] || (lazyFuncStacks[name] = []);
    stack.push(func);
    if (!global.hasOwnProperty(name)) {
      return Object.defineProperty(global, name, {
        get: function get() {
          return lazyValues[name] || (lazyValues[name] = stack[stack.length - 1]());
        }
      });
    }
  });
  afterEach(function () {
    return lazyValues[name] = undefined;
  });
  return afterAll(function () {
    lazyFuncStacks[name].pop();
    if (lazyFuncStacks[name].length === 0) {
      return delete global[name];
    }
  });
};

