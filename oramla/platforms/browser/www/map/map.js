    var center_latitude = -1.2845056;
    var center_longitude = 36.8345088;
    var latitude_startCoord = -1.2845056;//from add_cient
    var longitude_startCoord = 36.8345088;//from add_cient
    var latitude_endCoord = -1.0899;//to username//
    var longitude_endCoord = 36.8640;//to username
    var add_client = localStorage.getItem("add_client");
    var add_client_latitude = -1.2845056;
    var add_client_location_name = "";
    var add_client_longitude = 36.8345088;
    var username = localStorage.getItem("username");
    var username_latitude = -1.3845056;
    var username_location_name = "";
    var username_longitude = 36.9345088;
    var path_protocol = window.location.protocol;
    var host_name = window.location.hostname;
    var port = window.location.port;
    var path_name = window.location.pathname;
    var path_href = window.location.href;    
    var api_server_url = "https://oramla.com";
    
    let map;
    let sv;
    var text = "";
    var marker;
    var layers = [];
    let marker1, marker2;
    let poly, geodesicPoly;
    let panorama;
    
      function initMap() {
        text = "";         
        showInContentWindow(text);
        document.getElementById("map").style.width = "100%";
        document.getElementById("pano").style.width = "auto";
        addMarkersToMap_client(center_latitude,center_longitude);        
      }
      function autoStreetview(){        
        sv = new google.maps.StreetViewService();
        panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano")
        );
        // Set the initial Street View camera to the center of the map center_latitude, center_longitude
        sv.getPanorama({ location: new google.maps.LatLng(center_latitude, center_longitude), radius: radius }, processSVData);
        // Look for a nearby Street View panorama when the map is clicked.
        // getPanorama will return the nearest pano when the given
        // radius is 50 meters or less.
        map.addListener("click", (event) => {
          sv.getPanorama({ location: event.latLng, radius: radius }, processSVData);
        });          
      }
      function processSVData(data, status) {
        if (status === "OK") {
          text = radius + " meters or less street View near Agent <b>" + add_client + "</b> location.";         
          showInContentWindow(text);
          document.getElementById("map").style.width = "50%";
          document.getElementById("pano").style.width = "50%";
          const location = data.location;
          const marker = new google.maps.Marker({
            position: location.latLng,
            map,
            title: location.description,
          });
          panorama.setPano(location.pano);
          panorama.setPov({
            heading: heading,
            pitch: angle,
          });
          panorama.setVisible(true);
          marker.addListener("click", () => {
            const markerPanoID = location.pano;
            // Set the Pano to use the passed panoID.
            panorama.setPano(markerPanoID);
            panorama.setPov({
              heading: heading,
              pitch: angle,
            });
            panorama.setVisible(true);
          });
        } else {
          //text = text + "<br>" + "error " + "Street View data not found for this location."; 
          text = "Street View data not found for Agent <b>" + add_client + "</b> location.";         
          showInContentWindow(text);
          document.getElementById("map").style.width = "100%";
          document.getElementById("pano").style.width = "auto";
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

      function agent_location() {
        initMap();
      }

      function update() {
        const path = [marker1.getPosition(), marker2.getPosition()];
        poly.setPath(path);
        geodesicPoly.setPath(path);
        const heading = google.maps.geometry.spherical.computeHeading(
          path[0],
          path[1]
        );
        text = "Heading " + String(heading) + "<br>" + "Origin " + String(path[0]) + "<br>" + "Destination " + String(path[1]);         
        showInContentWindow(text);
      }
      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }

      function addMarkersToMap_client(latitude,longitude){
        document.getElementById("agent_location").value = "Agent " + add_client + " location";
          $.ajax({
              type: "POST", // Type of request to be send, called as 
              dataType: 'json',
              data: { agent_location_map: 12, username: username, add_client: add_client, latitude: latitude, longitude:longitude},
              processData: true,
              url: api_server_url + '/cordova/map/agent_location_map.php',
              success: function searchSuccess(response) {
                  try {
                      if (response.message == "success") {
                        add_client = response.add_client;
                        //alert("add_client " + add_client);      
                        //add_client_latitude = response.add_client_latitude;
                        //add_client_longitude = response.add_client_longitude;
                        add_client_location_name = response.add_client_location_name;
      
                        username = response.username;
                        //alert("username " + username);      
                        //username_latitude = response.username_latitude;
                        //username_longitude = response.username_longitude;
                        username_location_name = response.username_location_name;      
                        //center_latitude = add_client_latitude;
                        //center_longitude = add_client_longitude;
                        showMap();
                        autoStreetview();                       
                      }
                      else if(response.message == "fail validate"){                    
                          text = response.validate_message;         
                          showInContentWindow(text);
                      } else {
                          text = response.signup_email + " or " + response.signup_password;         
                          showInContentWindow(text);
                      }
                  } catch(e) {
                      //alert('JSON parsing error');
                      text = 'JSON parsing error';         
                      showInContentWindow(text);
                  }          
              },
              error: function searchError(xhr, err) {
                //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
                text = "Error on ajax call: " + err  + " " + JSON.stringify(xhr);         
                showInContentWindow(text);
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
            heading:heading,
            tilt:angle,
            range:724.5661515438406,
        });
        //markers
        /**var client_marker = new google.maps.Marker({
            position: new google.maps.LatLng(add_client_latitude,add_client_longitude),
            title:add_client
        });        
        // To add the marker to the map, call setMap();
        client_marker.setMap(map);

        var username_marker = new google.maps.Marker({
            position: new google.maps.LatLng(username_latitude,username_longitude),
            title:username
        });        
        // To add the marker to the map, call setMap();
        username_marker.setMap(map); */

        //markers
        var locations = [
            ['' + add_client + '',add_client_latitude,add_client_longitude,0,],
            ['' + username + '',username_latitude,username_longitude,0,],
        ];

        /**var icon3d = {
            url: "https://i.pinimg.com/736x/b7/02/af/b702afc7b811840ebc49037cdc98bc45.jpg", // 
            scaledSize: new google.maps.Size(15, 15), // scaled 
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(15, 15) // 
        }; */
    
        for (i = 0; i < locations.length; i++) {
            //console.log(locations[i][0]);
            /**marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon3d,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                opacity:100.0,
                store_id: locations[i][0],
            }); */
            var icon = '';
            if (i < 1) {
                icon = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#F00',
                    fillOpacity: 1,
                    scale: 10,
                };
            } else {
                icon = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#11b802',
                    fillOpacity: 1,
                    scale: 10,
                };
            }
           // var userlocation = locations[i][0];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: icon,
                animation: google.maps.Animation.DROP,
                opacity:100.0,
                store_id: locations[i][0],
                title:locations[i][0]
            });        
            // To add the marker to the map, call setMap();
            marker.setMap(map);
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
                    if (marker_id==username) {
                        text = "<b>Your</b> location";
                    } else {
                        text = "<b>" + marker_id + "</b> location";
                    }
                    showInContentWindow(text);
                });
                google.maps.event.addListener(marker, 'defaultviewport_changed', function() {
                    var marker_id = marker.get('store_id');
                    var content = marker.getDefaultViewport();
                    text = "<b>" + marker_id + "</b> location" + " default view port changed " + content;
                    showInContentWindow(text);
                });
                google.maps.event.addListener(marker, 'status_changed', function() {
                    var marker_id = marker.get('store_id');
                    var content = marker.getStatus();
                    text = "<b>" + marker_id + "</b> location" + " status changed " + content;
                    showInContentWindow(text);
                });
            })(marker, i);
        }
        
      }
      function showInContentWindow(text) {
        const sidebar = document.getElementById("sidebar-panel");
        sidebar.innerHTML = text;
      }

      var heading = 57.03110793655839;
      var angle = 10;
      var radius = 500;