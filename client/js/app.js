(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var testOne = require('./test-one'),
    testTwo = require('./test-two');

testOne('testing');
testTwo('double-test');
},{"./test-one":2,"./test-two":3}],2:[function(require,module,exports){
module.exports = function(item) {
  if (item == null) {
    item = 'testing';
  }
  return console.log("" + item);
};

},{}],3:[function(require,module,exports){
module.exports = function(test) {
  console.log(test);
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYWlrZW4vbm9kZS9waGFzZXItbXVsdGlwbGF5ZXIvY2xpZW50L25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9xYWlrZW4vbm9kZS9waGFzZXItbXVsdGlwbGF5ZXIvY2xpZW50L18vc2NyaXB0cy9mYWtlXzQ3ZmY0M2VkLmpzIiwiL1VzZXJzL3FhaWtlbi9ub2RlL3BoYXNlci1tdWx0aXBsYXllci9jbGllbnQvXy9zY3JpcHRzL3Rlc3Qtb25lLmpzIiwiL1VzZXJzL3FhaWtlbi9ub2RlL3BoYXNlci1tdWx0aXBsYXllci9jbGllbnQvXy9zY3JpcHRzL3Rlc3QtdHdvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHRlc3RPbmUgPSByZXF1aXJlKCcuL3Rlc3Qtb25lJyksXG4gICAgdGVzdFR3byA9IHJlcXVpcmUoJy4vdGVzdC10d28nKTtcblxudGVzdE9uZSgndGVzdGluZycpO1xudGVzdFR3bygnZG91YmxlLXRlc3QnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgaWYgKGl0ZW0gPT0gbnVsbCkge1xuICAgIGl0ZW0gPSAndGVzdGluZyc7XG4gIH1cbiAgcmV0dXJuIGNvbnNvbGUubG9nKFwiXCIgKyBpdGVtKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlc3QpIHtcbiAgY29uc29sZS5sb2codGVzdCk7XG59OyJdfQ==
