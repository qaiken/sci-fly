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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYWlrZW4vcmVwb3Mvc2ltcGxlLWd1bHAtYm9pbGVycGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3FhaWtlbi9yZXBvcy9zaW1wbGUtZ3VscC1ib2lsZXJwbGF0ZS9fL3NjcmlwdHMvZmFrZV9kNWVkN2IzOS5qcyIsIi9Vc2Vycy9xYWlrZW4vcmVwb3Mvc2ltcGxlLWd1bHAtYm9pbGVycGxhdGUvXy9zY3JpcHRzL3Rlc3Qtb25lLmpzIiwiL1VzZXJzL3FhaWtlbi9yZXBvcy9zaW1wbGUtZ3VscC1ib2lsZXJwbGF0ZS9fL3NjcmlwdHMvdGVzdC10d28uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdGVzdE9uZSA9IHJlcXVpcmUoJy4vdGVzdC1vbmUnKSxcbiAgICB0ZXN0VHdvID0gcmVxdWlyZSgnLi90ZXN0LXR3bycpO1xuXG50ZXN0T25lKCd0ZXN0aW5nJyk7XG50ZXN0VHdvKCdkb3VibGUtdGVzdCcpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlbSkge1xuICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgaXRlbSA9ICd0ZXN0aW5nJztcbiAgfVxuICByZXR1cm4gY29uc29sZS5sb2coXCJcIiArIGl0ZW0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGVzdCkge1xuICBjb25zb2xlLmxvZyh0ZXN0KTtcbn07Il19
