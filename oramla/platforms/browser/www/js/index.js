
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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var username = "";
var email = "";
var phone = "";

var timestamp =  "";
var latitude =  "";
var longitude =  "";
var location_name =  "";
var review =  "";
var rating =  "";
var role =  "";
var altitude =  "";
var path_protocol = window.location.protocol;
var host_name = window.location.hostname;
var port = window.location.port;
var path_name = window.location.pathname;
var path_href = window.location.href;
var datab = null;
var api_server_url = "https://oramla.com";
//var api_server_url = "http://192.168.0.100";
//var api_server_url = "http://169.254.249.58";
//var api_server_url = "http://192.168.0.103";
//var api_server_url = "http://localhost";


//var devicePlatform = device.platform;
function onDeviceReady() {
    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    
    authentication(username);
}

function user_container(user) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { user_container: 12, user: user},
        processData: true,
        url: api_server_url + '/cordova/user_container.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    $('.user_error_container').hide(500, function(){                    
                    });
                    $("#user_row_container").show(100);
                    user_role = response.role;
                    if (response.role == "customer") {
                        $("#uersdashro").hide(100);
                        $("#uersdash").hide(100);
                    } else {
                        $("#uersdashro").show(100);
                        $("#uersdash").show(100);
                    }
    
                    $("#user_name").html("status : " + response.agent_status + "<br>" + response.role + " " + response.username);
                    $("#user_rating_acc").html(response.rating);
                    $("#user_review_acc").html(response.review + " <br> Last Update " + response.lastUpdate);
                    
                    $("#input-username").val(response.username);
                    $("#input-first-name").val(response.first_name);
                    $("#input-last-name").val(response.last_name);
                    email = response.email;
                    $("#input-email").val(response.email);
                    $("#input-phone").val(response.phone_number);
                    phone = response.phone_number;
    
                    var location = JSON.parse(response.location_name);
                    $("#input-postal-code").val(location.postal);
                    $("#input-country").val(location.country);
                    $("#input-city").val(location.city);
                    $("#input-address").val(location.address);
                    
                    $("#pending_orders_count").html(response.pending_orders);
                    $("#active_orders_count").html(response.active_orders);
                    $("#confirmed_orders_count").html(response.confirmed_orders);
                    $("#complete_orders_count").html(response.complete_orders);
                    $("#_orders_count").html(response.user_orders);
    
    //user_rams
    //user_rams_symbol
    
    //user_name_image
    //user_name_image_src
    
    //track_order
    //logout
    
    //confirmed_orders
    //confirmed_orders_count
    //active_orders
    //active_orders_count
    //pending_orders
    //pending_orders_count
    //user_orders
    
    //user_products
    //products_count
    //in_stock
    //in_stock_count
    //products_sold
    //product_sold_count
    //user_dashboard
                   
                } else {
                    $('.user_error_container').show(500, function(){
                        $("#user_row_container").hide(100);
                        $("#user_row_h").html(response.message);
                        $("#user_row_p").html(response.login_email + " or " + response.login_password);
                    });
                }
            } catch(e) {
                $('.user_error_container').show(500, function(){
                    $("#user_row_container").hide(100);
                    $("#user_row_h").html('JSON error');
                    $("#user_row_p").html('JSON parsing error');
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.user_error_container').show(500, function(){
            $("#user_row_container").hide(100);
            $("#user_row_h").html("Error on ajax call: " + err );
            $("#user_row_p").html(JSON.stringify(xhr));
          });
        }
    });

    /**const options = {
        method: 'post',
        data: { user_container: 12, user: user},
        headers: { Authorization: 'OAuth2: token' }
    };    
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/user_container.php', options, function(response) {
        // prints 200
        $('#app-cover-spin').hide(0);
        //alert(response.data);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                $('.user_error_container').hide(500, function(){                    
                });
                $("#user_row_container").show(100);
                user_role = response.data.role;
                if (response.data.role == "customer") {
                    $("#uersdashro").hide(100);
                    $("#uersdash").hide(100);
                } else {
                    $("#uersdashro").show(100);
                    $("#uersdash").show(100);
                }

                $("#user_name").html("status : " + response.data.agent_status + "<br>" + response.data.role + " " + response.data.username);
                $("#user_rating_acc").html(response.data.rating);
                $("#user_review_acc").html(response.data.review + " <br> Last Update " + response.data.lastUpdate);
                
                $("#input-username").val(response.data.username);
                $("#input-first-name").val(response.data.first_name);
                $("#input-last-name").val(response.data.last_name);
                email = response.data.email;
                $("#input-email").val(response.data.email);
                $("#input-phone").val(response.data.phone_number);
                phone = response.data.phone_number;

                var location = JSON.parse(response.data.location_name);
                $("#input-postal-code").val(location.postal);
                $("#input-country").val(location.country);
                $("#input-city").val(location.city);
                $("#input-address").val(location.address);
                
                $("#pending_orders_count").html(response.data.pending_orders);
                $("#active_orders_count").html(response.data.active_orders);
                $("#confirmed_orders_count").html(response.data.confirmed_orders);
                $("#complete_orders_count").html(response.data.complete_orders);
                $("#_orders_count").html(response.data.user_orders);

//user_rams
//user_rams_symbol

//user_name_image
//user_name_image_src

//track_order
//logout

//confirmed_orders
//confirmed_orders_count
//active_orders
//active_orders_count
//pending_orders
//pending_orders_count
//user_orders

//user_products
//products_count
//in_stock
//in_stock_count
//products_sold
//product_sold_count
//user_dashboard
               
            } else {
                $('.user_error_container').show(500, function(){
                    $("#user_row_container").hide(100);
                    $("#user_row_h").html(response.data.message);
                    $("#user_row_p").html(response.data.login_email + " or " + response.data.login_password);
                });
            }
        } catch(e) {
            $('.user_error_container').show(500, function(){
                $("#user_row_container").hide(100);
                $("#user_row_h").html('JSON error');
                $("#user_row_p").html('JSON parsing error');
            });
        }
    }, function(response) {
        $('.user_error_container').show(500, function(){
            $("#user_row_container").hide(100);
            $("#user_row_h").html(response.status);
            $("#user_row_p").html(response.error);
        });

    }); */
}
var user_role = "";
$("#update_user_data").keypress(function (e){
    if(e.keyCode == 13){
        userupdate();
    }
});
$("#update_user_data").click(function(){
    userupdate();
});
function userupdate() {
    var error_user_data = 0;
    var error_username_data = 0;
    if ($("#input-username").val() == username) {
        $("#input-username").removeClass("is-invalid");
        $("#input-username").addClass("is-valid");
        $("#input-username_help").html($("#input-username").val());
        error_username_data = 0;
    } else {
        $("#input-username").addClass("is-invalid");
        $("#input-username").removeClass("is-valid");
        $("#input-username_help").html("Username cannot be changed");
        error_username_data = 1;
    }
    var error_first_data = 0;
    if ($("#input-first-name").val() != "" && $("#input-first-name").val() != null) {
        $("#input-first-name").removeClass("is-invalid");
        $("#input-first-name").addClass("is-valid");
        $("#input-first-name_help").html($("#input-first-name").val());
        error_first_data = 0;
    } else {
        $("#input-first-name").addClass("is-invalid");
        $("#input-first-name").removeClass("is-valid");
        $("#input-first-name_help").html("Enter your first name");
        error_first_data = 1;
    }    
    var error_last_data = 0;
    if ($("#input-last-name").val() != "" && $("#input-last-name").val() != null) {
        $("#input-last-name").removeClass("is-invalid");
        $("#input-last-name").addClass("is-valid");
        $("#input-last-name_help").html($("#input-last-name").val());
        error_last_data = 0;
    } else {
        $("#input-last-name").addClass("is-invalid");
        $("#input-last-name").removeClass("is-valid");
        $("#input-last-name_help").html("Enter your last name");
        error_last_data = 1;
    }
    var error_email_data = 0;
    if ($("#input-email").val() == email && error_user_data == 0) {
        $("#input-email").removeClass("is-invalid");
        $("#input-email").addClass("is-valid");
        $("#input-email_help").html($("#input-email").val());
        error_email_data = 0;
    } else {
        $("#input-email").addClass("is-invalid");
        $("#input-email").removeClass("is-valid");
        $("#input-email_help").html("Primary email connot be changed");
        error_email_data = 1;
    }
    var error_phone_data = 0;
    var phone_numb = $("#input-phone").val();
    if ($("#input-phone").val() != "" && $("#input-phone").val() != null && phone_numb.length <= 10) {
        $("#input-phone").removeClass("is-invalid");
        $("#input-phone").addClass("is-valid");
        $("#input-phone_help").html($("#input-phone").val());
        error_phone_data = 0;
    } else {
        $("#input-phone").addClass("is-invalid");
        $("#input-phone").removeClass("is-valid");
        $("#input-phone_help").html("Enter a vald phone number");
        error_phone_data = 1;
    }    
    var error_postal_data = 0;
    if ($("#input-postal-code").val() != "" && $("#input-postal-code").val() != null) {
        $("#input-postal-code").removeClass("is-invalid");
        $("#input-postal-code").addClass("is-valid");
        $("#input-postal-code_help").html($("#input-postal-code").val());
        error_postal_data = 0;
    } else {
        $("#input-postal-code").addClass("is-invalid");
        $("#input-postal-code").removeClass("is-valid");
        $("#input-postal-code_help").html("Enter postal code i.e 00901");
        error_postal_data = 1;
    }
    var error_country_data = 0;
    if ($("#input-country").val() != "" && $("#input-country").val() != null) {
        $("#input-country").removeClass("is-invalid");
        $("#input-country").addClass("is-valid");
        $("#input-country_help").html($("#input-country").val());
        error_country_data = 0;
    } else {
        $("#input-country").addClass("is-invalid");
        $("#input-country").removeClass("is-valid");
        $("#input-country_help").html("Select your Country");
        error_country_data = 1;
    }    
    var error_city_data = 0;
    if ($("#input-city").val() != "" && $("#input-city").val() != null) {
        $("#input-city").removeClass("is-invalid");
        $("#input-city").addClass("is-valid");
        $("#input-city_help").html($("#input-city").val());
        error_city_data = 0;
    } else {
        $("#input-city").addClass("is-invalid");
        $("#input-city").removeClass("is-valid");
        $("#input-city_help").html('Enter your City name i.e New York');
        error_city_data = 1;
    }
    var error_address_data = 0;
    if ($("#input-address").val() != "" && $("#input-address").val() != null) {
        $("#input-address").removeClass("is-invalid");
        $("#input-address").addClass("is-valid");
        $("#input-address_help").html($("#input-address").val());
        error_address_data = 0;
    } else {
        $("#input-address").addClass("is-invalid");
        $("#input-address").removeClass("is-valid");
        $("#input-address_help").html('Enter your address i.e Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09');
        error_address_data = 1;
    }
    if ($("#user_review").val() != "" && $("#user_review").val() != null) {
        $("#user_review").removeClass("is-invalid");
        $("#user_review").addClass("is-valid");
    } else {
        $("#user_review").addClass("is-invalid");
        $("#user_review").removeClass("is-valid");
    }
    //$("#input-rating").val();
    /**if ($("#input-rating").val() != "" && $("#input-rating").val() != null) {
        $("#input-rating").removeClass("is-invalid");
        $("#input-rating").addClass("is-valid");
    } else {
        $("#input-rating").addClass("is-invalid");
        $("#input-rating").removeClass("is-valid");
    } */
    if (error_username_data == 0 && error_first_data == 0 && error_last_data == 0 && error_email_data == 0 && error_phone_data == 0 && error_postal_data == 0 && error_country_data == 0 && error_city_data == 0 && error_address_data == 0 ) {
        error_user_data = 0;
    } else {
        error_user_data = 1;
    }
    if (error_user_data == 0) {
        //alert(rating_stars);
        update_user_data(user_role,rating_stars,$("#user_review").val(),$("#input-address").val(),$("#input-city").val(),$("#input-country").val(),$("#input-postal-code").val(),$("#input-phone").val(),$("#input-email").val(),$("#input-last-name").val(),$("#input-first-name").val(),$("#input-username").val());
        $("#update_user_data_help").html("Updating...");
    } else {
        $("#update_user_data_help").html('Correct the error(s)'); 
        error_user_data == 0;       
    }
}
var rating_stars = 1;
$("body").delegate(".give_us_stars","click",function(event){
    event.preventDefault();
    rating_stars = $(this).attr('star');   
});
function update_user_data(user_role,rating,review,address,city,country,postal,user_phone,user_email,last,first,user_name) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { update_user_data: 12, user_role:user_role, rating: rating, review: review, address: address, city: city, country: country, postal: postal, user_phone: user_phone, user_email: user_email, last: last, first: first, user_name: user_name},
        processData: true,
        url: api_server_url + '/cordova/update_user_data.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    $('.user_error_container').hide(500, function(){                    
                    });
                    $("#user_row_container").show(100);
                    if (response.role == "customer") {
                        $("#uersdashro").hide(100);
                        $("#uersdash").hide(100);
                    } else {
                        $("#uersdashro").show(100);
                        $("#uersdash").show(100);
                    }
    
                    $("#user_name").html("status : " + response.agent_status + "<br>" + response.role + " " + response.username);
                    $("#user_rating_acc").html(response.rating);
                    $("#user_review_acc").html(response.review + " <br> Last Update " + response.lastUpdate);
                    
                    $("#input-username").val(response.username);
                    $("#input-first-name").val(response.first_name);
                    $("#input-last-name").val(response.last_name);
                    email = response.email;
                    $("#input-email").val(response.email);
                    $("#input-phone").val(response.phone_number);
                    phone = response.phone_number;
                    
                    var location = JSON.parse(response.location_name);
                    $("#input-postal-code").val(location.postal);
                    $("#input-country").val(location.country);
                    $("#input-city").val(location.city);
                    $("#input-address").val(location.address);
    
                } else {
                    $('.user_error_container').show(500, function(){
                        $("#user_row_container").hide(100);
                        $("#user_row_h").html(response.message);
                        $("#user_row_p").html(response.login_email + " or " + response.login_password);
                    });
                }
            } catch(e) {
                $('.user_error_container').show(500, function(){
                    $("#user_row_container").hide(100);
                    $("#user_row_h").html('JSON error');
                    $("#user_row_p").html('JSON parsing error');
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.user_error_container').show(500, function(){
            $("#user_row_container").hide(100);
            $("#user_row_h").html(err);
            $("#user_row_p").html(JSON.stringify(xhr));
          });
        }
    });

    /**const options = {
        method: 'post',
        data: { update_user_data: 12, user_role:user_role, rating: rating, review: review, address: address, city: city, country: country, postal: postal, user_phone: user_phone, user_email: user_email, last: last, first: first, user_name: user_name},
        headers: { Authorization: 'OAuth2: token' }
    };    
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/update_user_data.php', options, function(response) {
        // prints 200
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                $('.user_error_container').hide(500, function(){                    
                });
                $("#user_row_container").show(100);
                if (response.data.role == "customer") {
                    $("#uersdashro").hide(100);
                    $("#uersdash").hide(100);
                } else {
                    $("#uersdashro").show(100);
                    $("#uersdash").show(100);
                }

                $("#user_name").html("status : " + response.data.agent_status + "<br>" + response.data.role + " " + response.data.username);
                $("#user_rating_acc").html(response.data.rating);
                $("#user_review_acc").html(response.data.review + " <br> Last Update " + response.data.lastUpdate);
                
                $("#input-username").val(response.data.username);
                $("#input-first-name").val(response.data.first_name);
                $("#input-last-name").val(response.data.last_name);
                email = response.data.email;
                $("#input-email").val(response.data.email);
                $("#input-phone").val(response.data.phone_number);
                phone = response.data.phone_number;
                
                var location = JSON.parse(response.data.location_name);
                $("#input-postal-code").val(location.postal);
                $("#input-country").val(location.country);
                $("#input-city").val(location.city);
                $("#input-address").val(location.address);

            } else {
                $('.user_error_container').show(500, function(){
                    $("#user_row_container").hide(100);
                    $("#user_row_h").html(response.data.message);
                    $("#user_row_p").html(response.data.login_email + " or " + response.data.login_password);
                });
            }
        } catch(e) {
            $('.user_error_container').show(500, function(){
                $("#user_row_container").hide(100);
                $("#user_row_h").html('JSON error');
                $("#user_row_p").html('JSON parsing error');
            });
        }
    }, function(response) {
        $('.user_error_container').show(500, function(){
            $("#user_row_container").hide(100);
            $("#user_row_h").html(response.status);
            $("#user_row_p").html(response.error);
        });

    }); */
}

