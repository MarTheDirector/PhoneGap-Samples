/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
            $('body').bind('touchmove', function(e){e.preventDefault()})

            $("#hiw").show("fast");
            navigator.geolocation.watchPosition(geoSuccess, geoError);

            $(".getstartedbtn").on("click", function(){
                $("#hiw").hide("fast");
                $('body').unbind('touchmove')
            });

            $(".hamburger-nav").on("click", function(){
                $("#nav").show("fast");
                $(".hamburger-nav").hide();
            });

            $(".close-nav").on("click", function(){
                $("#nav").hide("fast");
                $(".hamburger-nav").show();
            });

            $('#camera').on("click", function(){
                navigator.camera.getPicture(cameraSuccess, cameraError);
            });

            $('.menu-icon').on("click", function(){
                $("#nav").hide("fast");
                $(".hamburger-nav").show();
            });

            $(document).on("click", ".gall-img1", function(){
                $.colorbox({html:'<div class="gall-img1 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img2", function(){
                $.colorbox({html:'<div class="gall-img2 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img3", function(){
                $.colorbox({html:'<div class="gall-img3 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img4", function(){
                $.colorbox({html:'<div class="gall-img4 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img5", function(){
                $.colorbox({html:'<div class="gall-img5 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img6", function(){
                $.colorbox({html:'<div class="gall-img6 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img7", function(){
                $.colorbox({html:'<div class="gall-img7 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img8", function(){
                $.colorbox({html:'<div class="gall-img8 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img9", function(){
                $.colorbox({html:'<div class="gall-img9 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img10", function(){
                $.colorbox({html:'<div class="gall-img10 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img11", function(){
                $.colorbox({html:'<div class="gall-img11 modal-img"></div>'});
            });

            $(document).on("click", ".gall-img12", function(){
                $.colorbox({html:'<div class="gall-img12 modal-img"></div>'});
            });
    }
};

function geoSuccess(position) {
    console.log(position);
    var radius = .10; //hardcoded for testing
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var makeFlickrRequest = function (options, cb) {
        var url, xhr, item, first;

        url = "https://api.flickr.com/services/rest/";
        first = true;

        for (item in options) {
            if (options.hasOwnProperty(item)) {
                url += (first ? "?" : "&") + item + "=" + options[item];
                first = false;
            }
        }

        xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cb(this.response);
        };
        xhr.open('get', url, true);
        xhr.send();

    };

    var options = {
        "api_key": "a06f87d4241f81daa8d4c523daa7720e",
        "method": "flickr.photos.search",
        "format": "json",
        "nojsoncallback": "1",
        "lat": lat,
        "lon": lon,
        "radius": radius,
        "per_page": 12,
        "safe_search": "1",
        "content_type": "1",
        "page": "1",

    }

    makeFlickrRequest(options, function (data) {
        data = JSON.parse(data);
        var s = "";
        for (var i = 0; i < data.photos.photo.length; i++) {
            photo = data.photos.photo[i];
            imgId = i+1;
            htmlId = ".gall-img" + imgId;

            t_url = "https://farm" + photo.farm + ".static.flickr.com/" +
                photo.server + "/" + photo.id + "_" + photo.secret + "_" + "m.jpg";
            p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
            s += '<a href="' + p_url + '">' + '<img alt="' + photo.title +
                '"src="' + t_url + '"/>' + '</a>';
            $(htmlId).css('background-image', 'url(' + t_url + ')');    
        }
    });

}
function geoError(error) {
    console.log("Error:" + error);
}

function cameraSuccess(obj) {
    console.log(obj);
}

function cameraError(error) {
    console.log("Error:" + error);
}