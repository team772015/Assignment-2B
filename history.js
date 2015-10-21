/ When the user views the Track Info page
function getRoutes () {

    // Find the track_id of the workout they are viewing
    var key = $(this).attr("track_id");

    // Update the Track Info page header to the track_id
    $("#track_info div[data-role=header] h1").text(key);

    // Get all the GPS data for the specific workout
    var data = window.localStorage.getItem(key);

    // Turn the stringified GPS data back into a JS object
    data = JSON.parse(data);
    
    
// Calculate the total distance travelled
total_km = 0;
 
for(i = 0; i < data.length; i++){
     
    if(i == (data.length - 1)){
        break;
    }
     
    total_km += gps_distance(run_data[i].coords.latitude, run_data[i].coords.longitude, run_data[i+1].coords.latitude, run_data[i+1].coords.longitude);
}
 
total_km_rounded = total_km.toFixed(2);



// Calculate the total time taken for the track
start_time = new Date(data[0].timestamp).getTime();
end_time = new Date(data[data.length-1].timestamp).getTime();
 
total_time_ms = end_time - start_time;
total_time_s = total_time_ms / 1000;
 
final_time_m = Math.floor(total_time_s / 1000);
final_time_s = total_time_s - (final_time_m * 60);
 
// Display total distance and time
outString.innerHTML=('Travelled <strong>' + total_km_rounded + '</strong> km in <strong>' + final_time_m + 'm</strong> and <strong>' + final_time_s + 's</strong>');



     
 
       
    //calculating the distance
function gps_distance(lat1, lon1, lat2, lon2) {
  
    var R = 6371; // km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}

// Set the initial Lat and Long of the Google Map
var myLatLng = new google.maps.LatLng(data[0].coords.latitude, data[0].coords.longitude);
 
// Google Map options
var myOptions = {
  zoom: 15,
  center: myLatLng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
 
// Create the Google Map, set options
var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    var startmarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'start point'
  });  
         
    startmarker.setMap(map)
    
    var run_LatLng =[];

for(var i=0; i<data.length; i++){
    run_LatLng.push(new google.maps.LatLng(data[i].coords.latitude,data[i].coords.longtitude));
}


    
var run_Path = new google.maps.Polyline({
    path: run_LatLng,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

run_Path.setMap(map);
    
    
     var endLatLng = new google.maps.LatLng(data[data.length-1].coords.latitude, data[data.length-1].coords.longitude);
    
    var endmarker = new google.maps.Marker({
    position: startLatLng,
    map: map,
    title: 'end point'
  });  
}
    
    endmarker.setMap(map)
    
    function delete_route(){
    
    delete_id=null;
        
    routes=routesArray;
    
     var routesIndex = $(this).index();
    
    if (delete_id){
    
    routes.splice(routesIndex,1)}
        
        else
            break;
    
    
    }