var inputRange = document.getElementsByClassName('range')[0];
var top_value_range = document.getElementsByClassName('top_val_range')[0];
var gradius = 50;
inputRange.addEventListener('input', function() {
    //Change slide thumb color on way up
    if (this.value > gradius) {
        gradius = this.value; 
        top_value_range.classList.remove('bg-info');
        top_value_range.classList.add('bg-warning');
        geoshop(latitude,longitude,gradius);
    } else {
        gradius = this.value; 
        top_value_range.classList.remove('bg-warning');
        top_value_range.classList.add('bg-success');
        geoshop(latitude,longitude,gradius);
    }    
    
});

$("#radio-0").click(function(){
    window.location.href="#product_container";
    $("#menu_container_left_tab").show(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);

    $("#orders_container").hide(100);
    $("#order_items_container").hide(10);
    $("#cart_container").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);
    $("#product_add_client_container").hide(100);
    $("#top_menu").show(100,function(){       
        $("#search").hide(100);
        $("#top_slider").hide(100);

    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);
    main();
});

$("#radio-2").click(function(){  
    $('.product_main_container').show(500, function(){
        window.location.href="#product_container";
        $("#menu_container_left_tab").show(100);
        $("#chat_container").hide(100);
        $("#connects_chatbar").hide(100);
       $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        $("#top_menu").hide(100,function(){       
            $("#top_slider").show(100);
        });
        var onSuccess = function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            geoshop(latitude,longitude,gradius);        
        };
        function onError(error) {
            $('#top_value_range').html('code: ' + error.code + 'message: ' + error.message);
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
    $("#product_add_client_container").hide(100,function(){       
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);

});
function geoshop(latitude,longitude,gradius) {
    startlimit = 0;
    endlimit = 24;
    $('#top_value_range').html(" latitude : " + latitude + ", longitude : " + longitude + ". Radius : " + gradius + " Km. ");
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_geo_container: 12, startlimit: startlimit, endlimit: endlimit, latitude: latitude, longitude: longitude, gradius:gradius },
        processData: true,
        url: api_server_url + '/cordova/product_geo_container.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                $("#product_row_container").html('');
                //alert(gradius);
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") {  
                        $('.product_error_container').hide(500, function(){
                            window.location.href="#product_container";
                            $("#product_row_container").show(100);
                            $("#arrow_navigation_container").show(100);
                        }); 
                        product_row_container_index = products_data.length;                   
                        products_data.forEach(products_datamyFunction);
                    } else {
                        $('.product_error_container').show(500, function(){
                            window.location.href="#product_container";
                            $("#product_row_container").hide(100);
                            $("#arrow_navigation_container").hide(100);
                            $("#product_row_h").html(response.message);
                            $("#product_row_p").html('No new Products');
                        });
                    }
                }
                else {
                    $('.product_error_container').show(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.message);
                        $("#product_row_p").html('No new Products');
                    });
                }
            } catch(e) {
                $('.product_error_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.message);
                    $("#product_row_p").html('JSON parsing error');
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.product_error_container').show(500, function(){
            window.location.href="#product_container";
            $("#product_row_container").hide(100);
            $("#arrow_navigation_container").hide(100);
            $("#product_row_h").html(response.message);
            $("#product_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          });
        }
    });

    /**const options = {
        method: 'post',
        data: { product_geo_container: 12, startlimit: startlimit, endlimit: endlimit, latitude: latitude, longitude: longitude, gradius:gradius },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/product_geo_container.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            $("#product_row_container").html('');
            //alert(gradius);
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                if (products_status != "0") {  
                    $('.product_error_container').hide(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").show(100);
                        $("#arrow_navigation_container").show(100);
                    });                  
                    products_data.forEach(products_datamyFunction);
                } else {
                    $('.product_error_container').show(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.data.message);
                        $("#product_row_p").html('No new Products');
                    });
                }
            }
            else {
                $('.product_error_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.data.message);
                    $("#product_row_p").html('No new Products');
                });
            }
        } catch(e) {
            $('.product_error_container').show(500, function(){
                window.location.href="#product_container";
                $("#product_row_container").hide(100);
                $("#arrow_navigation_container").hide(100);
                $("#product_row_h").html(response.data.message);
                $("#product_row_p").html('JSON parsing error');
            });
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        $('.product_error_container').show(500, function(){
            window.location.href="#product_container";
            $("#product_row_container").hide(100);
            $("#arrow_navigation_container").hide(100);
            $("#product_row_h").html(response.data.message);
            $("#product_row_p").html(response.status + " : " + response.error);
        });
    }); */
}
var _apps_tab = 0;
$("#radio-3").click(function(){
    if (_apps_tab === 0) {
        _apps_tab =1;
    } else {
        _apps_tab =0;
    }
});

$("#radio-1").click(function(){
    $("#top_menu").hide(100,function(){       
        $("#search").show(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);

});
$("#search").keypress(function (e){
    if(e.keyCode == 13){
        $("#search").hide(100,function(){       
            $("#top_menu").show(100);
            if ($("#search_value").val() != '' && $("#search_value").val() != null) {
                $('.product_main_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#menu_container_left_tab").show(100);
                    $("#chat_container").hide(100);
                    $("#connects_chatbar").hide(100);
                   $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
                    $("#location_container").hide(100);
                    $("#user_container").hide(100);
                    $("#product_add_client_container").hide(100,function(){       
                    });
                    search($("#search_value").val());
                });               
            }
        });        
    }
});
$(".search-button").click(function(){
    $("#search").hide(100,function(){       
        $("#top_menu").show(100);
        if ($("#search_value").val() != '' && $("#search_value").val() != null) {
            $('.product_main_container').show(500, function(){
                window.location.href="#product_container";
                $("#menu_container_left_tab").show(100);
                $("#chat_container").hide(100);
                $("#connects_chatbar").hide(100);
               $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
                $("#location_container").hide(100);
                $("#user_container").hide(100);
                $("#product_error").hide(100);
                $("#product_add_client_container").hide(100,function(){       
                });
                search($("#search_value").val());
            });
        }
    });
});
function search(search_params) {
    startlimit = 0;
    endlimit = 24;
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_search_container: 12, startlimit: startlimit, endlimit: endlimit, search_params:search_params },
        processData: true,
        url: api_server_url + '/cordova/product_search_container.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                $("#product_row_container").html('');
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") {
                        $('.product_error_container').hide(500, function(){
                            window.location.href="#product_container";
                            $("#product_row_container").show(100);
                            $("#arrow_navigation_container").show(100);
                        });  
                        product_row_container_index = products_data.length;                   
                        products_data.forEach(products_datamyFunction);
                    } else {
                        $('.product_error_container').show(500, function(){
                            window.location.href="#product_container";
                            $("#product_row_container").hide(100);
                            $("#arrow_navigation_container").hide(100);
                            $("#product_row_h").html(response.message);
                            $("#product_row_p").html('No new Products');
                        });
                    }
                }
                else {
                    $('.product_error_container').show(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.message);
                        $("#product_row_p").html('No new Products');
                    });
                }
            } catch(e) {
                $('.product_error_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.message);
                    $("#product_row_p").html('JSON parsing error');
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.product_error_container').show(500, function(){
              window.location.href="#product_container";
              $("#product_row_container").hide(100);
              $("#arrow_navigation_container").hide(100);
              $("#product_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          });
        }
    });

    /**const options = {
        method: 'post',
        data: { product_search_container: 12, startlimit: startlimit, endlimit: endlimit, search_params:search_params },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/product_search_container.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            $("#product_row_container").html('');
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                if (products_status != "0") {
                    $('.product_error_container').hide(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").show(100);
                        $("#arrow_navigation_container").show(100);
                    });                    
                    products_data.forEach(products_datamyFunction);
                } else {
                    $('.product_error_container').show(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.data.message);
                        $("#product_row_p").html('No new Products');
                    });
                }
            }
            else {
                $('.product_error_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.data.message);
                    $("#product_row_p").html('No new Products');
                });
            }
        } catch(e) {
            $('.product_error_container').show(500, function(){
                window.location.href="#product_container";
                $("#product_row_container").hide(100);
                $("#arrow_navigation_container").hide(100);
                $("#product_row_h").html(response.data.message);
                $("#product_row_p").html('JSON parsing error');
            });
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        $('.product_error_container').show(500, function(){
            window.location.href="#product_container";
            $("#product_row_container").hide(100);
            $("#arrow_navigation_container").hide(100);
            $("#product_row_p").html(response.status + " : " + response.error);
        });
    }); */
}

function authentication(username) {
    $("#app-cover-spin").removeClass("app-cover");

    //alert(devicePlatform);
    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else {
        $(".authentication").hide(100);
        $(".main").show(100);
        datab = window.sqlitePlugin.openDatabase({
            name: 'my.db',
            location: 'default',
        });
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (username, score)');
            tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['' + username + '', '101']);
          }, function(error) {
           alert('Transaction ERROR: ' + error.message);
          }, function() {
            alert('Populated database OK');
          });
        main();
    }     
}

var imgUri = "https://oramla.com/products.html";

function main() {
    $('.authentication').hide(500, function(){
        $(".main").show(500);
        $(".product_main_container").show(100);
        window.location.href="#product_container";
    });
    var cat_id = "";
    product_main_container(startlimit,endlimit,cat_id);
    apps_categories(username);
    if (username != "") {
        //contact(username,"","","");
        loadconnects();
        //setTimeout(loadchat, 3000);
    }
    
}
var conectset = 0;
function loadconnects() {
    conectset = 1;
    //alert(connect_from);
    contact(username,connect_from,"","");
    setTimeout(loadconnects, 3000);
}
var startlimit = 0;
var endlimit = 24;
var IMAGE_url_name = 'oramla.com';
var IMAGE_url_path_name = 'https://'  + IMAGE_url_name + '/product_images/';
var currency_price = '<i class="fas fa-dollar"> USD</i>';
var currency_price_symbal = '<i class="fas fa-dollar"></i>';
var currency_exchange_rate = 1;
var api = "product_main_container";

