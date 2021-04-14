


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
    //alert(username);
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
    
                      //center_latitude = add_client_latitude;
                      //center_longitude = add_client_longitude;
                      //alert("center_latitude " + center_latitude);
                      showMap();
                     // initMap(center_latitude,center_longitude,add_client_latitude,add_client_longitude,add_client_location_name,username_latitude,username_longitude,username_location_name);
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

    function showMap() {
        map = new google.maps.Map(document.getElementById("map"), { 
            zoom: 18,
            rotateControl: true,
            center: new google.maps.LatLng(center_latitude, center_longitude),
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            draggableCursor: "default",
            zoomControl: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_BOTTOM,
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER,
            },
            scaleControl: true,
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP,
            },
            fullscreenControl: true,
            heading: 90,
            tilt: 45,
        });//
        

        //Navigation Functions
        
        /**marker1 = new google.maps.Marker({
          map,
          draggable: true,
          position: { lat: 25.77388242, lng: -80.1420459 },
        });
        marker2 = new google.maps.Marker({
          map,
          draggable: true,
          position: { lat: 25.77091701, lng: -80.14154328 },
        });
        const bounds = new google.maps.LatLngBounds(
          marker1.getPosition(),
          marker2.getPosition()
        );
        map.fitBounds(bounds);
        google.maps.event.addListener(marker1, "position_changed", update);
        google.maps.event.addListener(marker2, "position_changed", update);
        poly = new google.maps.Polyline({
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });
        geodesicPoly = new google.maps.Polyline({
          strokeColor: "#CC0099",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          geodesic: true,
          map: map,
        });
        update();*/
        //alert(map.getHeading());
        
        
        //kmlLayer
        /**const kmlLayer = new google.maps.KmlLayer({
          url:
            "http://bingwasafaris.atwebpages.com/miami7.kml",
          suppressInfoWindows: true,
          map: map,
        });
        kmlLayer.addListener("click", (kmlEvent) => {
          text = text + "<br>" + kmlEvent.featureData.name;
          showInContentWindow(text);
        });
        kmlLayer.addListener('defaultviewport_changed', function(event) {
          var content = kmlLayer.getDefaultViewport();
          text = text + "<br>" + "defaultviewport_changed " + content;
          showInContentWindow(text);
        });
        kmlLayer.addListener('status_changed', function(event) {
          var content = kmlLayer.getStatus();
          text = text + "<br>" + "defaultviewport_changed " + content;
          showInContentWindow(text);
        });*/
        
        
        //markers
        var locations = [
            ['' + add_client + '',add_client_latitude,add_client_longitude,0,],
            ['' + username + '',username_latitude,username_longitude,0,],
        ];
        
        var icon3d = {
            url: "https://i.pinimg.com/736x/b7/02/af/b702afc7b811840ebc49037cdc98bc45.jpg", // 
            scaledSize: new google.maps.Size(15, 15), // scaled 
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(15, 15) // 
        };
    
        for (i = 0; i < locations.length; i++) {
            console.log(locations[i][0]);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon3d,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                opacity:100.0,
                store_id: locations[i][0],
            });
            // process multiple info windows
            (function(marker, i) {
                // add click 
                google.maps.event.addListener(marker, 'click', function() {
                    //toggleBounce();
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    var marker_id = marker.get('store_id');
                    text = text + "<br>" + "marker_id " + marker_id;
                    const sidebar = document.getElementById("sidebar");
                    sidebar.innerHTML = text;
                });
                google.maps.event.addListener(marker, 'defaultviewport_changed', function() {
                    var marker_id = marker.get('store_id');
                    var content = marker.getDefaultViewport();
                    text = text + "<br>" + "marker_id " + marker_id + "defaultviewport_changed " + content;
                    const sidebar = document.getElementById("sidebar");
                    sidebar.innerHTML = text;
                });
                google.maps.event.addListener(marker, 'status_changed', function() {
                    var marker_id = marker.get('store_id');
                    var content = marker.getStatus();
                    text = text + "<br>" + "marker_id " + marker_id + "status_changed " + content;
                    const sidebar = document.getElementById("sidebar");
                    sidebar.innerHTML = text;
                });
            })(marker, i);
        }
        
        
        

        function showInContentWindow(text) {
          const sidebar = document.getElementById("sidebar");
          sidebar.innerHTML = text;
        }
    }

    
    
    let map;
    let sv;
    var text = "";
    var marker;
    var layers = [];
    let marker1, marker2;
    let poly, geodesicPoly;
    let panorama;

    

    
      function initMap() {
        alert(username);

        addMarkersToMap_client(latitude,longitude);  
      }
      function autoStreetview(){
        sv = new google.maps.StreetViewService();
        panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano")
        );
        // Set the initial Street View camera to the center of the map
        sv.getPanorama({ location: new google.maps.LatLng(center_latitude, center_longitude), radius: 50 }, processSVData);
        // Look for a nearby Street View panorama when the map is clicked.
        // getPanorama will return the nearest pano when the given
        // radius is 50 meters or less.
        map.addListener("click", (event) => {
          sv.getPanorama({ location: event.latLng, radius: 50 }, processSVData);
        });
          
      }
      function processSVData(data, status) {
        if (status === "OK") {
          const location = data.location;
          const marker = new google.maps.Marker({
            position: location.latLng,
            map,
            title: location.description,
          });
          panorama.setPano(location.pano);
          panorama.setPov({
            heading: 270,
            pitch: 0,
          });
          panorama.setVisible(true);
          marker.addListener("click", () => {
            const markerPanoID = location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
              heading: 270,
              pitch: 0,
            });
            panorama.setVisible(true);
          });
        } else {
          text = text + "<br>" + "error " + "Street View data not found for this location.";          
          const sidebar = document.getElementById("sidebar");
          sidebar.innerHTML = text;
        }
      }
      function autonavigate() {
            marker1 = new google.maps.Marker({
                map,
                draggable: true,
                position: { lat: add_client_latitude, lng: add_client_longitude },
            });
            marker2 = new google.maps.Marker({
                map,
                draggable: true,
                position: { lat: username_latitude, lng: username_longitude },
            });
            const bounds = new google.maps.LatLngBounds(
                marker1.getPosition(),
                marker2.getPosition()
            );
            map.fitBounds(bounds);
            google.maps.event.addListener(marker1, "position_changed", update);
            google.maps.event.addListener(marker2, "position_changed", update);
            poly = new google.maps.Polyline({
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map: map,
            });
            geodesicPoly = new google.maps.Polyline({
                strokeColor: "#CC0099",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                geodesic: true,
                map: map,
            });
            update();
            
      }
      function update() {
        const path = [marker1.getPosition(), marker2.getPosition()];
        poly.setPath(path);
        geodesicPoly.setPath(path);
        const heading = google.maps.geometry.spherical.computeHeading(
          path[0],
          path[1]
        );
        document.getElementById("heading").value = String(heading);
        document.getElementById("origin").value = String(path[0]);
        document.getElementById("destination").value = String(path[1]);
      }
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      function rotate90() {
          const heading = map.getHeading() || 0;
          const heddingset = heading + 90;
          text = text + "<br>" + "setHeading " + heddingset;          
          map.setHeading(heddingset);
          const sidebar = document.getElementById("sidebar");
          sidebar.innerHTML = text;
         // showInContentWindow(text);          
      }
      function autoRotate() {
          // Determine if we're showing aerial imagery.
          //alert(map.getTilt());
          if (map.getTilt() !== 0) {
            window.setInterval(rotate90, 3000);  
          }
      }
     