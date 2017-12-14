Basic Weather App Using Forecast.io  
=========

<h2> About this Weather App Package </h2>

<ul>
    <li> This Hybrid application was generated using <a href="http://phonegap.com/"> PhoneGap </a> </li>
    <li> Utilizes the Forecast.io application to pull forecast information </li>
    <li> Geolocation using <a href="http://docs.phonegap.com/en/edge/cordova_geolocation_geolocation.md.html"> Cordova </a>geolocation plugin </li>
    <li> <a href="http://adamwhitcroft.com/climacons/"> Climacons </a> used for basic icons produced by the <a href="https://developer.forecast.io/"> Forecast.io </a> API </li>
    <li> Basic data being pulled includes current temperatures, three-day forecast hourly information, etc.</li>
    <li> Flat design swipe functionality
        <li> First page: Current Weather / 3 day forecast </li>
        <li> Second page: Next 8 hour forecast </li>
        <li> Third page: 8-15th hour forecast </li>
    </li>
</ul>

<h2> Viewing / Testing this Application  </h2>

<ol>
    <li> <b> If you have PhoneGap, </b> download this whole folder</li>
    <li> <b> Be sure to addd your API Key to the index.js file to retrieve weather data.</b></li>
    <li> In the terminal, type phonegap run ios or phonegap run android </li>
    <li> To retrieve geoLocation, esp on desktop, make sure to include the <a href="http://docs.phonegap.com/en/edge/cordova_geolocation_geolocation.md.html">Cordova geolocation plugin</a> </li>
    <li> Also if testing on desktop, open Safari </li>
    <li> Be sure that the Develop tab is open. If not, click Safari > Preferences > Advanced > Click 'Show Develop tab' </li>
    <li> If also using iosSimulator, hover Develop tab then hover iosSimulator and open the index.html (needs to be also running in the iosSimulator to appear)</li>
    <li> Type into the console 'location.reload(). This should make an alert box appear in the simulator. An object should be returned if all </li>
</ol>

<h2> Where are the files? </h2>
<ol>
    <li> The development files are in the www folder </li>
    <li> Inside of the www is the assets folder which contains the .css, .js, and .img files.</li>
</ol>

<h2> Helpful Resources </h2>

<ol> 
    <li> <a href="http://phonegap.com/"> PhoneGap </a></li>
    <li> <a href="https://build.phonegap.com/apps"> PhoneGap Build </a></li>
    <li> <a href="https://developer.forecast.io/">Forecast.io</a></li>
    <li> <a href="http://suncalc.net/#/34.889,-81.021,12/2015.04.02/00:31"> SunCal: </a> an app that tells when sunrise and sunset will occur.</li>
    <li> <a href="http://momentjs.com/"> Moment.js</a>: Forecast.io returns a UNIX timestamp for time. Moment.js converts this to date, time, etc. </li>
</ol>