$("body").delegate(".add_to_cart","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"add_to_cart",username,$(this).attr('product_id'));    
});
$("body").delegate(".edit_product","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"edit_product",username,$(this).attr('product_id'));    
});
$("body").delegate(".add_to_remove","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"remove_product",username,$(this).attr('product_id'));    
}); 
$("body").delegate(".wishlist_product","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"edit_product",username,$(this).attr('product_id'));    
});
var connect_product = 0;
$("body").delegate(".connect_product","click",function(event){
    event.preventDefault();
    conta = 1;
    chat_ = 1;
    window.location.href="#center_top_id"; 
    $("#menu_container_top_tab").hide(100);                
    $("#center_top_id").show(100);                

    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else {        

        $("#contactname").html($(this).attr('add_client'));
        $("#cotacttime").html($(this).attr(Date()));
        var IMAGE_url = 'img/jeans3.jpg';
        $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
        var chat_message = '';
        connect_product = 1;
        //alert(connect_from);
        connect_from = $(this).attr('add_client');
        //connects_datalengthnow = 0;
        connects_datalength = 0;
        //$("#chat").html('');
        contact(username,$(this).attr('add_client'),$(this).attr('product_id'),chat_message);
    
        $("#connects_chatbar").show(100);
        $("#product_container").hide(100);
        $("#menu_container_left_tab").hide(100);
        $("#orders_container").hide(100);
        $("#order_items_container").hide(10);
        $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        $("#top_menu").show(100,function(){       
            $("#search").hide(100);
            $("#top_slider").hide(100);

        });
        $("#connects_contacts").show(100,function(){       
            $("#connects_messages").hide(100);                
        });
    }
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }

    //product_id(startlimit,endlimit,"connect_product",username,$(this).attr('product_id'),$(this).attr('add_client'));    
});
$("body").delegate(".icon_remove_cart","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"cart_to_remove",username,$(this).attr('product_id'));    
});

$("body").delegate(".qt-minus","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"qt-minus",username,$(this).attr('product_id'));    
});
$("body").delegate(".qt-plus","click",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"qt-plus",username,$(this).attr('product_id'));    
});
$("body").delegate(".qtinput","keyup",function(event){
    event.preventDefault();
    product_id(startlimit,endlimit,"qt",$(this).val(),$(this).attr('product_id'));    
});

