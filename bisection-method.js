/*
 * Exponential function
 *
 */
function expFunc(x) {
	return (x * Math.pow(Math.E, (0.8 * x))) - 13; 
}

/*
 * Logarithmic function
 *
 */
function logFunc(x) {
	return (Math.pow(Math.log(x), 3) / Math.pow(x, 2)) - 18;
}

/*
 * Squares function
 *
 */
function squareFunc(x) {
	return Math.pow(2, (3 * x)) - 18;
}

/**
 * Returns root and iterations.
 * 
 * @return {Array}		[root, iteration]
 */
function bisection(name, a, b, E) {
	var functionName = window[name+'Func'], result;
	
	if(functionName(a) * functionName(b) <= 0) {
		var iteration = 0, x;
		
		while((b - a) > E) {
			x = (a + b) / 2;
			
			if(functionName(a) * functionName(x) <= 0) {
				b = x;
			} else {
				a = x;
			}
			iteration++;
		}
		
		result = [x, iteration];
	} else {
		result = [];
	}
	
	return result;
}

/*
 * Output all results
 *
 */
function outpuResult() {
	var functionArray = [['exp', [-1, 3]], ['log', [1, 5]], ['square', [0, 3]]];
	
	var html = '<h1>Bisection table</h1>';
		html += '<table class="table table-bordered"><thead><tr>'
			+ '<th>Function</th><th>Accuracy</th><th>Root</th><th>Iterations</th>'
			+ '</tr></thead>';
		html += '<tbody><tr>';
		
		for(var i = 0; i < functionArray.length; i++) {
			var res1 = bisection(functionArray[i][0], functionArray[i][1][0], functionArray[i][1][1], 0.01);
			var res2 = bisection(functionArray[i][0], functionArray[i][1][0], functionArray[i][1][1], 0.0001);
			var katexFunction;
			
			switch(i) {
				case 0:
					katexFunction = katex.renderToString("e^{2x} sin(x) - 13");
				break;
				case 1:
					katexFunction = katex.renderToString("(ln^3 x) / x^2 - 18");
				break;
				case 2:
					katexFunction = katex.renderToString("2^{3x} - 18");
				break;
			}
			
			html += '<td rowspan="2">' + katexFunction + '</td>'
			+ '<td>e = 0.01</td>'
			+ '<td>x = ' + res1[0] + '</td>'
			+ '<td>' + res1[1] + '</td>'
			+ '</tr>';
			html += '<tr>'
			+ '<td>e = 0.0001</td>'
			+ '<td>x = ' + res2[0] + '</td>'
			+ '<td>' + res2[1] + '</td>'
			+ '</tr>';
		}
		html += '</tbody></table>';
		
		document.getElementById('bisection').innerHTML = html;
}

/*
 * Getting y points to output the line
 */
function getYpoints(number) {
	var points = [];
	
	switch(number) {
		case 1:
			for(var y = -1; y <= 3; y += 0.5) {
				points.push([y, expFunc(y)]);
			}
			return points;
		case 2:
			for(var y = 1; y <= 15; y += 0.5) {
				points.push([y, logFunc(y)]);
			}
			return points;
		break;
		case 3:
			for(var y = 0; y <= 3; y += 0.5) {
				points.push([y, squareFunc(y)]);
			}
			return points;
		default:
			return [];
	}
}
