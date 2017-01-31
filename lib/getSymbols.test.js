const getSymbols = require('./getSymbols');

describe('ES6', () => {
  test('simple', () => {
    expect(getSymbols(`
      import x from './y';
    `)).toEqual({
      './y': ['default']
    });
  });


  test('multiple imports', () => {
    expect(getSymbols(`
      import x, {a, b} from './z';
    `)).toEqual({
      './z': ['a', 'b', 'default']
    });
  });

  test('multiple renamed imports', () => {
    expect(getSymbols(`
      import {a as c, b as d} from './z';
    `)).toEqual({
      './z': ['a', 'b']
    });
  });

  test('wildcard imports', () => {
    expect(getSymbols(`
      import * as x from './y';
    `)).toEqual({
      './y': ['x.*']
    });
  });

  test('all of the above in one file', () => {
    expect(getSymbols(`
      import x from './y';
      import x, {a, b} from './z';
      import {a as c, b as d} from './z';
      import * as xx from './yy';
    `)).toEqual({
      './y': ['default'],
      './yy': ['xx.*'],
      './z': ['a', 'b', 'default'],
    });
  });
});

describe('require()', () => {
  test('simple', () => {
    expect(getSymbols(`
      const module = require('module');
    `)).toEqual({
      'module': ['module.* !require']
    });
  });

  test('require().member', () => {
    expect(getSymbols(`
      const module = require('module').member;
    `)).toEqual({
      'module': ['member !require']
    });
  });

  test('{a, b} = require()', () => {
    expect(getSymbols(`
      const {a: c, b} = require('module');
    `)).toEqual({
      'module': ['a !require', 'b !require']
    });
  });

  test('only top-level require', () => {
    expect(getSymbols(`
      const module = require('module');
      const {a, b, c} = x();
      function x() {
        return require('module1');
      }
    `)).toEqual({
      'module': ['module.* !require']
    });
  });

  test('all of the above in one file', () => {
    expect(getSymbols(`
      const module = require('module');
      const member = require('module').member;
      const {a, b} = require('module');
      const {x: {y: {z}}} = require('module1');

      var test;
      const TEST = 'TEST';
      const {a, b, c} = x();
      function x() {
        return require('module1');
      }
    `)).toEqual({
      'module': [
        'a !require',
        'b !require',
        'member !require',
        'module.* !require'
      ],
      'module1': ['x !require']
    });
  });
});