$("body").delegate(".order_confirm","click",function(event){
    event.preventDefault();
    order_id(startlimit,endlimit,'order_confirm',username,$(this).attr('order_id'));    
});
$("body").delegate(".order_cancel","click",function(event){
    event.preventDefault();
    order_id(startlimit,endlimit,'order_cancel',username,$(this).attr('order_id'));    
});
$("body").delegate(".order_view","click",function(event){
    event.preventDefault();
    order_id(startlimit,endlimit,$(this).attr('status'),username,$(this).attr('order_id'));    
});
var data_len = 0;
function order_id(startlimit,endlimit,status,username,order_id) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { order_id: 12, startlimit: startlimit, endlimit: endlimit, status:status, username: username, order_id: order_id },
        processData: true,
        url: api_server_url + '/cordova/order_id.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    
                    //order_items_container
                    if (status == "active" || status == "cancelled" || status == "shipped") {
                        $("#orders_items_made").html('');
                        $("#orderid").html(order_id);
                        window.location.href="#order_items_container";
                        data_len = products_data.length;
                        products_data.forEach(order_items_datamyFunction);
                    } else {
                        $("#orders_made").html('');
                        window.location.href="#order_container";
                        data_len = products_data.length;
                        if (status == "pending_orders") {
                            $("#pending_orders_count").html(products_data.length);
                        } else if (status == "active_orders") {
                            $("#active_orders_count").html(products_data.length);
                        } else if (status == "confirmed_orders") {
                            $("#confirmed_orders_count").html(products_data.length);
                        } else if (status == "complete_orders") {
                            $("#complete_orders_count").html(products_data.length);
                        } else if (status == "user_orders") {
                            $("#_orders_count").html(products_data.length);
                        }
                        products_data.forEach(order_datamyFunction);
                    }
                    
                    
                } else {
                    $('#app-cover-spin').hide(0);
                    alert(response.message);
                }
                
            } catch(e) {
                $('#app-cover-spin').hide(0);
                //alert('JSON parsing error');
                snackbar('JSON parsing error');
    
                
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          //alert(response.status + " : " + response.error);
          snackbar("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });

    /**const options = {
        method: 'post',
        data: { order_id: 12, startlimit: startlimit, endlimit: endlimit, status:status, username: username, order_id: order_id },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/order_id.php', options, function(response) {
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                
                //order_items_container
                if (status == "active" || status == "cancelled" || status == "shipped") {
                    $("#orders_items_made").html('');
                    $("#orderid").html(order_id);
                    window.location.href="#order_items_container";
                    data_len = products_data.length;
                    products_data.forEach(order_items_datamyFunction);
                } else {
                    $("#orders_made").html('');
                    window.location.href="#order_container";
                    data_len = products_data.length;
                    if (status == "pending_orders") {
                        $("#pending_orders_count").html(products_data.length);
                    } else if (status == "active_orders") {
                        $("#active_orders_count").html(products_data.length);
                    } else if (status == "confirmed_orders") {
                        $("#confirmed_orders_count").html(products_data.length);
                    } else if (status == "complete_orders") {
                        $("#complete_orders_count").html(products_data.length);
                    } else if (status == "user_orders") {
                        $("#_orders_count").html(products_data.length);
                    }
                    products_data.forEach(order_datamyFunction);
                }
                
                
            } else {
                $('#app-cover-spin').hide(0);
                alert(response.data.message);
            }
            
        } catch(e) {
            $('#app-cover-spin').hide(0);
            //alert('JSON parsing error');
            snackbar('JSON parsing error');

            
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        //alert(response.status + " : " + response.error);
        snackbar(response.status + " : " + response.error);

        
    }); */
}


function product_id(startlimit,endlimit,action,username,product_id) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_id_action: action, startlimit: startlimit, endlimit: endlimit, username: username, product_id: product_id },
        processData: true,
        url: api_server_url + '/cordova/product_id.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    //alert("quantity " + response.data.quantity);
                    total_pay = 0;
                    total_total = 0;
                    total_tax = 0;
                    total_shipping = 0;
                    //alert(products_status);
                    $("#orders_container").hide(10,function(){});
                    $("#order_items_container").hide(10);
    
                    if (products_status == "add_to_cart") {                    
                        $("#shopping_cart_num").html(products_data.length);
                    } else if (products_status == "edit_product") {
                        $("#product_row_container").html(''); 
                        product_row_container_index = products_data.length;        
                        products_data.forEach(products_datamyFunction);
                    } else if (products_status == "remove_product") {                    
                        $("#product_row_container").html(''); 
                        product_row_container_index = products_data.length;
                        products_data.forEach(products_datamyFunction);
                    } else if (products_status == "cart_to_remove") {                    
                        $('.cart_error_container').hide(500, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "qt-minus") {                    
                        $('.cart_error_container').hide(500, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "qt-plus") {                    
                        $('.cart_error_container').hide(500, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "qt") {                    
                        $('.cart_error_container').hide(500, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "0") {
    
                        $('.cart_error_container').show(500, function(){
                            window.location.href="#cart_container";
                            $("#cart_row_container").hide(100);
                            $("#cart_row_h").html(response.message);
                            $("#shopping_cart_num").html(products_data.length);
                            $("#cart_row_p").html('Your cart is empty. Add products to your cart.');
                        });
    
                    } else {
                        window.location.href="#cart_container";
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        products_data.forEach(cart_datamyFunction);
                        $("#shopping_cart_num").html(products_data.length);
                        $('.cart_error_container').hide(500, function(){
                            window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#orders_container").hide(100);
                        $("#order_items_container").hide(10);
    
                    }                
                }
            } catch(e) {
                $('.cart_error_container').show(500, function(){
                    window.location.href="#cart_container";
                    $("#cart_row_container").hide(100);
                    $("#cart_row_h").html(response.message);
                    $("#cart_row_p").html('JSON parsing error');
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.cart_error_container').show(500, function(){
            window.location.href="#cart_container";
            $("#cart_row_container").hide(100);
            $("#cart_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          });
        }
    });

    /**const options = {
        method: 'post',
        data: { product_id_action: action, startlimit: startlimit, endlimit: endlimit, username: username, product_id: product_id },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/product_id.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                //alert("quantity " + response.data.quantity);
                total_pay = 0;
                total_total = 0;
                total_tax = 0;
                total_shipping = 0;
                //alert(products_status);
                $("#orders_container").hide(10,function(){});
                $("#order_items_container").hide(10);

                if (products_status == "add_to_cart") {                    
                    $("#shopping_cart_num").html(products_data.length);
                } else if (products_status == "edit_product") {
                    $("#product_row_container").html('');                    
                    products_data.forEach(products_datamyFunction);
                } else if (products_status == "remove_product") {                    
                    $("#product_row_container").html(''); 
                    products_data.forEach(products_datamyFunction);
                } else if (products_status == "cart_to_remove") {                    
                    $('.cart_error_container').hide(500, function(){
                        //window.location.href="#cart_container";
                        $("#cart_row_container").show(100);
                    });
                    $("#cart_row_container").html('');
                    $("#shopping_cart_num").html(products_data.length);
                    products_data.forEach(cart_datamyFunction);
                } else if (products_status == "qt-minus") {                    
                    $('.cart_error_container').hide(500, function(){
                        //window.location.href="#cart_container";
                        $("#cart_row_container").show(100);
                    });
                    $("#cart_row_container").html('');
                    $("#shopping_cart_num").html(products_data.length);
                    products_data.forEach(cart_datamyFunction);
                } else if (products_status == "qt-plus") {                    
                    $('.cart_error_container').hide(500, function(){
                        //window.location.href="#cart_container";
                        $("#cart_row_container").show(100);
                    });
                    $("#cart_row_container").html('');
                    $("#shopping_cart_num").html(products_data.length);
                    products_data.forEach(cart_datamyFunction);
                } else if (products_status == "qt") {                    
                    $('.cart_error_container').hide(500, function(){
                        //window.location.href="#cart_container";
                        $("#cart_row_container").show(100);
                    });
                    $("#cart_row_container").html('');
                    $("#shopping_cart_num").html(products_data.length);
                    products_data.forEach(cart_datamyFunction);
                } else if (products_status == "0") {

                    $('.cart_error_container').show(500, function(){
                        window.location.href="#cart_container";
                        $("#cart_row_container").hide(100);
                        $("#cart_row_h").html(response.data.message);
                        $("#shopping_cart_num").html(products_data.length);
                        $("#cart_row_p").html('Your cart is empty. Add products to your cart.');
                    });

                } else {
                    window.location.href="#cart_container";
                    $("#cart_row_container").html('');
                    $("#shopping_cart_num").html(products_data.length);
                    products_data.forEach(cart_datamyFunction);
                    $("#shopping_cart_num").html(products_data.length);
                    $('.cart_error_container').hide(500, function(){
                        window.location.href="#cart_container";
                        $("#cart_row_container").show(100);
                    });
                    $("#orders_container").hide(100);
                    $("#order_items_container").hide(10);

                }                
            }
        } catch(e) {
            $('.cart_error_container').show(500, function(){
                window.location.href="#cart_container";
                $("#cart_row_container").hide(100);
                $("#cart_row_h").html(response.data.message);
                $("#cart_row_p").html('JSON parsing error');
            });
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        $('.cart_error_container').show(500, function(){
            window.location.href="#cart_container";
            $("#cart_row_container").hide(100);
            $("#cart_row_p").html(response.status + " : " + response.error);
        });
    }); */
    
}
var total_pay = 0;
var total_total = 0;
var total_tax = 0;
var total_shipping = 0;
currency_price_symbal = '$';
var _tax = 16;
var _delivery = 0.5;
function cart_datamyFunction(item, index) {
    //window.location.href="#cart_container";
    var product_image = item.product_image;
    var product_price = currency_exchange_rate * item.price;    
    product_price = product_price.toFixed(2);
    var total_ = product_price * item.quantity;
    //total_ = total_.toFixed(2);
    total_pay = total_pay + total_;
    var product_title = item.product_title;
    var product_title_account = "";
    if (product_title.length <= 30) {
        product_title_account = product_title;
    } else {
        product_title_account = product_title.substring(0, 30) + "...";
    }
    
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }
    //var IMAGE_url = 'img/jeans3.jpg';
    //currency_price_symbal = '$';
    
    product_row_container = '<div class="cart_productitem"> ' + 
    '<div class="cart_menu">' +
    '<img src="' + IMAGE_url + '" alt="' + item.product_image + '">' +
    '</div>' +           
    '<div class="cart_main">' +
    '<b>' + product_title_account + '</b>' +
    '<div class="price">' +
    '' +  currency_price_symbal + '' +  product_price + '' +
    '</div>' +
    '<div class="quantynumber">' + 
    '<span class="qt-minus" product_id = "' + item.product_id + '">-</span>' +
    '<span class="qt" quantit="' + item.quantity + '">' +
    '<input class="qt qtinput" product_id = "' + item.product_id + '" type="number" name="' + item.product_id + 'qt_cart" id="' + item.product_id + 'qt_cart" value="' + item.quantity + '">' +
    '</span>' +
    '<span class="qt-plus" product_id = "' + item.product_id + '">+</span>' +
    '</div>' +    
    '<div class="float-left icon_padding_div icon_cartdelete">' +
    '<input class="icon_remove_cart icon_input" product_id = "' + item.product_id + '" type="radio" name="' + item.product_id + 'remove_cart" id="' + item.product_id + 'remove_cart">' +
    '<label class="currencyicon_label" for="' + item.product_id + 'remove_cart"><img src="img/delete.svg" alt=""></label>' +
    '</div>' +     
    '<div class="full-price">' +
    '' +  currency_price_symbal + '' +  total_ + '' +
    '</div>' +
    '</div>' +
    '</div>';

    

    total_tax = total_pay*0.01*_tax;
    //total_tax = total_tax.toFixed(2);
    total_shipping =gradius*1*_delivery;
    //total_shipping = total_shipping.toFixed(2);
    var all_total = total_pay + total_tax + total_shipping;
    total_total = all_total;
    total_total = total_total.toFixed(2);
    $("#cart_row_container").append(product_row_container);

    total_tax = total_tax.toFixed(2);
    total_shipping = total_shipping.toFixed(2);

    $("#total_pay").html('Subtotal: ' +  currency_price_symbal + '<span>' +  total_pay + '</span>');
    $("#total_tax").html('Taxes ('+_tax+'%): ' +  currency_price_symbal + '<span>' +  total_tax + '</span>');
    $("#total_shipping").html('Delivery (' +  currency_price_symbal + ''+_delivery+'/km): ' +  currency_price_symbal + '<span>' +  total_shipping + ' in ' + gradius + ' km radius</span>');
    $("#total_total").html('Total: ' +  currency_price_symbal + '<span>' +  total_total + '</span>');
    
}

function order_items_datamyFunction(item, index) {
    data_i = data_len - 1;
    var add_client = item.add_client;
    var username = item.username;

    var product_image = item.product_img;
    var product_price = currency_exchange_rate * item.product_price;    
    product_price = product_price.toFixed(2);
    //alert(item.product_quantity);
    var total_ = product_price * item.product_quantity;
    //total_pay = total_pay + total_;
    var product_title = item.product_title;
    var product_title_account = "";
    if (product_title.length <= 30) {
        product_title_account = product_title;
    } else {
        product_title_account = product_title.substring(0, 30) + "...";
    }
    
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }
    //var IMAGE_url = 'img/jeans3.jpg';

    var rating = '<fieldset class="rating">' +
    '<input type="radio" id="star5' + item.product_id + '" name="rating" value="5" /><label class = "full" for="star5' + item.product_id + '" title="Awesome - 5 stars"></label>' +
    '<input type="radio" id="star4half' + item.product_id + '" name="rating" value="4 and a half" /><label class="half" for="star4half' + item.product_id + '" title="Pretty good - 4.5 stars"></label>' +
    '<input type="radio" id="star4' + item.product_id + '" name="rating" value="4" /><label class = "full" for="star4' + item.product_id + '" title="Pretty good - 4 stars"></label>' +
    '<input type="radio" id="star3half' + item.product_id + '" name="rating" value="3 and a half" /><label class="half" for="star3half' + item.product_id + '" title="Meh - 3.5 stars"></label>' +
    '<input type="radio" id="star3' + item.product_id + '" name="rating" value="3" /><label class = "full" for="star3' + item.product_id + '" title="Meh - 3 stars"></label>' +
    '<input type="radio" id="star2half' + item.product_id + '" name="rating" value="2 and a half" /><label class="half" for="star2half' + item.product_id + '" title="Kinda bad - 2.5 stars"></label>' +
    '<input type="radio" id="star2' + item.product_id + '" name="rating" value="2" /><label class = "full" for="star2' + item.product_id + '" title="Kinda bad - 2 stars"></label>' +
    '<input type="radio" id="star1half' + item.product_id + '" name="rating" value="1 and a half" /><label class="half" for="star1half' + item.product_id + '" title="Meh - 1.5 stars"></label>' +
    '<input type="radio" id="star1' + item.product_id + '" name="rating" value="1" /><label class = "full" for="star1' + item.product_id + '" title="Sucks big time - 1 star"></label>' +
    '<input type="radio" id="starhalf' + item.product_id + '" name="rating" value="half" /><label class="half" for="starhalf' + item.product_id + '" title="Sucks big time - 0.5 stars"></label>' +
    '</fieldset>';

    if (item.status_items == "confirmed") {
        var status = '<span class="status text-success">&bull;</span> Confirmed';
        var oreder = '<span type="button" product_id="' + item.product_id + '" status="' + item.status_items + '" class="btn btn-success order_items_view">' + item.product_id + '</span>';

    } else if (item.status_items == "pending") {
        var status = '<span class="status text-warning">&bull;</span> Pending';
        var oreder = '<span type="button" product_id="' + item.product_id + '" status="' + item.status_items + '" class="btn btn-success order_items_confirm right">✓</span>' + 
                     '<span type="button" product_id="' + item.product_id + '" status="' + item.status_items + '" class="btn btn-danger order_items_cancel left">X</span>';

    } else if (item.status_items == "delivered") {
        var status = '<span class="status text-info">&bull;</span> Delivered';
        var oreder = '<span type="button" product_id="' + item.product_id + '" status="' + item.status_items + '" class="btn btn-info order_items_view">' + item.product_id + '</span>';

    } else if (item.status_items == "cancelled") {
        var status = '<span class="status text-danger">&bull;</span> Cancelled';
        var oreder = '<span type="button" product_id="' + item.product_id + '" status="' + item.status_items + '" class="btn btn-danger order_items_view">' + item.product_id + '</span>';
    }
    
    product_row_container = '<div class="cart_productitem"> ' + 
    '<div class="cart_menu">' +
    '<img src="' + IMAGE_url + '" alt="' + item.product_img + '">' +
    '</div>' +           
    '<div class="cart_main">' +
    '<span class="badge badge-info">' + item.product_quantity + '</span> '+
    '<b>' + product_title_account + '</b>, From ' + add_client + '<br>Status ' + status + '' +
    '<br>' +

    '<div class="price">' +
    '' +  currency_price_symbal + '' +  product_price + '' +
    '</div>' +
    '<div class="full-price">' +
    '' +  currency_price_symbal + '' +  total_ + '' +
    '</div>' +  

    '<b class="btn-group btn-group-sm order_action">' + oreder + '</b>' + 

    '</div>' +
    '</div>';

    $("#orders_items_made").append(product_row_container);


    if (data_i == index) { 
         $("#order_items_container").show(10,function(){
            $("#orders_container").hide(10); 
            $('#app-cover-spin').hide(0);           
        });        
    }
    
}

function order_datamyFunction(item, index) {
    var total_amount = currency_exchange_rate * item.total_amount;    
    total_amount = total_amount.toFixed(2);
    var data_i = data_len - 1;

    var location = JSON.parse(item.location_name);
    var  address =  location.address;
    var  postal =  location.postal;
    var  city =  location.city;
    var  country =  location.country;

    if (item.status == "active") {
        var status = '<span class="status text-success">&bull;</span> Active';
        var oreder = '<a order_id="' + item.order_id + '" status="' + item.status + '" class="view order_view" title="View Details" data-toggle="tooltip">' + item.order_id + '</a>';

    } else if (item.status == "pending") {
        var status = '<span class="status text-warning">&bull;</span> Pending';
        var oreder = '<a order_id="' + item.order_id + '" status="' + item.status + '" class="viewconfirm order_confirm" title="View Details" data-toggle="tooltip">✓</a>' + 
        '<br>' + 
        '<br>' + 
        '<br>' + 
        '<br>' + 
        '<a order_id="' + item.order_id + '" status="' + item.status + '" class="viewcancel order_cancel" title="View Details" data-toggle="tooltip">X</a>';

    } else if (item.status == "shipped") {
        var status = '<span class="status text-info">&bull;</span> Delivered';
        var oreder = '<a order_id="' + item.order_id + '" status="' + item.status + '" class="view order_view" title="View Details" data-toggle="tooltip">' + item.order_id + '</a>';

    } else if (item.status == "cancelled") {
        var status = '<span class="status text-danger">&bull;</span> Cancelled';
        var oreder = '<a order_id="' + item.order_id + '" status="' + item.status + '" class="viewcancel order_view" title="View Details" data-toggle="tooltip">' + item.order_id + '</a>';
    }

    var orders_made = '<tr>' + 
    '<td><a href="#"><img src="img/49806f3f1c7483093855ebca1b8ae2c4.jpg" class="avatar" alt="Avatar"> ' + item.username + '</a></td>' + 
    '<td>' +  currency_price_symbal + '' + total_amount + '<br>' + status + '<br>' + item.timestamp + '<br> address : ' + address + '<br> postal : ' + postal + '<br> city : ' + city + '<br> country : ' + country + '</td>' +                         
    '<td>' +  oreder + 
    '</td>' + 
    '</tr>';
    $("#orders_made").append(orders_made);

    if (data_i == index) {        
        $("#orders_container").show(10,function(){
            $("#cart_container").hide(10); 
            $('#app-cover-spin').hide(0);
            $("#order_items_container").hide(10);           
        });        
    }

}

var  _shipping = '0';
var  _pay = '0';

$("#checkout_total").click(function(){
   _shipping =  $("#_shipping").val();
   _pay =  $("#_pay").val();

   if (_shipping == '0') {
    window.location.href="#_shipping";
    $("#_shippingerror").html('Select your preffered delivery option');       
   } else if (_pay == '0') {
    window.location.href="#_pay";
    $("#_payerror").html('Select your preffered payment option');
   } else {
    $("#_shippingerror").html('');
    $("#_payerror").html('');    
    checkout_total(_shipping,_pay,total_pay,total_tax,total_shipping,total_total,username);
   }  
});
$("#user_orders").click(function(){
    /**$("#orders_container").show(10,function(){
            $("#cart_container").hide(10); 
            $('#app-cover-spin').hide(0);
            $("#order_items_container").hide(10);           
        }); */
    window.location.href="#orders_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);

    order_id(startlimit,endlimit,'user_orders',username,'');
});
$("#pending_orders").click(function(){
    //pending_orders_count
    window.location.href="#orders_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);

    order_id(startlimit,endlimit,'pending_orders',username,'');
});
$("#active_orders").click(function(){
    //active_orders_count
    window.location.href="#orders_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);

    order_id(startlimit,endlimit,'active_orders',username,'');
});
$("#confirmed_orders").click(function(){
    //confirmed_orders_count
    window.location.href="#orders_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);

    order_id(startlimit,endlimit,'confirmed_orders',username,'');
});
$("#complete_orders").click(function(){
    //confirmed_orders_count
    window.location.href="#orders_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);

    order_id(startlimit,endlimit,'complete_orders',username,'');
});

$("#products_sold").click(function(){
    //product_sold_count
});
$("#in_stock").click(function(){
    //in_stock_count
});
$("#user_products").click(function(){
    //products_count
});

function checkout_total(_shipping,_pay,total_pay,total_tax,total_shipping,total_total,username) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { checkout_total: 12, _shipping: _shipping, _pay: _pay, total_pay: total_pay, total_tax: total_tax, total_shipping: total_shipping, total_total: total_total, username: username },
        processData: true,
        url: api_server_url + '/cordova/checkout_total.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;                
                    $("#shopping_cart_num").html(0);
                    total_pay = 0.00;
                    total_total = 0.00;
                    total_tax = 0.00;
                    total_shipping =gradius*1*_delivery;
                    $("#total_pay").html('Subtotal: ' +  currency_price_symbal + '<span>' +  total_pay + '</span>');
                    $("#total_tax").html('Taxes ('+_tax+'%): ' +  currency_price_symbal + '<span>' +  total_tax + '</span>');
                    $("#total_shipping").html('Delivery (' +  currency_price_symbal + ''+_delivery+'/km): ' +  currency_price_symbal + '<span>' +  total_shipping + ' in ' + gradius + ' km radius</span>');
                    $("#total_total").html('Total: ' +  currency_price_symbal + '<span>' +  total_total + '</span>');
                    //alert(products_data);
                    if (products_status != "0") {
                        $("#orders_made").html('');
                        window.location.href="#order_container";
                        data_len = products_data.length;
                        products_data.forEach(order_datamyFunction);
                    }
                    
                    //$("#orders_container").hide(100);
                    $("#order_items_container").hide(10);
                    //alert(products_data);
                    
                    
    
                } else {
                    $('#app-cover-spin').hide(0);
                    alert(response.message);
                }
            } catch(e) {
                $('#app-cover-spin').hide(0);
                snackbar('JSON parsing error');
               // alert('JSON parsing error');
                
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          snackbar(response.status + " : " + response.error);
        }
    });

    /**const options = {
        method: 'post',
        data: { checkout_total: 12, _shipping: _shipping, _pay: _pay, total_pay: total_pay, total_tax: total_tax, total_shipping: total_shipping, total_total: total_total, username: username },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/checkout_total.php', options, function(response) {
        //alert(response.data);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;                
                $("#shopping_cart_num").html(0);
                total_pay = 0.00;
                total_total = 0.00;
                total_tax = 0.00;
                total_shipping =gradius*1*_delivery;
                $("#total_pay").html('Subtotal: ' +  currency_price_symbal + '<span>' +  total_pay + '</span>');
                $("#total_tax").html('Taxes ('+_tax+'%): ' +  currency_price_symbal + '<span>' +  total_tax + '</span>');
                $("#total_shipping").html('Delivery (' +  currency_price_symbal + ''+_delivery+'/km): ' +  currency_price_symbal + '<span>' +  total_shipping + ' in ' + gradius + ' km radius</span>');
                $("#total_total").html('Total: ' +  currency_price_symbal + '<span>' +  total_total + '</span>');
                //alert(products_data);
                if (products_status != "0") {
                    $("#orders_made").html('');
                    window.location.href="#order_container";
                    data_len = products_data.length;
                    products_data.forEach(order_datamyFunction);
                }
                
                //$("#orders_container").hide(100);
                $("#order_items_container").hide(10);
                //alert(products_data);
                
                

            } else {
                $('#app-cover-spin').hide(0);
                alert(response.data.message);
            }
        } catch(e) {
            $('#app-cover-spin').hide(0);
            snackbar('JSON parsing error');
           // alert('JSON parsing error');
            
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        snackbar(response.status + " : " + response.error);

        //alert();
        


    
    }); */
    /**$("#product_add_client_container").hide(100,function(){       
        $("#orders_container").show(100);
    }); */
}

