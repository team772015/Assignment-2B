<!DOCTYPE html>
<!--
 *
 * Open Flights web app example
 * 
 * Copyright (c) 2015  Monash University
 *
 * Written by Michael Wybrow
 *
 * ----------------------------------------------------------------------------
 * The 'flightData' object Contains information from OpenFlights.org, which is 
 * made available here under the Open Database License (ODbL). - See more at:
 *    https://opendatacommons.org/licenses/odbl/1.0/
 * ----------------------------------------------------------------------------
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
-->
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>  
    <script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <title>Melbourne Flights</title>
	<style type="text/css">
		.subtitle {
			font-size: small;
            color: slategrey;
		}
	</style>  </head>
  <body>
    <div data-role="page" id="page">
      <div data-role="header" data-position="fixed">
         <h1>Melbourne Flights</h1>
      </div>
      <div data-role="content">
        <ul data-role="listview" id="flights-list">
			<!-- content is inserted by JavaScript here -->
        </ul>
      </div>
    </div>

    <script>
    var flightsListElement = document.getElementById('flights-list');
	var routes = [];
 
    // Handle the user tapping on rows in list by calling listRowTapped().
    // jQuery Mobile magic.
    $('#flights-list').delegate('li', 'tap', listRowTapped);
	
	// Make the request
	var data = {
		airline: "QF",
		sourceAirport: "LAX",
		callback: "routesResponse"
	};	
	jsonpRequest("https://eng1003.eng.monash.edu/OpenFlights/routes/", data);
 	
	function jsonpRequest(url, data)
	{
		// Build URL parameters from data object.
		var params = "";
		// For each key in data object...
		for (var key in data)
		{
			if (data.hasOwnProperty(key))
			{
				if (params.length == 0)
				{
					// First parameter starts with '?'
					params += "?";
				}
				else
				{
					// Subsequent parameter separated by '&'
					params += "&";
				}

				var encodedKey = encodeURIComponent(key);
				var encodedValue = encodeURIComponent(data[key]);

				params += encodedKey + "=" + encodedValue;
			 }
		}
		var script = document.createElement('script');
		script.src = url + params;
		document.body.appendChild(script);
	}
  
	function routesResponse(routesArray)
	{
		 routes = routesArray;
	    // List view section heading: Flight list
	    var listHTML = "";

		//   PART 1:
	    // ADD CODE HERE TO ITERATE OVER ROUTES ARRAY AND CREATE
		// LIST ITEMS FOR EACH ROUTE (AS BELOW)
		for( i=0;i<routes.length;i++)
        {
        // Format of list item is:
        //   <li>[SOURCE AIRPORT] -> [DEST AIRPORT]
        //   <div class="subtitle">[AIRLINE CODE], Stops: [STOPS]<div></li>
        // 
        listHTML += "<li>" + routes[i].sourceAirport + " &rarr; " + routes[i].destinationAirport;
        listHTML += "<div class=\"subtitle\">" + routes[i].airline + ", Stops: " + routes[i].stops +"</div></li>";
        }

	    // Insert the list view elements into the flights list.
	    flightsListElement.innerHTML = listHTML;
        // Update jQuery Mobile style for new elements.
        $('#flights-list').listview('refresh');

	}
	
	function airportResponse(airport)
	{
		var message = "Name: " + airport.name + "\n";
		message += "Location: " + airport.city + ", " + airport.country;
		alert(message);
	}
 
    function listRowTapped()
    {
        // The index of the route item tapped on.  jQuery Mobile magic.
        var routesIndex = $(this).index();
		
		console.log(routes[routesIndex].destinationAirport + "(" + routes[routesIndex].destinationAirportId + ")");

		//   PART 2:
		// ADD CODE HERE TO REQUEST AIRPORT INFORMATION
       var data = {
           id:routes[routesIndex].destinationAirportId,
           callback: "airportResponse"
        };
jsonpRequest("https://eng1003.eng.monash.edu/OpenFlights/airport/", data);

        
	}


        
	</script>
  </body>
</html>
