'use strict';

/**
 * Function #1 SK
 *
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function funcOne(x) {
  return x * Math.pow(Math.E, (0.8 * x)) - 13;
}

/**
 * Derivative of Function #1 SK
 *
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function derivativeOffuncOne(x) {
  return Math.pow(Math.E, (0.8 * x)) * (0.8 * x + 1);
}

/**
 * Function #2 JN
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function funcTwo(x) {
  return (Math.pow(Math.log(x), 3) / Math.pow(x, 2));
}

/**
 * Derivative of function #2 JN
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function derivativeOffuncTwo(x) {
  return ((3 - 2 * Math.log(x)) * Math.pow(Math.log(x), 2)) / Math.pow(x, 3);
}

/**
 * Function #3 DI
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
function funcThree(x) {
  return Math.pow(2, (3 * x)) - 18;
}

/**
 * Derivative of function #3 DI
 * @param  {Number} x - x point
 * @return {Number}   - y point
 */
 function derivativeOffuncThree(x) {
  return Math.pow(8, x) * Math.log(8);
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

    if(functionName == 'funcTwo'){
      x.push(2);
    } else {
      x.push((a+b) / 2);
    }

    /** @param {Number} c - coefficient */
    var c;
    var i = 0;

    x.push(x[i] - functionName(x[i]) / derivative(x[i]));

    while(Math.abs(x[i + 1] - x[i]) > e) {
      c = 1;
      i++;

      var tmp = x[i] - functionName(x[i]) / derivative(x[i]);
      while(Math.abs(functionName(tmp)) >= Math.abs(functionName(x[i]))) {
        c = c / 2;
        tmp = x[i] - c * (functionName(x[i]) / derivative(x[i]) );
      }
      x.push(tmp);

    }

    return x;

  } else {

    return false;
  }
}

var sxi = katex.renderToString("\\xi = ");
var sx = katex.renderToString("x = ");

/** Function one */
var fres1 = katex.renderToString("e^{2x} sin(x) - 13");
var res1 = newtonLocal('funcOne', -1, 3, 0.01);
var res11 = newtonLocal('funcOne', -1, 3, 0.0001);

/** Function two */
var fres2 = katex.renderToString("(ln^3 x) / x^2");
var res2 = newtonLocal('funcTwo', 0.5, 2, 0.01);
var res22 = newtonLocal('funcTwo', 0.5, 2, 0.0001);

/** Function three */
var fres3 = katex.renderToString("2^{3x} - 18");
var res3 = newtonLocal('funcThree', 0, 3, 0.01);
var res33 = newtonLocal('funcThree', 0, 3, 0.0001);

/**
 * Print table for Newton
 */
function printTableForNewton() {
  var html = '<h1>Newton table</h1>';
  html += '<table class="table table-bordered"><thead><tr>'
       + '<th>Function</th><th>Accuracy</th><th>Root</th><th>Iterations</th>'
       + '</tr></thead>';
  html += '<tbody><tr>'
       + '<td rowspan="2" style="text-align: center; padding: 2% 0;">' + fres1 + '</td>'
       + '<td>'+ sxi + '0.01</td>'
       + '<td>'+ sx + res1[res1.length - 1] + '</td>'
       + '<td>' + res1.length + '</td>'
       + '</tr>';
  html += '<tr>'
       + '<td>'+ sxi + '0.0001</td>'
       + '<td>'+ sx + res11[res11.length - 1] + '</td>'
       + '<td>' + res11.length + '</td>'
       + '</tr>';
  html += '<tr>'
       + '<td rowspan="2" style="text-align: center; padding: 2% 0;">' + fres2 +'</td>'
       + '<td>'+ sxi + '0.01</td>'
       + '<td>'+ sx + res2[res2.length - 1] + '</td>'
       + '<td>' + res2.length + '</td>'
       + '</tr>';
  html += '<tr>'
       + '<td>'+ sxi +'0.0001</td>'
       + '<td>'+ sx + res22[res22.length - 1] + '</td>'
       + '<td>' + res22.length + '</td>'
       + '</tr>';
  html += '<tr>'
       + '<td rowspan="2" style="text-align: center; padding: 2% 0;">' + fres3 + '</td>'
       + '<td>'+ sxi +'0.01</td>'
       + '<td>'+ sx + res3[res3.length - 1] + '</td>'
       + '<td>' + res3.length + '</td>'
       + '</tr>';
  html += '<tr>'
       + '<td>'+ sxi +'0.0001</td>'
       + '<td>'+ sx + res33[res33.length - 1] + '</td>'
       + '<td>' + res33.length + '</td>'
       + '</tr>';
  html += '</table>';
  document.getElementById('newton').innerHTML = html;
}

function getPoints(number) {
  var arr = [];
  switch(number) {
    case 1:
      for(var y = -1; y <= 3; y += 0.01) {
        arr.push([y, funcOne(y)]);
      }
      return arr;
    case 2:
      for(var y = 0.5; y <= 1.5; y += 0.01) {
        arr.push([y, funcTwo(y)]);
      }
      return arr;
      break;
    case 3:
      for(var y = 0; y <= 3; y += 0.01) {
        arr.push([y, funcThree(y)]);
      }
      return arr;
    default:
      return [];
  }
}