$("body").delegate(".div_cimage","click",function(event){
    event.preventDefault();   
    window.location.href="#product_add_client_container";
    window.location.href="#product_container";
 
    var product_price = $(this).attr('product_price');    
    var product_title = $(this).attr('product_title');    
    var add_description = $(this).attr('add_description');    
    var add_client = $(this).attr('add_client');    
    var product_id = $(this).attr('product_id');
    var add_rating = $(this).attr('add_rating');
    var product_img = $(this).attr('product_img');  
    var add_date = $(this).attr('add_date');  
    var latitude = $(this).attr('latitude');  
    var longitude = $(this).attr('longitude');  
    var add_location = $(this).attr('add_location');  
    var add_review = $(this).attr('add_review');    
    div_cimage(product_price,product_title,add_description,add_client,product_id,add_rating,product_img,add_date,latitude,longitude,add_location,add_review);
});
var div_cima = 0;
var add_cdiv_cima = 0;
function div_cimage(product_price,product_title,add_description,add_client,product_id,add_rating,product_img,add_date,latitude,longitude,add_location,add_review) {
    if (product_img.includes("http", 0)) {
        var IMAGE_url = product_img + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_img + '';
    }
    //var IMAGE_url = 'img/noni.png';
    var add_imageadd_ = document.getElementById('add_imageadd_');
    add_imageadd_.src = IMAGE_url;
    window.location.href="#product_add_client_container";
    $("#product_row_container").hide(100,function(){       
        $("#product_add_client_container").show(100);
        $("#product_error").hide(100);
    });
    product_price = currency_exchange_rate * product_price;    
    product_price = product_price.toFixed(2);
    $("#add_carousel_title").html(product_title);
    currency_price_symbal = '$';

    /**var currency = '<div class="currencyclass">' +
    '<input class="icon_input" product_id = "' + product_id + '" type="radio" name="add_image' + product_id + '_currency_symbal" id="add_image' + product_id + '_currency_symbal">' +
    '<label class="currencyicon_label" for="add_image' + product_id + '_currency_symbal"><img src="img/dollar.svg" alt=""></label>' +
    '</div>'; */
    var currency = currency_price_symbal;
    $("#add_carousel_currency").html(currency);
    $("#add_carousel_price").html(product_price);
    var buynow = '<div class="float-left icon_padding_div">' +
    '<input class="add_to_cart icon_input" product_id = "' + product_id + '" type="radio" name="add_buy' + product_id + '_cart" id="add_buy' + product_id + '_cart">' +
    '<label class="currencyicon_label" for="add_buy' + product_id + '_cart"><img src="img/shopping-cart.svg" alt=""></label>' +
    '</div>' + 
    '<div class="float-left icon_padding_div">' +
    '<input class="edit_product icon_input" product_id = "' + product_id + '" type="radio" name="add_buy' + product_id + '_edit" id="add_buy' + product_id + '_edit">' +
    '<label class="currencyicon_label" for="add_buy' + product_id + '_edit"><img src="img/edit.svg" alt=""></label>' +
    '</div>' +
    '<div class="float-left icon_padding_div">' +
    '<input class="add_to_remove icon_input" product_id = "' + product_id + '" type="radio" name="add_buy' + product_id + 'remove_cart" id="add_buy' + product_id + 'remove_cart">' +
    '<label class="currencyicon_label" for="add_buy' + product_id + 'remove_cart"><img src="img/delete.svg" alt=""></label>' +
    '</div>';
    $("#add_carousel_buynow").html(buynow);

    $("#add_carousel_desc").html(add_description);

    $("#otheadd").html(add_client);
    $("#otheaddl").html(add_client);

    $("#add_fload_id").attr("connect_from", "" + add_client + "");
    $("#add_fload_id").attr("connects_id", "" + product_id + "");
    $("#add_fload_id").attr("connects_time", "" + Date() + "");
    add_cdiv_cima = 1;
    other_product_same(product_id); 
    other_product_same_client(0,8,add_client);
}
$("body").delegate(".div_otherimage","click",function(event){
    event.preventDefault();
    var add_imageadd_ = document.getElementById('add_imageadd_');
    add_imageadd_.src = $(this).attr('src');
      
});
function other_product_same(product_id) {

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { other_product_same: 12, product_id:product_id },
        processData: true,
        url: api_server_url + '/cordova/other_product_same.php',
        success: function searchSuccess(response) {
            try {
                response.data = JSON.parse(response.data);            
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    $("#other_title").html('');
                    if (products_status != "0") { 
                        $("#other_title").html('');
                        $('.product_error_container').hide(500, function(){
                        });                   
                        products_data.forEach(other_product_samemyFunction);
                    }
                }
            } catch(e) {
                
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

        }
    });

    /**const options = {
        method: 'post',
        data: { other_product_same: 12, product_id:product_id },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/other_product_same.php', options, function(response) {
        try {
            response.data = JSON.parse(response.data);            
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                $("#other_title").html('');
                if (products_status != "0") { 
                    $("#other_title").html('');
                    $('.product_error_container').hide(500, function(){
                    });                   
                    products_data.forEach(other_product_samemyFunction);
                }
            }
        } catch(e) {
            
        }
    }, function(response) {
       // $('#app-cover-spin').hide(0);
        
    }); */
}
function other_product_samemyFunction(item, index) {
    var product_image = item.product_img;
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }
    //var IMAGE_url = 'img/noni.png';
    var other_title = '<div class="col add_clidduct_column">' +
    '<img src="' + IMAGE_url + '" alt="' + item.product_img + '" class="rounded div_otherimage" width="100%" height="100%">' +
    '</div>';
    $("#other_title").append(other_title);
}
function other_product_same_client(startlimit,endlimit,add_client) {
    //$('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { other_product_same_client: 12, startlimit: startlimit, endlimit: endlimit, add_client:add_client },
        processData: true,
        url: api_server_url + '/cordova/other_product_same_client.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);            
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") { 
                        $("#add_carousel_indicators").html('');
                        $("#add_carousel_other").html('');
                        $('.product_error_container').hide(500, function(){
                        });                   
                        products_data.forEach(other_product_same_clientmyFunction);
                    }
                }
            } catch(e) {
                
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

        }
    });

    /**const options = {
        method: 'post',
        data: { other_product_same_client: 12, startlimit: startlimit, endlimit: endlimit, add_client:add_client },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/other_product_same_client.php', options, function(response) {
        try {
            response.data = JSON.parse(response.data);            
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                if (products_status != "0") { 
                    $("#add_carousel_indicators").html('');
                    $("#add_carousel_other").html('');
                    $('.product_error_container').hide(500, function(){
                    });                   
                    products_data.forEach(other_product_same_clientmyFunction);
                }
            }
        } catch(e) {
            
        }
    }, function(response) {
        //$('#app-cover-spin').hide(0);
        
    }); */
}
function other_product_same_clientmyFunction(item, index) {
    var product_image = item.product_img;
    var product_price = currency_exchange_rate * item.product_price;    
    product_price = product_price.toFixed(2);
    var product_title = item.product_title;
    var product_title_account = "";
    if (product_title.length <= 30) {
        product_title_account = product_title;
    } else {
        product_title_account = product_title_account;// product_title.substring(0, 30) + "...";
    }    
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }
    //var IMAGE_url = 'img/noni.png';
    /**currency_price_symbal = '<div class="currencyclass"><input class="icon_input" type="radio" name="add_' + item.product_id + '_currency_symbal" id="add_' + item.product_id + '_currency_symbal">' +
                            '<label class="currencyicon_label" for="add_' + item.product_id + '_currency_symbal"><img src="img/dollar.svg" alt=""></label></div>';
    */

    if (index < 1) {
        var add_carousel_indicators = '<li data-target="#carouselExampleIndicators" data-slide-to="' + index + '" class="active"></li>';
        $("#add_carousel_indicators").append(add_carousel_indicators);
        var add_carousel_other  = '<div class="carousel-item active">' +
        '<img class="d-block w-100 div_cimage" src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item.add_location + '" add_description="' + item.add_description + '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
        
        '<div class="carousel-caption d-md-block card-title add_divtext card-img-overlay add_oertag">' +
        '<div class="btn btn-primary">' +
        '<a>' +  currency_price_symbal + '</a>' +    
        '<a>' +  product_price + '</a>' +
        '</div> ' + 
        '</div> ' + 
        
        '<div class="carousel-caption d-md-block card-title add_divtext add_oer">' +
        '<a class="buynownow">' +
        '<div class="float-left icon_padding_div">' +
        '<input class="add_to_cart icon_input" product_id = "' + item.product_id + '" type="radio" name="add_' + item.product_id + '_cart" id="add_' + item.product_id + '_cart">' +
        '<label class="currencyicon_label" for="add_' + item.product_id + '_cart"><img src="img/shopping-cart.svg" alt=""></label>' +
        '</div>' +   
    
        '<div class="float-left icon_padding_div">' +
        '<input class="edit_product icon_input" product_id = "' + item.product_id + '" type="radio" name="add_' + item.product_id + '_edit" id="add_' + item.product_id + '_edit">' +
        '<label class="currencyicon_label" for="add_' + item.product_id + '_edit"><img src="img/edit.svg" alt=""></label>' +
        '</div>' +
    
        '<div class="float-left icon_padding_div">' +
        '<input class="add_to_remove icon_input" product_id = "' + item.product_id + '" type="radio" name="add_' + item.product_id + 'remove_cart" id="add_' + item.product_id + 'remove_cart">' +
        '<label class="currencyicon_label" for="add_' + item.product_id + 'remove_cart"><img src="img/delete.svg" alt=""></label>' +
        '</div>' + 
        '</a>' + 

        '</div> ' +

        '<div class="card-body">' +
        '<h5>' + item.product_title + '</h5>' +  
        '</div> ' +
                 
        '</div>';
        $("#add_carousel_other").append(add_carousel_other);    
    } else {
        var add_carousel_indicators = '<li data-target="#carouselExampleIndicators" data-slide-to="' + index + '" class=""></li>';
        $("#add_carousel_indicators").append(add_carousel_indicators);
        var add_carousel_other  = '<div class="carousel-item">' +
        '<img class="d-block w-100 div_cimage " src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item.add_location + '" add_description="' + item.add_description + '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
       
        '<div class="carousel-caption d-md-block card-title add_divtext card-img-overlay add_oertag">' +
        '<div class="btn btn-primary">' +
        '<a>' +  currency_price_symbal + '</a>' +    
        '<a>' +  product_price + '</a>' +
        '</div> ' + 
        '</div> ' + 

        '<div class="carousel-caption d-md-block card-title add_divtext add_oer">' +
        '<a class="buynownow">' +
        '<div class="float-left icon_padding_div">' +
        '<input class="add_to_cart icon_input" product_id = "' + item.product_id + '" type="radio" name="add_' + item.product_id + '_cart" id="add_' + item.product_id + '_cart">' +
        '<label class="currencyicon_label" for="add_' + item.product_id + '_cart"><img src="img/shopping-cart.svg" alt=""></label>' +
        '</div>' +   
    
        '<div class="float-left icon_padding_div">' +
        '<input class="edit_product icon_input" product_id = "' + item.product_id + '" type="radio" name="add_' + item.product_id + '_edit" id="add_' + item.product_id + '_edit">' +
        '<label class="currencyicon_label" for="add_' + item.product_id + '_edit"><img src="img/edit.svg" alt=""></label>' +
        '</div>' +
    
        '<div class="float-left icon_padding_div">' +
        '<input class="add_to_remove icon_input" product_id = "' + item.product_id + '" type="radio" name="add_' + item.product_id + 'remove_cart" id="add_' + item.product_id + 'remove_cart">' +
        '<label class="currencyicon_label" for="add_' + item.product_id + 'remove_cart"><img src="img/delete.svg" alt=""></label>' +
        '</div>' + 
        '</a>' + 

        '</div> ' + 
        
        '<div class="card-body">' +
        '<h5>' + item.product_title + '</h5>' +  
        '</div> ' +

        '</div>';
        $("#add_carousel_other").append(add_carousel_other);
    }
}
$("#arrow_add_client_back").click(function(){
    $("#product_add_client_container").hide(100,function(){       
        $("#product_row_container").show(100);
        $("#product_error").hide(100);
    });
});

