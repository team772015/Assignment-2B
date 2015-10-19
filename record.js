
var outString=document.getElementById("");
var run_id=''; //Name of the run
var watch_id=null; //ID of the geoloacation
var run_data=[]; //Array of the GPS loccations

function getLocation(){
      if (navigator.geolocation) { 
          var options={enableHighAccuracy:true}
         watch_id = navigator.geolocation.watchPosition(pos,err, options);
          
      } else{ 
          outString.innerHTML="Geolocation not supported";
      }

}
    function pos{{
    run_data.push(pos);}
    

var startLatLng = new google.maps.LatLng(run_data[0].coords.latitude, run_data[0].coords.longitude);
                               

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: startLatLng,
    zoom: 8
  });
}
 
var startmarker = new google.maps.Marker({
    position: startLatLng,
    map: map,
    title: 'start point'
  });  
         
    startmarker.setMap(map)             

var run_LatLng =[];

for(var i=0; i<run_data.length; i++){
    run_LatLng.push(new google.maps.LatLng(run_data[i].coords.latitude,run_data[i].coords.longtitude));
}


    
var run_Path = new google.maps.Polyline({
    path: run_LatLng,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

run_Path.setMap(map);

                }


function stop_tracking(){
     // Stop tracking the user
    navigator.geolocation.clearWatch(watch_id);
    
    
    var endLatLng = new google.maps.LatLng(run_data[run_data.length-1].coords.latitude, run_data[run_data.length-1].coords.longitude);
    
    var endmarker = new google.maps.Marker({
    position: startLatLng,
    map: map,
    title: 'end point'
  });  
    
    endmarker.setMap(map)

// Save the tracking data
    window.localStorage.setItem(run_id, JSON.stringify(run_data));
    
    // emptying data array
    run_data=[];
    watch_id=null;
    // clear all markers and polylines from the map
    run_path.setMap(null);
    endmarker.setMap(null);
    startmarker.setMap(null);
}




