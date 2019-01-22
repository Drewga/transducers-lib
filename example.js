const {map, filter, reduce, compose} = require('./transducers-lib.js')

var posts = [
  { author: 'Agatha',  text: 'just setting up my pstr' },
  { author: 'Bert',    text: 'Ed Balls' },
  { author: 'Agatha',  text: '@Bert fancy a thumb war?' },
  { author: 'Charles', text: '#subtweet' },
  { author: 'Bert',    text: '@Agatha What up?' },
  { author: 'Agatha',  text: '@Bert m(' }
];

function graph(result, input) {
  result[input.from] = result[input.from] || [];
  result[input.from].push(input.to);
  return result;
}

var extractMentions = compose(
  // Find mentions
  filter(function (post) {
      return post.text.match(/^@/);
  }),
  // Build object with {from, to} keys
  map(function (post) {
      return {
          from: post.author,
          to: post.text.split(' ').slice(0,1).join('').replace(/^@/, '')
      };
  })
);

// Example by Tom Ashworth: https://tgvashworth.com/2014/08/31/csp-and-transducers.html

console.dir(reduce(posts, extractMentions(graph), {}))