$("body").delegate(".category","click",function(event){
    event.preventDefault();
    var cat_id = $(this).attr('cat_id');
    var add_client = $(this).attr('add_client');
    startlimit = 0;
    endlimit = 24;
    $('.product_main_container').show(500, function(){
        window.location.href="#product_container";
        $("#menu_container_left_tab").show(100);
        $("#chat_container").hide(100);
        $("#connects_chatbar").hide(100);
       $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        product_main_container(startlimit,endlimit,cat_id);
    });
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
});
function apps_categories(add_client) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { apps_categories: 12, add_client: add_client },
        processData: true,
        url: api_server_url + '/cordova/apps_categories.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                //response.data = JSON.parse(response.data);
                $("#apps_categories").html('');
                if (response.message == "success") {
                    var apps_categories_status = response.apps_categories_status;
                    var apps_categories = response.apps_categories;
                    if (apps_categories_status != "0") {      
                        apps_categories.forEach(apps_categoriesmyFunction);
                    } else {
                            $("#apps_categories").html(response.message);
                            $("#apps_categories").append('No new Industries');
                    }
                }
                else {
                        $("#apps_categories").html(response.message);
                        $("#apps_categories").append('No new Industries');
                }
            } catch(e) {
                    $("#apps_categories").html(response.message);
                    $("#apps_categories").append('JSON parsing error');
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $("#apps_categories").append("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

        }
    });

    /**const options = {
        method: 'post',
        data: { apps_categories: 12, add_client: add_client },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/apps_categories.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            $("#apps_categories").html('');
            if (response.data.message == "success") {
                var apps_categories_status = response.data.apps_categories_status;
                var apps_categories = response.data.apps_categories;
                if (apps_categories_status != "0") {      
                    apps_categories.forEach(apps_categoriesmyFunction);
                } else {
                        $("#apps_categories").html(response.data.message);
                        $("#apps_categories").append('No new Industries');
                }
            }
            else {
                    $("#apps_categories").html(response.data.message);
                    $("#apps_categories").append('No new Industries');
            }
        } catch(e) {
                $("#apps_categories").html(response.data.message);
                $("#apps_categories").append('JSON parsing error');
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
            $("#apps_categories").append(response.status + " : " + response.error);
    }); */
}
function apps_categoriesmyFunction(item, index) {
    var cat_id = item.cat_id;
    var cat_title = item.cat_title;
    var add_client = item.add_client;
    var category_description = item.category_description;

    var category_container = '<li class="apps_nav-item nav-expand ">' +
    '<a cat_id="' + cat_id + '" add_client="' + add_client + '" class="nav-link nav-expand-link category" href="#">' + cat_title + '</a>' +    
    
    '</li>';
    $("#apps_categories").append(category_container);
}

function product_main_container(startlimit,endlimit,cat_id) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_main_container: 12, startlimit: startlimit, endlimit: endlimit, cat_id:cat_id },
        processData: true,
        url: api_server_url + '/cordova/product_main_container.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                //response.data = JSON.parse(response.data);
                $("#product_row_container").html('');
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") { 
                        $('.product_error_container').hide(500, function(){
                            window.location.href="#product_container";
                            $("#product_row_container").show(100);
                            $("#arrow_navigation_container").show(100);
                        });
                        product_row_container_index = products_data.length;                   
                        products_data.forEach(products_datamyFunction);
                    } else {
                        $('.product_error').show(500, function(){
                            window.location.href="#product_container";
                            $("#product_row_container").hide(100);
                            $("#arrow_navigation_container").hide(100);
                            $("#product_row_h").html(response.message);
                            $("#product_row_p").html('No new Products');
                        });
                    }
                }
                else {
                    $('.product_error_container').show(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.message);
                        $("#product_row_p").html('No new Products');
                    });
                }
            } catch(e) {
                $('.product_error_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.message);
                    $("#product_row_p").html('JSON parsing error');
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.product_error_container').show(500, function(){
              window.location.href="#product_container";
              $("#product_row_container").hide(100);
              $("#arrow_navigation_container").hide(100);
              $("#product_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          });

        }
    });
    /**const options = {
        method: 'post',
        data: { product_main_container: 12, startlimit: startlimit, endlimit: endlimit, cat_id:cat_id },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/product_main_container.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            $("#product_row_container").html('');
            if (response.data.message == "success") {
                var products_status = response.data.products_status;
                var products_data = response.data.products;
                if (products_status != "0") { 
                    $('.product_error_container').hide(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").show(100);
                        $("#arrow_navigation_container").show(100);
                    });                   
                    products_data.forEach(products_datamyFunction);
                } else {
                    $('.product_error').show(500, function(){
                        window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.data.message);
                        $("#product_row_p").html('No new Products');
                    });
                }
            }
            else {
                $('.product_error_container').show(500, function(){
                    window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.data.message);
                    $("#product_row_p").html('No new Products');
                });
            }
        } catch(e) {
            $('.product_error_container').show(500, function(){
                window.location.href="#product_container";
                $("#product_row_container").hide(100);
                $("#arrow_navigation_container").hide(100);
                $("#product_row_h").html(response.data.message);
                $("#product_row_p").html('JSON parsing error');
            });
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        $('.product_error_container').show(500, function(){
            window.location.href="#product_container";
            $("#product_row_container").hide(100);
            $("#arrow_navigation_container").hide(100);
            $("#product_row_p").html(response.status + " : " + response.error);
        });
    }); */

}

var product_row_container_index = 0;
function products_datamyFunction(item, index) {
    window.location.href="#maincontainer";
    var product_row_index = product_row_container_index;
    var product_image = item.product_img;
    var product_price = currency_exchange_rate * item.product_price;    
    product_price = product_price.toFixed(2);
    var product_title = item.product_title;
    var product_title_account = "";

    if (product_title.length <= 30) {
        product_title_account = product_title;
    } else {
        product_title_account = product_title.substring(0, 30) + "...";
    }
    
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }

    if (username == item.add_client) {
        var actions = '<div class="tags are-medium">' +
    
        '<span class="tag is-success add_to_cart" product_id = "' + item.product_id + '">Buy</span>' +
        '<span class="tag is-info edit_product" product_id = "' + item.product_id + '">Edit</span>' +
        '<span class="tag is-danger add_to_remove" product_id = "' + item.product_id + '">Delete</span>' +
        '</div>';
    } else {
        var actions = '<div class="tags are-medium">' +
    
        '<span class="tag is-success add_to_cart" product_id = "' + item.product_id + '">Buy</span>' +
        '<span class="tag is-primary wishlist_product" product_id = "' + item.product_id + '">Wishlist</span>' +
        '<span class="tag is-secondary connect_product" product_id = "' + item.product_id + '" add_client = "' + item.add_client + '">Connect</span>' +
        '</div>';
    }
    if (role == 'admin' || role == 'Admin'){
        var actions = '<div class="tags are-medium">' +
        '<span class="tag is-success add_to_cart" product_id = "' + item.product_id + '">Buy</span>' +
        '<span class="tag is-info edit_product" product_id = "' + item.product_id + '">Edit</span>' +
        '<span class="tag is-danger add_to_remove" product_id = "' + item.product_id + '">Delete</span>' +
        
        '<span class="tag is-success add_to_cart" product_id = "' + item.product_id + '">Buy</span>' +
        '<span class="tag is-primary wishlist_product" product_id = "' + item.product_id + '">Wishlist</span>' +
        '<span class="tag is-secondary connect_product" product_id = "' + item.product_id + '" add_client = "' + item.add_client + '">Connect</span>' +
        '</div>';
    } 


    var product_row_container = '<div class="product_column">' +
    '<div class="card">' +
    '<div class="card-section">' +
    '<img class="div_cimage" src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item.add_location + '" add_description="' + item.add_description + '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
    '</div>' +
    '<div class="card-section">' +
    
    '<p class="card-text"><b style="height: auto;">' + product_title_account + '</b></p>' +

    '<div class="btn btn-primary">' +
    '<a>' +  currency_price_symbal + '</a>' +    
    '<a>' +  product_price + '</a>' +
    '<i class="bi bi-cart"></i>' +
    '</div> ' + 

    '<p class="card-text">From ' + item.add_client + '</p>' +    '</div>' +
    
    '<footer class="card-footer">' + actions + '</footer>' +

    '</div>' +
    '</div>'; 
    //$("#product_row_row").append(product_row_row);

    $("#product_row_container").append(product_row_container);

    if (startlimit > 0) {
        if (product_row_index < 20) {
            $("#product_next").hide(100,function(){       
                $("#product_previous").show(100);
            });
        } else {
            $("#product_next").show(100,function(){       
                $("#product_previous").show(100);
            });
        }        
    } else {
        $("#product_next").show(100,function(){       
            $("#product_previous").hide(100);
        });
    }
    
}

$("#add_products_agent").click(function(){
    $("#add_products_new").show(100);
});
$("#add_products_close").click(function(){
    $("#add_products_new").hide(100);
});
$("#pr_next").click(function(){
    startlimit = endlimit;
    endlimit = endlimit + 20;
    var cat_id = "";
    product_main_container(startlimit,endlimit,cat_id);
});
$("#pr_previous").click(function(){
    endlimit = startlimit;
    startlimit = startlimit - 20;
    var cat_id = "";
    product_main_container(startlimit,endlimit,cat_id);
});

$("#s1").click(function(){
    window.location.href="#product_container";
    $("#menu_container_top_tab").show(100);
    $("#menu_container_left_tab").show(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
   $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);
    $("#top_menu").show(100,function(){       
        $("#search").hide(100);
        $("#top_slider").hide(100);

    });
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);
    main();
});

