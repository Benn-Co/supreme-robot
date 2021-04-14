var center_latitude = -1.2845056;
var center_longitude = 36.8345088;
var latitude_startCoord = -1.2845056;//from add_cient
var longitude_startCoord = 36.8345088;//from add_cient
var latitude_endCoord = -1.0899;//to username//
var longitude_endCoord = 36.8640;//to username
//import { colorCode } from '../js/index.js'
//localStorage.setItem("add_client", add_client);
    //localStorage.setItem("username", username);
//alert(username);
var add_client = localStorage.getItem("add_client");
var add_client_latitude = 0;
var add_client_location_name = "";
var add_client_longitude = 0;
var username = localStorage.getItem("username");
var username_latitude = 0;
var username_location_name = "";
var username_longitude = 0;
alert(username);
var path_protocol = window.location.protocol;
var host_name = window.location.hostname;
var port = window.location.port;
var path_name = window.location.pathname;
var path_href = window.location.href;

var api_server_url = "https://oramla.com";

function addMarkersToMap_client(latitude,longitude){
  //alert("username ");
    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { agent_location_map: 12, username: username, add_client: add_client, latitude: latitude, longitude:longitude},
        processData: true,
        url: api_server_url + '/cordova/map/agent_location_map.php',
        success: function searchSuccess(response) {
          //alert(response);
            try {
                if (response.message == "success") {
                  //var dataa = response.data_requested;
                  //dataa = response.data_returned;

                  add_client = response.add_client;
                  //alert("add_client " + add_client);

                  add_client_latitude = response.add_client_latitude;
                  add_client_longitude = response.add_client_longitude;
                  add_client_location_name = response.add_client_location_name;

                  username = response.username;
                  //alert("username " + username);

                  username_latitude = response.username_latitude;
                  username_longitude = response.username_longitude;
                  username_location_name = response.username_location_name;

                  center_latitude = add_client_latitude;
                  center_longitude = add_client_longitude;
                  //alert("center_latitude " + center_latitude);
                  initMap(center_latitude,center_longitude,add_client_latitude,add_client_longitude,add_client_location_name,username_latitude,username_longitude,username_location_name);
                  //addMarkersToMap(map);
                }
                else if(response.message == "fail validate"){                    
                    alert(response.validate_message);
                } else {
                    alert(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                alert('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}
var map;
var layers = [];
var marker;
var src = 'http://sunconsulting.atwebpages.com/sunconsulting.kml';

function initMap(center_latitude,center_longitude,add_client_latitude,add_client_longitude,add_client_location_name,username_latitude,username_longitude,username_location_name) {
        //alert(src);
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            rotateControl: true,
            center: new google.maps.LatLng(center_latitude, center_longitude),
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            draggableCursor: "default",
            zoomControl: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER,
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER,
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP,
            },
            fullscreenControl: true,
            heading:57.03110793655839,
            tilt:59.5038811358443,
            range:724.5661515438406,
        });
                
        layers[0] = new google.maps.KmlLayer('http://sunconsulting.org/szzz_2.kmz', {
            preserveViewport: true
        });
        layers[1] = new google.maps.KmlLayer('http://sunconsulting.org/docks_1222.kmz', {
            preserveViewport: true
        });

        for (var i = 0; i < layers.length; i++) {
            layers[i].setMap(map);
        }

        //adding a KML layer to a map.
        var kmlLayer = new google.maps.KmlLayer('https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml', {
          preserveViewport: true
        });
        kmlLayer.setMap(map);
        
        kmlLayer.addListener('click', function(event) {
          var content = event.featureData.infoWindowHtml;
          var testimonial = document.getElementById('capture');
          testimonial.innerHTML = content;
        });
       
        var locations = [
          ['' + add_client + ' At ' + add_client_location_name + '',add_client_latitude,add_client_longitude,0,],
          ['' + username + ' At ' + username_location_name + '',username_latitude,username_longitude,0,],
        ];

        var icon3d = {
            url: "https://i.pinimg.com/736x/b7/02/af/b702afc7b811840ebc49037cdc98bc45.jpg", // 
            scaledSize: new google.maps.Size(15, 15), // scaled 
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(15, 15) // anchor
        };

        for (i = 0; i < locations.length; i++) {
            console.log(locations[i][0]);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon3d,
                map: map,
                opacity:100.0,
                store_id: locations[i][0],
            });
            // process multiple info windows
            (function(marker, i) {
                // add click event
                google.maps.event.addListener(marker, 'click', function() {
                    var marker_id = marker.get('store_id');
                    //var content = event.featureData.infoWindowHtml;
                    var testimonial = document.getElementById('capture');
                    //testimonial.append(marker_id);
                    testimonial.innerHTML = marker_id;
                });
            })(marker, i);
        }        

        /**var kmlLayer = new google.maps.KmlLayer(src, {
          suppressInfoWindows: true,
          preserveViewport: true,
          map: map
        });
        kmlLayer.addListener('click', function(event) {
          var content = event.featureData.infoWindowHtml;
          var testimonial = document.getElementById('capture');
          testimonial.innerHTML = content;
        });*/
        

}
window.onload = function () {
  
  //alert();
  addMarkersToMap_client(center_latitude,center_longitude);
}





