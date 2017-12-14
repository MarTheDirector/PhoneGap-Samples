; ( function($, window, undefined) {

	'use strict';

	var app = (function() {

		var pub = {};

		pub.localDev= false;//testing on device true is on browser

		var apiKeyForcast ='b155d67ee98e24109b45fd245a4f8d81';
		var apiUrlKeyForcast = 'https://api.forecast.io/forecast/';

		var apiKeyGoogleMapsGeoCode ="AIzaSyAbEBwvyr6lfksRzveiopt9OemTtpitfyY";
		var apiUrlGoogleMapsGeoCode ="https://maps.googleapis.com/maps/api/geocode/json";

		var apiKeyBrowserGoogleMaps ="AIzaSyD6INBmP0xsoAHFv2hAqYFETto1zBMEjmA";

		pub.coords = {};

		pub.init = function init() 
		{
			
			bindEvents(); //page swipe events
			startUp();
			
			photoGallery();
			videoGallery();
			photoButtonPressed();
			videoButtonPressed();
			scrollDisappear();
			

		};
		//get initial values
		function startUp()
		{	

			if(app.localDev) {
				
				getWeather();
				
			}

			else { 
				navigator
				.geolocation
				.getCurrentPosition
				(geolocationSuccess,geolocationError);
			}
		}


		//appending geocode location to actual lat/long
		function geoReverlocation (){
			

			

			var request = $.ajax({

				url: apiUrlGoogleMapsGeoCode,

				data: {

					latlng: app.coords.latitude + "," + app.coords.longitude,


					 
					key: apiKeyBrowserGoogleMaps
				},

				type:"GET"

			});

			request.done(function (data){
				console.log(data);
			})
		}


		//geolocation was sucessful
		function geolocationSuccess (position)
		{
			app.coords.latitude = position.coords.latitude;
			app.coords.longitude = position.coords.longitude;

			geoReverlocation();

			//callback function to trigger anything that uses our coordinates
			getWeather();
			//console.log(app.coords.latitude)
			
		}



		//capture phone media
		function captureMedia()
		{


						// capture callback
			function captureSuccess(mediaFiles) {
			    var i, path, len;
			    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			        path = mediaFiles[i].fullPath;
			        // do something interesting with the file
			        
			    }

			};
		}

		function getPhoto() {
		  
			pictureSource=navigator.camera.PictureSourceType;
		    destinationType=navigator.camera.DestinationType;

		    var largeImage = document.getElementById('largeImage');
		    largeImage.style.display = 'block';
		    largeImage.src = imageURI;



		}

		function takePicture(){

			navigator.camera.getPicture(camonSuccess, camonFail, {
				quality: 100, 
				destinationType: Camera.DestinationType.FILE_URI,
				targetWidth: 100,
  				targetHeight: 100,
  				 sourceType: camera.PictureSourceType.PHOTOLIBRARY,
  				}

  				);


		}

		function camonSuccess (imageURI){


			



			var image = document.getElementById('testImage');

			testImage.src = imageURI;

			image.style.display = "block";
		}

		function camonFail (message){

			alert ('Failed because: ' + message);


		}

	
		//capture photo/video

		function capturePhoto(){



		var pictureSource=navigator.camera.PictureSourceType;
        var destinationType=navigator.camera.DestinationType;

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			    destinationType: Camera.DestinationType.DATA_URL
			});

			function onSuccess(imageData) {
			    var image = document.getElementById('myImage');
			    image.src = "data:image/jpeg;base64," + imageData;
			}

			function onFail(message) {
			    alert('Failed because: ' + message);
			}
			//Take a photo and retrieve the image's file location:

			navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			    destinationType: Camera.DestinationType.FILE_URI });

			function onSuccess(imageURI) {
			    var image = document.getElementById('myImage');
			    image.src = imageURI;
			}

			function onFail(message) {
			    alert('Failed because: ' + message);
			}


        


		}
		
		function getWeather(){

			var url= apiUrlKeyForcast + apiKeyForcast + '/' + 
				app.coords.latitude + ',' +
				app.coords.longitude
			;

			var request = $.ajax({

				url: url

			});

			request.done(function (data){
				console.log(data);
			})

		}



		
		function geolocationError ()
		{
			//geolocation failed
			alert("couldn't find you");
		}

		function bindEvents() 
		{
			//using hammerJs to take care of this event on swipe left/ right forr the page class pages
			$('.page').hammer()
				.on('swipeleft', swipeLeftHandler)
				.on('swiperight', swipeRightHandler)
			;
		}

		function swipeLeftHandler(e) 
		{
			//make sure there is a page with .right
			//figure out which page is active(does not have.left or .right)
			//add .left to the page
			//remove.right from next page

			if($('.page.right').length) {
				var $activePage = $('.page').not('.right, .left');
				var $nextPage = $activePage.next('.page');

				
				$nextPage.removeClass('right');
				$activePage.addClass('left');
			}
		}

		function swipeRightHandler(e) 
		{
			//make sure there is a page with .left
			//figure out which page is active(does not have.left or .right)
			//add .right to the page
			//remove.left from next page

			if($('.page.left').length) 
			{
				var $activePage = $('.page').not('.right, .left');
				var $prevPage = $activePage.prev('.page');


				$prevPage.removeClass('left');
				$activePage.addClass('right');
				
			}
		}

		$('#newUserInfo').submit(function(e){

					
					saveUserData();
				})

		//listening for the signup button to be pressed on front startuppage
		$( "#signUpButton" ).click(function() 

				{
					$("#signPageContainer").show();
					$(".frontPageStuff").hide();
				});


		

		

		//this listner changes page to info input page 
		$( "#emailSignUp" ).click(function() 

			{
				$("#signPageContainer").hide();	
				$("#infoPageContainer").show();
			}

		);
		

		//this click listner checks the already a mememberhyperlink on the sign up page
			$("#alreadyMember").click(function()

				{

					//hides signUp page then shows login page info
					$("#signPageContainer").hide();	
					$("#loginPageContainer").show();
					$(".frontPageStuff").hide();

				}


			);


		//this click listner checks the login button on the front page
		$( "#loginButton" ).click(function() 

				{

					$("#loginPageContainer").show();
					$(".frontPageStuff").hide();
				}
			);



		

			$( "#forgotPassword" ).click(function() 

				{

				//set up functionality for when people forget their passwords here
				//console.log("forgot password")

				}

			);

		


			//sends back to the sign up page options
			$( "#signUpLink" ).click(function() 

				{

					
					
					$("#loginPageContainer").hide();
					$("#signPageContainer").show();
					$(".frontPageStuff").hide();
				}

			);


	
		function photoButtonPressed()
		{

			$("#photoButton").click(function()
			{	

				if($("#takeVideo").css('display') === 'none'){

					$("body").addClass('container');
					$("#takePhoto").toggle();

					//second click listner on photo button to take down overlay screenn

				}






			});

			$(".overLay").click(function()
			{
				$("body").removeClass('container');
				$("#takePhoto").hide();

			});
			
			
		}

		function videoButtonPressed()
		{
			
					$("#videoButton").click(function()
					{	

						if($("#takePhoto").css('display') === 'none'){

							$("body").addClass('container');
							$("#takeVideo").toggle();
						}

					});

					$(".overLay").click(function()
					{
						$("body").removeClass('container');
						$("#takeVideo").hide();

					});

				
			
		}

		function photoGallery(){

			$(".galleryUploadPhoto").click(function(){

				$("#main-content").hide();
				$("#photoGalleryPhoneTemplate").toggle();
				
				getPhoto();

			});

			$(".backButton").click(function(){

				$("#photoGalleryPhoneTemplate").hide();
				$("#main-content").show();
			});
		}



		function videoGallery(){

			$(".galleryUploadVideo").click(function(){

				$("#main-content").hide();
				

			});
		}

		function scrollDisappear(){

			
		  var prevScroll = 0,
		      curDir = '',
		      prevDir = '';
		  
		  $(window).scroll(function(){
		    		if($(this).scrollTop() > prevScroll){
			          curDir = 'down';
			          if(curDir != prevDir){
			          	$('#bottomFunction').stop();
			    	  	$('#bottomFunction').fadeOut(500);
			          	prevDir = curDir;
			          }
			      } else {
			          curDir = 'up';
			          if(curDir != prevDir){
			          	$('#bottomFunction').stop();
			          	$('#bottomFunction').fadeIn(500);
			          	prevDir = curDir;
			          }
			      }
			    
		      prevScroll = $(this).scrollTop();
		  });
		}


		

			$(".cameraCall").click(function(){

				$("#main-content").hide();
				
				

				takePicture();
			});
		



			$( "#loginGo" ).click(function() 

				{


				$("body").css({ overflowy: 'visible', overflowx: 'none'});
				$("#mainApp").removeClass('container');
				$("#mainApp").addClass('testcontainer');
				$("#main-content").show();
				$("#loginPageContainer").hide();
				


				//console.log("made it");


				//var source   = $("#test-template").html();


				//var data  = {


				//avi: "avi",
				//username: "@MaddieModel",
				//timeStamp: "30 s",
				//jot: "this is message",
				//counterForResurge: "20",
				//resurgeIcon:"resurgeIcon",
				//counterForAdmire:"20",
				//admireIcon:"admire"

				//}	

				//var template = Handlebars.compile(source);
				//var temp = template(data);

				//console.log(data)
				//$(document.body).append(template);
				
			}

			);



		

		








		return pub;
	}());

	$(document).ready( function() 
	{
		app.init();

		
	});

	$(window).load( function()
	{


	});









}) (window.jQuery, window);





		
		

		
	