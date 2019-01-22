/* eslint-disable require-await */
const {describe} = require('riteway');
const {arrayPush, map, filter, compose, reduce} = require('./transducers-lib.js')

const inc = x => x + 1
const double = x => x * 2
const isEven = x => x % 2 === 0

describe('map()', async assert => {
  const transducer = map(inc);
  assert({
    given: 'one argument',
    should: 'return a transducer',
    actual: transducer(arrayPush)([], 0),
    expected: [1]
  });

  assert({
    given: 'a transform and an array',
    should: 'return a new array',
    actual: map(inc, [1, 2, 3]),
    expected: [2, 3, 4]
  });

  assert({
    given: 'a transform and an object',
    should: 'return a new object',
    actual: map(inc, {a: 1, b: 2}),
    expected: {a: 2, b: 3}
  });
});

describe('filter()', async assert => {
  const transducer = filter(isEven);
  assert({
    given: 'one argument',
    should: 'return a transducer',
    actual: transducer(arrayPush)([], 2),
    expected: [2]
  });

  assert({
    given: 'a transform and an array',
    should: 'return a new filtered array',
    actual: filter(isEven, [1, 2, 3]),
    expected: [2]
  });

  assert({
    given: 'a transform and an object',
    should: 'return a new filtered object',
    actual: filter(isEven, {a: 1, b: 2}),
    expected: {b: 2}
  });
});

describe('compose()', async assert => {
  const xform = compose(map(inc), map(double))
  const applyTransform = xform(arrayPush)

  assert({
    given: 'multiple transducers and then a collection-building reducer',
    should: 'return a function that applies the transformation stack',
    actual: applyTransform([], 1),
    expected: [4]
  });
});

describe('reduce()', async assert => {
  const sum = (x, y) => x + y;

  assert({
    given: 'an ordinary reducer',
    should: 'return the reduction',
    actual: reduce([1, 2, 3], sum, 0),
    expected: 6
  });
});