var connect_from = "";
var connects_id = "";
var chat_window = 0;
$("#chat_message").keypress(function (e){
    if(e.keyCode == 13){
        var IMAGE_url = 'img/jeans3.jpg';
        var chat_message = $("#chat_message").val();
        if (chat_message !='' && chat_message != null) {
            $("#chat_message").val('');
            chat_window = 1;
            contact(username,connect_from,connects_id,chat_message);
        } else {
            var connect_messages  = '<div class="message stark" connect_from="' + 'Mo-pal' + '" connect_messages_id="' + '1' + '">' + 'Please, Type your message' + '</div>';
            $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
            $("#chat").html(connect_messages);
        }
    }
});
$("#radio-send").click(function(){
    var IMAGE_url = 'img/jeans3.jpg';
    var chat_message = $("#chat_message").val();
    if (chat_message !='' && chat_message != null) {
        $("#chat_message").val('');
        chat_window = 1;
        contact(username,connect_from,connects_id,chat_message);
    } else {
        var connect_messages  = '<div class="message stark" connect_from="' + 'Mo-pal' + '" connect_messages_id="' + '1' + '">' + 'Please, Type your message' + '</div>';
        $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
        $("#chat").html(connect_messages);
    }
});
var conta = 0;
$("body").delegate(".get_contact","click",function(event){
    event.preventDefault();
    conta = 1;
    $("#contactname").html($(this).attr('connect_from'));
    $("#cotacttime").html($(this).attr('connects_time'));
    var IMAGE_url = 'img/jeans3.jpg';
    $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
    var chat_message = '';
    connect_from = $(this).attr('connect_from');
    //connects_datalengthnow = 0;
    connects_datalength = 0;
    //$("#chat").html('');
    contact(username,$(this).attr('connect_from'),$(this).attr('connects_id'),chat_message);    
});
$("body").delegate(".add_float","click",function(event){
    event.preventDefault();
    conta = 1;
    chat_ = 1;
    window.location.href="#center_top_id"; 
    $("#menu_container_top_tab").hide(100);                
    $("#center_top_id").show(100);                

    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else {        

        $("#contactname").html($(this).attr('connect_from'));
        $("#cotacttime").html($(this).attr('connects_time'));
        var IMAGE_url = 'img/jeans3.jpg';
        $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
        var chat_message = '';
        div_cima = 1;
        //alert(connect_from);
        connect_from = $(this).attr('connect_from');
        //connects_datalengthnow = 0;
        connects_datalength = 0;
        //$("#chat").html('');
        contact(username,$(this).attr('connect_from'),$(this).attr('connects_id'),chat_message);
    
        $("#connects_chatbar").show(100);
        $("#product_container").hide(100);
        $("#menu_container_left_tab").hide(100);
        $("#orders_container").hide(100);
        $("#order_items_container").hide(10);
        $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        $("#top_menu").show(100,function(){       
            $("#search").hide(100);
            $("#top_slider").hide(100);

        });
        $("#connects_contacts").show(100,function(){       
            $("#connects_messages").hide(100);                
        });
    }
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }

        
});
var data_length = 0;
var chats_length = 0;
var connects_datalength = 0;
var connects_datalengthnow = 0;
var connectstrue = 0;
function contact(username,con_from,conn_id,chat_message) {
    if (chat_window == 1) {
        chat_window = 0;
    } else {
        if (con_from != "" ) {
            if (conectset == 0) {
                $('#app-cover-spin').show(0);
            } else {
                conectset = 0;
            } 
            $(".chat_main_container").show(100);              
        }        
    } 
    if (connect_from == "") {
        $("#chat").html('Loading ...');
    }   
    var IMAGE_url = 'img/jeans3.jpg';
    connects_id = conn_id;
    connect_from = con_from;

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { contact: 12, username: username,connect_from: connect_from ,connects_id: connects_id, chat_message:chat_message  },
        processData: true,
        url: api_server_url + '/cordova/contact.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                //response.data = JSON.parse(response.data);            
                if (response.message == "success") {
                    var connects_data = response.connects;
                    //connect_from = response.data.connect_from;
                    //alert(response.data.connect_from);
                    var connect_status = response.connect_status;
    
                    connects_datalength = connects_datalengthnow;
                    connects_datalengthnow = connects_data.length;
                    if (connect_from == "") {
                        $("#chat").html('Loading ...');
                        connectstrue = 0;
                        data_length =  connects_data.length;                 
                        connects_data.forEach(contacts_datamyFunction);
                    } else {
                        if (connects_datalength < connects_datalengthnow || connects_datalength > connects_datalengthnow) {
                            $("#chat").html('');
                            connectstrue = 1;
                            data_length =  connects_data.length;                 
                            connects_data.forEach(contacts_datamyFunction);
                        } else {
                            connectstrue = 0;
                            data_length =  connects_data.length;                 
                            connects_data.forEach(contacts_datamyFunction);
                        }
                    } 
                    
                    //connect_from = response.data.connect_from;
                    
                }
                else {
                    if (connect_from != "" ) {
                        if (conectset == 0) {
                            $("#contactname").html(connect_from);
                            $("#cotacttime").html(Date());
                            var connect_messages  = '<div class="message stark" connect_from="' + connect_from + '" connect_messages_id="' + '1' + '">' + 'Hello ' + username + ', My name is ' + connect_from + '. How can i help you?' + '</div>';
                            $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
                            $("#chat").html(connect_messages);
                            $("#connects_contacts").hide(100,function(){       
                                $("#connects_messages").show(100); 
                                $("#menu_container_top_tab").hide(100);                
                                $("#menu_container_bottom_tab").hide(100);                
        
                            });                        
                        } else {
                            conectset = 0;
                        }               
                    }
                    else{
                        
                    }                               
                }            
            } catch(e) {
                $('#app-cover-spin').hide(0);
                                       
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
         

        }
    });


    /**const options = {
        method: 'post',
        data: { contact: 12, username: username,connect_from: connect_from ,connects_id: connects_id, chat_message:chat_message  },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/contact.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);            
            if (response.data.message == "success") {
                var connects_data = response.data.connects;
                //connect_from = response.data.connect_from;
                //alert(response.data.connect_from);
                var connect_status = response.data.connect_status;

                connects_datalength = connects_datalengthnow;
                connects_datalengthnow = connects_data.length;
                if (connect_from == "") {
                    $("#chat").html('Loading ...');
                    connectstrue = 0;
                    data_length =  connects_data.length;                 
                    connects_data.forEach(contacts_datamyFunction);
                } else {
                    if (connects_datalength < connects_datalengthnow || connects_datalength > connects_datalengthnow) {
                        $("#chat").html('');
                        connectstrue = 1;
                        data_length =  connects_data.length;                 
                        connects_data.forEach(contacts_datamyFunction);
                    } else {
                        connectstrue = 0;
                        data_length =  connects_data.length;                 
                        connects_data.forEach(contacts_datamyFunction);
                    }
                } 
                
                //connect_from = response.data.connect_from;
                
            }
            else {
                if (connect_from != "" ) {
                    if (conectset == 0) {
                        $("#contactname").html(connect_from);
                        $("#cotacttime").html(Date());
                        var connect_messages  = '<div class="message stark" connect_from="' + connect_from + '" connect_messages_id="' + '1' + '">' + 'Hello ' + username + ', My name is ' + connect_from + '. How can i help you?' + '</div>';
                        $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
                        $("#chat").html(connect_messages);
                        $("#connects_contacts").hide(100,function(){       
                            $("#connects_messages").show(100); 
                            $("#menu_container_top_tab").hide(100);                
                            $("#menu_container_bottom_tab").hide(100);                
    
                        });                        
                    } else {
                        conectset = 0;
                    }               
                }
                else{
                    
                }                               
            }            
        } catch(e) {
            $('#app-cover-spin').hide(0);
                                   
        }
    }, function(response) {
    
    }); */

    if (chats_length > 0) {
        $("#chat_num").show(100);
        $("#chat_num").html(chats_length);
    } else {
        $("#chat_num").hide(100);
        $("#chat_num").html(chats_length);
    }
}
var value_from_connects_name = "";
var endchat = 1;
function contacts_datamyFunction(item, index) {
    var data_i = data_length-1;
    var IMAGE_url = '../img/jeans3.jpg';
    if (connectstrue == 1) {
        if (connect_from != "") {
            if (username == item.connect_from) {
                var connect_messages  = '<div class="message parker" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' + item.connect_message + '</div>';
                $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");    
            } else {
                var connect_messages  = '<div class="message stark" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' + item.connect_message + '</div>';
                $(".pic").attr("style", "background-image: url('" + IMAGE_url + "')");
            }
            if (data_i == index) {
                var typing = '<div id="bot_typing" class="message stark">' +
                '<div class="typing typing-1"></div>' +
                '<div class="typing typing-2"></div>' +
                '<div class="typing typing-3"></div>' +
                '</div>';
                $("#chat").append(connect_messages + typing);
                window.location.href="#bot_typing"; 
                endchat = 0;
                $("#connects_contacts").hide(100,function(){       
                    $("#connects_messages").show(100); 
                    $("#menu_container_top_tab").hide(100);                
                    $("#menu_container_bottom_tab").hide(100);
                });
                            
            } else {
                $("#chat").append(connect_messages);
            }
        }        
    }
    else{
        if (value_from_connects_name.includes(item.connect_from) == false) {
            value_from_connects_name = value_from_connects_name + " " + item.connect_from;
            loadchat(item.connect_from);
        }
    }
       
}
$("#connects_back").click(function(){
    connect_from = "";
    if (connect_product == 1) {
        connect_product = 0; 
        connect_from = "";
        $("#chat_container").hide(500,function(){
            $("#product_container").show(100);
            //$("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            //$("#product_add_client_container").show(100);
        });               
    }
    $("#menu_container_top_tab").show(500,function(){
        $("#menu_container_bottom_tab").show(100);
        $("#connects_messages").hide(500);      
        $("#connects_contacts").show(500);
        $("#center_top_id").hide(100); 
    });    
});
$("#contacts_back").click(function(){
    connect_from = "";
    if (connect_product == 1) {
        connect_product = 0; 
        connect_from = "";
        $("#chat_container").hide(500,function(){
            $("#product_container").show(100);
            //$("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            //$("#product_add_client_container").show(100);
        });               
    }
    $("#menu_container_top_tab").show(500,function(){
        $("#menu_container_bottom_tab").show(100);
        $("#connects_messages").hide(500);      
        $("#connects_contacts").show(500); 
        $("#center_top_id").hide(100);
    });
});
var chat_ = 0;
$("#s5").click(function(){
    chat_ = 1;
    window.location.href="#center_top_id"; 
    $("#menu_container_top_tab").hide(100);                
    $("#center_top_id").show(100);                

    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else {
        $("#connects_chatbar").show(100);
        $("#product_container").hide(100);
        $("#menu_container_left_tab").hide(100);
       $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        $("#top_menu").show(100,function(){       
            $("#search").hide(100);
            $("#top_slider").hide(100);

        });
        $("#connects_contacts").show(100,function(){       
            $("#connects_messages").hide(100);                
        });
        chat_main_container();
    }
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }

    
});
var get_connect_from = "";
var unread = 0;
var bum = 0;
function connects_datamyFunction(item, index) {
    var i = 0;
    var IMAGE_url = '../img/jeans3.jpg';
    var messag = item.connect_message;
    var product_title_account = "";
    if (messag.length <= 30) {
        product_title_account = messag;
    } else {
        product_title_account = messag.substring(0, 30) + "...";
    }
    if (item.connect_status == "unread") {
        get_connect_from = item.connect_from;
        unread = unread + 1;
        var connect_messages  = '<div class="contact get_contact" connect_from="' + item.connect_from + '" connects_id="' + item.connects_id + '" connects_time="' + item.connects_time + '">' +
        '<div class="pic rogers rogers_'+ index +'"></div>' +
        '<div class="badge">' +
        '  ' + bum + '' +
        '</div>' +
        '<div class="name">' +
        '  ' + item.connect_from + '' +
        '</div>' +
        '<div class="message">' +
        '  ' + product_title_account + '' +
        '</div>' +
        '</div>';        
    } else {
        bum = 0;
        var connect_messages  = '<div class="contact get_contact" connect_from="' + item.connect_from + '" connects_id="' + item.connects_id + '" connects_time="' + item.connects_time + '">' +
        '<div class="pic rogers rogers_'+ index +'"></div>' +        
        '<div class="name">' +
        '  ' + item.connect_from + '' +
        '</div>' +
        '<div class="message">' +
        '  ' + product_title_account + '' +
        '</div>' +
        '</div>';
    }
    
    $(".rogers_" + index + "").attr("style", "background-image: url('" + IMAGE_url + "')");
    $("#connects").append(connect_messages);
}
var connects_data_from = "";
function chat_main_container() {
    $(".chat_main_container").show(100);
    $('#app-cover-spin').show(0);
    window.location.href="#center_top_id"; 
}
function loadchat(item_connect_from) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { chat_main_container: 12, username: username, item_connect_from: item_connect_from },
        processData: true,
        url: api_server_url + '/cordova/chat_main_container.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    var connect_status = response.connect_status;
                    var connects_data = response.connects;
                    bum = response.data_returned;                
                    if (connect_from == "") {
                        if (connect_status != "0") { 
                            unread = 0;
                            connects_data.forEach(connects_datamyFunction);    
                        } else {
    
                        }
                    }
                }
                else {
                    unread++;
                    var connect_messages  = '<div class="contact get_contact" connect_from="' + 'Mo-pal' + '" connects_id="' + 'Mo-pal' + '" connects_time="' + Date() + '">' +
                        '<div class="pic rogers"></div>' +
                        '<div class="badge">' +
                        '  ' + unread +'' +
                        '</div>' +
                        '<div class="name">' +
                        '  ' + 'Mo-pal' + '' +
                        '</div>' +
                        '<div class="message">' +
                        '  connect_from ' + connect_from + response.message + '' +
                        '</div>' +
                        '</div>';
                    $("#connects").append(connect_messages);
                }
            } catch(e) {
                unread++;
                var connect_messages  = '<div class="contact get_contact" connect_from="' + 'Mo-pal' + '" connects_id="' + 'Mo-pal' + '" connects_time="' + Date() + '">' +
                    '<div class="pic rogers"></div>' +
                    '<div class="badge">' +
                    '  ' + unread +'' +
                    '</div>' +
                    '<div class="name">' +
                    '  ' + 'Mo-pal' + '' +
                    '</div>' +
                    '<div class="message">' +
                    '  connect_from ' + 'Json persing error' + '' +
                    '</div>' +
                    '</div>';
                $("#connects").append(connect_messages);
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          unread++;
          var connect_messages  = '<div class="contact get_contact" connect_from="' + 'Mo-pal' + '" connects_id="' + 'Mo-pal' + '" connects_time="' + Date() + '">' +
              '<div class="pic rogers"></div>' +
              '<div class="badge">' +
              '  ' + unread +'' +
              '</div>' +
              '<div class="name">' +
              '  ' + 'Mo-pal' + '' +
              '</div>' +
              '<div class="message">' +
              '  connect_from ' + "Error on ajax call: " + err  + " " + JSON.stringify(xhr) + '' +
              '</div>' +
              '</div>';
          $("#connects").append(connect_messages);

        }
    });


    /**const options = {
        method: 'post',
        data: { chat_main_container: 12, username: username, item_connect_from: item_connect_from },
        headers: { Authorization: 'OAuth2: token' }
    };      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/chat_main_container.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                var connect_status = response.data.connect_status;
                var connects_data = response.data.connects;
                bum = response.data.data_returned;                
                if (connect_from == "") {
                    if (connect_status != "0") { 
                        unread = 0;
                        connects_data.forEach(connects_datamyFunction);    
                    } else {

                    }
                }
            }
            else {
                unread++;
                var connect_messages  = '<div class="contact get_contact" connect_from="' + 'Mo-pal' + '" connects_id="' + 'Mo-pal' + '" connects_time="' + Date() + '">' +
                    '<div class="pic rogers"></div>' +
                    '<div class="badge">' +
                    '  ' + unread +'' +
                    '</div>' +
                    '<div class="name">' +
                    '  ' + 'Mo-pal' + '' +
                    '</div>' +
                    '<div class="message">' +
                    '  connect_from ' + connect_from + response.data.message + '' +
                    '</div>' +
                    '</div>';
                $("#connects").append(connect_messages);
            }
        } catch(e) {
            
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
    }); */
}
document.addEventListener('backbutton', function(){
    connect_from = "";
    if (chat_ == 1) {
        chat_ = 0;
        connect_from = "";
        $("#menu_container_top_tab").show(500,function(){
            $("#menu_container_bottom_tab").show(100);
            $("#connects_messages").hide(500);      
            $("#connects_contacts").show(500); 
            $("#center_top_id").hide(100);    
        });        
    }
    if (conta == 1) {
        conta = 0;
        connect_from = "";
        $("#menu_container_top_tab").show(500,function(){
            $("#menu_container_bottom_tab").show(100);
            $("#connects_messages").hide(500);      
            $("#connects_contacts").show(500);
            $("#center_top_id").hide(100);     
        });        
    }
    if (div_cima == 1 && chat_ == 0) {
        div_cima = 0; 
        connect_from = "";
        $("#chat_container").hide(500,function(){
            $("#product_container").show(100);
            $("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            $("#product_add_client_container").show(100);
        });               
    }
    if (connect_product == 1) {
        connect_product = 0; 
        connect_from = "";
        $("#chat_container").hide(500,function(){
            $("#product_container").show(100);
            //$("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            //$("#product_add_client_container").show(100);
        });               
    }
    if (add_cdiv_cima == 1  ) {
        div_cima = 0;
        connect_from = "";
        $("#product_add_client_container").hide(100,function(){       
            $("#product_row_container").show(100);
            $("#product_error").hide(100);
        });        
    }
});

$("#s2").click(function(){
    window.location.href="#cart_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#location_container").hide(100);
    $("#user_container").hide(100);
    $("#top_menu").show(100,function(){       
        $("#search").hide(100);
        $("#top_slider").hide(100);

    });
    cart();
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);

});
function cart() {
    $(".cart").show(100);
    $("#order_items_container").hide(10);

    window.location.href="#cart_container";
    product_id(startlimit,endlimit,12,username,100);
}

