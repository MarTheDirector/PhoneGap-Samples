var loggedIn = false;
		function getFriends(user)
		{
			var df = new $.Deferred();
			
			FB.api('/' + user + '/friends', function(data){
				if(typeof(data.error) == "undefined")
				{
					df.resolve(data);
				}
				else
				{
					df.reject(data);
				}
			});
			return df.promise();
		}
		function getUser(user)
		{
			var df = new $.Deferred();
	
			FB.api('/' + user, function(data){
				if(typeof(data.error) == "undefined")
				{
					df.resolve(data);
				}
				else
				{
					df.reject(data);
				}
			});
			return df.promise();
		}
		
    	function showUserInfo(data){
                $("#fbName").text(data.name);
                $("#fbUsername").text(data.username);
                $("#fbLink").text(data.link);
                $("#fbGender").text(data.gender);
        }
			$(document).ready(function (){
			    
			    $("#friendsList").on("click", "li", function(){
			        //console.log($(this).data("id"));
			        getUser($(this).data("id")).done(showUserInfo);
			        
			        
			    });
			    
			    
			    
				window.fbAsyncInit = function() {
					$("#fbLogin").click(function(){
						if(loggedIn)
						{
							FB.logout();
						}
						else
						{
							FB.login();
						}
					});
					FB.Event.subscribe('auth.authResponseChange', function(response) {
						console.log("loginStatus:", response);
						if (response.status === 'connected') {
							loggedIn = true;
							$("#fbLogin").text("Log Out");
							getUser("me").done(showUserInfo);
							getFriends("me").done(function(data){
								for(var ct=0; ct < data.data.length; ct++)
								{
									var elem = $("<li></li>").text(data.data[ct].name);
									$("#friendsList").append(elem);
									elem.data("id", data.data[ct].id);
								}
							});
							//Logged into facebook and your app/make API calls
						} else if (response.status === 'not_authorized') {
							//Logged into facebook but not your app
							//I don't include this usually
						} else {
							//Not logged into either
						}
					});
				        FB.init({
					          appId : '807288552671573',
					          status : true,
					          xfbml : true
				        });
				};
			(function(d, s, id){
		         var js, fjs = d.getElementsByTagName(s)[0];
		         if (d.getElementById(id)) {return;}
			         js = d.createElement(s); js.id = id;
			         js.src = "//connect.facebook.net/en_US/all.js";
			         fjs.parentNode.insertBefore(js, fjs);
			 }(document, 'script', 'facebook-jssdk'));
			});