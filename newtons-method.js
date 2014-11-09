'use strict';

/**
 * Function #1
 *
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function funcOne(x) {
  return x * Math.pow(Math.E, (0.8 * x)) - 13;
}

/**
 * Derivative of Function #1
 *
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function derivativeOffuncOne(x) {
  return Math.pow(Math.E, (0.8 * x)) * (0.8 * x + 1);
}

/**
 * Check interval
 *
 * @param  {String} functionName - function name
 * @param  {Number} a            - a point
 * @param  {Number} b            - b point
 * @return {Boolean}
 */
function intervalChecker(functionName, a, b) {
  return window[functionName](a) * window[functionName](b) <= 0;
}

/**
 * Search for answer by Newton's method with local points
 *
 * Example:
 *  var arrayOfX = newtonLocal("funcOne", -1, 3, 0.000001);
 *  console.log(arrayOfX[arrayOfX.length - 1]);
 *
 * @param  {String} functionName - function name
 * @param  {Number} a            - a point
 * @param  {Number} b            - b point
 * @param  {Number} e            - accuracy
 * @return {Array}               - x points
 */
function newtonLocal(functionName, a, b, e) {
  if (intervalChecker(functionName, a, b)) {
    var dname = 'derivativeOf' + functionName;
    var functionName = window[functionName];
    var derivative = window[dname];
    var x = [];

    x.push((a + b) / 2);

    var i = 0;

    x.push(x[i] - functionName(x[i]) / derivative(x[i]));

    while (Math.abs(x[i + 1] - x[i]) > e) {
      i++;
      x.push(x[i] - functionName(x[i]) / derivative(x[i]));
    }

    return x;

  } else {

    return false;
  }
}