$("#s4").click(function(){
    window.location.href="#user_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
   $("#orders_container").hide(100);
   $("#order_items_container").hide(10);
               $("#cart_container").hide(100);
    $("#location_container").hide(100);
    $("#top_menu").show(100,function(){       
        $("#search").hide(100);
        $("#top_slider").hide(100);

    });
    user();
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);
});
function user() {    
    if (username == "") {
        $(".user").hide(100);
        $(".main").hide(100);        
        $(".authentication").show(100);
    } else {
        $(".authentication").hide(100);
        $(".main").show(100);
        $(".user").show(100);
        window.location.href="#user_container";
        user_container(username);

    }    
}

$("#s3").click(function(){
    window.location.href="#location_container";
    $("#menu_container_top_tab").show(100);                

    $("#product_container").hide(100);
    $("#menu_container_left_tab").hide(100);
    $("#chat_container").hide(100);
    $("#connects_chatbar").hide(100);
    $("#orders_container").hide(100);
    $("#order_items_container").hide(10);
    $("#cart_container").hide(100);
    $("#user_container").hide(100);
    $("#top_menu").show(100,function(){       
        $("#search").hide(100);
        $("#top_slider").hide(100);

    });
    location_container();
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
    }
    //$("#menu_container_apps_tab").hide(100);
});
function location_container() {
    $(".location_main_container").show(100);
    window.location.href="#location_container";    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    var onSuccess = function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        heremapview(latitude,longitude);        
    };
    function onError(error) {
        $("#location_container").html('code: ' + error.code + 'message: ' + error.message + '');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError); 
}

function addMarkersToMap_client(latitude,longitude){
     var dataURL = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?c=52.5159%2C13.3777&z=14&apiKey=H6XyiCT0w1t9GgTjqhRXxDMrVj9h78ya3NuxlwM7XUs";
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() { 
       if (this.readyState == 4 && this.status == 200) { 
         var data = this.responseText ; 
         alert(data);
       } 
     }; 
     xmlhttp.open("GET", dataURL, true); 
     xmlhttp.send(); 
}

function heremapview(latitude,longitude) {
    $('#app-cover-spin').show(0);
    const options = {
        method: 'GET',
        data: {
            c: '' + latitude + ',' + longitude + '',
            z: '14',
            apiKey: 'DxmnLCJGBp0cNolyGK4WcikPtr5NPC-Yui8fqwaVuVs',
        }
    };     
    cordova.plugin.http.sendRequest('https://image.maps.ls.hereapi.com/mia/1.6/mapview',options,function(response) {
        $('#app-cover-spin').hide(0);
        var add_heremap = document.getElementById('main_heremap');
        add_heremap.src = response;
        try {
            //addMarkersToMap(map);

            //$("#locationinfo").html('response: ' + JSON.stringify(response) + '');
            alert(JSON.stringify(response));
        } catch(e) {
            $("#locationinfo").html('JSON parsing error');
            alert('JSON parsing error');
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
       // $("#locationinfo").html(response.status + " : " + response.error);
        alert(response.status + " : " + response.error);
    }); 
}
function snackbar(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
$("#login").keypress(function (e){
    if(e.keyCode == 13){
        login_button();
    }
});
function login_button() {
   var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   var login_email_details = false;
   var login_password_details = false;

   var login_email = $("#login_email").val();
   if (login_email != "" && login_email != "name@example.com" && login_email != null) {
    if (email_format.test(login_email)) {
        login_email_details = true;
        $("#login_email_help").html(login_email);
        $("#login_email").removeClass("is-invalid");
        $("#login_email").addClass("is-valid");
    } else {
        login_email_details = false;
        $("#login_email_help").html("Enter a valid email address, e.g name@example.com");
        $("#login_email").removeClass("is-valid");
        $("#login_email").addClass("is-invalid");
    }
   } else {
       login_email_details = false;
       $("#login_email_help").html("Email address should be provided");
       $("#login_email").removeClass("is-valid");
       $("#login_email").addClass("is-invalid");
   }

   var login_password = $("#login_password").val();
   if (login_password != "" && login_password != null) {
    $("#login_password").removeClass("is-invalid");
    $("#login_password").addClass("is-valid");
    if (login_password.length >= 8) {
        login_password_details = true;
        $("#login_password_help").html(login_password.length);
        $("#login_password").removeClass("is-invalid");
        $("#login_password").addClass("is-valid");
    } else {
        login_password_details = false;
        $("#login_password_help").html("Password should be atleast 8 characters");
        $("#login_password").removeClass("is-valid");
        $("#login_password").addClass("is-invalid");
    }
   } else {
       login_password_details = false;
       $("#login_password_help").html("Password should be provided");
       $("#login_password").removeClass("is-valid");
       $("#login_password").addClass("is-invalid");
   }

   if (login_email_details == true && login_password_details == true) {
    $("#login_button_help").html("Loading your account...");    
    login_user(login_email,login_password);
   } else {
    $("#login_button_help").html("Correct the error(s) highligted");       
   }
}
$("#login_button").click(function(){  
    login_button();    
});
function login_user(login_email,login_password) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { login_user: 12, login_email: login_email, login_password:login_password },
        processData: true,
        url: api_server_url + '/cordova/login_user.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            $("#login_button_help").html(response.message);
           // alert(response.message);
            //alert(JSON.parse(response));


            try {
               // response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    $("#login_button_help").html("Welcome " + response.username);
                    username = response.username;
                    main();
                } else {
                    $("#login_button_help").html(response.login_email + " or " + response.login_password);
                }
            } catch(e) {
                //console.error('JSON parsing error');
                $("#login_button_help").html('JSON parsing error');

            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $("#login_button_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          //api_server_url = "http://192.168.0.102";
          main();

        }
    });

    /**const options = {
        method: 'post',
        data: { login_user: 12, login_email: login_email, login_password:login_password },
        headers: { Authorization: 'OAuth2: token' }
    };
      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/login_user.php', options, function(response) {
        // prints 200
        $('#app-cover-spin').hide(0);
        $("#login_button_help").html(response.status);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                $("#login_button_help").html("Welcome " + response.data.username);
                username = response.data.username;
                main();
            } else {
                $("#login_button_help").html(response.data.login_email + " or " + response.data.login_password);
            }
        } catch(e) {
            console.error('JSON parsing error');
        }
    }, function(response) {
        // prints 403
        $('#app-cover-spin').hide(0);
        $("#login_button_help").html(response.status + " : " + response.error);
        //api_server_url = "http://192.168.0.102";

        main();
        
    }); */
}

$("#regis").keypress(function (e){
    if(e.keyCode == 13){
        signup_button();
    }
});
function signup_button() {
    var User_name_format = /^[A-Za-z0-9' ']+$/;
    var email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var signup_username_details = false;
    var signup_email_details = false;
    var signup_password_details = false;


    var signup_username = $("#signup_username").val();
    if (signup_username != "" && signup_username != null) {
        if (User_name_format.test(signup_username)) {
            signup_username_details = true;
            $("#signup_username_help").html(signup_username);
            $("#signup_username").removeClass("is-invalid");
            $("#signup_username").addClass("is-valid");
        } else {
            signup_username_details = false;
            $("#signup_username_help").html("Enter a valid username, e.g John Doe, John etc");
            $("#signup_username").removeClass("is-valid");
            $("#signup_username").addClass("is-invalid");
        }
    } else {
        signup_username_details = false;
        $("#signup_username_help").html("Username should be provided");
        $("#signup_username").removeClass("is-valid");
        $("#signup_username").addClass("is-invalid");
    }
 
    var signup_email = $("#signup_email").val();
    if (signup_email != "" && signup_email != "name@example.com" && signup_email != null) {
        if (email_format.test(signup_email)) {
            signup_email_details = true;
            $("#signup_email_help").html(signup_email);
            $("#signup_email").removeClass("is-invalid");
            $("#signup_email").addClass("is-valid");
        } else {
            signup_email_details = false;
            $("#signup_email_help").html("Enter a valid email address, e.g name@example.com");
            $("#signup_email").removeClass("is-valid");
            $("#signup_email").addClass("is-invalid");
        }
    } else {
        signup_email_details = false;
        $("#signup_email_help").html("Email address should be provided");
        $("#signup_email").removeClass("is-valid");
        $("#signup_email").addClass("is-invalid");
    }

    var signup_password = $("#signup_password").val();
    if (signup_password != "" && signup_password != null) {
        $("#signup_password").removeClass("is-invalid");
        $("#signup_password").addClass("is-valid");
        if (signup_password.length >= 8) {
            signup_password_details = true;
            $("#signup_password_help").html(signup_password.length);
            $("#signup_password").removeClass("is-invalid");
            $("#signup_password").addClass("is-valid");
        } else {
            signup_password_details = false;
            $("#signup_password_help").html("Password should be atleast 8 characters");
            $("#signup_password").removeClass("is-valid");
            $("#signup_password").addClass("is-invalid");
        }
    } else {
        signup_password_details = false;
        $("#signup_password_help").html("Password should be provided");
        $("#signup_password").removeClass("is-valid");
        $("#signup_password").addClass("is-invalid");
    }

    if (signup_username_details == true && signup_email_details == true && signup_password_details == true) {
        $("#signup_button_help").html("Creating your account...");    
        signup_user(signup_username,signup_email,signup_password);
    } else {
        $("#signup_button_help").html("Correct the errors highligted");       
    }
}
$("#signup_button").click(function(){
    signup_button();
});
function signup_user(signup_username,signup_email,signup_password) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { signup_user: 12, signup_username: signup_username, signup_email:signup_email, signup_password:signup_password },
        processData: true,
        url: api_server_url + '/cordova/signup_user.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            $("#signup_button_help").html(response.message);
           // alert(response.message);
            try {
                //response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    $("#signup_button_help").html("Welcome " + response.username);
                    username = response.username;
                    timestamp = response.timestamp;
                    latitude = response.latitude;
                    longitude = response.longitude;
                    location_name = response.location_name;
                    review = response.review;
                    rating = response.rating;
                    role = response.role;
                    altitude = response.altitude;
                    main();
                }
                else if(response.message == "fail validate"){
                    if (response.message_username == "fail") {
                        //signup_username_details = false;
                        $("#signup_username_help").html("Username already exist!");
                        $("#signup_username").removeClass("is-valid");
                        $("#signup_username").addClass("is-invalid");
                    } else {
                        //signup_username_details = true;
                        $("#signup_username_help").html(signup_username + " is ok");
                        $("#signup_username").removeClass("is-invalid");
                        $("#signup_username").addClass("is-valid");
                    }
                    if (response.message_email == "fail") {
                        //signup_email_details = false;
                        $("#signup_email_help").html("Email already exist!");
                        $("#signup_email").removeClass("is-valid");
                        $("#signup_email").addClass("is-invalid");
                    } else {
                        //signup_email_details = true;
                        $("#signup_email_help").html(signup_email + " is ok");
                        $("#signup_email").removeClass("is-invalid");
                        $("#signup_email").addClass("is-valid");                    
                    }
                    $("#signup_button_help").html("Correct error(s) highlighted!");
                } else {
                    $("#signup_button_help").html(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                //console.error('JSON parsing error');
                $("#signup_button_help").html('JSON parsing error');

            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $("#signup_button_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          main();

        }
    });


    /**const options = {
        method: 'post',
        data: { signup_user: 12, signup_username: signup_username, signup_email:signup_email, signup_password:signup_password },
        headers: { Authorization: 'OAuth2: token' }
    };
      
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/signup_user.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        $("#signup_button_help").html(response.status);
        try {
            response.data = JSON.parse(response.data);
            if (response.data.message == "success") {
                $("#signup_button_help").html("Welcome " + response.data.username);
                username = response.data.username;
                timestamp = response.data.timestamp;
                latitude = response.data.latitude;
                longitude = response.data.longitude;
                location_name = response.data.location_name;
                review = response.data.review;
                rating = response.data.rating;
                role = response.data.role;
                altitude = response.data.altitude;
                main();
            }
            else if(response.data.message == "fail validate"){
                if (response.data.message_username == "fail") {
                    //signup_username_details = false;
                    $("#signup_username_help").html("Username already exist!");
                    $("#signup_username").removeClass("is-valid");
                    $("#signup_username").addClass("is-invalid");
                } else {
                    //signup_username_details = true;
                    $("#signup_username_help").html(signup_username + " is ok");
                    $("#signup_username").removeClass("is-invalid");
                    $("#signup_username").addClass("is-valid");
                }
                if (response.data.message_email == "fail") {
                    //signup_email_details = false;
                    $("#signup_email_help").html("Email already exist!");
                    $("#signup_email").removeClass("is-valid");
                    $("#signup_email").addClass("is-invalid");
                } else {
                    //signup_email_details = true;
                    $("#signup_email_help").html(signup_email + " is ok");
                    $("#signup_email").removeClass("is-invalid");
                    $("#signup_email").addClass("is-valid");                    
                }
                $("#signup_button_help").html("Correct error(s) highlighted!");
            } else {
                $("#signup_button_help").html(response.data.signup_email + " or " + response.data.signup_password);
            }
        } catch(e) {
            console.error('JSON parsing error');
        }
    }, function(response) {
        $('#app-cover-spin').hide(0);
        $("#signup_button_help").html(response.status + " : " + response.error);
        main();        
    }); */
}
