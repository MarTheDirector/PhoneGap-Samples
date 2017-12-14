;(function($, window, undefined) {

	'use strict';

	var app = (function(){
		var pub={};

		pub.localDev = false;  //false = tesing on device and true = tesing on browser 

		var apiKey = ' '; //enter you forecast.io apiKey here
		var apiUrl = 'https://api.forecast.io/forecast/';

		pub.coords = {};

		pub.init = function init() {
			bindEvents();

			startUp();
		};


		//get initial values for geolocation, etc.
		function startUp(){
			if(app.localDev){
				getWeather();
			}else{
				document.addEventListener('deviceready', function(){	
					//phonegap is initialized - also saves the preferences 
					navigator
						.geolocation
						.getCurrentPosition(
							geolocationSuccess,
	                    	geolocationError
	            	);
				})
			}		
		}

		//geolocation was successful
		function geolocationSuccess(position){
			app.coords.latitude = position.coords.latitude;
			app.coords.longitude = position.coords.longitude;

			//we need a callback function to trigger anything that uses our coordinates
			getWeather();
		}

		function getWeather(){
			console.log('Got your address ');
			var url = apiUrl + apiKey + '/' + app.coords.latitude + ',' + app.coords.longitude;
			
			var request = $.ajax({
				url: url
				
			});

			request.done(function (data){
					console.log(data);

					//make sure to round off the temperature numbers to the whole number
					//create a loop to get through this information -- should save some space
					for(var i=0; i<8; i++){
						$("#summaries").append(
							"<tr class='hourly-block'><td><span class='hourly-hour'> Hr " + i + "</span> </td>"
							+ "<td><span class='hourly-icon'>" + "<img src='assets/img/" + data.daily.data[0].icon + ".png'/>" + "</span>"
							+ "<br/><span class='hourly-summary'>" + data.hourly.data[i].summary + "</span></td>"
							+ '<td><span class="hourly-temp">'
							+ Math.ceil(data.hourly.data[i].apparentTemperature)
							+ '&#176;</td></span>'
							+ '</tr>'
							+ ""
						);
					}
					for(var i=8; i<15; i++){
						$("#summaries2").append(
							"<tr class='hourly-block'><td><span class='hourly-hour'> Hr " + i + "</span> </td>"
							+ "<td><span class='hourly-icon'>" + "<img src='assets/img/" + data.daily.data[0].icon + ".png'/>" + "</span>"
							+ "<br/><span class='hourly-summary'>" + data.hourly.data[i].summary + "</span></td>"
							+ '<td><span class="hourly-temp">'
							+ Math.ceil(data.hourly.data[i].apparentTemperature)
							+ '&#176;</td></span>'
							+ '</tr>'
							+ ""
						);
					}

					var currentTemperature = Math.ceil(data.currently.apparentTemperature);
					var currentSummary = data.currently.summary;
					var currentInfo = data.currently;
					var imageURL = "<img src='assets/img/";
					var precipProbability = currentInfo.precipProbability * 100;
					var cloudCover = currentInfo.cloudCover * 100;

					$(".current-info").empty().append(
						  "<span class='current-info-pieces'> <i>Wind</i>: " + currentInfo.windSpeed +  " mph </span> |"
						+ "<span class='current-info-pieces'> <i>Precip</i>: " + precipProbability +  "% </span> |"
						+ "<span class='current-info-pieces'> <i>Cloud Cover</i>: " + cloudCover +  " % </span> "
					)


					var todayTemperature = Math.ceil(data.daily.data[0].apparentTemperatureMax) + " / "
					+ Math.ceil(data.daily.data[0].apparentTemperatureMin); //includes the high and low
					var todaySummary = data.daily.data[0].summary; 

					var tomorrow = Math.ceil(data.daily.data[1].apparentTemperatureMax) + " / "
					+ Math.ceil(data.daily.data[1].apparentTemperatureMin);

					var thirdDay = Math.ceil(data.daily.data[2].apparentTemperatureMax) + " / "
					+ Math.ceil(data.daily.data[2].apparentTemperatureMin);

					$(".city-name").empty().append(data.timezone);
					$(".current-temperature").empty().append(currentTemperature +
					 "<span class='current-temperature'>&#176;</span>");
					$(".today-temperature").empty().append(todayTemperature);
					$(".current-summary").empty().append(currentSummary);
					$(".tomorrow-temperature").empty().append(tomorrow);
					$(".third-day-temperature").empty().append(thirdDay);
					$(".one").empty().append("<img src='assets/img/" + data.daily.data[0].icon + ".png'/>");
					$(".two").empty().append("<img src='assets/img/" + data.daily.data[1].icon + ".png'/>");
					$(".three").empty().append("<img src='assets/img/" + data.daily.data[2].icon + ".png'/>");
			})
		}

		//geolcoation failed
		function geolocationError(){
			alert('We could not locate you?  Did you leave the planet?')
		}

		function bindEvents(){
			$('.page').hammer()
				.on('swipeleft', swipeLeftHandler)	
				.on('swiperight', swipeRightHandler)
			;	

		}

		function swipeLeftHandler(e) {
			//make sure there is a page with .right
			//figure out which page is active (does not have .left or .right on it)
			//add .left that page to the left
			//remove .right from the next page
			if($('.page.right').length) {
				var $activePage = $('.page').not('.right, .left');
				var $nextPage = $activePage.next('.page');

				$activePage.addClass('left');
				$nextPage.removeClass('right');
			}
		}

		function swipeRightHandler(e) {
			if($('.page.left').length) {
				var $activePage = $('.page').not('.left, .right');
				var $prevPage = $activePage.prev('.page');

				$activePage.addClass('right');
				$prevPage.removeClass('left');
			}
		}
		return pub;
	}());

	$(document).ready(function(){
		app.init();
	});

	$(window).load(function(){

	});


})(window.jQuery, window);

/* 
	moment.js
		dealing with date and time -- can determine today and now 
		var date = new Date();
		var fDate = moment(date).fromNow();
	suncalc
		getTimes
		//suncalc runs and we determine that it is night
		timeOfDay = 'night';
		var imgSrc = timeOfTheDay + ' - '  + weatherStatus + '.svg'; //to pull the images
	for grabbing the images
		status.png
		sunny.png
		partlycloudy.png


		reverse Geolocation
		-developers.google.com
		-apis and auth
*/

