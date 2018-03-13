var names = [];
var seriesOptions = [];
var currentDate = new Date(new Date().toJSON().split('T')[0]);
var endDate = currentDate.toJSON().split('T')[0];
var startDate = new Date(currentDate - 31536000000).toJSON().split('T')[0];31536000000
$(document).ready(function(){
	var seriesCounter = 0;
	var container = $('#container');

	var createChart = function(){
		container.highcharts('StockChart', {
			rangeSelector: {
				selected: 4
			},
			credits: {
				enabled: false
			},
			yAxis: {
				labels: {
					formatter: function() {
						return (this.value > 0 ? ' + ': '') + this.value + '%';
					}
				}, 
				plotLines: [{
					value: 0, 
					width: 2,
					color: 'silver'
				}]
			},
			tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },
			series: seriesOptions
		});
	}

	var loadAndRender = function(){
		seriesCounter = 0;
		$.each(names, function(i, name){
			var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + name.toUpperCase() +'/data.json?start_date=' + startDate + '&end_date=' + endDate + '&api_key=hWzSahCAq5PA14G65hh3';
			//console.log(url);
			$.getJSON(url, function(json){
				var data = json.dataset_data.data.map(function(elem){
                	return [new Date(elem[0]).getTime(), elem[1]];
            	});
            	data.sort(function(a, b){
               		return a[0] - b[0];
            	});
            	seriesOptions[i] = {
            		name: name,
            		data: data
            	}

            	seriesCounter += 1;
            	if (seriesCounter === names.length){
            		createChart();
            	}
			});
		});
	}

	var socket = io();
	socket.on('connect', function(){
		console.log('Connect to server');
		$.get('/stockmarket/names', function(data){
			names = data.names;
			loadAndRender();
			$('#item').html('');
			for (var i = 0; i < names.length; i++) {
				var str = 
				'<div class="elem">' +
					'<span class="name">' + names[i] + '</span>' +
					'<button class="btn btn-danger">Delete</button>' +
				'</div>';
				$('#item').append(str);
			}
		});
	});
	socket.on('new', function(name){
		var str = 
			'<div class="elem">' +
				'<span class="name">' + name + '</span>' +
				'<button class="btn btn-danger">Delete</button>' +
			'</div>';
		$('#item').append(str);
		names.push(name);
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + name.toUpperCase() +'/data.json?start_date=' + startDate + '&end_date=' + endDate + '&api_key=hWzSahCAq5PA14G65hh3';
			//console.log(url);
		$.getJSON(url, function(json){
			var data = json.dataset_data.data.map(function(elem){
            	return [new Date(elem[0]).getTime(), elem[1]];
        	});
        	data.sort(function(a, b){
           		return a[0] - b[0];
        	});
        	seriesOptions.push({
        		name: name,
        		data: data
        	})
       		createChart();
        });
	});

	socket.on('del', function(i){
		names.splice(i, 1);
		seriesOptions.splice(i, 1);
		$('#item').html('');
		createChart();
		for (var i = 0; i < names.length; i++) {
			var str = 
			'<div class="elem">' +
				'<span class="name">' + names[i] + '</span>' +
				'<button class="btn btn-danger">Delete</button>' +
			'</div>';
			$('#item').append(str);
		}
	});

	$('.btn-primary').click(function(){

		var name = $('#stockname').val();
		$('input').val('');
		
		if ((name !== '') && (names.indexOf(name) === -1)) {
			console.log(name);
			socket.emit('add', name);
		}
	});

	$('input').keypress(function(e){
		if (e.which == 13) {
			$('.btn-primary').click();
			return false;
		}
	});

	$(document).on('click', '.btn-danger', function(){
		var i = $(this).parent().index();
		console.log(i);
		socket.emit('del', i);
	});
});