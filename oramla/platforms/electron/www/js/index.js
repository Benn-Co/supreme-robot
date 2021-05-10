
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

//export { colorCode };
document.addEventListener('deviceready', onDeviceReady, false);

var username = "";
var email = "";
var phone = "";
var last = ""
var first = ""

var postal =  "";
var country =  "";
var city =  "";
var address =  "";

var timestamp =  "";
var latitude =  52.5159;
var longitude =  13.3777;
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
//var api_server_url = "http://192.168.0.102";
//var api_server_url = "http://169.254.249.58";
//var api_server_url = "http://192.168.43.16";
//var api_server_url = "http://localhost";
//var api_server_url = "http://192.168.43.16";


//var devicePlatform = device.platform;
function onDeviceReady() {
    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    username = localStorage.getItem("username");
    email = localStorage.getItem("email");
    check_user_authentication(username,email);
}
function check_user_authentication(username,email) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { check_user_authentication: 12, username:username, email:email},
        processData: true,
        url: api_server_url + '/cordova/check_user_authentication.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == 'success') {
                    latitude = response.latitude;
                    longitude = response.longitude;
                    var location = JSON.parse(response.location_name);
                    postal = location.postal;
                    country = location.country;
                    city = location.city;
                    address = location.address;
                    review = response.review;
                    rating = response.rating;
                    role = response.role;

                    authentication(response.username);
                } else {
                    authentication('');
                }
            } catch(e) {                    
                //alert('JSON parsing error');
                authentication('');
            }
        },
        error: function searchError(xhr, err) {
            authentication('');
        }
      });
}

function user_container(user,email) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { user_container: 12, user: user, email: email},
        processData: true,
        url: api_server_url + '/cordova/user_container.php',
        success: function searchSuccess(response) {

            if (user_co == 1) {
                user_co = 0;
                try {
                    //response.data = JSON.parse(response.data);
                    if (response.message == "success") {
                        $('.user_error_container').hide(100, function(){                    
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
    
                        first = response.first_name;
                        last = response.last_name;  
                        
                        var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;
    
                        $("#input-postal-code").val(postal);
                        $("#input-country").val(country);
                        $("#input-city").val(city);
                        $("#input-address").val(address);
                        
                        $("#pending_orders_count").html(response.pending_orders);
                        $("#active_orders_count").html(response.active_orders);
                        $("#confirmed_orders_count").html(response.confirmed_orders);
                        $("#complete_orders_count").html(response.complete_orders);
                        $("#_orders_count").html(response.user_orders);


                        $('#app-cover-spin').hide(0);
        
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
                        $('.user_error_container').show(100, function(){
                            $("#user_row_container").hide(100);
                            $("#user_row_h").html(response.message);
                            $("#user_row_p").html(response.login_email + " or " + response.login_password);
                            $('#app-cover-spin').hide(0);

                        });
                    }
                } catch(e) {
                    $('.user_error_container').show(100, function(){
                        $("#user_row_container").hide(100);
                        $("#user_row_h").html('JSON error');
                        $("#user_row_p").html('JSON parsing error');
                        $('#app-cover-spin').hide(0);
                    });
                }

            } else {
                try {if (response.message == "success") {
                        user_role = response.role;
                        if (response.role == "customer") {
                            //$("#uersdashro").hide(100);
                            //$("#uersdash").hide(100);
                        } else {
                            //$("#uersdashro").show(100);
                            //$("#uersdash").show(100);//user_products
                            //products_count
                            //in_stock
                            //in_stock_count
                            //
                            //product_sold_count                            
                        }
                        phone = response.phone_number;    
                        first = response.first_name;
                        last = response.last_name;                        
                        var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;

                        $("#menu_container_role").html('<span class="badge badge-secondary">' + response.role + '</span>');
                        $("#menu_container_pending_orders_count").html('<span class="badge badge-warning">' + response.pending_orders + '</span>');
                        $("#menu_container_active_orders_count").html('<span class="badge badge-success">' + response.active_orders + '</span>');
                        $("#menu_container_confirmed_orders_count").html('<span class="badge badge-danger">' + response.confirmed_orders + '</span>');
                        $("#menu_container_complete_orders_count").html('<span class="badge badge-info">' + response.complete_orders + '</span>');
                        $("#menu_container_orders_count").html('<span class="badge badge-secondary">' + response.user_orders + '</span>');
                    } else {
                        $('#app-cover-spin').hide(0);

                        /**$('.user_error_container').show(100, function(){
                            $("#user_row_container").hide(100);
                            $("#user_row_h").html(response.message);
                            $("#user_row_p").html(response.login_email + " or " + response.login_password);
                        }); */
                    }
                } catch(e) {
                    $('#app-cover-spin').hide(0);

                    /**$('.user_error_container').show(100, function(){
                        $("#user_row_container").hide(100);
                        $("#user_row_h").html('JSON error');
                        $("#user_row_p").html('JSON parsing error');
                    }); */
                }
            }
            
            
          
        },
        error: function searchError(xhr, err) {
          $('#app-cover-spin').hide(0);
          $('.user_error_container').show(100, function(){
            $("#user_row_container").hide(100);
            $("#user_row_h").html("Error on ajax call: " + err );
            $("#user_row_p").html(JSON.stringify(xhr));
          });
        }
    });
}
var user_role = role;
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
    if ($("#input-phone").val() != "" && $("#input-phone").val() != null && phone_numb.length <= 9) {
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
    
    if (error_username_data == 0 && error_first_data == 0 && error_last_data == 0 && error_email_data == 0 && error_phone_data == 0 && error_postal_data == 0 && error_country_data == 0 && error_city_data == 0 && error_address_data == 0 ) {
        error_user_data = 0;
    } else {
        error_user_data = 1;
    }
    if (error_user_data == 0) {
        //alert(rating_stars);
        action_float_id = 0;
        location_main_container = 0;
        contact_information_save = 0;
        update_user_data(latitude,longitude,role,rating_stars,$("#user_review").val(),$("#input-address").val(),$("#input-city").val(),$("#input-country").val(),$("#input-postal-code").val(),$("#input-phone").val(),$("#input-email").val(),$("#input-last-name").val(),$("#input-first-name").val(),$("#input-username").val());
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
function update_user_data(latitude,longitude,user_role,rating,review,address,city,country,postal,user_phone,user_email,last,first,user_name) {
    //alert(latitude + ' ' + longitude + ' ' + user_role + ' ' + rating + ' ' + review + ' ' + address + ' ' + city + ' ' + country + ' ' + postal + ' ' + user_phone + ' ' + user_email + ' ' + last + ' ' + first + ' ' + user_name)

    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { update_user_data: 12, latitude:latitude, longitude:longitude, user_role:user_role, rating: rating, review: review, address: address, city: city, country: country, postal: postal, user_phone: user_phone, user_email: user_email, last: last, first: first, user_name: user_name},
        processData: true,
        url: api_server_url + '/cordova/update_user_data.php',
        success: function searchSuccess(response) {
            //alert(latitude + ' ' + longitude + ' ' + user_role + ' ' + rating + ' ' + review + ' ' + address + ' ' + city + ' ' + country + ' ' + postal + ' ' + user_phone + ' ' + user_email + ' ' + last + ' ' + first + ' ' + user_name)

            //alert('action_float_id ' + action_float_id + " location_main_container " + location_main_container + " contact_information_save " + contact_information_save)
            if (action_float_id == 1) {
                action_float_id = 0;
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
                role = response.role;
                localStorage.setItem("role", role); 
                $('#app-cover-spin').hide(0);

                main();
            } else if (location_main_container == 1) {
                location_main_container = 0;
                try {
                    latitude = response.latitude;
                    longitude = response.longitude;
                    var location = JSON.parse(response.location_name);
                    postal = location.postal;
                    country = location.country;
                    city = location.city;
                    address = location.address;
                    $('#app-cover-spin').hide(0);

                } catch(e) {                    
                    //alert('JSON parsing error');
                    $('#app-cover-spin').hide(0);
                }
            } else if (contact_information_save == 1) {
                contact_information_save = 0;
                try {
                    if (response.message == "success") {
                        var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;

                        $("#contact_information_save").removeClass("btn-info");
                        $("#contact_information_save").addClass("btn-success");
                        $("#contact_information_save").html(response.message);
                        $("#contact_information_save_help").html("Done");
                        $('#contact_information').hide(2000, function(){ 
                            if (add_products_agent == 1) {
                                add_products_agent = 0;
                                $("#add_products_new").show(100);
                                $('#app-cover-spin').hide(0);

                            } else if (checkout_contact_information_save == 1)  {
                                checkout_contact_information_save = 0;
                                checkout_total(_shipping,_pay,total_pay,total_tax,total_shipping,total_total,username);
                            }                   
                        });
                    } else {
                        $("#contact_information_save").removeClass("btn-info");
                        $("#contact_information_save").addClass("btn-warning");
                        $("#contact_information_save").html(response.message);
                        $("#contact_information_save_help").html("Something went wrong");
                        $('#app-cover-spin').hide(0);

                    }
                } catch(e) {   
                    $("#contact_information_save").removeClass("btn-info");
                    $("#contact_information_save").addClass("btn-warning");
                    $("#contact_information_save").html("JSON error");
                    $("#contact_information_save_help").html('JSON parsing error');
                    $('#app-cover-spin').hide(0);
                 
                }
                
            } else {
                try {
                    //response.data = JSON.parse(response.data);
                    if (response.message == "success") {
                        $('.user_error_container').hide(100, function(){                    
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
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;
                        $("#input-postal-code").val(location.postal);
                        $("#input-country").val(location.country);
                        $("#input-city").val(location.city);
                        $("#input-address").val(location.address);
                        $('#app-cover-spin').hide(0);

                    } else {
                        $('.user_error_container').show(100, function(){
                            $("#user_row_container").hide(100);
                            $("#user_row_h").html(response.message);
                            $("#user_row_p").html(response.login_email + " or " + response.login_password);
                        });
                        $('#app-cover-spin').hide(0);

                    }
                } catch(e) {
                    $('.user_error_container').show(100, function(){
                        $("#user_row_container").hide(100);
                        $("#user_row_h").html('JSON error');
                        $("#user_row_p").html('JSON parsing error');
                    });
                    $('#app-cover-spin').hide(0);

                }
            }
          
        },
        error: function searchError(xhr, err) {
          alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.user_error_container').show(100, function(){
            $("#user_row_container").hide(100);
            $("#user_row_h").html(err);
            $("#user_row_p").html(JSON.stringify(xhr));
          });
        }
    });
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
        startlimit = 0;
        endlimit = 24;
        geoshop(latitude,longitude,gradius,startlimit,endlimit);
    } else {
        gradius = this.value; 
        top_value_range.classList.remove('bg-warning');
        top_value_range.classList.add('bg-success');
        startlimit = 0;
        endlimit = 24;
        geoshop(latitude,longitude,gradius,startlimit,endlimit);
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
    main();
});

$("#radio-2").click(function(){  
    $('.product_main_container').show(100, function(){
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
            geoshop(latitude,longitude,gradius,startlimit,endlimit);        
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
var geoshop_value = '';
function geoshop(latitude,longitude,gradius,startlimit,endlimit) {
    $('#top_value_range').html(" latitude : " + latitude + ", longitude : " + longitude + ". Radius : " + gradius + " Km. ");
    geoshop_value = " latitude : " + latitude + ", longitude : " + longitude + ". Radius : " + gradius + " Km. ";
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_geo_container: 12, startlimit: startlimit, endlimit: endlimit, latitude: latitude, longitude: longitude, gradius:gradius },
        processData: true,
        url: api_server_url + '/cordova/product_geo_container.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") {  
                        $('.product_error_container').hide(100, function(){
                            //window.location.href="#product_container";
                            $("#product_row_container").show(100);
                            $("#arrow_navigation_container").show(100);
                        }); 
                        product_row_container_index = products_data.length;                   
                        $("#product_data_container").html(''); 
                        $('#app-cover-spin').hide(0); 
                        search_value = '';
                        cat_id = '';
                        brand_id = "";
                        products_data.forEach(products_datamyFunction);
                    } else {
                        $('.product_error_container').show(100, function(){
                            //window.location.href="#product_container";
                            $("#product_row_container").hide(100);
                            $("#arrow_navigation_container").hide(100);
                            $("#product_row_h").html(response.message);
                            $("#product_row_p").html('No new Products');
                            $('#app-cover-spin').hide(0);
                        });
                    }
                }
                else {
                    $('.product_error_container').show(100, function(){
                        //window.location.href="#product_container";
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.message);
                        $("#product_row_p").html('No new Products');
                        $('#app-cover-spin').hide(0);
                    });
                }
            } catch(e) {
                $('.product_error_container').show(100, function(){
                    //window.location.href="#product_container";
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.message);
                    $("#product_row_p").html('JSON parsing error');
                    $('#app-cover-spin').hide(0);
                });
            }
          
        },
        error: function searchError(xhr, err) {
          $('#app-cover-spin').hide(0);
          $('.product_error_container').show(100, function(){
            window.location.href="#product_container";
            $("#product_row_container").hide(100);
            $("#arrow_navigation_container").hide(100);
            $("#product_row_h").html(response.message);
            $("#product_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          });
        }
    });
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

});
$("#search").keypress(function (e){
    if(e.keyCode == 13){
        search_button()        
    }
});
$(".search-button").click(function(){
    search_button()
});
function search_button() {
    $("#search").hide(100,function(){       
        $("#top_menu").show(100);
        search_value = $("#search_value").val();
        if (search_value != '' && search_value != null) {
            $('.product_main_container').show(100, function(){
                //window.location.href="#product_container";
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
                startlimit = 0;
                endlimit = 24;
                search(search_value,startlimit,endlimit);
            });
        }
    });
}
var search_value = '';
function search(search_params,startlimit,endlimit) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_search_container: 12, startlimit: startlimit, endlimit: endlimit, search_params:search_params },
        processData: true,
        url: api_server_url + '/cordova/product_search_container.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") {
                        $('.product_error_container').hide(100, function(){
                            $("#product_row_container").show(100);
                            $("#arrow_navigation_container").show(100);
                        });  
                        product_row_container_index = products_data.length;
                        $("#product_data_container").html(''); 
                        $('#app-cover-spin').hide(0);
                        geoshop_value = '';
                        cat_id = '';
                        brand_id = "";
                        products_data.forEach(products_datamyFunction);
                    } else {
                        $('.product_error_container').show(100, function(){
                            $("#product_row_container").hide(100);
                            $("#arrow_navigation_container").hide(100);
                            $("#product_row_h").html(response.message);
                            $("#product_row_p").html('No new Products');
                            $('#app-cover-spin').hide(0);
                        });
                    }
                }
                else {
                    $('.product_error_container').show(100, function(){
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.message);
                        $("#product_row_p").html('No new Products');
                        $('#app-cover-spin').hide(0);
                    });
                }
            } catch(e) {
                $('.product_error_container').show(100, function(){
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.message);
                    $("#product_row_p").html('JSON parsing error');
                    $('#app-cover-spin').hide(0);
                });
            }          
        },
        error: function searchError(xhr, err) {
          $('.product_error_container').show(100, function(){
              $("#product_row_container").hide(100);
              $("#arrow_navigation_container").hide(100);
              $("#product_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
              $('#app-cover-spin').hide(0);
          });
        }
    });
}

function authentication(username) {
    $("#app-cover-spin").removeClass("app-cover");
    
    if (username == "" || username == null) {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else {
        $(".authentication").hide(100);
        $(".main").show(100);
        localStorage.setItem("username", username);
        //localStorage.setItem("role", role);
        
        main();
    }     
}

var imgUri = "https://oramla.com/products.html";

function main() {
    $('.authentication').hide(100, function(){
        $(".main").show(100);
        $(".product_main_container").show(100);
    });
    startlimit = 0;
    endlimit = 24;
    search_value = '';
    geoshop_value = '';
    cat_id = '';
    brand_id = "";
    //alert(role);
    if (role == 'customer' || role == '' || role == null) {
        $("#action_float_id").html('<i class="fa  fa-invision my-float">Sell</i>');
        $("#add_products_agent").hide(100);
    } else {
        $("#action_float_id").html('<i class="fa fa-invision my-float">Buy</i>');
        $("#add_products_agent").show(100);        
    }
    product_main_container(startlimit,endlimit,cat_id,brand_id);
    apps_categories('');    
    if (username != "") {
        count_time_out = 0;
        loadconnects();
        user_container(username,email);
    }    
}
var conectset = 0;
var messageauto = 0;
function loadconnects() {
    conectset = 1;
    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else{
        loadchat('');
        //user_container(username,email);
        setTimeout(loadconnects, 3000);
    }                
    
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

    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else { 
        
        //alert($(this).attr('add_client'));
        if ($(this).attr('add_client') != '' && $(this).attr('add_client') != "undefined" && $(this).attr('add_client') != null )  {
            window.location.href="#center_top_id"; 
            $("#menu_container_top_tab").hide(100);                
            $("#center_top_id").show(100);

            $("#contactname").html($(this).attr('add_client'));
            $("#cotacttime").html(Date());
            var IMAGE_url = $(this).attr('connect_image_url');
            $(".picbar").attr("style", "background-image: url('" + IMAGE_url + "')");
            var chat_message = '';
            connect_product = 1;
            //alert(connect_from);
            connect_from = $(this).attr('add_client');
            //connects_datalengthnow = 0;
            connects_datalength = 0;
            //$("#chat").html('');
            messageauto = 1;
            var chat_product = "I'm interested in " + $(this).attr('product_title') + ".";
            $("#chat_message").val(chat_product);
            $("#chat").attr("style", "background-image: url('" + $(this).attr('product_url') + "');background-repeat: no-repeat;background-size:cover;");
            
            connects_datalengthnow = 0;
            $("#chat").html('loading ...');
            //contact_from = 0;
            response_message_from = 0;
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
            if (messageauto == 1) {
                messageauto = 0; 
                $(".chat_main_container").show(100)
                $("#connects_contacts").hide(100,function(){       
                    $("#connects_messages").show(100); 
                    $("#menu_container_top_tab").hide(100);                
                    //$("#menu_container_bottom_tab").hide(100);
                    $("#center_top_id").hide(100);                
    
                });
                //$("#chat").html('loading ...');
            }
        }    

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
                    //window.location.href="#orders_container";
                    $("#menu_container_top_tab").show(100); 
                    $("#product_container").hide(100);
                    $("#menu_container_left_tab").hide(100);
                    $("#chat_container").hide(100);
                    $("#connects_chatbar").hide(100);
                    $("#location_container").hide(100);
                    $("#user_container").hide(100);
                    var products_status = response.products_status;
                    var products_data = response.products;
                    
                    //order_items_container
                    if (status == "active" || status == "cancelled" || status == "shipped") {
                        $("#orders_items_made").html('');
                        $("#orderid").html(order_id);
                        //window.location.href="#order_items_container";
                        data_len = products_data.length;
                        products_data.forEach(order_items_datamyFunction);
                    } else {
                        $("#orders_made").html('');
                        //window.location.href="#order_container";
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
                alert('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
        }
    });
    
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
                        $('#app-cover-spin').hide(0);

                    } else if (products_status == "edit_product") {
                        $("#product_data_container").html(''); 
                        product_row_container_index = products_data.length;        
                        $("#product_data_container").html(''); 
                        $('#app-cover-spin').hide(0); 
                        products_data.forEach(products_datamyFunction);
                    } else if (products_status == "remove_product") {                    
                        $("#product_data_container").html(''); 
                        product_row_container_index = products_data.length;
                        $("#product_data_container").html(''); 
                        $('#app-cover-spin').hide(0); 
                        
                        products_data.forEach(products_datamyFunction);
                    } else if (products_status == "cart_to_remove") {                    
                        $('.cart_error_container').hide(100, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        $('#app-cover-spin').hide(0);
                        if (products_data.length < 12) {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').hide(10);
                        } else {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').show(10);
                        }
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "qt-minus") {                    
                        $('.cart_error_container').hide(100, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        $('#app-cover-spin').hide(0);
                        if (products_data.length < 12) {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').hide(10);
                        } else {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').show(10);
                        }
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "qt-plus") {                    
                        $('.cart_error_container').hide(100, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        $('#app-cover-spin').hide(0);
                        if (products_data.length < 12) {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').hide(10);
                        } else {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').show(10);
                        }
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "qt") {                    
                        $('.cart_error_container').hide(100, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        $('#app-cover-spin').hide(0);
                        if (products_data.length < 12) {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').hide(10);
                        } else {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').show(10);
                        }
                        products_data.forEach(cart_datamyFunction);
                    } else if (products_status == "0") {
    
                        //if (data_i < 12) {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').hide(10);
                        $('.cart_error_container').show(100, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").hide(100);
                            $("#cart_row_h").html(response.message);
                            $("#shopping_cart_num").html(products_data.length);
                            $("#cart_row_p").html('Your cart is empty. Add products to your cart.');
                            $('#app-cover-spin').hide(0);
                        });
    
                    } else {
                        //window.location.href="#cart_container";
                        $("#cart_row_container").html('');
                        $("#shopping_cart_num").html(products_data.length);
                        $('#app-cover-spin').hide(0);
                        if (products_data.length < 12) {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').hide(10);
                        } else {
                            $("#cart_next").hide(10); 
                            $('#cart_previous').show(10);
                        }
                        products_data.forEach(cart_datamyFunction);
                        $("#shopping_cart_num").html(products_data.length);
                        $('.cart_error_container').hide(100, function(){
                            //window.location.href="#cart_container";
                            $("#cart_row_container").show(100);
                        });
                        $("#orders_container").hide(100);
                        $("#order_items_container").hide(10);
    
                    }                
                }
            } catch(e) {
                $('.cart_error_container').show(100, function(){
                    //window.location.href="#cart_container";
                    $("#cart_row_container").hide(100);
                    $("#cart_row_h").html(response.message);
                    $("#cart_row_p").html('JSON parsing error');
                    $('#app-cover-spin').hide(0);
                });
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          $('#app-cover-spin').hide(0);
          $('.cart_error_container').show(100, function(){
            //window.location.href="#cart_container";
            $("#cart_row_container").hide(100);
            $("#cart_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
          });
        }
    });
    
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
    var total_ = Number(product_price) * Number(item.quantity);
    //total_ = total_.toFixed(2);
    total_pay = Number(total_pay) + Number(total_);
    total_pay = total_pay.toFixed(2);

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
    
    var actions = '<div class="float-left icon_padding_div icon_cartdelete tags are-medium">' +
    '<span class="tag is-danger icon_remove_cart" product_id = "' + item.product_id + '">Remove</span>' +
    '</div>';
    product_row_container = '<div class="cart_productitem columns is-multiline is-mobile block"> ' + 
    
    '<div class="column image card"  style="background-image:url(' + IMAGE_url + ');" >' +
    
    '</div>' +           

    '<div class="column is-6 bg-light card">' +
    '<span class="text-dark">' + product_title_account + '</span>' +
    
    '<div class="row">' +

    '<div class="price ">' +
    '' +  currency_price_symbal + '' +  product_price + '' +
    '</div>' +

    '<div class="quantynumber buttons">' + 
    '<span class="qt-minus button is-light" product_id = "' + item.product_id + '">-</span>' +
    '<span class="qt button is-link" quantit="' + item.quantity + '">' +
    '<input class="qt qtinput " product_id = "' + item.product_id + '" type="number" name="' + item.product_id + 'qt_cart" id="' + item.product_id + 'qt_cart" value="' + item.quantity + '">' +
    '</span>' +
    '<span class="qt-plus button is-dar" product_id = "' + item.product_id + '">+</span>' +
    '</div>' +

    '</div>' +

    '<div class="row buttons">' +

    '<div class="float-left icon_padding_div icon_cartdelete button is-danger">' +
    '<span class="tag is-danger icon_remove_cart" product_id = "' + item.product_id + '"><i class="fa fa-trash"></i></span>' +
    '</div>' +
    
    '<div class="full-price button is-info float-right">' +
    '' +  currency_price_symbal + '' +  total_ + '' +
    '</div>' +

    '</div>' +



    '</div>' +
    '</div>';

    

    total_tax = Number(total_pay)*0.01*Number(_tax);

    //total_tax = total_tax.toFixed(2);
    total_shipping =Number(gradius)*1*Number(_delivery);
    //total_shipping = total_shipping.toFixed(2);
    var all_total = Number(total_pay) + Number(total_tax) + Number(total_shipping);
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
    
    product_row_container = '<div class="cart_productitem columns is-multiline is-mobile block"> ' + 
    '<div class="column image card"  style="background-image:url(' + IMAGE_url + ');" >' +
    //'<img src="' + IMAGE_url + '" alt="' + item.product_img + '">' +
    '</div>' +           
    '<div class="column is-6 bg-light card">' +
    '<span class="badge badge-info">' + item.product_quantity + '</span> '+
    '<b>' + product_title_account + '</b>, From ' + add_client + '<br>Status ' + status + '' +
    
    '<div class="row">' +

    '<div class="price">' +
    '' +  currency_price_symbal + '' +  product_price + '' +
    '</div>' +
    '<div class="full-price">' +
    '' +  currency_price_symbal + '' +  total_ + '' +
    '</div>' +  
    '</div>' +  

    '<b class="btn-group btn-group-sm">' + oreder + '</b>' + 

    '</div>' +
    '</div>';

    $("#orders_items_made").append(product_row_container);


    if (data_i == index) { 
         $("#order_items_container").show(10,function(){
            $("#orders_container").hide(10); 
            //alert(data_len);
            $('#app-cover-spin').hide(0);           
        });
        if (data_i < 12) {
            $("#orders_items_next").hide(10); 
            $('#orders_items_previous').hide(10);
        } else {
            $("#orders_items_next").hide(10); 
            $('#orders_items_previous').show(10);
        }        
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
            //$('#app-cover-spin').hide(0);
            $("#order_items_container").hide(10);
            //alert(data_i + " " + index);
            $('#app-cover-spin').hide(0);           
        });  
        if (data_i < 12) {
            $("#order_next").hide(10); 
            $('#order_previous').hide(10);
        } else {
            $("#order_next").hide(10); 
            $('#order_previous').show(10);
        }      
    }

}

var  _shipping = '0';
var  _pay = '0';
var checkout_contact_information_save = 0;
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
    if (phone == "") {
        checkout_contact_information_save = 1;
        $("#contact_information_save").removeClass("btn-success");
        $("#contact_information_save").removeClass("btn-warning");
        $("#contact_information_save").addClass("btn-primary");
        $("#contact_information_save").html('Save changes');
        $("#contact_information_save_help").html('');
        $("#contact_information").show(100);
    } else {
        checkout_total(_shipping,_pay,total_pay,total_tax,total_shipping,total_total,username);
    }   
   }  
});
$(".user_orders").click(function(){    
    order_id(startlimit,endlimit,'user_orders',username,'');
});
$(".pending_orders").click(function(){    
    order_id(startlimit,endlimit,'pending_orders',username,'');
});
$(".active_orders").click(function(){    
    order_id(startlimit,endlimit,'active_orders',username,'');
});
$(".confirmed_orders").click(function(){    
    order_id(startlimit,endlimit,'confirmed_orders',username,'');
});
$(".complete_orders").click(function(){    
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
                    if (products_status != "0") {
                        $("#orders_made").html('');
                        window.location.href="#order_container";
                        data_len = products_data.length;
                        products_data.forEach(order_datamyFunction);
                    }
                    $("#order_items_container").hide(10);
                } else {
                    alert(response.message);
                    $('#app-cover-spin').hide(0);
                }
            } catch(e) {
                $('#app-cover-spin').hide(0);
                alert('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
            $('#app-cover-spin').hide(0);
            alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));            
        }
    });
}

$("body").delegate(".div_cimage","click",function(event){
    event.preventDefault(); 
    $('#app-cover-spin').show(0);
  
    //window.location.href="#product_add_client_container";
    //window.location.href="#product_container";
 
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

    //var shipping = $(this).attr('shipping');
    //var timestamp = $(this).attr('timestamp');
    $("#shippingvalue").html($(this).attr('shipping'));
    $("#shippingupdate").html($(this).attr('timestamp'));    
    $("#shippingbox").html('');
    if ($(this).attr('shipping_rates') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping rates</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_rates') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping_strategies') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping strategies</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_strategies') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping_label') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping label</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_label') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping_weight') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping weight</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_weight') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping_length') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping length</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_length') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping_width') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping width</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_width') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping_height') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping height</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping_height') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('ships_from_country') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">ships from country</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('ships_from_country') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('transit_time_label') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">transit time label</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('transit_time_label') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('max_handling_time') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">max handling time</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('max_handling_time') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('min_handling_time') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">min handling time</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('min_handling_time') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }
    if ($(this).attr('shipping') != '') {
        var shippingbox = '<span class="icon-text">' +
        '<span class="badge badge-primary text-wrap">shipping</span >' +
        '<span class="icon">' +
        '<i class="fa fa-arrow-right"></i>' +
        '</span>' +
        '<span>' + $(this).attr('shipping') + '</span>' +                      
        '</span>';
        $("#shippingbox").append(shippingbox);
    }

    


    //var item_add_description = add_description.tax;
    //alert('add_description');   

    div_cimage(product_price,product_title,add_description,add_client,product_id,add_rating,product_img,add_date,latitude,longitude,add_location,add_review);
});
var div_cima = 0;
var add_cdiv_cima = 0;
var add_client_cima = '';

function div_cimage(product_price,product_title,add_description,add_client,product_id,add_rating,product_img,add_date,latitude,longitude,add_location,add_review) {
    if (product_img.includes("http", 0)) {
        var IMAGE_url = product_img + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_img + '';
    }
    var add_imageadd_ = document.getElementById('add_imageadd_');
    add_imageadd_.src = IMAGE_url;

    //add_imageadd_.style = 'background-image:url(' + IMAGE_url + ')';
    //style="background-image:url(' + IMAGE_url + ');" 

    var otheaddlimg = document.getElementById('otheaddlimg');
    otheaddlimg.src = IMAGE_url;
    window.location.href="#";
    $("#product_row_container").hide(100,function(){       
        $("#product_add_client_container").show(100);
        $("#product_error").hide(100);
    });
    product_price = currency_exchange_rate * product_price;    
    product_price = product_price.toFixed(2);
    $("#add_carousel_title").html(product_title);
    currency_price_symbal = '$';
    var currency = currency_price_symbal;
    $("#add_carousel_currency").html(currency);
    $("#add_carousel_price").html(product_price);
    
    if (username == add_client) {
        var actions = '<div class="tags are-medium">' +
        '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + product_id + '"><span><span><i class="fa fa-shopping-cart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-info more fl-l edit_product" product_id = "' + product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-danger share fl-l add_to_remove" product_id = "' + product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>' +
        '</div>';
    } else {
        var actions = '<div class="tags are-medium">' +
        '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + product_id + '"><span><span><i class="fa fa-shopping-cart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-primary more fl-l " product_id = "' + product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-secondary share fl-l connect_product" product_id = "' + product_id + '" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_title="' + product_title + '" add_client = "' + add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>' +
        '</div>';//product_url="' + IMAGE_url + '" product_title="' + product_title + '"
    }
    if (role == 'admin' || role == 'Admin'){
        var admin_actions = '' +
        '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + product_id + '"><span><span><i class="fa fa-shopping-cart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-primary more fl-l " product_id = "' + product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-info more fl-l edit_product" product_id = "' + product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="tag is-danger share fl-l add_to_remove" product_id = "' + product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>' +
        '<a href="javascript:void(0)" class="tag is-secondary share fl-l connect_product" product_id = "' + product_id + '" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_title="' + product_title + '" add_client = "' + add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>';
        var actions = '<div class="tags are-medium">' + admin_actions + '</div>';        
    }
    
    $("#add_carousel_buynow").html(actions);

    $("#agentlocation").html(add_location);

    //var item_add_description = add_description.product_description;

    //alert(item_add_description);

    $("#add_carousel_desc").html(add_description);

    $("#otheadd").html(add_client);
    $("#otheaddl").html(add_client);
    $(".agent_name_class").html(add_client);

    $("#add_fload_id").attr("connect_from", "" + add_client + "");
    $("#add_fload_id").attr("connects_id", "" + product_id + "");
    $("#add_fload_id").attr("connects_time", "" + Date() + "");
    add_cdiv_cima = 1;    
    other_product_same(product_id); 
    if (add_client_cima != add_client) {
        add_client_cima = add_client;
        other_product_same_client(0,8,add_client);
        agent_location_map(add_client,username);
    }
    other_similar_products(product_id,add_client);
    $('#app-cover-spin').hide(0);

}
$("body").delegate(".div_otherimage","click",function(event){
    event.preventDefault();
    var add_imageadd_ = document.getElementById('add_imageadd_');
    add_imageadd_.src = $(this).attr('src');
      
});
function other_product_same(product_id) {
    //alert(product_id);

    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { other_product_same: 12, product_id:product_id },
        processData: true,
        url: api_server_url + '/cordova/other_product_same.php',
        success: function searchSuccess(response) {
           // alert(response);
            try {
                //response.data = JSON.parse(response.data);            
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    $("#other_title").html('');
                    //alert(products_status);
                    if (products_status != "0") { 
                        $("#other_title").html(''); 
                        //alert(products_data.length); 
                        if (products_data.length > 1) {
                            products_data.forEach(other_product_samemyFunction);
                        }                                       
                    }
                }
            } catch(e) {
                
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

        }
    });
    
}
function other_product_samemyFunction(item, index) {
    var product_image = item.product_img;
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }
    var other_title = '<div class="col add_clidduct_column">' +
    '<img src="' + IMAGE_url + '" alt="' + item.product_img + '" class="rounded div_otherimage" width="100%" height="100%">' +
    '</div>';
    var url_image = new Image();
    url_image.onload = function() {
        $("#other_title").append(other_title);
    }
    url_image.src = IMAGE_url;
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
                //alert(add_client);
                //response.data = JSON.parse(response.data);            
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") { 
                        $("#add_carousel_indicators").html('');
                        $("#add_carousel_other").html('');
                        $('.product_error_container').hide(100, function(){
                        }); 
                        //alert(add_client);
                  
                        products_data.forEach(other_product_same_clientmyFunction);
                    }
                }
            } catch(e) {
                //alert('JSon');
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

        }
    });    
    
}
function other_product_same_clientmyFunction(item, index) {
    var product_image = item.product_img;
    var product_price = currency_exchange_rate * item.product_price;    
    product_price = product_price.toFixed(2);
    var product_title = item.product_title;
    var product_title_account = "";


    var timestamp = item.add_date;

    var item_add_description = item.add_description;

    if (item_add_description.includes("{", 0)) {
    var description = JSON.parse(item.add_description);
    //alert(item.add_description);
    var item_add_description = description.product_description;
    //var item_add_description = description;
    var tax = description.tax;
    var tax_category = description.tax_category;

    var shipping = description.shipping;
    var shipping_rates = description.shipping_rates;
    var shipping_strategies = description.shipping_strategies;
    var shipping_label = description.shipping_label;
    var shipping_weight = description.shipping_weight;
    var shipping_length = description.shipping_length;
    var shipping_width = description.shipping_width;
    var shipping_height = description.shipping_height;
    var ships_from_country = description.ships_from_country;
    var transit_time_label = description.transit_time_label;
    var max_handling_time = description.max_handling_time;
    var min_handling_time = description.min_handling_time;

    var condition = description.condition;
    var adult = description.adult;
    var multipack = description.multipack;
    var is_bundle = description.is_bundle;
    var energy_efficiency_class = description.energy_efficiency_class;
    var min_energy_efficiency_class = description.min_energy_efficiency_class;
    var max_energy_efficiency_class = description.max_energy_efficiency_class;
    var age_group = description.age_group;
    var color = description.color;
    var gender = description.gender;
    var material = description.material;
    var pattern = description.pattern;
    var size = description.size;
    var size_system = description.size_system;
    var item_group_id = description.item_group_id;
    var product_detail = description.product_detail;
    var product_highlight = description.product_highlight;

    var brand = description.brand;
    var gtin = description.gtin;
    var MPN = description.MPN;
    var identifier_exists = description.identifier_exists;

    var availability = description.availability;
    var availability_date = description.availability_date;
    var cost_of_goods_sold = description.cost_of_goods_sold;
    var expiration_date = description.expiration_date;
    var sale_price_effective_date = description.sale_price_effective_date;
    var unit_pricing_measure = description.unit_pricing_measure;
    var unit_price_base_measure = description.unit_price_base_measure;
    var installment = description.installment;
    var subscription_cost = description.subscription_cost;
    var loyalty_points = description.loyalty_points;
    
    var location = JSON.parse(item.add_location);
    var item_address = location.address;
    var item_postal = location.postal;
    var item_city = location.city;
    var item_country = location.country;

    var item_add_location = '' + item.add_client + ' <br>' + '' + item_address +  ' <br>' + '' + item_country + ' ' + item_city + ' ' + item_postal + ' ';

    } else {
        
    //var item_add_description = '';
    //var item_add_description = description;
    var tax = '';
    var tax_category = '';

    var shipping = '';
    var shipping_rates = '';
    var shipping_strategies = '';
    var shipping_label = '';
    var shipping_weight = '';
    var shipping_length = '';
    var shipping_width = '';
    var shipping_height = '';
    var ships_from_country = '';
    var transit_time_label = '';
    var max_handling_time = '';
    var min_handling_time = '';

    var condition = '';
    var adult = '';
    var multipack = '';
    var is_bundle = '';
    var energy_efficiency_class = '';
    var min_energy_efficiency_class = '';
    var max_energy_efficiency_class = '';
    var age_group = '';
    var color = '';
    var gender = '';
    var material = '';
    var pattern = '';
    var size = '';
    var size_system = '';
    var item_group_id = '';
    var product_detail = '';
    var product_highlight = '';

    var brand = '';
    var gtin = '';
    var MPN = '';
    var identifier_exists = '';

    var availability = '';
    var availability_date = '';
    var cost_of_goods_sold = '';
    var expiration_date = '';
    var sale_price_effective_date = '';
    var unit_pricing_measure = '';
    var unit_price_base_measure = '';
    var installment = '';
    var subscription_cost = '';
    var loyalty_points = '';
    
    //var location = JSON.parse(item.add_location);
    var item_address = '';
    var item_postal = '';
    var item_city = '';
    var item_country = '';

    var item_add_location = '' + item.add_client + ' <br>' + '' + item_address +  ' <br>' + '' + item_country + ' ' + item_city + ' ' + item_postal + ' ';

    }
    

    //alert(add_client);

    
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
    
    if (index < 1) {
        var add_carousel_indicators = '<li data-target="#carouselExampleIndicators" data-slide-to="' + index + '" class="active"></li>';
        $("#add_carousel_indicators").append(add_carousel_indicators);
        
        
        if (username == item.add_client) {
            var adminactions = '';
    
            var actions = '<div class="tags are-medium">' +
            '<a href="javascript:void(0)" class="tag is-primary share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-info more fl-l edit_product" product_id = "' + item.product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-danger share fl-l add_to_remove" product_id = "' + item.product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>' +
            '</div>';
        } else {
            var adminactions = '';
            var actions = '<div class="tags are-medium">' +
            '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-primary more fl-l " product_id = "' + item.product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-secondary share fl-l connect_product" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" add_client = "' + item.add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>' +
            '</div>';
        }
        if (role == 'admin' || role == 'Admin'){
            var admin_actions = '' +
            '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-primary more fl-l " product_id = "' + item.product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-info more fl-l edit_product" product_id = "' + item.product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-secondary share fl-l connect_product" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" add_client = "' + item.add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-danger share fl-l add_to_remove" product_id = "' + item.product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>';
            var actions = '<div class="tags are-medium">' + admin_actions + '</div>';
            
        } 
        
        
        var add_carousel_other  = '<div class="carousel-item active">' +
        '<img class="d-block w-100 div_cimage" src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item_add_location + 
        
        '" timestamp="' + timestamp + 

        '" add_description="' + item_add_description +
    
        '" tax="' + tax + 
        '" tax_category="' + tax_category + 
    
        '" shipping="' + shipping + 
        '" shipping_rates="' + shipping_rates + 
        '" shipping_strategies="' + shipping_strategies + 
        '" shipping_label="' + shipping_label + 
        '" shipping_weight="' + shipping_weight + 
        '" shipping_length="' + shipping_length + 
        '" shipping_width="' + shipping_width + 
        '" shipping_height="' + shipping_height + 
        '" ships_from_country="' + ships_from_country + 
        '" transit_time_label="' + transit_time_label + 
        '" max_handling_time="' + max_handling_time + 
        '" min_handling_time="' + min_handling_time + 
    
        '" condition="' + condition + 
        '" adult="' + adult + 
        '" multipack="' + multipack + 
        '" is_bundle="' + is_bundle + 
        '" energy_efficiency_class="' + energy_efficiency_class + 
        '" min_energy_efficiency_class="' + min_energy_efficiency_class + 
        '" max_energy_efficiency_class="' + max_energy_efficiency_class + 
        '" age_group="' + age_group + 
        '" color="' + color + 
        '" gender="' + gender + 
        '" material="' + material + 
        '" pattern="' + pattern + 
        '" size="' + size + 
        '" size_system="' + size_system + 
        '" item_group_id="' + item_group_id + 
        '" product_detail="' + product_detail + 
        '" product_highlight="' + product_highlight + 
    
        '" brand="' + brand + 
        '" gtin="' + gtin + 
        '" MPN="' + MPN + 
        '" identifier_exists="' + identifier_exists + 
    
        '" availability="' + availability + 
        '" availability_date="' + availability_date + 
        '" expiration_date="' + expiration_date + 
        '" sale_price_effective_date="' + sale_price_effective_date + 
        '" unit_pricing_measure="' + unit_pricing_measure + 
        '" unit_price_base_measure="' + unit_price_base_measure + 
        '" installment="' + installment + 
        '" subscription_cost="' + subscription_cost + 
        '" loyalty_points="' + loyalty_points +
        
        '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
                
        '<div class="carousel-caption d-md-block card-title add_divtext add_oer">' + actions +
        '</div> ' +

        '<div class="card-body">' +
        '<h5>' + item.product_title + '</h5>' +  
        '</div> ' +
                 
        '</div>';
        var url_image = new Image();
        url_image.onload = function() {
            $("#add_carousel_other").append(add_carousel_other); 
            //alert(IMAGE_url);
   
        }
        url_image.src = IMAGE_url;
    } else {
        var add_carousel_indicators = '<li data-target="#carouselExampleIndicators" data-slide-to="' + index + '" class=""></li>';
        $("#add_carousel_indicators").append(add_carousel_indicators);

        if (username == item.add_client) {
            var adminactions = '';
    
            var actions = '<div class="tags are-medium">' +
            '<a href="javascript:void(0)" class="tag is-primary share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-info more fl-l edit_product" product_id = "' + item.product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-danger share fl-l add_to_remove" product_id = "' + item.product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>' +
            '</div>';
        } else {
            var adminactions = '';
            var actions = '<div class="tags are-medium">' +
            '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-primary more fl-l " product_id = "' + item.product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-secondary share fl-l connect_product" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" add_client = "' + item.add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>' +
            '</div>';
        }
        if (role == 'admin' || role == 'Admin'){
            var admin_actions = '' +
            '<a href="javascript:void(0)" class="tag is-success share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-primary more fl-l " product_id = "' + item.product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-info more fl-l edit_product" product_id = "' + item.product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-secondary share fl-l connect_product" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" add_client = "' + item.add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>' +
            '<a href="javascript:void(0)" class="tag is-danger share fl-l add_to_remove" product_id = "' + item.product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>';
            var actions = '<div class="tags are-medium">' + admin_actions + '</div>';
            
        }

        var add_carousel_other  = '<div class="carousel-item">' +
        '<img class="d-block w-100 div_cimage" src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item_add_location + 
        
        '" timestamp="' + timestamp + 

        '" add_description="' + item_add_description +
    
        '" tax="' + tax + 
        '" tax_category="' + tax_category + 
    
        '" shipping="' + shipping + 
        '" shipping_rates="' + shipping_rates + 
        '" shipping_strategies="' + shipping_strategies + 
        '" shipping_label="' + shipping_label + 
        '" shipping_weight="' + shipping_weight + 
        '" shipping_length="' + shipping_length + 
        '" shipping_width="' + shipping_width + 
        '" shipping_height="' + shipping_height + 
        '" ships_from_country="' + ships_from_country + 
        '" transit_time_label="' + transit_time_label + 
        '" max_handling_time="' + max_handling_time + 
        '" min_handling_time="' + min_handling_time + 
    
        '" condition="' + condition + 
        '" adult="' + adult + 
        '" multipack="' + multipack + 
        '" is_bundle="' + is_bundle + 
        '" energy_efficiency_class="' + energy_efficiency_class + 
        '" min_energy_efficiency_class="' + min_energy_efficiency_class + 
        '" max_energy_efficiency_class="' + max_energy_efficiency_class + 
        '" age_group="' + age_group + 
        '" color="' + color + 
        '" gender="' + gender + 
        '" material="' + material + 
        '" pattern="' + pattern + 
        '" size="' + size + 
        '" size_system="' + size_system + 
        '" item_group_id="' + item_group_id + 
        '" product_detail="' + product_detail + 
        '" product_highlight="' + product_highlight + 
    
        '" brand="' + brand + 
        '" gtin="' + gtin + 
        '" MPN="' + MPN + 
        '" identifier_exists="' + identifier_exists + 
    
        '" availability="' + availability + 
        '" availability_date="' + availability_date + 
        '" expiration_date="' + expiration_date + 
        '" sale_price_effective_date="' + sale_price_effective_date + 
        '" unit_pricing_measure="' + unit_pricing_measure + 
        '" unit_price_base_measure="' + unit_price_base_measure + 
        '" installment="' + installment + 
        '" subscription_cost="' + subscription_cost + 
        '" loyalty_points="' + loyalty_points +
        
        '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +

        '<div class="carousel-caption d-md-block card-title add_divtext add_oer">' + actions +
        
        '</div> ' + 
        
        '<div class="card-body">' +
        '<h5>' + item.product_title + '</h5>' +  
        '</div> ' +

        '</div>';
        var url_image = new Image();
        url_image.onload = function() {
            //alert(IMAGE_url);

            $("#add_carousel_other").append(add_carousel_other);
        }
        url_image.src = IMAGE_url;
    }
    //alert('add_client');

}
function other_similar_products(product_id,add_client) {
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { other_similar_products: 12, product_id:product_id, startlimit: startlimit, endlimit: endlimit, add_client:add_client },
        processData: true,
        url: api_server_url + '/cordova/other_similar_products.php',
        success: function searchSuccess(response) {
            try {
                //response.data = JSON.parse(response.data);            
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") { 
                        $("#other_similar_products_row1").html('');
                        $("#other_similar_products_row2").html('');
                        $("#other_similar_products_row3").html('');
                        $('.product_error_container').hide(100, function(){
                        }); 
                        /**$('#other_mySlides1').show(100, function(){});
                        $('#other_dot1').show(100, function(){});
                        $('#other_mySlides2').show(100, function(){});
                        $('#other_dot2').show(100, function(){});
                        $('#other_mySlides3').show(100, function(){});
                        $('#other_dot3').show(100, function(){}); */
                        //if (products_data.length < 6) {
                            $('#other_mySlides1').show(100, function(){});
                            $('#other_dot1').show(100, function(){});
                        //} else if (products_data.length < 12) {
                            $('#other_mySlides2').show(100, function(){});
                            $('#other_dot2').show(100, function(){});
                        //} else if (products_data.length < 18) {
                            $('#other_mySlides3').show(100, function(){});
                            $('#other_dot3').show(100, function(){});
                        //}
                        other_similar_6 = 6;
                        other_similar_12 = other_similar_6 + 6;
                        other_similar_18 = other_similar_12  + 6;
                        products_data.forEach(other_similar_productsmyFunction);
                    }
                }
            } catch(e) {
                //alert("json");
            }
          
        },
        error: function searchError(xhr, err) {
          //alert("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

        }
    });
}
var other_similar_6 = 6;
var other_similar_12 = other_similar_6 + 6;
var other_similar_18 = other_similar_12  + 6;
function other_similar_productsmyFunction(item, index) {
    var product_image = item.product_img;
    var product_price = currency_exchange_rate * item.product_price;    
    product_price = product_price.toFixed(2);
    var product_title = item.product_title;
    var product_title_account = "";
    var timestamp = item.add_date;
    var item_add_description = item.add_description;

    if (item_add_description.includes("{", 0)) {
    var description = JSON.parse(item.add_description);
    //alert(item.add_description);
    var item_add_description = description.product_description;
    //var item_add_description = description;
    var tax = description.tax;
    var tax_category = description.tax_category;

    var shipping = description.shipping;
    var shipping_rates = description.shipping_rates;
    var shipping_strategies = description.shipping_strategies;
    var shipping_label = description.shipping_label;
    var shipping_weight = description.shipping_weight;
    var shipping_length = description.shipping_length;
    var shipping_width = description.shipping_width;
    var shipping_height = description.shipping_height;
    var ships_from_country = description.ships_from_country;
    var transit_time_label = description.transit_time_label;
    var max_handling_time = description.max_handling_time;
    var min_handling_time = description.min_handling_time;

    var condition = description.condition;
    var adult = description.adult;
    var multipack = description.multipack;
    var is_bundle = description.is_bundle;
    var energy_efficiency_class = description.energy_efficiency_class;
    var min_energy_efficiency_class = description.min_energy_efficiency_class;
    var max_energy_efficiency_class = description.max_energy_efficiency_class;
    var age_group = description.age_group;
    var color = description.color;
    var gender = description.gender;
    var material = description.material;
    var pattern = description.pattern;
    var size = description.size;
    var size_system = description.size_system;
    var item_group_id = description.item_group_id;
    var product_detail = description.product_detail;
    var product_highlight = description.product_highlight;

    var brand = description.brand;
    var gtin = description.gtin;
    var MPN = description.MPN;
    var identifier_exists = description.identifier_exists;

    var availability = description.availability;
    var availability_date = description.availability_date;
    var cost_of_goods_sold = description.cost_of_goods_sold;
    var expiration_date = description.expiration_date;
    var sale_price_effective_date = description.sale_price_effective_date;
    var unit_pricing_measure = description.unit_pricing_measure;
    var unit_price_base_measure = description.unit_price_base_measure;
    var installment = description.installment;
    var subscription_cost = description.subscription_cost;
    var loyalty_points = description.loyalty_points;
    
    var location = JSON.parse(item.add_location);
    var item_address = location.address;
    var item_postal = location.postal;
    var item_city = location.city;
    var item_country = location.country;

    var item_add_location = '' + item.add_client + ' <br>' + '' + item_address +  ' <br>' + '' + item_country + ' ' + item_city + ' ' + item_postal + ' ';

    } else {
        
    //var item_add_description = '';
    //var item_add_description = description;
    var tax = '';
    var tax_category = '';

    var shipping = '';
    var shipping_rates = '';
    var shipping_strategies = '';
    var shipping_label = '';
    var shipping_weight = '';
    var shipping_length = '';
    var shipping_width = '';
    var shipping_height = '';
    var ships_from_country = '';
    var transit_time_label = '';
    var max_handling_time = '';
    var min_handling_time = '';

    var condition = '';
    var adult = '';
    var multipack = '';
    var is_bundle = '';
    var energy_efficiency_class = '';
    var min_energy_efficiency_class = '';
    var max_energy_efficiency_class = '';
    var age_group = '';
    var color = '';
    var gender = '';
    var material = '';
    var pattern = '';
    var size = '';
    var size_system = '';
    var item_group_id = '';
    var product_detail = '';
    var product_highlight = '';

    var brand = '';
    var gtin = '';
    var MPN = '';
    var identifier_exists = '';

    var availability = '';
    var availability_date = '';
    var cost_of_goods_sold = '';
    var expiration_date = '';
    var sale_price_effective_date = '';
    var unit_pricing_measure = '';
    var unit_price_base_measure = '';
    var installment = '';
    var subscription_cost = '';
    var loyalty_points = '';
    
    //var location = JSON.parse(item.add_location);
    var item_address = '';
    var item_postal = '';
    var item_city = '';
    var item_country = '';

    var item_add_location = '' + item.add_client + ' <br>' + '' + item_address +  ' <br>' + '' + item_country + ' ' + item_city + ' ' + item_postal + ' ';

    }
    
    
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

    if (index < other_similar_6) {
        var other_similar_products_row1 = '<div class="col add_clidduct_column">' +
        '<img class="rounded div_cimage" width="100%" height="100%"  src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item_add_location + 
        
        '" timestamp="' + timestamp + 

        '" add_description="' + item_add_description +
    
        '" tax="' + tax + 
        '" tax_category="' + tax_category + 
    
        '" shipping="' + shipping + 
        '" shipping_rates="' + shipping_rates + 
        '" shipping_strategies="' + shipping_strategies + 
        '" shipping_label="' + shipping_label + 
        '" shipping_weight="' + shipping_weight + 
        '" shipping_length="' + shipping_length + 
        '" shipping_width="' + shipping_width + 
        '" shipping_height="' + shipping_height + 
        '" ships_from_country="' + ships_from_country + 
        '" transit_time_label="' + transit_time_label + 
        '" max_handling_time="' + max_handling_time + 
        '" min_handling_time="' + min_handling_time + 
    
        '" condition="' + condition + 
        '" adult="' + adult + 
        '" multipack="' + multipack + 
        '" is_bundle="' + is_bundle + 
        '" energy_efficiency_class="' + energy_efficiency_class + 
        '" min_energy_efficiency_class="' + min_energy_efficiency_class + 
        '" max_energy_efficiency_class="' + max_energy_efficiency_class + 
        '" age_group="' + age_group + 
        '" color="' + color + 
        '" gender="' + gender + 
        '" material="' + material + 
        '" pattern="' + pattern + 
        '" size="' + size + 
        '" size_system="' + size_system + 
        '" item_group_id="' + item_group_id + 
        '" product_detail="' + product_detail + 
        '" product_highlight="' + product_highlight + 
    
        '" brand="' + brand + 
        '" gtin="' + gtin + 
        '" MPN="' + MPN + 
        '" identifier_exists="' + identifier_exists + 
    
        '" availability="' + availability + 
        '" availability_date="' + availability_date + 
        '" expiration_date="' + expiration_date + 
        '" sale_price_effective_date="' + sale_price_effective_date + 
        '" unit_pricing_measure="' + unit_pricing_measure + 
        '" unit_price_base_measure="' + unit_price_base_measure + 
        '" installment="' + installment + 
        '" subscription_cost="' + subscription_cost + 
        '" loyalty_points="' + loyalty_points +
        
        '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
        '</div>';
        var url_image = new Image();
        url_image.onload = function() {
            $("#other_similar_products_row1").append(other_similar_products_row1);
        }
        url_image.onerror = function() {
            other_similar_6++;
        }                
        url_image.src = IMAGE_url;

    } else if(index < other_similar_12){
        var other_similar_products_row2 = '<div class="col add_clidduct_column">' +
        '<img class="rounded div_cimage" width="100%" height="100%"  src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item_add_location + 
        
        '" timestamp="' + timestamp + 

        '" add_description="' + item_add_description +
    
        '" tax="' + tax + 
        '" tax_category="' + tax_category + 
    
        '" shipping="' + shipping + 
        '" shipping_rates="' + shipping_rates + 
        '" shipping_strategies="' + shipping_strategies + 
        '" shipping_label="' + shipping_label + 
        '" shipping_weight="' + shipping_weight + 
        '" shipping_length="' + shipping_length + 
        '" shipping_width="' + shipping_width + 
        '" shipping_height="' + shipping_height + 
        '" ships_from_country="' + ships_from_country + 
        '" transit_time_label="' + transit_time_label + 
        '" max_handling_time="' + max_handling_time + 
        '" min_handling_time="' + min_handling_time + 
    
        '" condition="' + condition + 
        '" adult="' + adult + 
        '" multipack="' + multipack + 
        '" is_bundle="' + is_bundle + 
        '" energy_efficiency_class="' + energy_efficiency_class + 
        '" min_energy_efficiency_class="' + min_energy_efficiency_class + 
        '" max_energy_efficiency_class="' + max_energy_efficiency_class + 
        '" age_group="' + age_group + 
        '" color="' + color + 
        '" gender="' + gender + 
        '" material="' + material + 
        '" pattern="' + pattern + 
        '" size="' + size + 
        '" size_system="' + size_system + 
        '" item_group_id="' + item_group_id + 
        '" product_detail="' + product_detail + 
        '" product_highlight="' + product_highlight + 
    
        '" brand="' + brand + 
        '" gtin="' + gtin + 
        '" MPN="' + MPN + 
        '" identifier_exists="' + identifier_exists + 
    
        '" availability="' + availability + 
        '" availability_date="' + availability_date + 
        '" expiration_date="' + expiration_date + 
        '" sale_price_effective_date="' + sale_price_effective_date + 
        '" unit_pricing_measure="' + unit_pricing_measure + 
        '" unit_price_base_measure="' + unit_price_base_measure + 
        '" installment="' + installment + 
        '" subscription_cost="' + subscription_cost + 
        '" loyalty_points="' + loyalty_points +
        
        '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
        '</div>';
        var url_image = new Image();
        url_image.onload = function() {
            $("#other_similar_products_row2").append(other_similar_products_row2);
        }
        url_image.onerror = function() {
            other_similar_12++;
        }                
        url_image.src = IMAGE_url;
    } else if(index < other_similar_18){
        var other_similar_products_row3 = '<div class="col add_clidduct_column">' +
        '<img class="rounded div_cimage" width="100%" height="100%"  src="' + IMAGE_url + '" alt="' + item.product_img + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item_add_location + 
        
        '" timestamp="' + timestamp + 

        '" add_description="' + item_add_description +
    
        '" tax="' + tax + 
        '" tax_category="' + tax_category + 
    
        '" shipping="' + shipping + 
        '" shipping_rates="' + shipping_rates + 
        '" shipping_strategies="' + shipping_strategies + 
        '" shipping_label="' + shipping_label + 
        '" shipping_weight="' + shipping_weight + 
        '" shipping_length="' + shipping_length + 
        '" shipping_width="' + shipping_width + 
        '" shipping_height="' + shipping_height + 
        '" ships_from_country="' + ships_from_country + 
        '" transit_time_label="' + transit_time_label + 
        '" max_handling_time="' + max_handling_time + 
        '" min_handling_time="' + min_handling_time + 
    
        '" condition="' + condition + 
        '" adult="' + adult + 
        '" multipack="' + multipack + 
        '" is_bundle="' + is_bundle + 
        '" energy_efficiency_class="' + energy_efficiency_class + 
        '" min_energy_efficiency_class="' + min_energy_efficiency_class + 
        '" max_energy_efficiency_class="' + max_energy_efficiency_class + 
        '" age_group="' + age_group + 
        '" color="' + color + 
        '" gender="' + gender + 
        '" material="' + material + 
        '" pattern="' + pattern + 
        '" size="' + size + 
        '" size_system="' + size_system + 
        '" item_group_id="' + item_group_id + 
        '" product_detail="' + product_detail + 
        '" product_highlight="' + product_highlight + 
    
        '" brand="' + brand + 
        '" gtin="' + gtin + 
        '" MPN="' + MPN + 
        '" identifier_exists="' + identifier_exists + 
    
        '" availability="' + availability + 
        '" availability_date="' + availability_date + 
        '" expiration_date="' + expiration_date + 
        '" sale_price_effective_date="' + sale_price_effective_date + 
        '" unit_pricing_measure="' + unit_pricing_measure + 
        '" unit_price_base_measure="' + unit_price_base_measure + 
        '" installment="' + installment + 
        '" subscription_cost="' + subscription_cost + 
        '" loyalty_points="' + loyalty_points +
        
        '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" >' +
        '</div>';
        var url_image = new Image();
        url_image.onload = function() {
            $("#other_similar_products_row3").append(other_similar_products_row3);
        }
        url_image.onerror = function() {
            other_similar_18++;
        }                
        url_image.src = IMAGE_url;
    }
    
}
$("#arrow_add_client_back").click(function(){
    $("#product_add_client_container").hide(100,function(){       
        $("#product_row_container").show(100);
        $("#product_error").hide(100);
    });
});

var cat_id = "";
var brand_id = "";
var category_clicked = "";
$("body").delegate(".category","click",function(event){
    event.preventDefault();
    cat_id = $(this).attr('cat_id');
    var add_client = $(this).attr('add_client');
    startlimit = 0;
    endlimit = 24;
    $('.product_main_container').show(100, function(){
        $("#menu_container_left_tab").show(100);
        $("#chat_container").hide(100);
        $("#connects_chatbar").hide(100);
        $("#orders_container").hide(100);
        $("#order_items_container").hide(10);
        $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        search_value = '';
        geoshop_value = '';
        brand_id = "";
        category_clicked = cat_id;
        apps_categories(cat_id);
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    });
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
        cat_id = "";
        brand_id = "";
    }
});
$("body").delegate(".apps_brands_back","click",function(event){
    event.preventDefault();
    apps_categories('');
});

$("body").delegate(".selectBrand","click",function(event){
    event.preventDefault();
    brand_id = $(this).attr('brand_id');
    var add_client = $(this).attr('add_client');
    startlimit = 0;
    endlimit = 24;
    $('.product_main_container').show(100, function(){
        $("#menu_container_left_tab").show(100);
        $("#chat_container").hide(100);
        $("#connects_chatbar").hide(100);
        $("#orders_container").hide(100);
        $("#order_items_container").hide(10);
        $("#cart_container").hide(100);
        $("#location_container").hide(100);
        $("#user_container").hide(100);
        search_value  = '';
        geoshop_value  = '';
        cat_id = "";
        //apps_categories(add_client);
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    });
    $("#product_add_client_container").hide(100,function(){       
        $("#product_error").hide(100);
    });
    if (_apps_tab != 0) {
        document.body.classList.toggle('nav-is-toggled');
        _apps_tab =0;
        cat_id = "";
        brand_id = "";
    }
});
function apps_categories(cat_id) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { apps_categories: 12, cat_id: cat_id },
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

                    if (cat_id != '') {
                        if (category_clicked != '') {
                            $("#apps_categories").hide(100);
                            $("#apps_brands").show(100);
                        }
                        

                        if (apps_categories_status != "0") {  
                            $("#product_category").html('<option value="">Select Category</option>');
                            $("#apps_brands").html('<a class="nav-link nav-expand-link apps_brands_back button is-black"><i class="fa fa-arrow-left"></i>Back</a>');
                            apps_categories.forEach(apps_brandsmyFunction);
                        } else {
                                $("#apps_brands").html(response.message);
                                $("#apps_brands").append('No new categories');
                        }
                    } else {
                        $("#apps_brands").hide(100);
                        $("#apps_categories").show(100);
                        if (apps_categories_status != "0") {  
                            $("#product_industry").html('<option value="">Select Industry/Department</option>');
                            $("#apps_categories").html('');
                            apps_categories.forEach(apps_categoriesmyFunction);
                        } else {
                                $("#apps_categories").html(response.message);
                                $("#apps_categories").append('No new Industries');
                        } 
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
    
}
function apps_brandsmyFunction(item, index) {
    var brand_id = item.brand_id;
    var brand_title = item.brand_title;
    var add_client = item.add_client;
    var brand_description = item.brand_description;   

    if (category_clicked == '') {
        var product_industry_option = '<option class="is-link" add_client="' + add_client + '" value="' + brand_id + '">' + brand_title + '</option>';
        $("#product_category").append(product_industry_option);
    } else{
        var category_container = '<li class="apps_nav-item nav-expand ">' +
        '<a brand_id="' + brand_id + '" add_client="' + add_client + '" class="nav-link nav-expand-link selectBrand" href="#">' + brand_title + '</a>' +    
        '</li>';
        $("#apps_brands").append(category_container);
    }
    

}
function apps_categoriesmyFunction(item, index) {
    var cat_id = item.cat_id;
    var cat_title = item.cat_title;
    var add_client = item.add_client;
    var category_description = item.category_description;

    var category_container = '<li class="apps_nav-item nav-expand ">' +
    '<a cat_id="' + cat_id + '" add_client="' + add_client + '" class="nav-link nav-expand-link category" href="#">' + cat_title + '<span class="icon"> <i cat_id="' + cat_id + '" add_client="' + add_client + '"  class="fa fa-arrow-right"></i> </span></a>' +    
    '' +
    '</li>';
    $("#apps_categories").append(category_container);

    var product_industry_option = '<option class="is-link category" add_client="' + add_client + '" value="' + cat_id + '">' + cat_title + '</option>';
    $("#product_industry").append(product_industry_option);

}

function product_main_container(startlimit,endlimit,cat_id,brand_id) {
    $('#app-cover-spin').show(0);
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { product_main_container: 12, startlimit: startlimit, endlimit: endlimit, cat_id:cat_id, brand_id:brand_id, username:username },
        processData: true,
        url: api_server_url + '/cordova/product_main_container.php',
        success: function searchSuccess(response) {
            try {
                if (response.message == "success") {
                    var products_status = response.products_status;
                    var products_data = response.products;
                    if (products_status != "0") { 
                        $('.product_error_container').hide(100, function(){
                            $("#product_row_container").show(100);
                            $("#arrow_navigation_container").show(100);
                        });
                        product_row_container_index = products_data.length; 
                        $("#product_data_container").html(''); 
                        $('#app-cover-spin').hide(0);                 
                        products_data.forEach(products_datamyFunction);
                    } else {
                        $('.product_error').show(100, function(){
                            $("#product_row_container").hide(100);
                            $("#arrow_navigation_container").hide(100);
                            $("#product_row_h").html(response.message);
                            $("#product_row_p").html('No new Products');
                            $('#app-cover-spin').hide(0);
                        });
                    }
                }
                else {
                    $('.product_error_container').show(100, function(){
                        $("#product_row_container").hide(100);
                        $("#arrow_navigation_container").hide(100);
                        $("#product_row_h").html(response.message);
                        $("#product_row_p").html('No new Products');
                        $('#app-cover-spin').hide(0);
                    });
                }
            } catch(e) {
                $('.product_error_container').show(100, function(){
                    $("#product_row_container").hide(100);
                    $("#arrow_navigation_container").hide(100);
                    $("#product_row_h").html(response.message);
                    $("#product_row_p").html('JSON parsing error');
                    $('#app-cover-spin').hide(0);
                });
            }          
        },
        error: function searchError(xhr, err) {
            $('.product_error_container').show(100, function(){
              $("#product_row_container").hide(100);
              $("#arrow_navigation_container").hide(100);
              $("#product_row_p").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
              $('#app-cover-spin').hide(0);
            });
        }
    });
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
    var timestamp = item.add_date;

    var item_add_description = item.add_description;

    if (item_add_description.includes("{", 0)) {
    var description = JSON.parse(item.add_description);
    //alert(item.add_description);
    var item_add_description = description.product_description;
    //var item_add_description = description;
    var tax = description.tax;
    var tax_category = description.tax_category;

    var shipping = description.shipping;
    var shipping_rates = description.shipping_rates;
    var shipping_strategies = description.shipping_strategies;
    var shipping_label = description.shipping_label;
    var shipping_weight = description.shipping_weight;
    var shipping_length = description.shipping_length;
    var shipping_width = description.shipping_width;
    var shipping_height = description.shipping_height;
    var ships_from_country = description.ships_from_country;
    var transit_time_label = description.transit_time_label;
    var max_handling_time = description.max_handling_time;
    var min_handling_time = description.min_handling_time;

    var condition = description.condition;
    var adult = description.adult;
    var multipack = description.multipack;
    var is_bundle = description.is_bundle;
    var energy_efficiency_class = description.energy_efficiency_class;
    var min_energy_efficiency_class = description.min_energy_efficiency_class;
    var max_energy_efficiency_class = description.max_energy_efficiency_class;
    var age_group = description.age_group;
    var color = description.color;
    var gender = description.gender;
    var material = description.material;
    var pattern = description.pattern;
    var size = description.size;
    var size_system = description.size_system;
    var item_group_id = description.item_group_id;
    var product_detail = description.product_detail;
    var product_highlight = description.product_highlight;

    var brand = description.brand;
    var gtin = description.gtin;
    var MPN = description.MPN;
    var identifier_exists = description.identifier_exists;

    var availability = description.availability;
    var availability_date = description.availability_date;
    var cost_of_goods_sold = description.cost_of_goods_sold;
    var expiration_date = description.expiration_date;
    var sale_price_effective_date = description.sale_price_effective_date;
    var unit_pricing_measure = description.unit_pricing_measure;
    var unit_price_base_measure = description.unit_price_base_measure;
    var installment = description.installment;
    var subscription_cost = description.subscription_cost;
    var loyalty_points = description.loyalty_points;
    
    var location = JSON.parse(item.add_location);
    var item_address = location.address;
    var item_postal = location.postal;
    var item_city = location.city;
    var item_country = location.country;

    var item_add_location = '' + item.add_client + ' <br>' + '' + item_address +  ' <br>' + '' + item_country + ' ' + item_city + ' ' + item_postal + ' ';

    } else {
        
    //var item_add_description = '';
    //var item_add_description = description;
    var tax = '';
    var tax_category = '';

    var shipping = '';
    var shipping_rates = '';
    var shipping_strategies = '';
    var shipping_label = '';
    var shipping_weight = '';
    var shipping_length = '';
    var shipping_width = '';
    var shipping_height = '';
    var ships_from_country = '';
    var transit_time_label = '';
    var max_handling_time = '';
    var min_handling_time = '';

    var condition = '';
    var adult = '';
    var multipack = '';
    var is_bundle = '';
    var energy_efficiency_class = '';
    var min_energy_efficiency_class = '';
    var max_energy_efficiency_class = '';
    var age_group = '';
    var color = '';
    var gender = '';
    var material = '';
    var pattern = '';
    var size = '';
    var size_system = '';
    var item_group_id = '';
    var product_detail = '';
    var product_highlight = '';

    var brand = '';
    var gtin = '';
    var MPN = '';
    var identifier_exists = '';

    var availability = '';
    var availability_date = '';
    var cost_of_goods_sold = '';
    var expiration_date = '';
    var sale_price_effective_date = '';
    var unit_pricing_measure = '';
    var unit_price_base_measure = '';
    var installment = '';
    var subscription_cost = '';
    var loyalty_points = '';
    
    //var location = JSON.parse(item.add_location);
    var item_address = '';
    var item_postal = '';
    var item_city = '';
    var item_country = '';

    var item_add_location = '' + item.add_client + ' <br>' + '' + item_address +  ' <br>' + '' + item_country + ' ' + item_city + ' ' + item_postal + ' ';

    }
    
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
        var adminactions = '';
        var actions = '' +
        '<a href="javascript:void(0)" class="share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="more fl-l edit_product" product_id = "' + item.product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="share fl-l add_to_remove" product_id = "' + item.product_id + '"><span><span><i class="fa fa-trash"></i></span></a>';
    } else {
        var adminactions = '';
        var actions = '' +
        '<a href="javascript:void(0)" class="share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="more fl-l " product_id = "' + item.product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="share fl-l connect_product" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" add_client = "' + item.add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>';
    }//product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" 
    if (role == 'admin' || role == 'Admin'){
        var admin_actions = '' +
        '<a href="javascript:void(0)" class="more fl-l edit_product" product_id = "' + item.product_id + '"><span><span><i class="fa fa-edit"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="share fl-l add_to_remove" product_id = "' + item.product_id + '"><span><span><i class="fa fa-trash"></span></i></span></a>';
        var adminactions = '<div class="buttons cf">' + admin_actions + '</div><br>';
        var actions = '' +
        '<a href="javascript:void(0)" class="share fl-l add_to_cart" product_id = "' + item.product_id + '"><span><span>' +  currency_price_symbal + ' ' +  product_price + ' <i class="fa fa-shopping-cart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="more fl-l " product_id = "' + item.product_id + '"><span><span><i class="fa fa-heart"></i></span></span></a>' +
        '<a href="javascript:void(0)" class="share fl-l connect_product" connect_image_url="' + IMAGE_url + '" product_url="' + IMAGE_url + '" product_id="' + item.product_id + '" product_title="' + item.product_title + '" add_client = "' + item.add_client + '"><span><span><i class="fa fa-comment"></i></span></span></a>';
    }
    var product_container = '<div class="container-prod">' +
    '<div class="image div_cimage" style="background-image:url(' + IMAGE_url + ');" product_id="' + item.product_id + '" product_title="' + item.product_title + '" product_price="' + item.product_price + '" product_img="' + item.product_img + '" add_client="' + item.add_client + '" add_date="' + item.add_date + '" latitude="' + item.latitude + '" longitude="' + item.longitude + '" add_location="' + item_add_location + 
    
    '" timestamp="' + timestamp + 

    '" add_description="' + item_add_description +

    '" tax="' + tax + 
    '" tax_category="' + tax_category + 

    '" shipping="' + shipping + 
    '" shipping_rates="' + shipping_rates + 
    '" shipping_strategies="' + shipping_strategies + 
    '" shipping_label="' + shipping_label + 
    '" shipping_weight="' + shipping_weight + 
    '" shipping_length="' + shipping_length + 
    '" shipping_width="' + shipping_width + 
    '" shipping_height="' + shipping_height + 
    '" ships_from_country="' + ships_from_country + 
    '" transit_time_label="' + transit_time_label + 
    '" max_handling_time="' + max_handling_time + 
    '" min_handling_time="' + min_handling_time + 

    '" condition="' + condition + 
    '" adult="' + adult + 
    '" multipack="' + multipack + 
    '" is_bundle="' + is_bundle + 
    '" energy_efficiency_class="' + energy_efficiency_class + 
    '" min_energy_efficiency_class="' + min_energy_efficiency_class + 
    '" max_energy_efficiency_class="' + max_energy_efficiency_class + 
    '" age_group="' + age_group + 
    '" color="' + color + 
    '" gender="' + gender + 
    '" material="' + material + 
    '" pattern="' + pattern + 
    '" size="' + size + 
    '" size_system="' + size_system + 
    '" item_group_id="' + item_group_id + 
    '" product_detail="' + product_detail + 
    '" product_highlight="' + product_highlight + 

    '" brand="' + brand + 
    '" gtin="' + gtin + 
    '" MPN="' + MPN + 
    '" identifier_exists="' + identifier_exists + 

    '" availability="' + availability + 
    '" availability_date="' + availability_date + 
    '" expiration_date="' + expiration_date + 
    '" sale_price_effective_date="' + sale_price_effective_date + 
    '" unit_pricing_measure="' + unit_pricing_measure + 
    '" unit_price_base_measure="' + unit_price_base_measure + 
    '" installment="' + installment + 
    '" subscription_cost="' + subscription_cost + 
    '" loyalty_points="' + loyalty_points + 
    
    '" add_review="' + item.add_review + '" add_rating="' + item.add_rating + '" ></div>' +
    
    '<div class="container-information">' +
    '<div class="title">' +
    '<p class="card-text"><b style="height: auto;">' + product_title_account + '</b></p>' +
    '<a href="javascript:void(0)" class="more close"><i class="fa fa-times"></i></a>' +                
    '</div>' +
    '<div class="description"><p>From ' + item.add_client + '</p><br>' + item.add_description + '<br>Ratings : ' + item.add_rating + '<br>' + adminactions + '</div>' +
    '</div>' +
    '<div class="buttons cf">' + actions + '</div>' +
    '</div>';
    var product_row_container = '<div class="product_column">' +
    '<div class="card">' + product_container + '</div>' +
    '</div>';
    
    if (index >= startlimit) {
        var url_image = new Image();
        url_image.onload = function() {
            $("#product_data_container").append(product_row_container);
        }                
        url_image.src = IMAGE_url;
    }
    if (startlimit > 0) {
        var ger = product_row_index - startlimit;
        if (ger < 24) {
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
            $("#add_products_new").hide(1000);

        });
    }
    if (product_row_index < 24) {
        $("#product_previous").hide(100);
        $("#product_next").hide(100);
    }
    
}

$(".logout").click(function(){
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
    username = '';
    role = '';
    localStorage.setItem("username", username);
    localStorage.setItem("role", role); 
    authentication(username);     
});
var add_products_agent = 0;
$("#add_products_agent").click(function(){
    //phone = '';
    $("#product_client").val(username);
    if (phone == "") {
        add_products_agent = 1;
        $("#contact_information_save").removeClass("btn-success");
        $("#contact_information_save").removeClass("btn-warning");
        $("#contact_information_save").addClass("btn-primary");
        $("#contact_information_save").html('Save changes');
        $("#contact_information_save_help").html('');

        $("#contact_information").show(100);
    } else {    
        $("#product_save").removeClass("btn-danger");
        $("#product_save").removeClass("btn-success");
        $("#product_save").removeClass("btn-info");
        $("#product_save").removeClass("btn-warning");
    
        $("#product_save").addClass("btn-primary");
        $("#product_save").html('Add');
        $("#upload_from_help").html('');
        
        $("#percent_price").html(percent_price);
        $("#add_products_new").show(100);
        if (percent_pricing_strategy == 'cost_plus_pricing') {
            $("#pricing_strategy_help").html('Price = total cost of product + gross profit margin');
        } else if (percent_pricing_strategy == 'markup_pricing') {
            $("#pricing_strategy_help").html("Markup as a percentage of selling price = (markup/selling price) x 100");
        }
    }
});
$("#contact_information_close").click(function(){
    $("#contact_information").hide(100);
});
$("#contact_information_footer_close").click(function(){
    $("#contact_information").hide(100);
});
var contact_information_save = 0;
$("#contact_information_save").click(function(){
    var user_countrycode_phone = $("#user_countrycode_phone").val();
    if (user_countrycode_phone != "" && user_countrycode_phone != null) {
        $("#user_countrycode_phone").removeClass("is-invalid");
        $("#user_countrycode_phone").addClass("is-valid");       
    } else {
        $("#user_countrycode_phone").removeClass("is-valid");
        $("#user_countrycode_phone").addClass("is-invalid");
    }
    var user_phone = $("#user_phone").val();
    if (user_phone != "" && user_phone != null) {
        if (user_phone.length >= 9) {
            if ( user_phone.indexOf("0") == 0) {
                user_phone = user_phone.slice(1,user_phone.length);
            }
            phone = user_countrycode_phone + "" + user_phone;
            $("#user_phone_help").html(phone);
            $("#user_phone").removeClass("is-invalid");
            $("#user_phone").addClass("is-valid");
        } else {
            $("#user_phone_help").html("Phone number should be atleast 9 characters");
            $("#user_phone").removeClass("is-valid");
            $("#user_phone").addClass("is-invalid");
        }        
    } else {
        $("#user_phone_help").html("Input phone nmber");
        $("#user_phone").removeClass("is-valid");
        $("#user_phone").addClass("is-invalid");
    }
    var user_address = $("#user_address").val();
    if (user_address != "" && user_address != null) {
        $("#user_address_help").html(user_address);
        $("#user_address").removeClass("is-invalid");
        $("#user_address").addClass("is-valid");       
    } else {
        $("#user_address_help").html("Input address");
        $("#user_address").removeClass("is-valid");
        $("#user_address").addClass("is-invalid");
    }
    var user_postal = $("#user_postal").val();
    if (user_postal != "" && user_postal != null) {
        $("#user_postal_help").html(user_postal);
        $("#user_postal").removeClass("is-invalid");
        $("#user_postal").addClass("is-valid");       
    } else {
        $("#user_postal_help").html("Input postal code");
        $("#user_postal").removeClass("is-valid");
        $("#user_postal").addClass("is-invalid");
    }
    var user_city = $("#user_city").val();
    if (user_city != "" && user_city != null) {
        $("#user_city_help").html(user_city);
        $("#user_city").removeClass("is-invalid");
        $("#user_city").addClass("is-valid");       
    } else {
        $("#user_city_help").html("Input city");
        $("#user_city").removeClass("is-valid");
        $("#user_city").addClass("is-invalid");
    }

    var user_country = $("#user_country").val();
    if (user_country != "" && user_country != null) {
        $("#user_country_help").html(user_country);
        $("#user_country").removeClass("is-invalid");
        $("#user_country").addClass("is-valid");       
    } else {
        $("#user_country_help").html("Input city");
        $("#user_country").removeClass("is-valid");
        $("#user_country").addClass("is-invalid");
    }

    var user_last = $("#user_last").val();
    if (user_last != "" && user_last != null) {
        $("#user_last_help").html(user_last);
        $("#user_last").removeClass("is-invalid");
        $("#user_last").addClass("is-valid");       
    } else {
        $("#user_last_help").html("Input last name");
        $("#user_last").removeClass("is-valid");
        $("#user_last").addClass("is-invalid");
    }
    var user_first = $("#user_first").val();
    if (user_first != "" && user_first != null) {
        $("#user_first_help").html(user_first);
        $("#user_first").removeClass("is-invalid");
        $("#user_first").addClass("is-valid");       
    } else {
        $("#user_first_help").html("Input first name");
        $("#user_first").removeClass("is-valid");
        $("#user_first").addClass("is-invalid");
    }
    
    
    if (user_phone != "" && user_phone != null && user_phone.length >= 9 && user_address != "" && user_address != null && user_postal != "" && user_postal != null && user_city != "" && user_city != null) {
        address = user_address;
        postal = user_postal;
        city = user_city;
        country = user_country;
        first = user_first;
        last = user_last;
        action_float_id = 0;
        location_main_container = 0;
        contact_information_save = 1;
        $("#contact_information_save").removeClass("btn-primary");
        $("#contact_information_save").removeClass("btn-danger");
        $("#contact_information_save").addClass("btn-info");
        $("#contact_information_save").html("Saving...");
        $("#contact_information_save_help").html("please wait");
        update_user_data(latitude,longitude,role,rating,review,address,city,country,postal,phone,email,last,first,username);
    } else {
        $("#contact_information_save").removeClass("btn-primary");
        $("#contact_information_save").addClass("btn-danger");
        $("#contact_information_save_help").html("Correct the error(s)");
    }
    

});
var action_float_id = 0;
$("#action_float_id").click(function(){
    //alert(username);
    if (username == "") {
        $(".main").hide(100);
        $(".authentication").show(100);
    } else {
        $(".authentication").hide(100);
        $(".main").show(100);
        //localStorage.setItem("username", username);
        //localStorage.setItem("role", role); 
        if (role == "customer") {
            var userrole = "agent";
        } else {
            var userrole = "customer";
        }  
        action_float_id = 1;
        location_main_container = 0;
        contact_information_save = 0;
        //alert(phone);  
        update_user_data(latitude,longitude,userrole,rating,review,address,city,country,postal,phone,email,last,first,username);
    }     
});

var percent_pricing_strategy = 'markup_pricing';
var product_price = 0;
var selling_price = 7;
var buying_price = 5;//100%
var percent_price = selling_price/buying_price;
var pricing_strategy = '';
var product_type = '';
var product_list_price = 0;
var sale_price = 0;
var net_price = 0;
//percent_price = percent_price*0.1;
function product_pricing_strategy(list_price) {
    product_list_price = list_price;
    if (product_price != 0) {
        
        

        //Cost-based pricing => Considering the total cost of making a product and adding a markup to that to determine the price of a product.
        //                   *cost_plus_pricing => Price = total cost of product + gross profit margin
        //                   *markup_pricing => Markup as a percentage of selling price = (markup/selling price) x 100

        //Value-Based Pricing => Price is a numerical evaluation of how much customers value what you are selling.
        //                    *private_labels_pricing => Your product’s price is an absolute parameter and should be determined solely by what your customers might want to pay.
        //                    *penetration_pricing => Pricing strategy that is used to quickly gain market share by setting an initially low price to entice customers to purchase from.
        //                    *MSRP => Price the manufacturer recommends you use to sell their products to consumers
        //                    *stable_pricing => To keep the price stable and as close to the market value of the product as possible.

        //Demand-based pricing => Customer demand and perceived value of the product to determine a sale price.
        //                     *charm_pricing => Removing a penny or two from a rounded price point (i.e. changing a price tag from $20.00 to $19.99).
        //                     *skim_pricing => Introduce a new product at the highest possible price point and then lower the price over a specified period of time.

        //Competition-based pricing => Utilizes competitor’s pricing data for similar products to set a base price for their own products. 
        //                          => Rather than focusing on production costs or the value of the item, 
        //                          => this pricing method relies heavily on market data.
        //                          *repricing => Price of your product to match the lowest amount at that time.
        //                          *anchor_pricing => Listing both the original price point and the sale price point to relay perceived value.
        //                          *discounts_and_promotions_pricing => You may want to consider the possibility that out of necessity in the future.
        //                                                              => You may want to either discount your item permanently or temporarily, 
        //                                                              => With timed promotions in order to move your merchandise.

        //Loss-leading pricing => Enticing customers to make a purchase by pricing a product at a loss while encouraging them to buy additional full-priced products.
        //                     => An advertising tactic that actually offers a specific product at a loss in order to drive consumers to their site or store.
        //                     *multiple_pricing => Products are bundled to create a higher perceived value at a lower cost, 
        //                                       => which ideally leads to larger-volume purchases.
        //                     *keystone_pricing => Pricing your products too high or too low.

         //Dynamic pricing => your price is not static and instead changes based on other factors. 
        //                => These factors can be for example segments or time.
        //                *dynamic_segments_pricing => Use algorithms to derive the pricing for different groups based on statistics.
        //                *dynamic_time_pricing => Cheaper prices on products to match the sales quota, as compared to the start of the month.

        if (percent_pricing_strategy == 'cost_plus_pricing') {
            var product_costs = product_price;
            var product_ = 0.5;
            var labor_ = 0.8;
            var labor_costs = product_costs * product_;
            labor_costs = labor_costs.toFixed(2);

            var overhead = labor_costs * labor_;
            overhead = overhead.toFixed(2);

            //product_price = product_costs + labor_costs + overhead;
            product_price = (Number(product_costs) + Number(labor_costs) + Number(overhead))
            product_price = product_price.toFixed(2);

            var margin_price = product_price * percent_price * 0.1;
            margin_price = margin_price.toFixed(2);

            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            //alert(sale_price);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Calculated as (Direct material costs <b>' + product_costs + '</b>  + Direct labor costs <b>' + labor_costs + '</b> as ('+ product_*100 +')% of Direct material costs + Allocated overhead <b>' + overhead + '</b> as ('+ labor_*100 +')% of Direct labor costs) * <b>' + percent_price + '</b> % margin</span>');
            $("#product_price_help").html('<strong>Cost-based pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

            //alert(sale_price);

        } else if (percent_pricing_strategy == 'markup_pricing') {
            //var margin_price  = percent_price*product_price*0.1;
            //product_price = product_price.toFixed(2);
            var margin_price = product_price * percent_price*0.1;
            //var list_price = product_price + margin_price;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;
            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Markup as a <b>' + percent_price + '</b> %  of product price = <b>' +  currency_price_symbal + ' ' + sale_price + '</b></span>');
            $("#product_price_help").html('<strong>Cost-based pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'private_labels_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Your product’s price is an absolute parameter and should be determined <b>solely</> by what your customers might want to pay.</span>');
            $("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'penetration_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Used to quickly gain market share by setting an initially low price to entice customers to purchase from.</span>');
            $("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'MSRP') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Price the manufacturer recommends you use to sell their products to consumers</span>');
            $("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'stable_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> To keep the price stable and as close to the market value of the product as possible.</b></span>');
            $("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'charm_pricing') {
            //product_price = percent_price*product_price;
            var product_charm_price = 20 - 19.99;
            product_price = product_price - product_charm_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Removing a penny or two from a rounded price point (i.e. changing a price tag from $20.00 to $19.99)</b></span>');
            $("#product_price_help").html('<strong>Demand-based pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'skim_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Introduce a new product at the highest possible price point and then lower the price over a specified period of time.</b></span>');
            $("#product_price_help").html('<strong>Demand-based pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'repricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Price of your product to match the lowest amount at that time.</b></span>');
            $("#product_price_help").html('<strong>Competition-based pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'anchor_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Listing both the original price point and the sale price point to relay perceived value.</b></span>');
            $("#product_price_help").html('<strong>Competition-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

        } else if (percent_pricing_strategy == 'discounts_and_promotions_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> You may want to consider the possibility that out of necessity in the future.</b></span>');
            $("#product_price_help").html('<strong>Competition-based pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'multiple_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Products are bundled to create a higher perceived value at a lower cost.</b></span>');
            $("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'keystone_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Pricing your products too high or too low.</b></span>');
            $("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'dynamic_segments_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Use algorithms to derive the pricing for different groups based on statistics.</b></span>');
            $("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        } else if (percent_pricing_strategy == 'dynamic_time_pricing') {
            //product_price = percent_price*product_price;
            var margin_price = product_price * percent_price*0.1;
            sale_price = (Number(product_price) + Number(margin_price));
            sale_price = sale_price.toFixed(2);
            net_price = product_price;

            $("#product_price_strategy_help").html('List Price =  <b>' +  currency_price_symbal + ' ' + list_price + '</b><br> Net Price =  <b>' +  currency_price_symbal + ' ' + product_price + '</b><br> Sale Price =  <b>' +  currency_price_symbal + ' ' + sale_price + '</b><br><span class="help is-success"> Cheaper prices on products to match the sales quota, as compared to the start of the month.</b></span>');
            $("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + sale_price);

        }
        
        //$("#product_price_help").html('<strong>Cost-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);
        $("#product_price").removeClass("is-invalid");
        $("#product_price").addClass("is-valid");
    } else {
        $("#product_price_help").html("Enter a valid price");
        $("#product_price").removeClass("is-valid");
        $("#product_price").addClass("is-invalid");
    }
}
const pricing_strategy_input = document.querySelector('#pricing_strategy');
pricing_strategy_input.addEventListener('change', (event) => {
    percent_pricing_strategy = event.target.value;
    pricing_strategy = percent_pricing_strategy;
    if (percent_pricing_strategy == 'cost_plus_pricing') {
        $("#pricing_strategy_help").html('Price = total cost of product + gross profit margin');
    } else if (percent_pricing_strategy == 'markup_pricing') {
        $("#pricing_strategy_help").html("Markup as a percentage of selling price = (markup/selling price) x 100");
    } else if (percent_pricing_strategy == 'private_labels_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Your product’s price is an absolute parameter and should be determined <b>solely</> by what your customers might want to pay.');
        //$("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'penetration_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Used to quickly gain market share by setting an initially low price to entice customers to purchase from.');
        //$("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'MSRP') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Price the manufacturer recommends you use to sell their products to consumers');
        //$("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'stable_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('To keep the price stable and as close to the market value of the product as possible.</b>');
        //$("#product_price_help").html('<strong>Value-Based Pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    }
    else if (percent_pricing_strategy == 'charm_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Removing a penny or two from a rounded price point (i.e. changing a price tag from $20.00 to $19.99)</b>');
        //$("#product_price_help").html('<strong>Demand-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'skim_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Introduce a new product at the highest possible price point and then lower the price over a specified period of time.</b>');
        //$("#product_price_help").html('<strong>Demand-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'repricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Price of your product to match the lowest amount at that time.</b>');
        //$("#product_price_help").html('<strong>Competition-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'anchor_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Listing both the original price point and the sale price point to relay perceived value.</b>');
        //$("#product_price_help").html('<strong>Competition-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'discounts_and_promotions_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('You may want to consider the possibility that out of necessity in the future.</b>');
        //$("#product_price_help").html('<strong>Competition-based pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'multiple_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Products are bundled to create a higher perceived value at a lower cost.</b>');
        //$("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'keystone_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Pricing your products too high or too low.</b>');
        //$("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'dynamic_segments_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Use algorithms to derive the pricing for different groups based on statistics.</b>');
        //$("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    } else if (percent_pricing_strategy == 'dynamic_time_pricing') {
        //product_price = percent_price*product_price;
        $("#pricing_strategy_help").html('Cheaper prices on products to match the sales quota, as compared to the start of the month.</b>');
        //$("#product_price_help").html('<strong>Loss-leading pricing </strong> <br>' +  currency_price_symbal + ' ' + product_price);

    }
    //alert(typeof $("#product_price").val());
    //alert(isNaN($("#product_price").val()));

    if (isNaN($("#product_price").val()) == false) {
        product_price = Number($("#product_price").val());
        var list_price = Number($("#product_price").val());
        product_pricing_strategy(list_price);        
    } else {
        $("#product_price_help").html("Enter a valid price");
        $("#product_price").removeClass("is-valid");
        $("#product_price").addClass("is-invalid");
    }
    
});
const product_price_input = document.querySelector('#product_price');
product_price_input.addEventListener('input', updateValue);
function updateValue(e) {
    if (e.target.value != "" && e.target.value != null) {
        //alert(typeof e.target.value);
        //alert(typeof e.target.value === "number");
        //alert(isNaN(e.target.value));

        if (isNaN(e.target.value) ==  false) {            
            $("#percent_price").html(percent_price);
            product_price = Number(e.target.value);
            var list_price = Number(e.target.value);
            product_pricing_strategy(list_price);
        } else {
            $("#product_price_help").html("Enter a valid price");
            $("#product_price").removeClass("is-valid");
            $("#product_price").addClass("is-invalid");
        }      
    } else {
        $("#product_price_help").html("Input price");
        $("#product_price").removeClass("is-valid");
        $("#product_price").addClass("is-invalid");
    }
}

var product_title = '';
var product_industry = '';
var product_category = '';
var product_quantity = 0;
var shipping_strategies = '';
var shipping_rates = '';
var product_description = '';


var availability = '';// availability_strategy_help => Accurately submit the product's availability and match the availability from your landing page
                      // product_data_specification_help => <span class="text-danger">Required </span> Your product’s availability. <span class="text-dark">Example</span> <span class="text-danger">in stock</span>. Supported values <span class="text-danger">in stock</span>, <span class="text-danger">out of stock</span>, <span class="text-danger">preorder</span>, <span class="text-danger">backorder</span>. Schema.org property <span class="text-info">Offer.​availability</span>

var availability_date = '';// Use this attribute if your product’s availability is <span class="text-danger">preorder </span> or <span class="text-danger">backorder </span>
                           // <span class="text-danger">Required </span> if product availability is <span class="text-danger">preorder</span> or <span class="text-danger">backorder</span>. The date a preordered or backordered product becomes available for delivery. Example (For UTC+1) <span class="text-danger">2016-02-24T11:07+0100</span>. Syntax Max 25 alphanumeric characters ISO 8601 <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm]</span>, <span class="text-danger">YYYY-MM-DDThh:mmZ</span>. Schema.org <span class="text-info">Offer.​availabilityStart</span>s

var cost_of_goods_sold = '';// The costs associated with the sale of a particular product as defined by the accounting convention you set up. These costs may include <span class="text-danger">material </span>, <span class="text-danger">labor </span>, <span class="text-danger">freight </span>, or other <span class="text-danger">overhead </span> expenses.
                            // By submitting the COGS for your products, you gain insights about other metrics, such as your gross margin and the amount of revenue generated by your ads and free listings.

var expiration_date = '';// Use a date less than 30 days in the future
                         // The date that your product should stop showing. Example (For UTC+1) <span class="text-danger">2016-02-24T11:07+0100 </span>. Syntax Max 25 alphanumeric characters ISO 8601 <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm] </span>, <span class="text-danger">YYYY-MM-DDThh:mmZ </span>
               
var sale_price_effective_date = '';// Use together with  <span class="text-info">sale ​price </span>. If you don't submit <span class="text-info">sale ​price ​effective ​date </span>, the <span class="text-info">sale ​price </span> always applies. Use a start date before the end date
                                   // <span class="text-warning">Optional </span>. The date range during which the product’s  <span class="text-info">sale ​price </span> applies. Example (For UTC+1)   <span class="text-danger">2016-02-24T11:07+0100 / 2016-02-29T23:07+0100 </span>. Syntax Max 51 alphanumeric characters. ISO 8601   <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm] </span>, <span class="text-danger">YYYY-MM-DDThh:mmZ </span>. Separate start date and end date with   <span class="text-info">/ </span>

var unit_pricing_measure = '';// Use the measure or dimension of the product without packaging. Use a positive number. For variants. Include with the same value for <span class="text-info">item group id </span> and different values for <span class="text-info">unit pricing measure</span>
                              // <span class="text-warning">Optional (except when required by local laws or regulations)</span>. The measure and dimension of your product as it is sold. Example <span class="text-danger">1.5kg</span>. Syntax Numerical value + unit. Supported units <span class="text-dark">Weight: </span><span class="text-danger">oz</span>, <span class="text-danger">lb</span>, <span class="text-danger">mg</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>. <span class="text-dark">Volume US imperial: </span><span class="text-danger">floz</span>, <span class="text-danger">pt</span>, <span class="text-danger">qt</span>, <span class="text-danger">gal</span>. <span class="text-dark">Volume metric: </span><span class="text-danger">ml</span>, <span class="text-danger">cl</span>, <span class="text-danger">l</span>, <span class="text-danger">cbm</span>. <span class="text-dark">Length: </span><span class="text-danger">in</span>, <span class="text-danger">ft</span>, <span class="text-danger">yd</span>, <span class="text-danger">cm</span>, <span class="text-danger">m</span>. <span class="text-dark">Area: </span><span class="text-danger">sqft</span>, <span class="text-danger">sqm</span>. <span class="text-dark">Per unit:</span> <span class="text-danger">ct</span>

var unit_price_base_measure = '';// <span class="text-warning">Optional</span> when you submit <span class="text-info">unit ​​pricing ​​measure</span>. Use the same unit of measure for both <span class="text-info">unit ​​pricing ​​measure</span> and <span class="text-info">unit pricing ​base ​measure</span>. Keep in mind that the <span class="text-info">price</span> (or sale price, if active) is used to calculate the unit price of the product. For example, if price is 3 USD, <span class="text-info">unit ​​pricing ​​measure</span> is <span class="text-danger">150ml</span>, and <span class="text-info">unit ​pricing ​base ​measure</span> is <span class="text-danger">100ml</span>, the unit price is 2 USD / 100ml
                                 // <span class="text-warning">Optional (except when required by local laws or regulations)</span>. The product’s base measure for pricing (e.g. 100ml means the price is calculated based on a 100ml units). Example <span class="text-danger">100g</span>. Syntax Integer + unit. Supported integers <span class="text-danger">1</span>, <span class="text-danger">10</span>, <span class="text-danger">100</span>, <span class="text-danger">2</span>, <span class="text-danger">4</span>, <span class="text-danger">8</span>. Supported units <span class="text-dark">Weight: </span><span class="text-danger">oz</span>, <span class="text-danger">lb</span>, <span class="text-danger">mg</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>. <span class="text-dark">Volume US imperial: </span><span class="text-danger">floz</span>, <span class="text-danger">pt</span>, <span class="text-danger">qt</span>, <span class="text-danger">gal</span>. <span class="text-dark">Volume metric: </span><span class="text-danger">ml</span>, <span class="text-danger">cl</span>, <span class="text-danger">l</span>, <span class="text-danger">cbm</span>. <span class="text-dark">Length: </span><span class="text-danger">in</span>, <span class="text-danger">ft</span>, <span class="text-danger">yd</span>, <span class="text-danger">cm</span>, <span class="text-danger">m</span>. <span class="text-dark">Area: </span><span class="text-danger">sqft</span>, <span class="text-danger">sqm</span>. <span class="text-dark">Per unit: </span><span class="text-danger">ct</span>. Additional supported metric integer + unit combinations <span class="text-danger">75cl</span>, <span class="text-danger">750ml</span>, <span class="text-danger">50kg</span>, <span class="text-danger">1000kg</span>

var installment = '';// Match the installment option that’s visible on your landing page. Don’t require a loyalty card. For Latin America, make sure the price attribute is the total price when paid in full up-front and use the installment attribute to indicate an alternative payment option using installments. For other countries, use the price attribute (as low as 0) as the up-front payment (including any device down payment and activation fees), and the installment attribute for additional monthly installment payments.
                     // <span class="text-warning">Optional (Available in Latin America for all product categories and in certain other countries for showing wireless products and services only)</span>. Details of an installment payment plan. Example <span class="text-danger">6, 50 USD </span>. Syntax installment uses 2 sub-attributes: <span class="text-danger">months (required) Integer</span>, the number of installments the buyer has to pay. <span class="text-danger">amount (required) ISO 4217</span>, the amount the buyer has to pay per month

var subscription_cost = '';// Submit the price attribute with the total amount due at checkout (including down payment and activation fee). Match the communications payment plan that you display on your landing page. The plan must be easy to find on the landing page.
                           // <span class="text-warning">Optional (Available in certain countries for showing wireless products and services only)</span>. Details a monthly or annual payment plan that bundles a communications service contract with a wireless product. Example <span class="text-danger">month:12:35.00 USD</span>. Syntax The <span class="text-info">subscription cost</span> attribute uses 3 sub-attributes: <span class="text-danger">period (required)</span>, The duration of a single subscription period. Either “month” or “year”. <span class="text-danger">period length (required) Integer</span>, the number of subscription periods (months or years) that the buyer must pay. <span class="text-danger">amount (required) ISO 4217</span>, the amount the buyer must pay per month. When displaying this amount, we may round up to the nearest whole unit of local currency to save space. The provided value must still exactly match the amount as shown on your site.

var  loyalty_points = '';// Only submit loyalty points with a specific monetary value
                         // <span class="text-warning">Optional (Available for Kenya only)</span>. The number and type of loyalty points a customer receives when buying a product. Example <span class="text-danger">Program A, 100, 1.5</span>. Syntax <span class="text-info">loyalty ​points</span> uses 3 sub-attributes: <span class="text-danger">points value (required)</span>, Number of points earned for the product. <span class="text-warning">name (optional)</span>, Name of the loyalty points program, 12 full-width characters or 24 roman characters. <span class="text-warning">ratio (optional)Number</span>, the ratio of a point when converted to currency

 
var product_availability_strategy = 'availability';
function availability_strategy_data(strategy_data) {
    if (product_availability_strategy == 'availability') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html("Accurately submit the product's availability and match the availability from your landing page");

        $("#product_data_specification_help").html('<span class="text-danger">Required </span> Your product’s availability. <span class="text-dark">Example</span> <span class="text-danger">in stock</span>. Supported values <span class="text-danger">in stock</span>, <span class="text-danger">out of stock</span>, <span class="text-danger">preorder</span>, <span class="text-danger">backorder</span>. Schema.org property <span class="text-info">Offer.​availability</span>');
        $("#product_availability_help").html(strategy_data);
        availability = strategy_data;
    } else if (product_availability_strategy == 'availability ​​date') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Use this attribute if your product’s availability is <span class="text-danger">preorder </span> or <span class="text-danger">backorder </span>');
       
        $("#product_data_specification_help").html('<span class="text-danger">Required </span> if product availability is <span class="text-danger">preorder</span> or <span class="text-danger">backorder</span>. The date a preordered or backordered product becomes available for delivery. Example (For UTC+1) <span class="text-danger">2016-02-24T11:07+0100</span>. Syntax Max 25 alphanumeric characters ISO 8601 <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm]</span>, <span class="text-danger">YYYY-MM-DDThh:mmZ</span>. Schema.org <span class="text-info">Offer.​availabilityStarts</span>');
        $("#product_availability_help").html(strategy_data);
        availability_date = strategy_data;
    } else if (product_availability_strategy == 'cost of goods sold') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('The costs associated with the sale of a particular product as defined by the accounting convention you set up. These costs may include <span class="text-danger">material </span>, <span class="text-danger">labor </span>, <span class="text-danger">freight </span>, or other <span class="text-danger">overhead </span> expenses.');
       
        $("#product_data_specification_help").html("By submitting the COGS for your products, you gain insights about other metrics, such as your gross margin and the amount of revenue generated by your ads and free listings.");
        $("#product_availability_help").html(strategy_data);
        cost_of_goods_sold = strategy_data;
    } else if (product_availability_strategy == 'expiration date') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html("Use a date less than 30 days in the future");
       
        $("#product_data_specification_help").html('The date that your product should stop showing. Example (For UTC+1) <span class="text-danger">2016-02-24T11:07+0100 </span>. Syntax Max 25 alphanumeric characters ISO 8601 <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm] </span>, <span class="text-danger">YYYY-MM-DDThh:mmZ </span>');
        $("#product_availability_help").html(strategy_data);
        expiration_date = strategy_data;
    } else if (product_availability_strategy == 'sale price effective date') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Use together with  <span class="text-info">sale ​price </span>. If you don’t submit <span class="text-info">sale ​price ​effective ​date </span>, the <span class="text-info">sale ​price </span> always applies. Use a start date before the end date');
       
        $("#product_data_specification_help").html(' <span class="text-warning">Optional </span>. The date range during which the product’s  <span class="text-info">sale ​price </span> applies. Example (For UTC+1)   <span class="text-danger">2016-02-24T11:07+0100 / 2016-02-29T23:07+0100 </span>. Syntax Max 51 alphanumeric characters. ISO 8601   <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm] </span>, <span class="text-danger">YYYY-MM-DDThh:mmZ </span>. Separate start date and end date with <span class="text-info">/ </span>');
        $("#product_availability_help").html(strategy_data);
        sale_price_effective_date = strategy_data;
    } else if (product_availability_strategy == 'unit pricing measure') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Use the measure or dimension of the product without packaging. Use a positive number. For variants. Include with the same value for <span class="text-info">item group id </span> and different values for <span class="text-info">unit pricing measure</span>');
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. The measure and dimension of your product as it is sold. Example <span class="text-danger">1.5kg</span>. Syntax Numerical value + unit. Supported units <span class="text-dark">Weight: </span><span class="text-danger">oz</span>, <span class="text-danger">lb</span>, <span class="text-danger">mg</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>. <span class="text-dark">Volume US imperial: </span><span class="text-danger">floz</span>, <span class="text-danger">pt</span>, <span class="text-danger">qt</span>, <span class="text-danger">gal</span>. <span class="text-dark">Volume metric: </span><span class="text-danger">ml</span>, <span class="text-danger">cl</span>, <span class="text-danger">l</span>, <span class="text-danger">cbm</span>. <span class="text-dark">Length: </span><span class="text-danger">in</span>, <span class="text-danger">ft</span>, <span class="text-danger">yd</span>, <span class="text-danger">cm</span>, <span class="text-danger">m</span>. <span class="text-dark">Area: </span><span class="text-danger">sqft</span>, <span class="text-danger">sqm</span>. <span class="text-dark">Per unit:</span> <span class="text-danger">ct</span>');
        $("#product_availability_help").html(strategy_data);
        unit_pricing_measure = strategy_data;
    } else if (product_availability_strategy == 'unit price base measure') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('<span class="text-warning">Optional</span> when you submit <span class="text-info">unit ​​pricing ​​measure</span>. Use the same unit of measure for both <span class="text-info">unit ​​pricing ​​measure</span> and <span class="text-info">unit pricing ​base ​measure</span>. Keep in mind that the <span class="text-info">price</span> (or sale price, if active) is used to calculate the unit price of the product. For example, if price is 3 USD, <span class="text-info">unit ​​pricing ​​measure</span> is <span class="text-danger">150ml</span>, and <span class="text-info">unit ​pricing ​base ​measure</span> is <span class="text-danger">100ml</span>, the unit price is 2 USD / 100ml');
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. The product’s base measure for pricing (e.g. 100ml means the price is calculated based on a 100ml units). Example <span class="text-danger">100g</span>. Syntax Integer + unit. Supported integers <span class="text-danger">1</span>, <span class="text-danger">10</span>, <span class="text-danger">100</span>, <span class="text-danger">2</span>, <span class="text-danger">4</span>, <span class="text-danger">8</span>. Supported units <span class="text-dark">Weight: </span><span class="text-danger">oz</span>, <span class="text-danger">lb</span>, <span class="text-danger">mg</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>. <span class="text-dark">Volume US imperial: </span><span class="text-danger">floz</span>, <span class="text-danger">pt</span>, <span class="text-danger">qt</span>, <span class="text-danger">gal</span>. <span class="text-dark">Volume metric: </span><span class="text-danger">ml</span>, <span class="text-danger">cl</span>, <span class="text-danger">l</span>, <span class="text-danger">cbm</span>. <span class="text-dark">Length: </span><span class="text-danger">in</span>, <span class="text-danger">ft</span>, <span class="text-danger">yd</span>, <span class="text-danger">cm</span>, <span class="text-danger">m</span>. <span class="text-dark">Area: </span><span class="text-danger">sqft</span>, <span class="text-danger">sqm</span>. <span class="text-dark">Per unit: </span><span class="text-danger">ct</span>. Additional supported metric integer + unit combinations <span class="text-danger">75cl</span>, <span class="text-danger">750ml</span>, <span class="text-danger">50kg</span>, <span class="text-danger">1000kg</span>');
        $("#product_availability_help").html(strategy_data);
        unit_price_base_measure = strategy_data;
    } else if (product_availability_strategy == 'installment') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Match the installment option that’s visible on your landing page. Don’t require a loyalty card. For Latin America, make sure the price attribute is the total price when paid in full up-front and use the installment attribute to indicate an alternative payment option using installments. For other countries, use the price attribute (as low as 0) as the up-front payment (including any device down payment and activation fees), and the installment attribute for additional monthly installment payments.');
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (Available in Latin America for all product categories and in certain other countries for showing wireless products and services only)</span>. Details of an installment payment plan. Example <span class="text-danger">6, 50 USD </span>. Syntax installment uses 2 sub-attributes: <span class="text-danger">months (required) Integer</span>, the number of installments the buyer has to pay. <span class="text-danger">amount (required) ISO 4217</span>, the amount the buyer has to pay per month');
        $("#product_availability_help").html(strategy_data);
        installment = strategy_data;
    } else if (product_availability_strategy == 'subscription cost') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Submit the price attribute with the total amount due at checkout (including down payment and activation fee). Match the communications payment plan that you display on your landing page. The plan must be easy to find on the landing page.');
       
        $("#product_data_specification_help").html(' <span class="text-warning">Optional (Available in certain countries for showing wireless products and services only)</span>. Details a monthly or annual payment plan that bundles a communications service contract with a wireless product. Example <span class="text-danger">month:12:35.00 USD</span>. Syntax The <span class="text-info">subscription cost</span> attribute uses 3 sub-attributes: <span class="text-danger">period (required)</span>, The duration of a single subscription period. Either “month” or “year”. <span class="text-danger">period length (required) Integer</span>, the number of subscription periods (months or years) that the buyer must pay. <span class="text-danger">amount (required) ISO 4217</span>, the amount the buyer must pay per month. When displaying this amount, we may round up to the nearest whole unit of local currency to save space. The provided value must still exactly match the amount as shown on your site.');
        $("#product_availability_help").html(strategy_data);
        subscription_cost = strategy_data;
    } else if (product_availability_strategy == 'loyalty points') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html("Only submit loyalty points with a specific monetary value");
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (Available for Kenya only)</span>. The number and type of loyalty points a customer receives when buying a product. Example <span class="text-danger">Program A, 100, 1.5</span>. Syntax <span class="text-info">loyalty ​points</span> uses 3 sub-attributes: <span class="text-danger">points value (required)</span>, Number of points earned for the product. <span class="text-warning">name (optional)</span>, Name of the loyalty points program, 12 full-width characters or 24 roman characters. <span class="text-warning">ratio (optional)Number</span>, the ratio of a point when converted to currency');
        $("#product_availability_help").html(strategy_data);
        loyalty_points = strategy_data;
    }
    
}
const availability_strategy = document.querySelector('#availability_strategy');
availability_strategy.addEventListener('change', (event) => {
    //$("#product_availability").val() = '';
    product_availability_strategy = event.target.value;
    var i_e = '';
    if (product_availability_strategy == 'availability') {
        $("#availability_strategy_help").html("Accurately submit the product's availability and match the availability from your landing page");

        $("#product_data_specification_help").html('<span class="text-danger">Required </span> Your product’s availability. <span class="text-dark">Example</span> <span class="text-danger">in stock</span>. Supported values <span class="text-danger">in stock</span>, <span class="text-danger">out of stock</span>, <span class="text-danger">preorder</span>, <span class="text-danger">backorder</span>. Schema.org property <span class="text-info">Offer.​availability</span>');
        i_e = 'i.e <span class="text-danger">in stock</span>';
        //$("#product_availability_help").html(strategy_data);
        //availability = strategy_data;
    } else if (product_availability_strategy == 'availability ​​date') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Use this attribute if your product’s availability is <span class="text-danger">preorder </span> or <span class="text-danger">backorder </span>');
       
        $("#product_data_specification_help").html('<span class="text-danger">Required </span> if product availability is <span class="text-danger">preorder</span> or <span class="text-danger">backorder</span>. The date a preordered or backordered product becomes available for delivery. Example (For UTC+1) <span class="text-danger">2016-02-24T11:07+0100</span>. Syntax Max 25 alphanumeric characters ISO 8601 <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm]</span>, <span class="text-danger">YYYY-MM-DDThh:mmZ</span>. Schema.org <span class="text-info">Offer.​availabilityStarts</span>');
        i_e = 'i.e <span class="text-danger">2016-02-24T11:07+0100</span>';
        //$("#product_availability_help").html(strategy_data);
        //availability_date = strategy_data;
    } else if (product_availability_strategy == 'cost of goods sold') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('The costs associated with the sale of a particular product as defined by the accounting convention you set up. These costs may include <span class="text-danger">material </span>, <span class="text-danger">labor </span>, <span class="text-danger">freight </span>, or other <span class="text-danger">overhead </span> expenses.');
       
        $("#product_data_specification_help").html("By submitting the COGS for your products, you gain insights about other metrics, such as your gross margin and the amount of revenue generated by your ads and free listings.");
        i_e = 'i.e <span class="text-danger">$ 20</span>';
        //$("#product_availability_help").html(strategy_data);
        //cost_of_goods_sold = strategy_data;
    } else if (product_availability_strategy == 'expiration date') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html("Use a date less than 30 days in the future");
       
        $("#product_data_specification_help").html('The date that your product should stop showing. Example (For UTC+1) <span class="text-danger">2016-02-24T11:07+0100 </span>. Syntax Max 25 alphanumeric characters ISO 8601 <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm] </span>, <span class="text-danger">YYYY-MM-DDThh:mmZ </span>');
        i_e = 'i.e <span class="text-danger">2016-02-24T11:07+0100 </span>';

        //$("#product_availability_help").html(strategy_data);
        //expiration_date = strategy_data;
    } else if (product_availability_strategy == 'sale price effective date') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Use together with  <span class="text-info">sale ​price </span>. If you don’t submit <span class="text-info">sale ​price ​effective ​date </span>, the <span class="text-info">sale ​price </span> always applies. Use a start date before the end date');
       
        $("#product_data_specification_help").html(' <span class="text-warning">Optional </span>. The date range during which the product’s  <span class="text-info">sale ​price </span> applies. Example (For UTC+1)   <span class="text-danger">2016-02-24T11:07+0100 / 2016-02-29T23:07+0100 </span>. Syntax Max 51 alphanumeric characters. ISO 8601   <span class="text-danger">YYYY-MM-DDThh:mm [+hhmm] </span>, <span class="text-danger">YYYY-MM-DDThh:mmZ </span>. Separate start date and end date with <span class="text-info">/ </span>');
        i_e = 'i.e <span class="text-danger">2016-02-24T11:07+0100 / 2016-02-29T23:07+0100</span>';

        //$("#product_availability_help").html(strategy_data);
        //sale_price_effective_date = strategy_data;
    } else if (product_availability_strategy == 'unit pricing measure') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Use the measure or dimension of the product without packaging. Use a positive number. For variants. Include with the same value for <span class="text-info">item group id </span> and different values for <span class="text-info">unit pricing measure</span>');
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. The measure and dimension of your product as it is sold. Example <span class="text-danger">1.5kg</span>. Syntax Numerical value + unit. Supported units <span class="text-dark">Weight: </span><span class="text-danger">oz</span>, <span class="text-danger">lb</span>, <span class="text-danger">mg</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>. <span class="text-dark">Volume US imperial: </span><span class="text-danger">floz</span>, <span class="text-danger">pt</span>, <span class="text-danger">qt</span>, <span class="text-danger">gal</span>. <span class="text-dark">Volume metric: </span><span class="text-danger">ml</span>, <span class="text-danger">cl</span>, <span class="text-danger">l</span>, <span class="text-danger">cbm</span>. <span class="text-dark">Length: </span><span class="text-danger">in</span>, <span class="text-danger">ft</span>, <span class="text-danger">yd</span>, <span class="text-danger">cm</span>, <span class="text-danger">m</span>. <span class="text-dark">Area: </span><span class="text-danger">sqft</span>, <span class="text-danger">sqm</span>. <span class="text-dark">Per unit:</span> <span class="text-danger">ct</span>');
        i_e = 'i.e <span class="text-danger">1.5kg</span>';

        //$("#product_availability_help").html(strategy_data);
        //unit_pricing_measure = strategy_data;
    } else if (product_availability_strategy == 'unit price base measure') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('<span class="text-warning">Optional</span> when you submit <span class="text-info">unit ​​pricing ​​measure</span>. Use the same unit of measure for both <span class="text-info">unit ​​pricing ​​measure</span> and <span class="text-info">unit pricing ​base ​measure</span>. Keep in mind that the <span class="text-info">price</span> (or sale price, if active) is used to calculate the unit price of the product. For example, if price is 3 USD, <span class="text-info">unit ​​pricing ​​measure</span> is <span class="text-danger">150ml</span>, and <span class="text-info">unit ​pricing ​base ​measure</span> is <span class="text-danger">100ml</span>, the unit price is 2 USD / 100ml');
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. The product’s base measure for pricing (e.g. 100ml means the price is calculated based on a 100ml units). Example <span class="text-danger">100g</span>. Syntax Integer + unit. Supported integers <span class="text-danger">1</span>, <span class="text-danger">10</span>, <span class="text-danger">100</span>, <span class="text-danger">2</span>, <span class="text-danger">4</span>, <span class="text-danger">8</span>. Supported units <span class="text-dark">Weight: </span><span class="text-danger">oz</span>, <span class="text-danger">lb</span>, <span class="text-danger">mg</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>. <span class="text-dark">Volume US imperial: </span><span class="text-danger">floz</span>, <span class="text-danger">pt</span>, <span class="text-danger">qt</span>, <span class="text-danger">gal</span>. <span class="text-dark">Volume metric: </span><span class="text-danger">ml</span>, <span class="text-danger">cl</span>, <span class="text-danger">l</span>, <span class="text-danger">cbm</span>. <span class="text-dark">Length: </span><span class="text-danger">in</span>, <span class="text-danger">ft</span>, <span class="text-danger">yd</span>, <span class="text-danger">cm</span>, <span class="text-danger">m</span>. <span class="text-dark">Area: </span><span class="text-danger">sqft</span>, <span class="text-danger">sqm</span>. <span class="text-dark">Per unit: </span><span class="text-danger">ct</span>. Additional supported metric integer + unit combinations <span class="text-danger">75cl</span>, <span class="text-danger">750ml</span>, <span class="text-danger">50kg</span>, <span class="text-danger">1000kg</span>');
        i_e = 'i.e <span class="text-danger">100g</span>';

        //$("#product_availability_help").html(strategy_data);
        //unit_price_base_measure = strategy_data;
    } else if (product_availability_strategy == 'installment') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Match the installment option that’s visible on your landing page. Don’t require a loyalty card. For Latin America, make sure the price attribute is the total price when paid in full up-front and use the installment attribute to indicate an alternative payment option using installments. For other countries, use the price attribute (as low as 0) as the up-front payment (including any device down payment and activation fees), and the installment attribute for additional monthly installment payments.');
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (Available in Latin America for all product categories and in certain other countries for showing wireless products and services only)</span>. Details of an installment payment plan. Example <span class="text-danger">6, 50 USD </span>. Syntax installment uses 2 sub-attributes: <span class="text-danger">months (required) Integer</span>, the number of installments the buyer has to pay. <span class="text-danger">amount (required) ISO 4217</span>, the amount the buyer has to pay per month');
        i_e = 'i.e <span class="text-danger">6, 50 USD </span>';

        //$("#product_availability_help").html(strategy_data);
        //installment = strategy_data;
    } else if (product_availability_strategy == 'subscription cost') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html('Submit the price attribute with the total amount due at checkout (including down payment and activation fee). Match the communications payment plan that you display on your landing page. The plan must be easy to find on the landing page.');
       
        $("#product_data_specification_help").html(' <span class="text-warning">Optional (Available in certain countries for showing wireless products and services only)</span>. Details a monthly or annual payment plan that bundles a communications service contract with a wireless product. Example <span class="text-danger">month:12:35.00 USD</span>. Syntax The <span class="text-info">subscription cost</span> attribute uses 3 sub-attributes: <span class="text-danger">period (required)</span>, The duration of a single subscription period. Either “month” or “year”. <span class="text-danger">period length (required) Integer</span>, the number of subscription periods (months or years) that the buyer must pay. <span class="text-danger">amount (required) ISO 4217</span>, the amount the buyer must pay per month. When displaying this amount, we may round up to the nearest whole unit of local currency to save space. The provided value must still exactly match the amount as shown on your site.');
        i_e = 'i.e <span class="text-danger">month:12:35.00 USD</span>';

        //$("#product_availability_help").html(strategy_data);
        //subscription_cost = strategy_data;
    } else if (product_availability_strategy == 'loyalty points') {
        $("#product_data_specification_title").html(product_availability_strategy + ":");
        $("#availability_strategy_help").html("Only submit loyalty points with a specific monetary value");
       
        $("#product_data_specification_help").html('<span class="text-warning">Optional (Available for Kenya only)</span>. The number and type of loyalty points a customer receives when buying a product. Example <span class="text-danger">Program A, 100, 1.5</span>. Syntax <span class="text-info">loyalty ​points</span> uses 3 sub-attributes: <span class="text-danger">points value (required)</span>, Number of points earned for the product. <span class="text-warning">name (optional)</span>, Name of the loyalty points program, 12 full-width characters or 24 roman characters. <span class="text-warning">ratio (optional)Number</span>, the ratio of a point when converted to currency');
        i_e = 'i.e <span class="text-danger">Program A, 100, 1.5</span>';

        //$("#product_availability_help").html(strategy_data);
        ///loyalty_points = strategy_data;
    }
    if ($("#product_availability").val() != '' && $("#product_availability").val() != null) {
        $("#product_availability_help").html($("#product_availability").val());
        $("#product_availability").removeClass("is-invalid");
        $("#product_availability").addClass("is-valid"); 
        availability_strategy_data($("#product_availability").val());       
    } else {
        $("#product_availability_help").html("Input " + product_availability_strategy + " " + i_e);
        $("#product_availability").removeClass("is-valid");
        $("#product_availability").addClass("is-invalid");
    }    
});
const product_availability_input = document.querySelector('#product_availability');
product_availability_input.addEventListener('input', product_availability);
function product_availability(e) {
    if (e.target.value != "" && e.target.value != null) {
        $("#product_availability_help").html(e.target.value);
        $("#product_availability").removeClass("is-invalid");
        $("#product_availability").addClass("is-valid");
        availability_strategy_data(e.target.value);      
    } else {
        $("#product_availability_help").html("Input " + product_availability_strategy + "");
        $("#product_availability").removeClass("is-valid");
        $("#product_availability").addClass("is-invalid");
    }
}




var brand = '';// Provide the brand name of the product generally recognized by consumers. Only provide your store name as the brand in case you manufacture the product, or your product falls into a generic brand category. For example, you could submit your store name as the brand if you sell white label products or customized jewelry. If the product doesn’t have a brand, submit the manufacturer or supplier name under the brand attribute. Don't submit values such as N/A, Generic, No brand, or Does not exist. For compatible products: Submit the GTIN and brand from the manufacturer who actually built the compatible product. Don't provide the Original Equipment Manufacturer (OEM) brand to indicate that your product is compatible with or a replica of the OEM brand's product
               // <span class="text-danger">Required(For all new products, except movies, books, and musical recording brands)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s brand name. Example<span class="text-danger">Oramla</span>. Syntax Max 70 characters. Schema.org property<span class="text-info">Product.brand</span>

var gtin = '';// Exclude dashes and spaces. Submit only valid GTINs as defined in the official GS1 validation guide, which includes these requirements: The checksum digit is present and correct. The GTIN is not restricted (GS1 prefix ranges 02, 04, 2). The GTIN is not a coupon (GS1 prefix ranges 98 - 99). For compatible products: Submit the GTIN and brand from the manufacturer who actually built the compatible product. Don't provide the Original Equipment Manufacturer (OEM) brand to indicate that your product is compatible with or a replica of the OEM brand's product. For <span class="text-info">multipacks</span>: Use the product identifiers that relates to the multipack. For <span class="text-info">bundles</span>: Use the product identifiers for the main product in the bundle. If you offer customization, engraving, or other personalization of a product that's been assigned a GTIN by the manufacturer: Submit the GTIN and use the <span class="text-info">is ​bundle</span> attribute to let us know that the product includes customization
              // <span class="text-danger">Required (For all new products with a GTIN assigned by the manufacturer)</span>. <span class="text-warning">Optional (strongly recommended)</span> for all other products. Your product’s Global Trade Item Number (GTIN). Example <span class="text-danger">3234567890126</span>. Syntax Max 50 numeric characters (max 14 per value - added spaces and dashes are ignored). Supported values UPC (in North America / GTIN-12), <span class="text-primary">12-digit</span> number like 323456789012 8-digit UPC-E codes should be converted to <span class="text-primary">12-digit</span> codes EAN (in Europe / GTIN-13) 13-digit number like 3001234567892 JAN (in Japan / GTIN-13) 8 or 13-digit number like 49123456 or 4901234567894 ISBN (for books) 10 or <span class="text-primary">13-digit</span> number like 1455582344 or 978-1455582341. If you have both, only include the 13-digit number. ISBN-10 are deprecated and should be converted to <span class="text-primary">ISBN-13 ITF-14</span> (for multipacks / GTIN-14) <span class="text-primary">14-digit</span> number like 10856435001702. Schema.org property <span class="text-info">Product.isbn Product.gtin8 Product.gtin12 Product.gtin13 Product.gtin14</span>

var MPN = '';// Only submit MPNs assigned by a manufacturer. Use the most specific MPN possible. For example, different colors of a product should have different MPNs.              
             // <span class="text-danger">Required (Only if your new product does not have a manufacturer assigned GTIN)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s Manufacturer Part Number (mpn). Example <span class="text-danger">OR12345AMLA</span>. Syntax Max 70 alphanumeric characters. Schema.org property <span class="text-info">Product.mpn</span>

var identifier_exists = '';// If you don’t submit the attribute, the default is <span class="text-danger">yes</span>. Your product’s category type determines which UPIs (GTIN, MPN, brand) are required. If your product is a media item and the GTIN is unavailable: Submit <span class="text-info">identifier exists</span> attribute with a value of <span class="text-danger">no</span>. Note: ISBN and SBN codes are accepted as GTINs. If your product is an apparel (clothing) item and the brand is unavailable: Submit <span class="text-info">identifier ​exists</span> attribute with a value of <span class="text-danger">no</span>. In all other categories, if your product doesn’t have a GTIN, or a combination of MPN and brand: Submit <span class="text-info">identifier exists</span> attribute with a value of <span class="text-danger">no</span>
                           // <span class="text-warning">Optional</span>. Use to indicate whether or not the unique product identifiers (UPIs) GTIN, MPN, and brand are available for your product. Example <span class="text-danger">no</span>. Supported values <span class="text-danger">yes</span> Product identifiers are assigned to the new product by the manufacturer, <span class="text-danger">no</span> Product lacks a brand, GTIN, or MPN (see requirements to the right). If set to <span class="text-danger">no</span>, still provide the UPIs you have.

var product_brand_strategy = 'brand';
function brand_strategy_data(strategy_data) {
    if (product_brand_strategy == 'brand') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html("Provide the brand name of the product generally recognized by consumers. Only provide your store name as the brand in case you manufacture the product, or your product falls into a generic brand category. For example, you could submit your store name as the brand if you sell white label products or customized jewelry. If the product doesn’t have a brand, submit the manufacturer or supplier name under the brand attribute. Don't submit values such as N/A, Generic, No brand, or Does not exist. For compatible products: Submit the GTIN and brand from the manufacturer who actually built the compatible product. Don't provide the Original Equipment Manufacturer (OEM) brand to indicate that your product is compatible with or a replica of the OEM brand's product");      
        
        $("#product_data_brand_help").html(' <span class="text-danger">Required(For all new products, except movies, books, and musical recording brands)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s brand name. Example<span class="text-danger">Oramla</span>. Syntax Max 70 characters. Schema.org property<span class="text-info">Product.brand</span>');
        $("#product_brand_help").html(strategy_data);
        brand = strategy_data;
    } else if (product_brand_strategy == 'gtin') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html('Exclude dashes and spaces. Submit only valid GTINs as defined in the official GS1 validation guide, which includes these requirements: The checksum digit is present and correct. The GTIN is not restricted (GS1 prefix ranges 02, 04, 2). The GTIN is not a coupon (GS1 prefix ranges 98 - 99). For compatible products: Submit the GTIN and brand from the manufacturer who actually built the compatible product. Don’t provide the Original Equipment Manufacturer (OEM) brand to indicate that your product is compatible with or a replica of the OEM brand’s product. For <span class="text-info">multipacks</span>: Use the product identifiers that relates to the multipack. For <span class="text-info">bundles</span>: Use the product identifiers for the main product in the bundle. If you offer customization, engraving, or other personalization of a product that’s been assigned a GTIN by the manufacturer: Submit the GTIN and use the <span class="text-info">is ​bundle</span> attribute to let us know that the product includes customization');
       
        $("#product_data_brand_help").html('<span class="text-danger">Required (For all new products with a GTIN assigned by the manufacturer)</span>. <span class="text-warning">Optional (strongly recommended)</span> for all other products. Your product’s Global Trade Item Number (GTIN). Example <span class="text-danger">3234567890126</span>. Syntax Max 50 numeric characters (max 14 per value - added spaces and dashes are ignored). Supported values UPC (in North America / GTIN-12), <span class="text-primary">12-digit</span> number like 323456789012 8-digit UPC-E codes should be converted to <span class="text-primary">12-digit</span> codes EAN (in Europe / GTIN-13) 13-digit number like 3001234567892 JAN (in Japan / GTIN-13) 8 or 13-digit number like 49123456 or 4901234567894 ISBN (for books) 10 or <span class="text-primary">13-digit</span> number like 1455582344 or 978-1455582341. If you have both, only include the 13-digit number. ISBN-10 are deprecated and should be converted to <span class="text-primary">ISBN-13 ITF-14</span> (for multipacks / GTIN-14) <span class="text-primary">14-digit</span> number like 10856435001702. Schema.org property <span class="text-info">Product.isbn Product.gtin8 Product.gtin12 Product.gtin13 Product.gtin14</span>');
        $("#product_brand_help").html(strategy_data);
        gtin = strategy_data;
    } else if (product_brand_strategy == 'MPN') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html('Only submit MPNs assigned by a manufacturer. Use the most specific MPN possible. For example, different colors of a product should have different MPNs.');
       
        $("#product_data_brand_help").html('<span class="text-danger">Required (Only if your new product does not have a manufacturer assigned GTIN)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s Manufacturer Part Number (mpn). Example <span class="text-danger">OR12345AMLA</span>. Syntax Max 70 alphanumeric characters. Schema.org property <span class="text-info">Product.mpn</span>');
        $("#product_brand_help").html(strategy_data);
        MPN = strategy_data;
    } else if (product_brand_strategy == 'identifier exists') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html('If you don’t submit the attribute, the default is <span class="text-danger">yes</span>. Your product’s category type determines which UPIs (GTIN, MPN, brand) are required. If your product is a media item and the GTIN is unavailable: Submit <span class="text-info">identifier exists</span> attribute with a value of <span class="text-danger">no</span>. Note: ISBN and SBN codes are accepted as GTINs. If your product is an apparel (clothing) item and the brand is unavailable: Submit <span class="text-info">identifier ​exists</span> attribute with a value of <span class="text-danger">no</span>. In all other categories, if your product doesn’t have a GTIN, or a combination of MPN and brand: Submit <span class="text-info">identifier exists</span> attribute with a value of <span class="text-danger">no</span>');
       
        $("#product_data_brand_help").html('<span class="text-warning">Optional</span>. Use to indicate whether or not the unique product identifiers (UPIs) GTIN, MPN, and brand are available for your product. Example <span class="text-danger">no</span>. Supported values <span class="text-danger">yes</span> Product identifiers are assigned to the new product by the manufacturer, <span class="text-danger">no</span> Product lacks a brand, GTIN, or MPN (see requirements to the right). If set to <span class="text-danger">no</span>, still provide the UPIs you have.');
        $("#product_brand_help").html(strategy_data);
        identifier_exists = strategy_data;
    }
    
    
}
const brand_strategy = document.querySelector('#brand_strategy');
brand_strategy.addEventListener('change', (event) => {
    //$("#product_availability").val() = '';
    product_brand_strategy = event.target.value;
    var i_e = '';

    if (product_brand_strategy == 'brand') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html("Provide the brand name of the product generally recognized by consumers. Only provide your store name as the brand in case you manufacture the product, or your product falls into a generic brand category. For example, you could submit your store name as the brand if you sell white label products or customized jewelry. If the product doesn’t have a brand, submit the manufacturer or supplier name under the brand attribute. Don't submit values such as N/A, Generic, No brand, or Does not exist. For compatible products: Submit the GTIN and brand from the manufacturer who actually built the compatible product. Don't provide the Original Equipment Manufacturer (OEM) brand to indicate that your product is compatible with or a replica of the OEM brand's product");      
        
        $("#product_data_brand_help").html(' <span class="text-danger">Required(For all new products, except movies, books, and musical recording brands)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s brand name. Example<span class="text-danger">Oramla</span>. Syntax Max 70 characters. Schema.org property<span class="text-info">Product.brand</span>');
        i_e = 'i.e <span class="text-danger">Oramla</span>';
        //var brand = strategy_data;
    } else if (product_brand_strategy == 'gtin') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html('Exclude dashes and spaces. Submit only valid GTINs as defined in the official GS1 validation guide, which includes these requirements: The checksum digit is present and correct. The GTIN is not restricted (GS1 prefix ranges 02, 04, 2). The GTIN is not a coupon (GS1 prefix ranges 98 - 99). For compatible products: Submit the GTIN and brand from the manufacturer who actually built the compatible product. Don’t provide the Original Equipment Manufacturer (OEM) brand to indicate that your product is compatible with or a replica of the OEM brand’s product. For <span class="text-info">multipacks</span>: Use the product identifiers that relates to the multipack. For <span class="text-info">bundles</span>: Use the product identifiers for the main product in the bundle. If you offer customization, engraving, or other personalization of a product that’s been assigned a GTIN by the manufacturer: Submit the GTIN and use the <span class="text-info">is ​bundle</span> attribute to let us know that the product includes customization');
       
        $("#product_data_brand_help").html('<span class="text-danger">Required (For all new products with a GTIN assigned by the manufacturer)</span>. <span class="text-warning">Optional (strongly recommended)</span> for all other products. Your product’s Global Trade Item Number (GTIN). Example <span class="text-danger">3234567890126</span>. Syntax Max 50 numeric characters (max 14 per value - added spaces and dashes are ignored). Supported values UPC (in North America / GTIN-12), <span class="text-primary">12-digit</span> number like 323456789012 8-digit UPC-E codes should be converted to <span class="text-primary">12-digit</span> codes EAN (in Europe / GTIN-13) 13-digit number like 3001234567892 JAN (in Japan / GTIN-13) 8 or 13-digit number like 49123456 or 4901234567894 ISBN (for books) 10 or <span class="text-primary">13-digit</span> number like 1455582344 or 978-1455582341. If you have both, only include the 13-digit number. ISBN-10 are deprecated and should be converted to <span class="text-primary">ISBN-13 ITF-14</span> (for multipacks / GTIN-14) <span class="text-primary">14-digit</span> number like 10856435001702. Schema.org property <span class="text-info">Product.isbn Product.gtin8 Product.gtin12 Product.gtin13 Product.gtin14</span>');
        i_e = 'i.e <span class="text-danger">3234567890126</span>';
        //var gtin = strategy_data;
    } else if (product_brand_strategy == 'MPN') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html('Only submit MPNs assigned by a manufacturer. Use the most specific MPN possible. For example, different colors of a product should have different MPNs.');
       
        $("#product_data_brand_help").html('<span class="text-danger">Required (Only if your new product does not have a manufacturer assigned GTIN)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s Manufacturer Part Number (mpn). Example <span class="text-danger">OR12345AMLA</span>. Syntax Max 70 alphanumeric characters. Schema.org property <span class="text-info">Product.mpn</span>');
        i_e = 'i.e <span class="text-danger">OR12345AMLA</span>';
        //var MPN = strategy_data;
    } else if (product_brand_strategy == 'identifier exists') {
        $("#product_data_brand_title").html(product_brand_strategy + ":");
        $("#brand_strategy_help").html('If you don’t submit the attribute, the default is <span class="text-danger">yes</span>. Your product’s category type determines which UPIs (GTIN, MPN, brand) are required. If your product is a media item and the GTIN is unavailable: Submit <span class="text-info">identifier exists</span> attribute with a value of <span class="text-danger">no</span>. Note: ISBN and SBN codes are accepted as GTINs. If your product is an apparel (clothing) item and the brand is unavailable: Submit <span class="text-info">identifier ​exists</span> attribute with a value of <span class="text-danger">no</span>. In all other categories, if your product doesn’t have a GTIN, or a combination of MPN and brand: Submit <span class="text-info">identifier exists</span> attribute with a value of <span class="text-danger">no</span>');
       
        $("#product_data_brand_help").html('<span class="text-warning">Optional</span>. Use to indicate whether or not the unique product identifiers (UPIs) GTIN, MPN, and brand are available for your product. Example <span class="text-danger">no</span>. Supported values <span class="text-danger">yes</span> Product identifiers are assigned to the new product by the manufacturer, <span class="text-danger">no</span> Product lacks a brand, GTIN, or MPN (see requirements to the right). If set to <span class="text-danger">no</span>, still provide the UPIs you have.');
        i_e = 'i.e <span class="text-danger">no</span>';
        //var identifier_exists = strategy_data;
    }
    
    if ($("#product_brand").val() != '' && $("#product_brand").val() != null) {
        $("#product_brand_help").html($("#product_brand").val());
        $("#product_brand").removeClass("is-invalid");
        $("#product_brand").addClass("is-valid"); 
        brand_strategy_data($("#product_brand").val());       
    } else {
        $("#product_brand_help").html("Input " + product_brand_strategy + " " + i_e);
        $("#product_brand").removeClass("is-valid");
        $("#product_brand").addClass("is-invalid");
    }    
});
const product_brand_input = document.querySelector('#product_brand');
product_brand_input.addEventListener('input', product_brand);
function product_brand(e) {
    if (e.target.value != "" && e.target.value != null) {
        $("#product_brand_help").html(e.target.value);
        $("#product_brand").removeClass("is-invalid");
        $("#product_brand").addClass("is-valid");
        brand_strategy_data(e.target.value);      
    } else {
        $("#product_brand_help").html("Input " + product_brand_strategy + "");
        $("#product_brand").removeClass("is-valid");
        $("#product_brand").addClass("is-invalid");
    }
}



var condition = '';// The condition of your product at time of sale
// <span class="text-danger">Required</span> if your product is <span class="text-danger">used</span> or <span class="text-danger">refurbished</span>. <span class="text-warning">Optional</span> for new products. Example <span class="text-danger">new</span>. Supported values <span class="text-danger">new</span>, <span class="text-danger">Brand new</span>, <span class="text-danger">original</span>, <span class="text-danger">unopened packaging</span>, <span class="text-danger">refurbished</span>, <span class="text-danger">Professionally restored to working order</span>, <span class="text-danger">comes with a warranty</span>, <span class="text-danger">may or may not have the original packaging</span>, <span class="text-danger">used</span>, <span class="text-danger">Previously used</span>, <span class="text-danger">original packaging opened or missing</span>. Schema.org property <span class="text-info">Offer.​itemCondition</span>

var adult = '';// Submit <span class="text-danger">yes</span> if this individual product contains nudity or sexually suggestive content. If you don’t submit the attribute, the default is <span class="text-danger">no</span>.
// <span class="text-danger">Required (If a product contains adult content)</span>. Indicate a product includes sexually suggestive content. Example <span class="text-danger">yes</span>. Supported values <span class="text-danger">yes</span> <span class="text-danger">no</span>

var multipack = '';// Submit this attribute if you defined a custom group of identical products and are selling them as a single unit of sale. For example, you’re selling 6 bars of soap together. Submit the number of products in your multipack. If you don’t submit the attribute, the default is <span class="text-danger">0</span>. If the product’s manufacturer assembled the multipack instead of you, don’t submit this attribute
// <span class="text-danger">Required (For multipack products in Australia, Brazil, Czechia, France, Germany, Italy, Japan, Netherlands, Spain, Switzerland, the UK and the US)</span>. <span class="text-danger">Required</span> for enhanced free listings on Oramla if you’ve created a multipack. <span class="text-warning">Optional</span> for all other products and countries of sale. The number of identical products sold within a merchant-defined multipack. Example <span class="text-danger">6</span>. Syntax <span class="text-info">Integer</span>

var is_bundle = '';// Submit <span class="text-danger">yes</span> if you’re selling a custom bundle of different products that you created, and the bundle includes a main product. For example, a camera combined with a lens and bag. If you don’t submit the attribute, the default is <span class="text-danger">no</span>. Don’t use this attribute for bundles without a clear main product. For example, a gift basket containing cheese and crackers
// <span class="text-danger">Required (For bundles in Australia, Brazil, Czechia, France, Germany, Italy, Japan, Netherlands, Spain, Switzerland, the UK and the US)</span>. <span class="text-danger">Required</span> for enhanced free listings on Oramla if you’ve created a bundle containing a main product. <span class="text-warning">Optional</span> for all other products and countries of sale. Indicates a product is a merchant-defined custom group of different products featuring one main product. Example <span class="text-danger">yes</span>. Supported values <span class="text-danger">yes</span>, <span class="text-danger">no</span>

var energy_efficiency_class = '';// Include the legally required energy label. To be used in combination with <span class="text-info">min energy ​​efficiency ​​class</span> and <span class="text-info">max energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">G</span>).
              // <span class="text-warning">Optional (except when required by local law or regulations)</span>. Your product’s energy label. Example <span class="text-danger">A+</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A+</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>

var min_energy_efficiency_class = '';// Include the legally required energy label. To be used in combination with <span class="text-info">energy ​​efficiency class</span> and <span class="text-info">max energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">D</span>).
                  // <span class="text-warning">Optional (except when required by local laws or regulations)</span>. Available for EU & CH only. Your product’s energy label. Example <span class="text-danger">A+++</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>

var max_energy_efficiency_class = '';// Include the legally required energy label. To be used in combination with <span class="text-info">energy ​​efficiency ​​class</span> and <span class="text-info">min energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">D</span>).
                  // <span class="text-warning">Optional (except when required by local laws or regulations)</span>. Available for EU & CH only. Your product’s energy label. Example <span class="text-danger">D</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>

var age_group = '';// Include one value per product. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">age ​group</span>
// <span class="text-danger">Required (For all apparel products that are targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all products with assigned age groups)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories (166) products. <span class="text-warning">Optional</span> for all other products and countries of sale. The demographic for which your product is intended. Example <span class="text-danger">infant</span>. Supported values <span class="text-danger">newborn</span> Up to 3 months old <span class="text-danger">infant</span> Between 3-12 months old <span class="text-danger">toddler</span> Between 1-5 years old <span class="text-danger">kids</span> Between 5-13 years old <span class="text-danger">adult</span> Typically teens or older. Schema.org property <span class="text-info">Product.​audience.​suggestedMinAge Product.​audience.​suggestedMaxAge</span>

var color = '';// Don’t use a number such as 0 2 4 6 8. Don’t use characters that aren’t alphanumeric such as #fff000. Don’t use only 1 letter such as R (For Chinese, Japanese, or Korean languages, you can include a single character such as 红). Don’t reference the product or image such as “see image”. Don’t combine several color names into 1 word, such as RedPinkBlue. Instead, separate them with a <span class="text-danger">/</span>, such as <span class="text-danger">Red/Pink/Blue</span>. Don’t use a value that isn’t a color, such as multicolor, various, variety, men’s, women’s, or N/A. If your product features multiple colors, list the primary color first. For variants. Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">color</span>
// <span class="text-danger">Required (For all apparel products in feeds that are targeted to Brazil, France, Germany, Japan, the UK, and the US as well as all products available in different colors)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories (166) products. <span class="text-warning">Optional</span> for all other products and countries of sale. Your product’s color(s). Example <span class="text-danger">Black</span>. Syntax Max 100 alphanumeric characters (max 40 characters per color). Schema.org property <span class="text-info">Product.color</span>


var gender = '';// For some Apparel & Accessories (166) categories like Shoelaces (1856), this attribute is recommended instead of required since these categories aren’t dependent on gender. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">gender</span>
// <span class="text-danger">Required (Required for all apparel items in feeds that are targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all gender-specific products)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Oramla Apparel & Accessories (166) products. <span class="text-danger">Optional</span> for all other products and countries of sale. The gender for which your product is intended. Example <span class="text-danger">Unisex</span>. Supported values <span class="text-danger">male</span>, <span class="text-danger">female</span>, <span class="text-danger">unisex</span>. Schema.org property <span class="text-info">Product.​audience.​suggested​Gender</span>

var material = '';// To indicate multiple materials for a single product (not variants), add a primary material, followed by up to 2 secondary materials, separated by a <span class="text-danger">/</span>. For example, instead of CottonPolyesterElastane, use <span class="text-danger">cotton/polyester/elastane</span>. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">material</span>
// <span class="text-danger">Required (if relevant for distinguishing different products in a set of variants)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s fabric or material. Example <span class="text-danger">leather</span>. Syntax Max 200 characters. Schema.org property <span class="text-danger">Product.material</span>

var pattern = '';// For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for pattern
// <span class="text-danger">Required (if relevant for distinguishing different products in a set of variants)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s pattern or graphic print. Example <span class="text-danger">striped</span>, <span class="text-danger">polka dot</span>, <span class="text-danger">paisley</span>. Syntax Max 100 characters. Schema.org property <span class="text-info">Product.pattern</span>

var size = '';// For variants: Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">size</span>. If sizes contain multiple dimensions, condense them into 1 value. For example, <span class="text-danger">"16/34 Tall"</span> for neck size <span class="text-danger">16 inches</span>, sleeve length <span class="text-danger">34 inches</span>, and <span class="text-danger">“Tall” fit</span>. If your item is one size fits all or one size fits most, you can use <span class="text-danger">one size</span>, <span class="text-danger">OS</span>, <span class="text-danger">one size fits all</span>, <span class="text-danger">OSFA</span>, <span class="text-danger">one size fits most</span>, or <span class="text-danger">OSFM</span>. For merchant-defined multipack products, submit the <span class="text-info">multipack</span> quantity using the <span class="text-info">multipack</span> attribute. Do not submit the multipack quantity under size.
// <span class="text-danger">Required (Required for all apparel products in Apparel & Accessories > Clothing (1604) and Apparel & Accessories > Shoes (187) product categories targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all products available in different sizes)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories > Clothing (1604) and Apparel & Accessories > Shoes (187) products. <span class="text-warning">Optional</span> for all other products and countries of sale. Your product’s size. Example <span class="text-danger">XL</span>. Syntax Max 100 characters. Schema.org property <span class="text-info">Product.size</span>

var size_system = '';// If you don’t submit the attribute, the default is your country of sale
  // <span class="text-warning">Optional (Available for apparel products only)</span>. The country of the size system used by your product. Example <span class="text-danger">US</span>. Supported values <span class="text-danger">US</span>, <span class="text-danger">UK</span>, <span class="text-danger">EU</span>, <span class="text-danger">DE</span>, <span class="text-danger">FR</span>, <span class="text-danger">JP</span>, <span class="text-danger">CN (China)</span>, <span class="text-danger">IT</span>, <span class="text-danger">BR</span>, <span class="text-danger">MEX</span>, <span class="text-danger">AU</span>...

var item_group_id = '';// Use a unique value for each group of variants. Use the parent SKU where possible. Keep the value the same when updating your product data. Use only valid unicode characters. Use an item group ID for a set of products that differ by one or more of these attributes: <span class="text-info">color</span>, <span class="text-info">size</span>, <span class="text-info">pattern</span>, <span class="text-info">material</span>, <span class="text-info">age group</span>, <span class="text-info">gender</span>. Include the same attributes for each product in the item group. For example, if a product varies by size and color, submit size and color for every product that share the same value for <span class="text-info">item ​group ​id</span>. If your products differ by design elements that aren’t represented by the attributes above, don’t use <span class="text-info">item ​group ​id</span>
    // <span class="text-danger">Required (Tanzania, South Africa, Nigeria, Morocco, the United Kingdom, and Kenya if the product is a variant)</span>. <span class="text-danger">Required</span> for enhanced free listings for all product variants. <span class="text-warning">Optional</span> for all other products and countries of sale. ID for a group of products that come in different versions (variants). Example <span class="text-danger">AB12345</span>. Syntax Max 50 alphanumeric characters. Schema.org property <span class="text-info">Product.​inProductGroupWithID</span>

var product_detail = '';// Don’t add information covered in other attributes, all capital letters, gimmicky foreign characters, promotion text, or list keywords or search terms. Don’t add information such as price, sale price, sale dates, shipping, delivery date, other time-related information, or your company’s name. Only provide an attribute name and value when the value is confirmed. For example, provide <span class="text-primary">“Vegetarian=False”</span> if a food product is not vegetarian, and not just because False is the default value for Boolean attributes.
     // <span class="text-warning">Optional</span>. Technical specifications or additional details of your product. Example <span class="text-danger">General:Product</span>, <span class="text-danger">Type:Digital player</span>. Syntax <span class="text-info">product detail</span> uses 3 sub-attributes: <span class="text-danger">section name</span>: Max 140 characters, <span class="text-danger">attribute name</span>: Max 140 characters <span class="text-danger">attribute value</span>: Max 1000 characters

var product_highlight = '';// Use between 2 and 10 product highlights. Describe only the product itself. Don't list keywords or search terms .Don’t include promotional text, all capital letters, or gimmicky foreign characters
        // <span class="text-warning">Optional</span>. The most relevant highlights of your products. Example <span class="text-danger">Supports thousands of apps</span>, <span class="text-danger">including Netflix</span>, <span class="text-danger">YouTube</span>, and <span class="text-danger">HBO Max</span>. Syntax Max 150 characters

var product_condition_strategy = 'condition';
function condition_strategy_data(strategy_data) {
    if (product_condition_strategy == 'condition') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('The condition of your product at time of sale');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required</span> if your product is <span class="text-danger">used</span> or <span class="text-danger">refurbished</span>. <span class="text-warning">Optional</span> for new products. Example <span class="text-danger">new</span>. Supported values <span class="text-danger">new</span>, <span class="text-danger">Brand new</span>, <span class="text-danger">original</span>, <span class="text-danger">unopened packaging</span>, <span class="text-danger">refurbished</span>, <span class="text-danger">Professionally restored to working order</span>, <span class="text-danger">comes with a warranty</span>, <span class="text-danger">may or may not have the original packaging</span>, <span class="text-danger">used</span>, <span class="text-danger">Previously used</span>, <span class="text-danger">original packaging opened or missing</span>. Schema.org property <span class="text-info">Offer.​itemCondition</span>');
        $("#product_condition_help").html(strategy_data);
        condition = strategy_data;
    } else if (product_condition_strategy == 'adult') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Submit <span class="text-danger">yes</span> if this individual product contains nudity or sexually suggestive content. If you don’t submit the attribute, the default is <span class="text-danger">no</span>.');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (If a product contains adult content)</span>. Indicate a product includes sexually suggestive content. Example <span class="text-danger">yes</span>. Supported values <span class="text-danger">yes</span> <span class="text-danger">no</span>');
        $("#product_condition_help").html(strategy_data);
        adult = strategy_data;
    } else if (product_condition_strategy == 'multipack') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Submit this attribute if you defined a custom group of identical products and are selling them as a single unit of sale. For example, you’re selling 6 bars of soap together. Submit the number of products in your multipack. If you don’t submit the attribute, the default is <span class="text-danger">0</span>. If the product’s manufacturer assembled the multipack instead of you, don’t submit this attribute');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For multipack products in Australia, Brazil, Czechia, France, Germany, Italy, Japan, Netherlands, Spain, Switzerland, the UK and the US)</span>. <span class="text-danger">Required</span> for enhanced free listings on Oramla if you’ve created a multipack. <span class="text-warning">Optional</span> for all other products and countries of sale. The number of identical products sold within a merchant-defined multipack. Example <span class="text-danger">6</span>. Syntax <span class="text-info">Integer</span>');
        $("#product_condition_help").html(strategy_data);
        multipack = strategy_data;
    } else if (product_condition_strategy == 'is bundle') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Submit <span class="text-danger">yes</span> if you’re selling a custom bundle of different products that you created, and the bundle includes a main product. For example, a camera combined with a lens and bag. If you don’t submit the attribute, the default is <span class="text-danger">no</span>. Don’t use this attribute for bundles without a clear main product. For example, a gift basket containing cheese and crackers');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For bundles in Australia, Brazil, Czechia, France, Germany, Italy, Japan, Netherlands, Spain, Switzerland, the UK and the US)</span>. <span class="text-danger">Required</span> for enhanced free listings on Oramla if you’ve created a bundle containing a main product. <span class="text-warning">Optional</span> for all other products and countries of sale. Indicates a product is a merchant-defined custom group of different products featuring one main product. Example <span class="text-danger">yes</span>. Supported values <span class="text-danger">yes</span>, <span class="text-danger">no</span>');
        $("#product_condition_help").html(strategy_data);
        is_bundle = strategy_data;
    } else if (product_condition_strategy == 'energy efficiency class') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include the legally required energy label. To be used in combination with <span class="text-info">min energy ​​efficiency ​​class</span> and <span class="text-info">max energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">G</span>).');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (except when required by local law or regulations)</span>. Your product’s energy label. Example <span class="text-danger">A+</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A+</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>');
        $("#product_condition_help").html(strategy_data);
        energy_efficiency_class = strategy_data;
    } else if (product_condition_strategy == 'min energy efficiency class') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include the legally required energy label. To be used in combination with <span class="text-info">energy ​​efficiency class</span> and <span class="text-info">max energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">D</span>).');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. Available for EU & CH only. Your product’s energy label. Example <span class="text-danger">A+++</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>');
        $("#product_condition_help").html(strategy_data);
        min_energy_efficiency_class = strategy_data;
    } else if (product_condition_strategy == 'max energy efficiency class') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include the legally required energy label. To be used in combination with <span class="text-info">energy ​​efficiency ​​class</span> and <span class="text-info">min energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">D</span>).');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. Available for EU & CH only. Your product’s energy label. Example <span class="text-danger">D</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>');
        $("#product_condition_help").html(strategy_data);
        max_energy_efficiency_class = strategy_data;
    } else if (product_condition_strategy == 'age group') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include one value per product. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">age ​group</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For all apparel products that are targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all products with assigned age groups)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories (166) products. <span class="text-warning">Optional</span> for all other products and countries of sale. The demographic for which your product is intended. Example <span class="text-danger">infant</span>. Supported values <span class="text-danger">newborn</span> Up to 3 months old <span class="text-danger">infant</span> Between 3-12 months old <span class="text-danger">toddler</span> Between 1-5 years old <span class="text-danger">kids</span> Between 5-13 years old <span class="text-danger">adult</span> Typically teens or older. Schema.org property <span class="text-info">Product.​audience.​suggestedMinAge Product.​audience.​suggestedMaxAge</span>');
        $("#product_condition_help").html(strategy_data);
        age_group = strategy_data;
    } else if (product_condition_strategy == 'color') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Don’t use a number such as 0 2 4 6 8. Don’t use characters that aren’t alphanumeric such as #fff000. Don’t use only 1 letter such as R (For Chinese, Japanese, or Korean languages, you can include a single character such as 红). Don’t reference the product or image such as “see image”. Don’t combine several color names into 1 word, such as RedPinkBlue. Instead, separate them with a <span class="text-danger">/</span>, such as <span class="text-danger">Red/Pink/Blue</span>. Don’t use a value that isn’t a color, such as multicolor, various, variety, men’s, women’s, or N/A. If your product features multiple colors, list the primary color first. For variants. Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">color</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For all apparel products in feeds that are targeted to Brazil, France, Germany, Japan, the UK, and the US as well as all products available in different colors)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories (166) products. <span class="text-warning">Optional</span> for all other products and countries of sale. Your product’s color(s). Example <span class="text-danger">Black</span>. Syntax Max 100 alphanumeric characters (max 40 characters per color). Schema.org property <span class="text-info">Product.color</span>');
        $("#product_condition_help").html(strategy_data);
        color = strategy_data;
    } else if (product_condition_strategy == 'gender') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('For some Apparel & Accessories (166) categories like Shoelaces (1856), this attribute is recommended instead of required since these categories aren’t dependent on gender. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">gender</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (Required for all apparel items in feeds that are targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all gender-specific products)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Oramla Apparel & Accessories (166) products. <span class="text-danger">Optional</span> for all other products and countries of sale. The gender for which your product is intended. Example <span class="text-danger">Unisex</span>. Supported values <span class="text-danger">male</span>, <span class="text-danger">female</span>, <span class="text-danger">unisex</span>. Schema.org property <span class="text-info">Product.​audience.​suggested​Gender</span>');
        $("#product_condition_help").html(strategy_data);
        gender = strategy_data;
    } else if (product_condition_strategy == 'material') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('To indicate multiple materials for a single product (not variants), add a primary material, followed by up to 2 secondary materials, separated by a <span class="text-danger">/</span>. For example, instead of CottonPolyesterElastane, use <span class="text-danger">cotton/polyester/elastane</span>. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">material</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (if relevant for distinguishing different products in a set of variants)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s fabric or material. Example <span class="text-danger">leather</span>. Syntax Max 200 characters. Schema.org property <span class="text-danger">Product.material</span>');
        $("#product_condition_help").html(strategy_data);
        material = strategy_data;
    } else if (product_condition_strategy == 'pattern') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for pattern');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (if relevant for distinguishing different products in a set of variants)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s pattern or graphic print. Example <span class="text-danger">striped</span>, <span class="text-danger">polka dot</span>, <span class="text-danger">paisley</span>. Syntax Max 100 characters. Schema.org property <span class="text-info">Product.pattern</span>');
        $("#product_condition_help").html(strategy_data);
        pattern = strategy_data;
    } else if (product_condition_strategy == 'size') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('For variants: Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">size</span>. If sizes contain multiple dimensions, condense them into 1 value. For example, <span class="text-danger">"16/34 Tall"</span> for neck size <span class="text-danger">16 inches</span>, sleeve length <span class="text-danger">34 inches</span>, and <span class="text-danger">“Tall” fit</span>. If your item is one size fits all or one size fits most, you can use <span class="text-danger">one size</span>, <span class="text-danger">OS</span>, <span class="text-danger">one size fits all</span>, <span class="text-danger">OSFA</span>, <span class="text-danger">one size fits most</span>, or <span class="text-danger">OSFM</span>. For merchant-defined multipack products, submit the <span class="text-info">multipack</span> quantity using the <span class="text-info">multipack</span> attribute. Do not submit the multipack quantity under size.');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (Required for all apparel products in Apparel & Accessories > Clothing (1604) and Apparel & Accessories > Shoes (187) product categories targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all products available in different sizes)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories > Clothing (1604) and Apparel & Accessories > Shoes (187) products. <span class="text-warning">Optional</span> for all other products and countries of sale. Your product’s size. Example <span class="text-danger">XL</span>. Syntax Max 100 characters. Schema.org property <span class="text-info">Product.size</span>');
        $("#product_condition_help").html(strategy_data);
        size = strategy_data;
    } else if (product_condition_strategy == 'size system') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('If you don’t submit the attribute, the default is your country of sale');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (Available for apparel products only)</span>. The country of the size system used by your product. Example <span class="text-danger">US</span>. Supported values <span class="text-danger">US</span>, <span class="text-danger">UK</span>, <span class="text-danger">EU</span>, <span class="text-danger">DE</span>, <span class="text-danger">FR</span>, <span class="text-danger">JP</span>, <span class="text-danger">CN (China)</span>, <span class="text-danger">IT</span>, <span class="text-danger">BR</span>, <span class="text-danger">MEX</span>, <span class="text-danger">AU</span>...');
        $("#product_condition_help").html(strategy_data);
        size_system = strategy_data;
    } else if (product_condition_strategy == 'item group id') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Use a unique value for each group of variants. Use the parent SKU where possible. Keep the value the same when updating your product data. Use only valid unicode characters. Use an item group ID for a set of products that differ by one or more of these attributes: <span class="text-info">color</span>, <span class="text-info">size</span>, <span class="text-info">pattern</span>, <span class="text-info">material</span>, <span class="text-info">age group</span>, <span class="text-info">gender</span>. Include the same attributes for each product in the item group. For example, if a product varies by size and color, submit size and color for every product that share the same value for <span class="text-info">item ​group ​id</span>. If your products differ by design elements that aren’t represented by the attributes above, don’t use <span class="text-info">item ​group ​id</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (Tanzania, South Africa, Nigeria, Morocco, the United Kingdom, and Kenya if the product is a variant)</span>. <span class="text-danger">Required</span> for enhanced free listings for all product variants. <span class="text-warning">Optional</span> for all other products and countries of sale. ID for a group of products that come in different versions (variants). Example <span class="text-danger">AB12345</span>. Syntax Max 50 alphanumeric characters. Schema.org property <span class="text-info">Product.​inProductGroupWithID</span>');
        $("#product_condition_help").html(strategy_data);
        item_group_id = strategy_data;
    } else if (product_condition_strategy == 'product detail') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Don’t add information covered in other attributes, all capital letters, gimmicky foreign characters, promotion text, or list keywords or search terms. Don’t add information such as price, sale price, sale dates, shipping, delivery date, other time-related information, or your company’s name. Only provide an attribute name and value when the value is confirmed. For example, provide <span class="text-primary">“Vegetarian=False”</span> if a food product is not vegetarian, and not just because False is the default value for Boolean attributes.');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional</span>. Technical specifications or additional details of your product. Example <span class="text-danger">General:Product</span>, <span class="text-danger">Type:Digital player</span>. Syntax <span class="text-info">product detail</span> uses 3 sub-attributes: <span class="text-danger">section name</span>: Max 140 characters, <span class="text-danger">attribute name</span>: Max 140 characters <span class="text-danger">attribute value</span>: Max 1000 characters');
        $("#product_condition_help").html(strategy_data);
        product_detail = strategy_data;
    } else if (product_condition_strategy == 'product highlight') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Use between 2 and 10 product highlights. Describe only the product itself. Don’t list keywords or search terms .Don’t include promotional text, all capital letters, or gimmicky foreign characters');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional</span>. The most relevant highlights of your products. Example <span class="text-danger">Supports thousands of apps</span>, <span class="text-danger">including Netflix</span>, <span class="text-danger">YouTube</span>, and <span class="text-danger">HBO Max</span>. Syntax Max 150 characters');
        $("#product_condition_help").html(strategy_data);
        product_highlight = strategy_data;
    } 

}
const condition_strategy = document.querySelector('#condition_strategy');
condition_strategy.addEventListener('change', (event) => {
    product_condition_strategy = event.target.value;
    var i_e = '';

    if (product_condition_strategy == 'condition') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('The condition of your product at time of sale');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required</span> if your product is <span class="text-danger">used</span> or <span class="text-danger">refurbished</span>. <span class="text-warning">Optional</span> for new products. Example <span class="text-danger">new</span>. Supported values <span class="text-danger">new</span>, <span class="text-danger">Brand new</span>, <span class="text-danger">original</span>, <span class="text-danger">unopened packaging</span>, <span class="text-danger">refurbished</span>, <span class="text-danger">Professionally restored to working order</span>, <span class="text-danger">comes with a warranty</span>, <span class="text-danger">may or may not have the original packaging</span>, <span class="text-danger">used</span>, <span class="text-danger">Previously used</span>, <span class="text-danger">original packaging opened or missing</span>. Schema.org property <span class="text-info">Offer.​itemCondition</span>');
        i_e = 'i.e <span class="text-danger">new</span>';
        //var brand = strategy_data;
    } else if (product_condition_strategy == 'adult') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Submit <span class="text-danger">yes</span> if this individual product contains nudity or sexually suggestive content. If you don’t submit the attribute, the default is <span class="text-danger">no</span>.');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (If a product contains adult content)</span>. Indicate a product includes sexually suggestive content. Example <span class="text-danger">yes</span>. Supported values <span class="text-danger">yes</span> <span class="text-danger">no</span>');
        i_e = 'i.e <span class="text-danger">yes</span>';
        //var adult = strategy_data;
    } else if (product_condition_strategy == 'multipack') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Submit this attribute if you defined a custom group of identical products and are selling them as a single unit of sale. For example, you’re selling 6 bars of soap together. Submit the number of products in your multipack. If you don’t submit the attribute, the default is <span class="text-danger">0</span>. If the product’s manufacturer assembled the multipack instead of you, don’t submit this attribute');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For multipack products in Australia, Brazil, Czechia, France, Germany, Italy, Japan, Netherlands, Spain, Switzerland, the UK and the US)</span>. <span class="text-danger">Required</span> for enhanced free listings on Oramla if you’ve created a multipack. <span class="text-warning">Optional</span> for all other products and countries of sale. The number of identical products sold within a merchant-defined multipack. Example <span class="text-danger">6</span>. Syntax <span class="text-info">Integer</span>');
        i_e = 'i.e <span class="text-danger">6</span>';
        //var multipack = strategy_data;
    } else if (product_condition_strategy == 'is bundle') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Submit <span class="text-danger">yes</span> if you’re selling a custom bundle of different products that you created, and the bundle includes a main product. For example, a camera combined with a lens and bag. If you don’t submit the attribute, the default is <span class="text-danger">no</span>. Don’t use this attribute for bundles without a clear main product. For example, a gift basket containing cheese and crackers');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For bundles in Australia, Brazil, Czechia, France, Germany, Italy, Japan, Netherlands, Spain, Switzerland, the UK and the US)</span>. <span class="text-danger">Required</span> for enhanced free listings on Oramla if you’ve created a bundle containing a main product. <span class="text-warning">Optional</span> for all other products and countries of sale. Indicates a product is a merchant-defined custom group of different products featuring one main product. Example <span class="text-danger">yes</span>. Supported values <span class="text-danger">yes</span>, <span class="text-danger">no</span>');
        i_e = 'i.e <span class="text-danger">yes</span>';
        //var is_bundle = strategy_data;
    } else if (product_condition_strategy == 'energy efficiency class') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include the legally required energy label. To be used in combination with <span class="text-info">min energy ​​efficiency ​​class</span> and <span class="text-info">max energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">G</span>).');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (except when required by local law or regulations)</span>. Your product’s energy label. Example <span class="text-danger">A+</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A+</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>');
        i_e = 'i.e <span class="text-danger">A+</span>';
        //var energy_efficiency_class = strategy_data;
    } else if (product_condition_strategy == 'min energy efficiency class') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include the legally required energy label. To be used in combination with <span class="text-info">energy ​​efficiency class</span> and <span class="text-info">max energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">D</span>).');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. Available for EU & CH only. Your product’s energy label. Example <span class="text-danger">A+++</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>');
        i_e = 'i.e <span class="text-danger">A+++</span>';
        //var min_energy_efficiency_class = strategy_data;
    } else if (product_condition_strategy == 'max energy efficiency class') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include the legally required energy label. To be used in combination with <span class="text-info">energy ​​efficiency ​​class</span> and <span class="text-info">min energy efficiency class</span> to create an energy efficiency label, for example, <span class="text-danger">A+</span> (<span class="text-danger">A+++</span> to <span class="text-danger">D</span>).');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (except when required by local laws or regulations)</span>. Available for EU & CH only. Your product’s energy label. Example <span class="text-danger">D</span>. Supported values <span class="text-danger">A+++</span>, <span class="text-danger">A++</span>, <span class="text-danger">A</span>, <span class="text-danger">B</span>, <span class="text-danger">C</span>, <span class="text-danger">D</span>, <span class="text-danger">E</span>, <span class="text-danger">F</span>, <span class="text-danger">G</span>');
        i_e = 'i.e <span class="text-danger">D</span>';
        //var max_energy_efficiency_class = strategy_data;
    } else if (product_condition_strategy == 'age group') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Include one value per product. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">age ​group</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For all apparel products that are targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all products with assigned age groups)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories (166) products. <span class="text-warning">Optional</span> for all other products and countries of sale. The demographic for which your product is intended. Example <span class="text-danger">infant</span>. Supported values <span class="text-danger">newborn</span> Up to 3 months old <span class="text-danger">infant</span> Between 3-12 months old <span class="text-danger">toddler</span> Between 1-5 years old <span class="text-danger">kids</span> Between 5-13 years old <span class="text-danger">adult</span> Typically teens or older. Schema.org property <span class="text-info">Product.​audience.​suggestedMinAge Product.​audience.​suggestedMaxAge</span>');
        i_e = 'i.e <span class="text-danger">infant</span>';
        //var age_group = strategy_data;
    } else if (product_condition_strategy == 'color') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Don’t use a number such as 0 2 4 6 8. Don’t use characters that aren’t alphanumeric such as #fff000. Don’t use only 1 letter such as R (For Chinese, Japanese, or Korean languages, you can include a single character such as 红). Don’t reference the product or image such as “see image”. Don’t combine several color names into 1 word, such as RedPinkBlue. Instead, separate them with a <span class="text-danger">/</span>, such as <span class="text-danger">Red/Pink/Blue</span>. Don’t use a value that isn’t a color, such as multicolor, various, variety, men’s, women’s, or N/A. If your product features multiple colors, list the primary color first. For variants. Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">color</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (For all apparel products in feeds that are targeted to Brazil, France, Germany, Japan, the UK, and the US as well as all products available in different colors)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories (166) products. <span class="text-warning">Optional</span> for all other products and countries of sale. Your product’s color(s). Example <span class="text-danger">Black</span>. Syntax Max 100 alphanumeric characters (max 40 characters per color). Schema.org property <span class="text-info">Product.color</span>');
        i_e = 'i.e <span class="text-danger">Black</span>';
        //var color = strategy_data;
    } else if (product_condition_strategy == 'gender') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('For some Apparel & Accessories (166) categories like Shoelaces (1856), this attribute is recommended instead of required since these categories aren’t dependent on gender. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">gender</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (Required for all apparel items in feeds that are targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all gender-specific products)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Oramla Apparel & Accessories (166) products. <span class="text-danger">Optional</span> for all other products and countries of sale. The gender for which your product is intended. Example <span class="text-danger">Unisex</span>. Supported values <span class="text-danger">male</span>, <span class="text-danger">female</span>, <span class="text-danger">unisex</span>. Schema.org property <span class="text-info">Product.​audience.​suggested​Gender</span>');
        i_e = 'i.e <span class="text-danger">Unisex</span>';
        //var gender = strategy_data;
    } else if (product_condition_strategy == 'material') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('To indicate multiple materials for a single product (not variants), add a primary material, followed by up to 2 secondary materials, separated by a <span class="text-danger">/</span>. For example, instead of CottonPolyesterElastane, use <span class="text-danger">cotton/polyester/elastane</span>. For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">material</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (if relevant for distinguishing different products in a set of variants)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s fabric or material. Example <span class="text-danger">leather</span>. Syntax Max 200 characters. Schema.org property <span class="text-danger">Product.material</span>');
        i_e = 'i.e <span class="text-danger">leather</span>';
        //var material = strategy_data;
    } else if (product_condition_strategy == 'pattern') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('For variants Include with the same value for <span class="text-info">item ​group ​id</span> and different values for pattern');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (if relevant for distinguishing different products in a set of variants)</span>. <span class="text-warning">Optional</span> for all other products. Your product’s pattern or graphic print. Example <span class="text-danger">striped</span>, <span class="text-danger">polka dot</span>, <span class="text-danger">paisley</span>. Syntax Max 100 characters. Schema.org property <span class="text-info">Product.pattern</span>');
        i_e = 'i.e <span class="text-danger">striped</span>';
        //var condition = strategy_data;
    } else if (product_condition_strategy == 'size') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('For variants: Include with the same value for <span class="text-info">item ​group ​id</span> and different values for <span class="text-info">size</span>. If sizes contain multiple dimensions, condense them into 1 value. For example, <span class="text-danger">"16/34 Tall"</span> for neck size <span class="text-danger">16 inches</span>, sleeve length <span class="text-danger">34 inches</span>, and <span class="text-danger">“Tall” fit</span>. If your item is one size fits all or one size fits most, you can use <span class="text-danger">one size</span>, <span class="text-danger">OS</span>, <span class="text-danger">one size fits all</span>, <span class="text-danger">OSFA</span>, <span class="text-danger">one size fits most</span>, or <span class="text-danger">OSFM</span>. For merchant-defined multipack products, submit the <span class="text-info">multipack</span> quantity using the <span class="text-info">multipack</span> attribute. Do not submit the multipack quantity under size.');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (Required for all apparel products in Apparel & Accessories > Clothing (1604) and Apparel & Accessories > Shoes (187) product categories targeted to people in Brazil, France, Germany, Japan, the UK, and the US as well as all products available in different sizes)</span>. <span class="text-danger">Required</span> for enhanced free listings for all Apparel & Accessories > Clothing (1604) and Apparel & Accessories > Shoes (187) products. <span class="text-warning">Optional</span> for all other products and countries of sale. Your product’s size. Example <span class="text-danger">XL</span>. Syntax Max 100 characters. Schema.org property <span class="text-info">Product.size</span>');
        i_e = 'i.e <span class="text-danger">XL</span>';
        //var size = strategy_data;
    } else if (product_condition_strategy == 'size system') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('If you don’t submit the attribute, the default is your country of sale');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional (Available for apparel products only)</span>. The country of the size system used by your product. Example <span class="text-danger">US</span>. Supported values <span class="text-danger">US</span>, <span class="text-danger">UK</span>, <span class="text-danger">EU</span>, <span class="text-danger">DE</span>, <span class="text-danger">FR</span>, <span class="text-danger">JP</span>, <span class="text-danger">CN (China)</span>, <span class="text-danger">IT</span>, <span class="text-danger">BR</span>, <span class="text-danger">MEX</span>, <span class="text-danger">AU</span>...');
        i_e = 'i.e <span class="text-danger">US</span>';
        //var size_system = strategy_data;
    } else if (product_condition_strategy == 'item group id') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Use a unique value for each group of variants. Use the parent SKU where possible. Keep the value the same when updating your product data. Use only valid unicode characters. Use an item group ID for a set of products that differ by one or more of these attributes: <span class="text-info">color</span>, <span class="text-info">size</span>, <span class="text-info">pattern</span>, <span class="text-info">material</span>, <span class="text-info">age group</span>, <span class="text-info">gender</span>. Include the same attributes for each product in the item group. For example, if a product varies by size and color, submit size and color for every product that share the same value for <span class="text-info">item ​group ​id</span>. If your products differ by design elements that aren’t represented by the attributes above, don’t use <span class="text-info">item ​group ​id</span>');
       
        $("#product_data_condition_help").html('<span class="text-danger">Required (Tanzania, South Africa, Nigeria, Morocco, the United Kingdom, and Kenya if the product is a variant)</span>. <span class="text-danger">Required</span> for enhanced free listings for all product variants. <span class="text-warning">Optional</span> for all other products and countries of sale. ID for a group of products that come in different versions (variants). Example <span class="text-danger">AB12345</span>. Syntax Max 50 alphanumeric characters. Schema.org property <span class="text-info">Product.​inProductGroupWithID</span>');
        i_e = 'i.e <span class="text-danger">AB12345</span>';
        //var item_group_id = strategy_data;
    } else if (product_condition_strategy == 'product detail') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Don’t add information covered in other attributes, all capital letters, gimmicky foreign characters, promotion text, or list keywords or search terms. Don’t add information such as price, sale price, sale dates, shipping, delivery date, other time-related information, or your company’s name. Only provide an attribute name and value when the value is confirmed. For example, provide <span class="text-primary">“Vegetarian=False”</span> if a food product is not vegetarian, and not just because False is the default value for Boolean attributes.');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional</span>. Technical specifications or additional details of your product. Example <span class="text-danger">General:Product</span>, <span class="text-danger">Type:Digital player</span>. Syntax <span class="text-info">product detail</span> uses 3 sub-attributes: <span class="text-danger">section name</span>: Max 140 characters, <span class="text-danger">attribute name</span>: Max 140 characters <span class="text-danger">attribute value</span>: Max 1000 characters');
        i_e = 'i.e <span class="text-danger">General:Product</span>';
        //var product_detail = strategy_data;
    } else if (product_condition_strategy == 'product highlight') {
        $("#product_data_condition_title").html(product_condition_strategy + ":");
        $("#condition_strategy_help").html('Use between 2 and 10 product highlights. Describe only the product itself. Don’t list keywords or search terms .Don’t include promotional text, all capital letters, or gimmicky foreign characters');
       
        $("#product_data_condition_help").html('<span class="text-warning">Optional</span>. The most relevant highlights of your products. Example <span class="text-danger">Supports thousands of apps</span>, <span class="text-danger">including Netflix</span>, <span class="text-danger">YouTube</span>, and <span class="text-danger">HBO Max</span>. Syntax Max 150 characters');
        i_e = 'i.e <span class="text-danger">Supports thousands of apps</span>';
        //var product_highlight = strategy_data;
    }
    
    if ($("#product_condition").val() != '' && $("#product_condition").val() != null) {
        $("#product_condition_help").html($("#product_condition").val());
        $("#product_condition").removeClass("is-invalid");
        $("#product_condition").addClass("is-valid"); 
        condition_strategy_data($("#product_condition").val());       
    } else {
        $("#product_condition_help").html("Input " + product_condition_strategy + " " + i_e);
        $("#product_condition").removeClass("is-valid");
        $("#product_condition").addClass("is-invalid");
    }    
});
const product_condition_input = document.querySelector('#product_condition');
product_condition_input.addEventListener('input', product_condition);
function product_condition(e) {
    if (e.target.value != "" && e.target.value != null) {
        $("#product_condition_help").html(e.target.value);
        $("#product_condition").removeClass("is-invalid");
        $("#product_condition").addClass("is-valid");
        condition_strategy_data(e.target.value);      
    } else {
        $("#product_condition_help").html("Input " + product_condition_strategy + "");
        $("#product_condition").removeClass("is-valid");
        $("#product_condition").addClass("is-invalid");
    }
}



var excluded_destination = '';// <span class="text-warning">Optional</span>. A setting that you can use to exclude a product from participating in a specific type of advertising campaign
                   // Example <span class="text-danger">Shopping ads</span>. Supported values <span class="text-danger">Shopping ads</span>, <span class="text-danger">Buy on Oramla  Display ads</span>, <span class="text-danger">Local inventory ads</span>, <span class="text-danger">Free listings</span>, <span class="text-danger">Free local listings</span>

var included_destination = '';// <span class="text-warning">Optional</span>. A setting that you can use to include a product in a specific type of advertising campaign
                              // Example <span class="text-danger">Shopping ads</span>. Supported values <span class="text-danger">Shopping ads</span>, <span class="text-danger">Buy on Oramla listings</span>, <span class="text-danger">Display ads</span>, <span class="text-danger">Local inventory ads</span>, <span class="text-danger">Free listings</span>, <span class="text-danger">Free local listings</span>
                              
var shopping_ads_excluded_country = '';// <span class="text-warning">Optional</span>. A setting that allows you to exclude countries where your products are advertised on Shopping ads. Only available for <span class="text-primary">Shopping ads</span>  
                                       // Example <span class="text-danger">DE</span>. Syntax 2 characters. Must be an ISO_3166-1_alpha-2 country code.  
                                    

var product_destinations_strategy = 'excluded_​​destination';
function destinations_strategy_data(strategy_data) {
    //alert(product_destinations_strategy);
    if (product_destinations_strategy == 'excluded destination') {
        $("#product_data_destinations_title").html(product_destinations_strategy + ":");
        $("#destinations_strategy_help").html('<span class="text-warning">Optional</span>. A setting that you can use to exclude a product from participating in a specific type of advertising campaign');
       
        $("#product_data_destinations_help").html('Example <span class="text-danger">Shopping ads</span>. Supported values <span class="text-danger">Shopping ads</span>, <span class="text-danger">Buy on Oramla  Display ads</span>, <span class="text-danger">Local inventory ads</span>, <span class="text-danger">Free listings</span>, <span class="text-danger">Free local listings</span>');
        $("#product_destinations_help").html(strategy_data);
        excluded_destination = strategy_data;
    } else if (product_destinations_strategy == 'included destination') {
        $("#product_data_destinations_title").html(product_destinations_strategy + ":");
        $("#destinations_strategy_help").html(' <span class="text-warning">Optional</span>. A setting that you can use to include a product in a specific type of advertising campaign');
       
        $("#product_data_destinations_help").html('Example <span class="text-danger">Shopping ads</span>. Supported values <span class="text-danger">Shopping ads</span>, <span class="text-danger">Buy on Oramla listings</span>, <span class="text-danger">Display ads</span>, <span class="text-danger">Local inventory ads</span>, <span class="text-danger">Free listings</span>, <span class="text-danger">Free local listings</span>');
        $("#product_destinations_help").html(strategy_data);
        included_destination = strategy_data;
    } else if (product_destinations_strategy == 'shopping ads excluded country') {
        $("#product_data_destinations_title").html(product_destinations_strategy + ":");
        $("#destinations_strategy_help").html('<span class="text-warning">Optional</span>. A setting that allows you to exclude countries where your products are advertised on Shopping ads. Only available for <span class="text-primary">Shopping ads</span>');
       
        $("#product_data_destinations_help").html('Example <span class="text-danger">DE</span>. Syntax 2 characters. Must be an ISO_3166-1_alpha-2 country code.');
        $("#product_destinations_help").html(strategy_data);
        shopping_ads_excluded_country = strategy_data;
    } 

}
const destinations_strategy = document.querySelector('#destinations_strategy');
destinations_strategy.addEventListener('change', (event) => {
    product_destinations_strategy = event.target.value;
    var i_e = '';

    if (product_destinations_strategy == 'excluded destination') {
        $("#product_data_destinations_title").html(product_destinations_strategy + ":");
        $("#destinations_strategy_help").html('<span class="text-warning">Optional</span>. A setting that you can use to exclude a product from participating in a specific type of advertising campaign');
       
        $("#product_data_destinations_help").html('Example <span class="text-danger">Shopping ads</span>. Supported values <span class="text-danger">Shopping ads</span>, <span class="text-danger">Buy on Oramla  Display ads</span>, <span class="text-danger">Local inventory ads</span>, <span class="text-danger">Free listings</span>, <span class="text-danger">Free local listings</span>');
        i_e = 'i.e <span class="text-danger">Shopping ads</span>';
        //var excluded_destination = strategy_data;
    } else if (product_destinations_strategy == 'included destination') {
        $("#product_data_destinations_title").html(product_destinations_strategy + ":");
        $("#destinations_strategy_help").html(' <span class="text-warning">Optional</span>. A setting that you can use to include a product in a specific type of advertising campaign');
       
        $("#product_data_destinations_help").html('Example <span class="text-danger">Shopping ads</span>. Supported values <span class="text-danger">Shopping ads</span>, <span class="text-danger">Buy on Oramla listings</span>, <span class="text-danger">Display ads</span>, <span class="text-danger">Local inventory ads</span>, <span class="text-danger">Free listings</span>, <span class="text-danger">Free local listings</span>');
        i_e = 'i.e <span class="text-danger">Shopping ads</span>';
        //var included_destination = strategy_data;
    } else if (product_destinations_strategy == 'shopping ads excluded country') {
        $("#product_data_destinations_title").html(product_destinations_strategy + ":");
        $("#destinations_strategy_help").html('<span class="text-warning">Optional</span>. A setting that allows you to exclude countries where your products are advertised on Shopping ads. Only available for <span class="text-primary">Shopping ads</span>');
       
        $("#product_data_destinations_help").html('Example <span class="text-danger">DE</span>. Syntax 2 characters. Must be an ISO_3166-1_alpha-2 country code.');
        i_e = 'i.e <span class="text-danger">DE</span>';
        //var shopping_ads_excluded_country = strategy_data;
    }
    //alert($("#product_destinations").val());
    if ($("#product_destinations").val() != '' && $("#product_destinations").val() != null) {
        $("#product_destinations_help").html($("#product_destinations").val());
        $("#product_destinations").removeClass("is-invalid");
        $("#product_destinations").addClass("is-valid"); 
        destinations_strategy_data($("#product_destinations").val());       
    } else {
        $("#product_destinations_help").html("Input " + product_destinations_strategy + " " + i_e);
        $("#product_destinations").removeClass("is-valid");
        $("#product_destinations").addClass("is-invalid");
    }    
});
const product_destinations_input = document.querySelector('#product_destinations');
product_destinations_input.addEventListener('input', product_destinations);
function product_destinations(e) {
    //alert(e.target.value != "" && e.target.value != null);
    if (e.target.value != "" && e.target.value != null) {
        $("#product_destinations_help").html(e.target.value);
        $("#product_destinations").removeClass("is-invalid");
        $("#product_destinations").addClass("is-valid");
        destinations_strategy_data(e.target.value);      
    } else {
        $("#product_destinations_help").html("Input " + product_destinations_strategy + "");
        $("#product_destinations").removeClass("is-valid");
        $("#product_destinations").addClass("is-invalid");
    }
}



var shipping = '';// Shipping costs are required for enhanced free listings for all products in all countries of sale. Use this setting to override the Merchant Center account shipping settings for an individual product or to specify shipping cost, speed, or additional countries your product ships to.
                  // Your product’s shipping cost, shipping speeds, and the locations your product ships to. Supported prices <span class="text-danger">0–1000</span> USD (check for other currencies). Example <span class="text-danger">US:CA:Overnight:16.00 USD:1:1:2:3</span>. Syntax shipping uses the following sub-attributes: <span class="text-danger">country (required)</span> ISO 3166 country code, <span class="text-warning">region</span> or <span class="text-warning">postal ​code</span> or <span class="text-warning">location ​id</span> or <span class="text-warning">location group name (optional)</span>, <span class="text-warning">service (optional)</span>, <span class="text-warning">Service class</span> or <span class="text-warning">shipping speed</span>, <span class="text-warning">price (optional)</span>, <span class="text-primary">Fixed shipping cost</span>, including VAT if required, <span class="text-info">min handling time</span> (optional) and <span class="text-info">max handling time</span> (optional) to specify handling time, <span class="text-info">min transit time</span> (optional) and <span class="text-info">max transit time</span> (optional) to specify transit time

var shipping_label = '';// Use a value that you’ll recognize in your account shipping settings. The value won’t be shown to users. Examples: <span class="text-danger">Sameday</span>, <span class="text-danger">Oversize</span>, <span class="text-danger">Only FedEx</span>
                        // <span class="text-warning">Optional</span>. Label that you assign to a product to help assign correct shipping costs in Merchant Center account settings. Example <span class="text-danger">perishable</span>. Syntax Max 100 characters

var shipping_weight = '';// Submit this value if you set up account shipping settings for carrier-calculated rates or weight-based shipping services
                         // <span class="text-warning">Optional (Required for carrier-calculated rates, a table based on weight, or a rule based on weight in your account shipping settings)</span>. The weight of the product used to calculate the shipping cost. Supported <span class="text-info">weights</span> <span class="text-danger">0–2000</span> lbs for imperial, <span class="text-danger">0–1000</span> kgs for metric. Example <span class="text-danger">3 kg</span>. Syntax Number + unit. Supported units <span class="text-danger">lb</span>, <span class="text-danger">oz</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>,
                         
var shipping_length = '';// Submit this value if you set up account shipping settings for carrier-calculated rates. If you don’t provide shipping dimension attributes while using carrier-calculated rates, we won’t be able to calculate rates based on the dimensional weight of the item. If that’s the case, we’ll just calculate the rates based on the value you provided in <span class="text-info">shipping ​weight</span>. If you submit this attribute, submit all shipping dimension attributes: <span class="text-info">shipping ​length</span>, <span class="text-info">shipping ​width</span>, <span class="text-info">shipping ​height</span>. Use the same unit for all shipping dimension attributes that apply to a single product. Keep in mind that Oramla doesn’t automatically calculate additional shipping cost for oversized items. If your package would be considered large or oversized by your carrier, you should either use the shipping attribute to set shipping cost for an individual product or use the <span class="text-info">shipping ​label</span> attribute with account shipping settings to set the cost
                         // <span class="text-warning">Optional (Required for carrier-calculated rates in your account shipping settings)</span>. The length of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>

var shipping_width = '';// Meet the requirements for the <span class="text-info">shipping ​length</span> attribute
                        // <span class="text-warning">Optional (Required for carrier-calculated rates in your account shipping settings)</span>. The width of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>

var shipping_height = '';// Meet the requirements for the <span class="text-info">shipping ​length</span> attribute
                         // <span class="text-warning">Optional</span> (Required for carrier-calculated rates in your account shipping settings). The height of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>
                         
var ships_from_country = '';// Provide only the country from which you typically ship this product
                            // <span class="text-warning">Optional</span>. A setting that allows you to provide the country from which your product will typically ship. Example <span class="text-danger">DE</span>. 2 characters. Must be an ISO_3166-1_alpha-2 country code

var transit_time_label = '';// Use a value that you’ll recognize in your account shipping settings. The value won’t be shown to users. Examples: <span class="text-danger">Dog food</span>, <span class="text-danger">From Seattle</span>, <span class="text-danger">Heavy package</span>
                            // <span class="text-warning">Optional</span>. Label that you assign to a product to help assign different transit times in Merchant Center account settings. Example <span class="text-danger">From Seattle</span>. Syntax Max 100 characters

var max_handling_time = '';// Submit this attribute if you want to display the overall time it takes for a product to arrive at its destination. Submit the number of business days (as configured in Merchant Center). For products ready to be shipped the <span class="text-primary">same day</span>, submit <span class="text-danger">0</span>. For submitting a time range submit <span class="text-info">max handling time</span> in combination with <span class="text-info">min handling time</span>.
                           // <span class="text-warning">Optional</span>. The longest amount of time between when an order is placed for a product and when the product ships. Example <span class="text-danger">3</span>. Syntax Integer, greater than or equal to <span class="text-danger">0</span>

var min_handling_time = '';// Meet the requirements for the <span class="text-info">max handling time</span> attribute
                           // <span class="text-warning">Optional</span>. The shortest amount of time between when an order is placed for a product and when the product ships. Example <span class="text-danger">1</span>. Syntax Integer, greater than or equal to <span class="text-danger">0</span>
 


var product_shipping_strategy = 'shipping';
function shipping_strategy_data(strategy_data) {
    if (product_shipping_strategy == 'shipping') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Shipping costs are required for enhanced free listings for all products in all countries of sale. Use this setting to override the Merchant Center account shipping settings for an individual product or to specify shipping cost, speed, or additional countries your product ships to.');
       
        $("#product_data_shipping_help").html('Your product’s shipping cost, shipping speeds, and the locations your product ships to. Supported prices <span class="text-danger">0–1000</span> USD (check for other currencies). Example <span class="text-danger">US:CA:Overnight:16.00 USD:1:1:2:3</span>. Syntax shipping uses the following sub-attributes: <span class="text-danger">country (required)</span> ISO 3166 country code, <span class="text-warning">region</span> or <span class="text-warning">postal ​code</span> or <span class="text-warning">location ​id</span> or <span class="text-warning">location group name (optional)</span>, <span class="text-warning">service (optional)</span>, <span class="text-warning">Service class</span> or <span class="text-warning">shipping speed</span>, <span class="text-warning">price (optional)</span>, <span class="text-primary">Fixed shipping cost</span>, including VAT if required, <span class="text-info">min handling time</span> (optional) and <span class="text-info">max handling time</span> (optional) to specify handling time, <span class="text-info">min transit time</span> (optional) and <span class="text-info">max transit time</span> (optional) to specify transit time');
        $("#product_shipping_help").html(strategy_data);
        shipping = strategy_data;
    } else if (product_shipping_strategy == 'shipping label') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Use a value that you’ll recognize in your account shipping settings. The value won’t be shown to users. Examples: <span class="text-danger">Sameday</span>, <span class="text-danger">Oversize</span>, <span class="text-danger">Only FedEx</span>');
       
        $("#product_data_shipping_help").html(' <span class="text-warning">Optional</span>. Label that you assign to a product to help assign correct shipping costs in Merchant Center account settings. Example <span class="text-danger">perishable</span>. Syntax Max 100 characters');
        $("#product_shipping_help").html(strategy_data);
        shipping_label = strategy_data;
    } else if (product_shipping_strategy == 'shipping weight') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Submit this value if you set up account shipping settings for carrier-calculated rates or weight-based shipping services');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional (Required for carrier-calculated rates, a table based on weight, or a rule based on weight in your account shipping settings)</span>. The weight of the product used to calculate the shipping cost. Supported <span class="text-info">weights</span> <span class="text-danger">0–2000</span> lbs for imperial, <span class="text-danger">0–1000</span> kgs for metric. Example <span class="text-danger">3 kg</span>. Syntax Number + unit. Supported units <span class="text-danger">lb</span>, <span class="text-danger">oz</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>');
        $("#product_shipping_help").html(strategy_data);
        shipping_weight = strategy_data;
    } else if (product_shipping_strategy == 'shipping length') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Submit this value if you set up account shipping settings for carrier-calculated rates. If you don’t provide shipping dimension attributes while using carrier-calculated rates, we won’t be able to calculate rates based on the dimensional weight of the item. If that’s the case, we’ll just calculate the rates based on the value you provided in <span class="text-info">shipping ​weight</span>. If you submit this attribute, submit all shipping dimension attributes: <span class="text-info">shipping ​length</span>, <span class="text-info">shipping ​width</span>, <span class="text-info">shipping ​height</span>. Use the same unit for all shipping dimension attributes that apply to a single product. Keep in mind that Oramla doesn’t automatically calculate additional shipping cost for oversized items. If your package would be considered large or oversized by your carrier, you should either use the shipping attribute to set shipping cost for an individual product or use the <span class="text-info">shipping ​label</span> attribute with account shipping settings to set the cost');
       
        $("#product_data_shipping_help").html(' <span class="text-warning">Optional (Required for carrier-calculated rates in your account shipping settings)</span>. The length of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>');
        $("#product_shipping_help").html(strategy_data);
        shipping_length = strategy_data;
    } else if (product_shipping_strategy == 'shipping width') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Meet the requirements for the <span class="text-info">shipping ​length</span> attribute');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional (Required for carrier-calculated rates in your account shipping settings)</span>. The width of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>');
        $("#product_shipping_help").html(strategy_data);
        shipping_width = strategy_data;
    } else if (product_shipping_strategy == 'shipping height') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Meet the requirements for the <span class="text-info">shipping ​length</span> attribute');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span> (Required for carrier-calculated rates in your account shipping settings). The height of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>');
        $("#product_shipping_help").html(strategy_data);
        shipping_height = strategy_data;
    } else if (product_shipping_strategy == 'ships from country') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Provide only the country from which you typically ship this product');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span>. A setting that allows you to provide the country from which your product will typically ship. Example <span class="text-danger">DE</span>. 2 characters. Must be an ISO_3166-1_alpha-2 country code');
        $("#product_shipping_help").html(strategy_data);
        ships_from_country = strategy_data;
    } else if (product_shipping_strategy == 'transit time label') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Use a value that you’ll recognize in your account shipping settings. The value won’t be shown to users. Examples: <span class="text-danger">Dog food</span>, <span class="text-danger">From Seattle</span>, <span class="text-danger">Heavy package</span>');
       
        $("#product_data_shipping_help").html(' <span class="text-warning">Optional</span>. Label that you assign to a product to help assign different transit times in Merchant Center account settings. Example <span class="text-danger">From Seattle</span>. Syntax Max 100 characters');
        $("#product_shipping_help").html(strategy_data);
        transit_time_label = strategy_data;
    } else if (product_shipping_strategy == 'max handling time') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Submit this attribute if you want to display the overall time it takes for a product to arrive at its destination. Submit the number of business days (as configured in Merchant Center). For products ready to be shipped the <span class="text-primary">same day</span>, submit <span class="text-danger">0</span>. For submitting a time range submit <span class="text-info">max handling time</span> in combination with <span class="text-info">min handling time</span>.');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span>. The longest amount of time between when an order is placed for a product and when the product ships. Example <span class="text-danger">3</span>. Syntax Integer, greater than or equal to <span class="text-danger">0</span>');
        $("#product_shipping_help").html(strategy_data);
        max_handling_time = strategy_data;
    } else if (product_shipping_strategy == 'min handling time') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Meet the requirements for the <span class="text-info">max handling time</span> attribute');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span>. The shortest amount of time between when an order is placed for a product and when the product ships. Example <span class="text-danger">1</span>. Syntax Integer, greater than or equal to <span class="text-danger">0</span>');
        $("#product_shipping_help").html(strategy_data);
        min_handling_time = strategy_data;
    } 

}
const shipping_strategy = document.querySelector('#shipping_strategy');
shipping_strategy.addEventListener('change', (event) => {
    product_shipping_strategy = event.target.value;
    var i_e = '';

    if (product_shipping_strategy == 'shipping') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Shipping costs are required for enhanced free listings for all products in all countries of sale. Use this setting to override the Merchant Center account shipping settings for an individual product or to specify shipping cost, speed, or additional countries your product ships to.');
       
        $("#product_data_shipping_help").html('Your product’s shipping cost, shipping speeds, and the locations your product ships to. Supported prices <span class="text-danger">0–1000</span> USD (check for other currencies). Example <span class="text-danger">US:CA:Overnight:16.00 USD:1:1:2:3</span>. Syntax shipping uses the following sub-attributes: <span class="text-danger">country (required)</span> ISO 3166 country code, <span class="text-warning">region</span> or <span class="text-warning">postal ​code</span> or <span class="text-warning">location ​id</span> or <span class="text-warning">location group name (optional)</span>, <span class="text-warning">service (optional)</span>, <span class="text-warning">Service class</span> or <span class="text-warning">shipping speed</span>, <span class="text-warning">price (optional)</span>, <span class="text-primary">Fixed shipping cost</span>, including VAT if required, <span class="text-info">min handling time</span> (optional) and <span class="text-info">max handling time</span> (optional) to specify handling time, <span class="text-info">min transit time</span> (optional) and <span class="text-info">max transit time</span> (optional) to specify transit time');
        i_e = 'i.e <span class="text-danger">US:CA:Overnight:16.00 USD:1:1:2:3</span>';
        //var excluded_destination = strategy_data;
    } else if (product_shipping_strategy == 'shipping label') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Use a value that you’ll recognize in your account shipping settings. The value won’t be shown to users. Examples: <span class="text-danger">Sameday</span>, <span class="text-danger">Oversize</span>, <span class="text-danger">Only FedEx</span>');
       
        $("#product_data_shipping_help").html(' <span class="text-warning">Optional</span>. Label that you assign to a product to help assign correct shipping costs in Merchant Center account settings. Example <span class="text-danger">perishable</span>. Syntax Max 100 characters');
        i_e = 'i.e <span class="text-danger">perishable</span>';
        //var shipping_label = strategy_data;
    } else if (product_shipping_strategy == 'shipping weight') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Submit this value if you set up account shipping settings for carrier-calculated rates or weight-based shipping services');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional (Required for carrier-calculated rates, a table based on weight, or a rule based on weight in your account shipping settings)</span>. The weight of the product used to calculate the shipping cost. Supported <span class="text-info">weights</span> <span class="text-danger">0–2000</span> lbs for imperial, <span class="text-danger">0–1000</span> kgs for metric. Example <span class="text-danger">3 kg</span>. Syntax Number + unit. Supported units <span class="text-danger">lb</span>, <span class="text-danger">oz</span>, <span class="text-danger">g</span>, <span class="text-danger">kg</span>');
        i_e = 'i.e <span class="text-danger">3 kg</span>';
        //var shipping_weight = strategy_data;
    } else if (product_shipping_strategy == 'shipping length') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Submit this value if you set up account shipping settings for carrier-calculated rates. If you don’t provide shipping dimension attributes while using carrier-calculated rates, we won’t be able to calculate rates based on the dimensional weight of the item. If that’s the case, we’ll just calculate the rates based on the value you provided in <span class="text-info">shipping ​weight</span>. If you submit this attribute, submit all shipping dimension attributes: <span class="text-info">shipping ​length</span>, <span class="text-info">shipping ​width</span>, <span class="text-info">shipping ​height</span>. Use the same unit for all shipping dimension attributes that apply to a single product. Keep in mind that Oramla doesn’t automatically calculate additional shipping cost for oversized items. If your package would be considered large or oversized by your carrier, you should either use the shipping attribute to set shipping cost for an individual product or use the <span class="text-info">shipping ​label</span> attribute with account shipping settings to set the cost');
       
        $("#product_data_shipping_help").html(' <span class="text-warning">Optional (Required for carrier-calculated rates in your account shipping settings)</span>. The length of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>');
        i_e = 'i.e <span class="text-danger">20 in</span>';
        //var shipping_length = strategy_data;
    } else if (product_shipping_strategy == 'shipping width') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Meet the requirements for the <span class="text-info">shipping ​length</span> attribute');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional (Required for carrier-calculated rates in your account shipping settings)</span>. The width of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>');
        i_e = 'i.e <span class="text-danger">20 in</span>';
        //var shipping_width = strategy_data;
    } else if (product_shipping_strategy == 'shipping height') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Meet the requirements for the <span class="text-info">shipping ​length</span> attribute');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span> (Required for carrier-calculated rates in your account shipping settings). The height of the product used to calculate the shipping cost by dimensional weight. Example <span class="text-danger">20 in</span>. Syntax Number + unit. Supported values <span class="text-danger">1 - 150</span> for inches, <span class="text-danger">1 - 400</span> for cm. Supported units <span class="text-danger">in</span>, <span class="text-danger">cm</span>');
        i_e = 'i.e <span class="text-danger">20 in</span>';
        //var shipping_height = strategy_data;
    } else if (product_shipping_strategy == 'ships from country') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Provide only the country from which you typically ship this product');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span>. A setting that allows you to provide the country from which your product will typically ship. Example <span class="text-danger">DE</span>. 2 characters. Must be an ISO_3166-1_alpha-2 country code');
        i_e = 'i.e <span class="text-danger">DE</span>';
        //var ships_from_country = strategy_data;
    } else if (product_shipping_strategy == 'transit time label') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Use a value that you’ll recognize in your account shipping settings. The value won’t be shown to users. Examples: <span class="text-danger">Dog food</span>, <span class="text-danger">From Nairobi</span>, <span class="text-danger">Heavy package</span>');
       
        $("#product_data_shipping_help").html(' <span class="text-warning">Optional</span>. Label that you assign to a product to help assign different transit times in Merchant Center account settings. Example <span class="text-danger">From Nairobi</span>. Syntax Max 100 characters');
        i_e = 'i.e <span class="text-danger">From Nairobi</span>';
        //var transit_time_label = strategy_data;
    } else if (product_shipping_strategy == 'max handling time') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Submit this attribute if you want to display the overall time it takes for a product to arrive at its destination. Submit the number of business days (as configured in Merchant Center). For products ready to be shipped the <span class="text-primary">same day</span>, submit <span class="text-danger">0</span>. For submitting a time range submit <span class="text-info">max handling time</span> in combination with <span class="text-info">min handling time</span>.');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span>. The longest amount of time between when an order is placed for a product and when the product ships. Example <span class="text-danger">3</span>. Syntax Integer, greater than or equal to <span class="text-danger">0</span>');
        i_e = 'i.e <span class="text-danger">3</span>';
        //var max_handling_time = strategy_data;
    } else if (product_shipping_strategy == 'min handling time') {
        $("#product_data_shipping_title").html(product_shipping_strategy + ":");
        $("#shipping_strategy_help").html('Meet the requirements for the <span class="text-info">max handling time</span> attribute');
       
        $("#product_data_shipping_help").html('<span class="text-warning">Optional</span>. The shortest amount of time between when an order is placed for a product and when the product ships. Example <span class="text-danger">1</span>. Syntax Integer, greater than or equal to <span class="text-danger">0</span>');
        i_e = 'i.e <span class="text-danger">1</span>';
        //var min_handling_time = strategy_data;
    }
    //alert($("#product_destinations").val());
    if ($("#product_shipping").val() != '' && $("#product_shipping").val() != null) {
        $("#product_shipping_help").html($("#product_shipping").val());
        $("#product_shipping").removeClass("is-invalid");
        $("#product_shipping").addClass("is-valid"); 
        shipping_strategy_data($("#product_shipping").val());       
    } else {
        $("#product_shipping_help").html("Input " + product_shipping_strategy + " " + i_e);
        $("#product_shipping").removeClass("is-valid");
        $("#product_shipping").addClass("is-invalid");
    }    
});
const product_shipping_input = document.querySelector('#product_shipping');
product_shipping_input.addEventListener('input', product_shipping);
function product_shipping(e) {
    //alert(e.target.value != "" && e.target.value != null);
    if (e.target.value != "" && e.target.value != null) {
        $("#product_shipping_help").html(e.target.value);
        $("#product_shipping").removeClass("is-invalid");
        $("#product_shipping").addClass("is-valid");
        shipping_strategy_data(e.target.value);      
    } else {
        $("#product_shipping_help").html("Input " + product_shipping_strategy + "");
        $("#product_shipping").removeClass("is-valid");
        $("#product_shipping").addClass("is-invalid");
    }
}


var tax = ''; // Use this setting only to override the account tax settings for an individual product. We recommend that you submit tax information for all your products using the account settings in Merchant Center. For the Kenya and Tanzania. Don’t include tax in the price attribute. For the Kenya only, include the tax in the tax attribute if you need to override your account settings. For all other countries Include value added tax (VAT) or Goods and Services Tax (GST) in the price attribute and do not use the tax attribute 
              // <span class="text-danger">Required (Available for the KE only)</span>. Your product’s sales tax rate in percent. Example <span class="text-danger">US:CA:5.00:y</span>. Syntax tax uses 4 sub-attributes: <span class="text-danger">rate (required)</span> tax rate as a percentage, <span class="text-warning">country (optional)</span> ISO 3166 country code, <span class="text-warning">region</span> or <span class="text-warning">postal ​code</span> or <span class="text-warning">location id (optional)</span>, <span class="text-warning">tax ship (optional)</span>. Specify if you charge tax on shipping. Accepted values are <span class="text-danger">yes </span> or <span class="text-danger">no</span>

var tax_category = '';// Use this attribute if you have products that have a specific tax rate.
                      // <span class="text-warning">Optional (Recommended for custom tax rates at the account level)</span>. A category that classifies your product by specific tax rules. Example <span class="text-danger">apparel</span>. Syntax Max 100 characters




var product_tax_strategy = 'tax';
function tax_strategy_data(strategy_data) {
    if (product_tax_strategy == 'tax') {
        $("#product_data_tax_title").html(product_tax_strategy + ":");
        $("#tax_strategy_help").html('Use this setting only to override the account tax settings for an individual product. We recommend that you submit tax information for all your products using the account settings in Merchant Center. For the Kenya and Tanzania. Don’t include tax in the price attribute. For the Kenya only, include the tax in the tax attribute if you need to override your account settings. For all other countries Include value added tax (VAT) or Goods and Services Tax (GST) in the price attribute and do not use the tax attribute ');
       
        $("#product_data_tax_help").html('<span class="text-danger">Required (Available for the KE only)</span>. Your product’s sales tax rate in percent. Example <span class="text-danger">US:CA:5.00:y</span>. Syntax tax uses 4 sub-attributes: <span class="text-danger">rate (required)</span> tax rate as a percentage, <span class="text-warning">country (optional)</span> ISO 3166 country code, <span class="text-warning">region</span> or <span class="text-warning">postal ​code</span> or <span class="text-warning">location id (optional)</span>, <span class="text-warning">tax ship (optional)</span>. Specify if you charge tax on shipping. Accepted values are <span class="text-danger">yes </span> or <span class="text-danger">no</span>');
        $("#product_tax_help").html(strategy_data);
        tax = strategy_data;
    } else if (product_tax_strategy == 'tax category') {
        $("#product_data_tax_title").html(product_tax_strategy + ":");
        $("#tax_strategy_help").html('Use this attribute if you have products that have a specific tax rate.');
       
        $("#product_data_tax_help").html(' <span class="text-warning">Optional (Recommended for custom tax rates at the account level)</span>. A category that classifies your product by specific tax rules. Example <span class="text-danger">apparel</span>. Syntax Max 100 characters');
        $("#product_tax_help").html(strategy_data);
        tax_category = strategy_data;
    } 

}
const tax_strategy = document.querySelector('#tax_strategy');
tax_strategy.addEventListener('change', (event) => {
    product_tax_strategy = event.target.value;
    var i_e = '';

    if (product_tax_strategy == 'tax') {
        $("#product_data_tax_title").html(product_tax_strategy + ":");
        $("#tax_strategy_help").html('Use this setting only to override the account tax settings for an individual product. We recommend that you submit tax information for all your products using the account settings in Merchant Center. For the Kenya and Tanzania. Don’t include tax in the price attribute. For the Kenya only, include the tax in the tax attribute if you need to override your account settings. For all other countries Include value added tax (VAT) or Goods and Services Tax (GST) in the price attribute and do not use the tax attribute ');
       
        $("#product_data_tax_help").html('<span class="text-danger">Required (Available for the KE only)</span>. Your product’s sales tax rate in percent. Example <span class="text-danger">US:CA:5.00:y</span>. Syntax tax uses 4 sub-attributes: <span class="text-danger">rate (required)</span> tax rate as a percentage, <span class="text-warning">country (optional)</span> ISO 3166 country code, <span class="text-warning">region</span> or <span class="text-warning">postal ​code</span> or <span class="text-warning">location id (optional)</span>, <span class="text-warning">tax ship (optional)</span>. Specify if you charge tax on shipping. Accepted values are <span class="text-danger">yes </span> or <span class="text-danger">no</span>');
        i_e = 'i.e <span class="text-danger">US:CA:5.00:y</span>';
        //var tax = strategy_data;
    } else if (product_tax_strategy == 'tax category') {
        $("#product_data_tax_title").html(product_tax_strategy + ":");
        $("#tax_strategy_help").html('Use this attribute if you have products that have a specific tax rate.');
       
        $("#product_data_tax_help").html(' <span class="text-warning">Optional (Recommended for custom tax rates at the account level)</span>. A category that classifies your product by specific tax rules. Example <span class="text-danger">apparel</span>. Syntax Max 100 characters');
        i_e = 'i.e <span class="text-danger">apparel</span>';
        //var tax_category = strategy_data;
    }
    //alert($("#product_destinations").val());
    if ($("#product_tax").val() != '' && $("#product_tax").val() != null) {
        $("#product_tax_help").html($("#product_tax").val());
        $("#product_tax").removeClass("is-invalid");
        $("#product_tax").addClass("is-valid"); 
        tax_strategy_data($("#product_tax").val());       
    } else {
        $("#product_tax_help").html("Input " + product_tax_strategy + " " + i_e);
        $("#product_tax").removeClass("is-valid");
        $("#product_tax").addClass("is-invalid");
    }    
});
const product_tax_input = document.querySelector('#product_tax');
product_tax_input.addEventListener('input', product_tax);
function product_tax(e) {
    //alert(e.target.value != "" && e.target.value != null);
    if (e.target.value != "" && e.target.value != null) {
        $("#product_tax_help").html(e.target.value);
        $("#product_tax").removeClass("is-invalid");
        $("#product_tax").addClass("is-valid");
        tax_strategy_data(e.target.value);      
    } else {
        $("#product_tax_help").html("Input " + product_tax_strategy + "");
        $("#product_tax").removeClass("is-valid");
        $("#product_tax").addClass("is-invalid");
    }
}



const product_industry_input = document.querySelector('#product_industry');
product_industry_input.addEventListener('change', (event) => {
product_industry = event.target.value;
category_clicked = '';
if (product_industry != '' && product_industry != null) {
    $("#product_industry").removeClass("is-invalid");
    $("#product_industry").addClass("is-valid");
    $("#product_industry_help").html(event.target.value); 
 
    apps_categories(event.target.value);
} else {
    $("#product_industry").removeClass("is-valid");
    $("#product_industry").addClass("is-invalid");
}
});

const product_category_input = document.querySelector('#product_category');
product_category_input.addEventListener('change', (event) => {
product_category = event.target.value;
if (product_category != '' && product_category != null) {
    $("#product_category").removeClass("is-invalid");
    $("#product_category").addClass("is-valid"); 
    $("#product_category_help").html(event.target.value); 

} else {
    $("#product_category").removeClass("is-valid");
    $("#product_category").addClass("is-invalid");
}
});

const shipping_rates_input = document.querySelector('#shipping_rates');
shipping_rates_input.addEventListener('change', (event) => {
    shipping_rates = event.target.value;

});

const shipping_strategies_input = document.querySelector('#shipping_strategies');
shipping_strategies_input.addEventListener('change', (event) => {
    shipping_strategies = event.target.value;

});

var product_data =  '';


$('#list-shipping-list').on('click', function (e) {
  e.preventDefault()
  $("#productshipping").show(100);
  $("#productcondition").hide(100);
  $("#productbrand").hide(100);
  $("#productavailability").hide(100);
  $("#producttax").hide(100);
});
$('#list-condition-list').on('click', function (e) {
    e.preventDefault()
    $("#productshipping").hide(100);
    $("#productcondition").show(100);
    $("#productbrand").hide(100);
    $("#productavailability").hide(100);
    $("#producttax").hide(100);  
});
$('#list-brand-list').on('click', function (e) {
  e.preventDefault()
  $("#productshipping").hide(100);
  $("#productcondition").hide(100);
  $("#productbrand").show(100);
  $("#productavailability").hide(100);
  $("#producttax").hide(100);
});
$('#list-availability-list').on('click', function (e) {
  e.preventDefault()
  $("#productshipping").hide(100);
  $("#productcondition").hide(100);
  $("#productbrand").hide(100);
  $("#productavailability").show(100);
  $("#producttax").hide(100);
});
$('#list-tax-list').on('click', function (e) {
  e.preventDefault()
  $("#productshipping").hide(100);
  $("#productcondition").hide(100);
  $("#productbrand").hide(100);
  $("#productavailability").hide(100);
  $("#producttax").show(100);
});

$("#add_products_close").click(function(){
    $("#add_products_new").hide(100);
});
$("#product_footer_close").click(function(){
    $("#add_products_new").hide(100);
});
$("#pr_next").click(function(){
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
    startlimit = endlimit;
    endlimit = endlimit + 24;
    if (search_value != '') {
        search(search_value,startlimit,endlimit);
    } else if(geoshop_value != ''){
        geoshop(latitude,longitude,gradius,startlimit,endlimit);
    } else if(cat_id != ''){
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    } else if(brand_id != ''){
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    } else{
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    }
});

$("#pr_previous").click(function(){
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
    endlimit = startlimit;
    startlimit = startlimit - 24;
    if (search_value != '') {
        search(search_value,startlimit,endlimit);
    } else if(geoshop_value != ''){
        geoshop(latitude,longitude,gradius,startlimit,endlimit);
    } else if(cat_id != ''){
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    } else if(brand_id != ''){
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    } else{
        product_main_container(startlimit,endlimit,cat_id,brand_id);
    }
});

$("#s1").click(function(){
    //window.location.href="#product_container";
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

$('.carousel').carousel({
    touch: true
})

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
            messageauto = 1;
            //$("#chat").html('loading ...');
            contact(username,connect_from,connects_id,chat_message);
            if (messageauto == 1) {
                messageauto = 0; 
                $(".chat_main_container").show(100)
                $("#connects_contacts").hide(100,function(){       
                    $("#connects_messages").show(100); 
                    $("#menu_container_top_tab").hide(100);                
                    //$("#menu_container_bottom_tab").hide(100);
                    $("#center_top_id").hide(100);                
    
                });
                //$("#chat").html('loading ...');
            }
        } else {
            var connect_messages  = '<div class="message stark" connect_from="' + 'Mo-pal' + '" connect_messages_id="' + '1' + '">' + 'Please, Type your message' + '</div>';
            $(".picbar").attr("style", "background-image: url('" + IMAGE_url + "')");
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
        messageauto = 1;
        connects_datalengthnow = 0;
        //$("#chat").html('loading ...');
        contact(username,connect_from,connects_id,chat_message);
        if (messageauto == 1) {
            messageauto = 0; 
            $(".chat_main_container").show(100)
            $("#connects_contacts").hide(100,function(){       
                $("#connects_messages").show(100); 
                $("#menu_container_top_tab").hide(100);                
                //$("#menu_container_bottom_tab").hide(100);
                $("#center_top_id").hide(100);                

            });
            
        }
    } else {
        var connect_messages  = '<div class="message stark" connect_from="' + 'Mo-pal' + '" connect_messages_id="' + '1' + '">' + 'Please, Type your message' + '</div>';
        $(".picbar").attr("style", "background-image: url('" + IMAGE_url + "')");
        $("#chat").html(connect_messages);
    }
});
var conta = 0;
$("body").delegate(".get_contact","click",function(event){
    event.preventDefault();
    conta = 1;
    $("#contactname").html($(this).attr('connect_from'));
    $("#cotacttime").html($(this).attr('connects_time'));
    var IMAGE_url = $(this).attr('connect_image_url');
    $(".picbar").attr("style", "background-image: url('" + IMAGE_url + "')");

    $("#chat_message").val();
    
    var chat_message = '';
    connect_from = $(this).attr('connect_from');
    //connects_datalengthnow = 0;
    connects_datalength = 0;
    //$("#chat").html('');
    messageauto = 1;
    connects_datalengthnow = 0;
    $("#chat").html('loading ...');
    //contact_from = 0;
    response_message_from = 0;
    contact(username,$(this).attr('connect_from'),$(this).attr('connects_id'),chat_message); 
    if (messageauto == 1) {
        messageauto = 0; 
        $(".chat_main_container").show(100)
        $("#connects_contacts").hide(100,function(){       
            $("#connects_messages").show(100); 
            $("#menu_container_top_tab").hide(100);                
            //$("#menu_container_bottom_tab").hide(100);
            $("#center_top_id").hide(100);                

        });
    }   

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
        $(".picbar").attr("style", "background-image: url('" + IMAGE_url + "')");
        var chat_message = '';
        div_cima = 1;
        connect_from = $(this).attr('connect_from');
        connects_datalength = 0;
        messageauto = 1;
        connects_datalengthnow = 0;
        $("#chat").html('loading ...');
        //contact_from = 0;
        response_message_from = 0;
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
        if (messageauto == 1) {
            messageauto = 0; 
            $(".chat_main_container").show(100)
            $("#connects_contacts").hide(100,function(){       
                $("#connects_messages").show(100); 
                $("#menu_container_top_tab").hide(100);                
                //$("#menu_container_bottom_tab").hide(100);
                $("#center_top_id").hide(100);                

            });
        }
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
var connect_messages = 0;
var connects_datalengthnow = 0;
var connectstrue = 0;
var oppname = 0;
var response_message = 0;
var response_message_from = 0;
var contact_from = 0;
var contact_ofrom = 0;
var count_time_out = 0;
var IMAGE_pic_url  = '../img/jeans3.jpg';
function contact(user_name,con_from,conn_id,chat_message) {
    if (con_from != '') {
        $.ajax({
            type: "POST", // Type of request to be send, called as
            dataType: 'json',
            data: { contact: 12, username: user_name,connect_from: con_from ,connects_id: conn_id, chat_message:chat_message  },
            processData: true,
            url: api_server_url + '/cordova/contact.php',
            success: function searchSuccess(response) {
                try {
                    if (response.message == "success") {
                        var connects_data = response.connects;
                        connects_datalength = connects_datalengthnow;
                        connects_datalengthnow = connects_data.length;                    
                        //var chat_num_diff = Math.abs(connects_datalengthnow - connects_datalength);
                        var connects_name_image =  response.connects_name_IMAGE; 
                        if (connects_name_image.includes("http", 0)) {
                            IMAGE_pic_url = connects_name_image + '';
                        } else {
                            IMAGE_pic_url = IMAGE_url_path_name + connects_name_image + '';
                        }
                        if (connects_datalength < connects_datalengthnow || connects_datalength > connects_datalengthnow) {
                            if (response.connect_from != '') {
                                $("#chat").html('');
                                data_length =  connects_data.length;
                                connects_data.forEach(chat_contacts_datamyFunction);                                
                            }
                        }
                    } else {
                        if (response_message_from < 1) {
                            response_message_from = 1;
                            connects_datalengthnow = 0;
                            contact(con_from ,user_name,conn_id,'Hello ' + user_name + ', My name is ' + con_from  + '. How can i help you?');
                        }                    
                    }           
                } catch(e) {
                    $("#chat").html('<div class="message stark">Json persing error</div>');
                }
            },
            error: function searchError(xhr, err) {
                //$("#chat").html('<div class="message stark">Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '</div>');
            }
        });
         
    } else {        
        if (response_message < 1) {
            response_message = 1;
            connects_datalengthnow = 0;
            contact('Mo-pal' ,user_name,conn_id,'Hello ' + user_name + ', My name is ' + 'Mo-pal'  + '. How can i help you?');
        }
    }    
}
var value_from_connects_name = "";
var endchat = 1;

function chat_contacts_datamyFunction(item, index) {
    var data_i = data_length-1;
    if (username == item.connect_from) {
        var connect_messages  = '<div class="message parker" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' + item.connect_message + '</div>';
        $(".picbar").attr("style", "background-image: url('" + IMAGE_pic_url + "')");    
    } else {
        var connect_messages  = '<div class="message stark" connect_from="' + item.connect_from + '" connect_messages_id="' + item.connect_messages_id + '">' + item.connect_message + '</div>';
        $(".picbar").attr("style", "background-image: url('" + IMAGE_pic_url + "')");
    }
    if (data_i == index) {
        var typing = '<div id="bot_typing" class="message stark">' +
        '<div class="typing typing-1"></div>' +
        '<div class="typing typing-2"></div>' +
        '<div class="typing typing-3"></div>' +
        '</div>';
        
        $("#chat").append(connect_messages + typing);
        window.location.href="#bot_typing";
    } else {
        $("#chat").append(connect_messages);
    }
    
}

$("#order_items_back").click(function(){
    $("#order_items_container").hide(100,function(){
    }); 
    $("#orders_container").show(100);   
});
$("#order_back").click(function(){
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
    $(".main").show(100);
    $(".product_main_container").show(100);
    //main();   
});
$("#cart_back").click(function(){
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
    $(".main").show(100);
    $(".product_main_container").show(100);
    //main();  
});
$("#connects_back").click(function(){
    //alert(connect_product);

    connect_from = "";
    if (connect_product == 1) {
        connect_product = 0; 
        connect_from = "";
        $("#chat_container").hide(100,function(){
            $("#product_container").show(100);
            //$("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            //$("#product_add_client_container").show(100);
        });               
    }
    $("#menu_container_top_tab").show(100,function(){
        $("#menu_container_bottom_tab").show(100);
        $("#connects_messages").hide(100);      
        $("#connects_contacts").show(100);
        $("#center_top_id").hide(100); 
    });    
});
$("#contacts_back").click(function(){
    connect_from = "";
    if (connect_product == 1) {
        connect_product = 0; 
        connect_from = "";
        $("#chat_container").hide(100,function(){
            $("#product_container").show(100);
            //$("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            //$("#product_add_client_container").show(100);
        });               
    }
    $("#menu_container_top_tab").show(100,function(){
        $("#menu_container_bottom_tab").show(100);
        $("#connects_messages").hide(100);      
        $("#connects_contacts").show(100); 
        $("#center_top_id").hide(100);
        $("#chat_container").hide(100,function(){
            $("#product_container").show(100);
            //$("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            //$("#product_add_client_container").show(100);
        });
    });
});
var chat_ = 0;
$("#s5").click(function(){
    chat_ = 1;
    search_value = '';
    geoshop_value = '';
    cat_id = '';
    brand_id = "";
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
    if (item.connect_from == username) {
        var connect_name = item.connect_to;
    } else {
        var connect_name = item.connect_from;  
    }
    var _status = JSON.parse(item.connect_status);
    var item_connect_status = _status.connect_status;
    bum =  Number(_status.count);        
    var product_image =  _status.connects_name_IMAGE; 
    if (product_image.includes("http", 0)) {
        var IMAGE_url = product_image + '';
    } else {
        var IMAGE_url = IMAGE_url_path_name + product_image + '';
    }
    
    if (Number.isNaN(Date.parse(item.connects_time))) {
        var connect_date = item.connects_time;
    } else {
        var msec = Date.parse(item.connects_time);
        var d = new Date(msec);
        var connect_date =d.toDateString();
    }        

    var check_time = '<i class="float-right is-info time div5">' + connect_date + '</i>';

    if (item_connect_status == "unread") {
        var check_status = '<a class="status div4 text-secondary" data-toggle="tooltip">✓</a>';
    } else {
        var check_status = '<a class="status div4 text-info" data-toggle="tooltip">✓✓</a>';
    }

    if (bum > 0) {
        var con_messages  = '<div class="contact get_contact" connect_image_url="' + IMAGE_url + '" connect_from="' + connect_name + '" connects_id="' + item.connects_id + '" connects_time="' + item.connects_time + '">' +
        '<div class="pic rogers rogers_'+ index +'" style="background-image:url(' + IMAGE_url + ');"></div>' +
        '<div class="badge">' +
        '  ' + bum + '' +
        '</div>' +
        '<h6 class="name">' +
        '  ' + connect_name + '' +
        '</h6>' +    
        ' ' + product_title_account + '' + check_time +    
        '</div>'; 
        $("#connects").append(con_messages);       
    } else {
        var con_messages  = '<div class="contact get_contact" connect_image_url="' + IMAGE_url + '" connect_from="' + connect_name + '" connects_id="' + item.connects_id + '" connects_time="' + item.connects_time + '">' +
        '<div class="pic rogers rogers_'+ index +'" style="background-image:url(' + IMAGE_url + ');"></div>' + 
         '<div class="name">' +
        '  ' + connect_name + '' +
        '</div>' +    
        ' ' + product_title_account + '' + check_time + '<br>' + check_status +    
        '</div>';
        $("#connects").append(con_messages);
    }
    
}
var connects_data_from = "";
function chat_main_container() {
    $(".chat_main_container").show(100);
    //connect_product = 0;
    //connects_datalengthnow = 0; 
    //$("#connects").html('Loading...');
    
    //loadchat(''); 
    //contact(username,"","","");
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
            try {
                if (response.message == "success") {
                    var connects_data = response.connects;
                    connects_datalength = connect_messages;
                    connect_messages = response.connect_messages;
                    if (connects_datalength < connect_messages || connects_datalength > connect_messages) {
                        if (connect_from != '' ) {
                            //alert(connect_messages + " connect_from " + connect_from);
                            contact(username,connect_from,'','');
                        }
                    }
                    //$("#connects").html('');
                    if (response.data_returned > 0) {
                        $("#chat_num").html(response.data_returned);
                        $("#chat_num").show(100);
                    } else {
                        $("#chat_num").html(response.data_returned);
                        $("#chat_num").hide(100);
                    }
                    //alert(connect_messages + " connect_from " + connect_from);
                    $("#connects").html('');
                    connects_data.forEach(connects_datamyFunction);
                } else {
                    $("#connects").html('<div class="contact">' + response.message + '</div>');
                    contact(username,'','','');
                }
            } catch(e) {
                $("#connects").html('<div class="contact">Json persing error</div>');
            }          
        },
        error: function searchError(xhr, err) {
            //$("#connects").html('<div class="contact">' + 'Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '</div>');
        }
    });
    
}
document.addEventListener('backbutton', function(){
    connect_from = "";
    if (chat_ == 1) {
        chat_ = 0;
        connect_from = "";
        $("#menu_container_top_tab").show(100,function(){
            $("#menu_container_bottom_tab").show(100);
            $("#connects_messages").hide(100);      
            $("#connects_contacts").show(100); 
            $("#center_top_id").hide(100);    
        });        
    }
    if (conta == 1) {
        conta = 0;
        connect_from = "";
        $("#menu_container_top_tab").show(100,function(){
            $("#menu_container_bottom_tab").show(100);
            $("#connects_messages").hide(100);      
            $("#connects_contacts").show(100);
            $("#center_top_id").hide(100);     
        });        
    }
    if (div_cima == 1 && chat_ == 0) {
        div_cima = 0; 
        connect_from = "";
        $("#chat_container").hide(100,function(){
            $("#product_container").show(100);
            $("#product_row_container").hide(100);   
            $("#product_error").hide(100);  
            $("#product_add_client_container").show(100);
        });               
    }
    if (connect_product == 1) {
        connect_product = 0; 
        connect_from = "";
        $("#chat_container").hide(100,function(){
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
    search_value = '';
    geoshop_value = '';
    cat_id = '';
    brand_id = "";
    //window.location.href="#cart_container";
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
    search_value = '';
    geoshop_value = '';
    cat_id = '';
    brand_id = "";
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
var user_co = 0;
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
        user_co = 1;
        user_container(username,email);

    }    
}

$("#s3").click(function(){
    search_value = '';
    geoshop_value = '';
    cat_id = '';
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
var location_main_container = 0;
function location_container() {
    $(".location_main_container").show(100);
    window.location.href="#location_container";
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 30000
    });

    function onSuccess(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
        document.getElementById("main_heremap").innerHTML = "";

        $('<iframe src="' + path_protocol + '//' + host_name + ':' + port + '/map/location_container.html" height="400px" width="100%" title="map"></iframe>').appendTo('#main_heremap');

        action_float_id = 0;
        contact_information_save = 0;
        location_main_container = 1;
        update_user_data(latitude,longitude,role,rating,review,address,city,country,postal,phone,email,last,first,username);
    
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }
    //heremapview(latitude,longitude);  
    /**$.ajax({
        url: 'https://image.maps.ls.hereapi.com/mia/1.6/mapview',
        type: 'GET',
        data: {
            c: '52.5159,13.3777',
            z: '14',
            apiKey: '46q01OAMcax9dvSziSM9fEF8biYPSF5F4dPje-QCZ9Q'
        },
        success: function (data) {
            //main_heremap
            var add_heremap = document.getElementById('main_heremap');
            add_heremap.src = JSON.stringify(data);
            alert(JSON.stringify(data));
          
        }
    }); */

    /**$(".location_main_container").show(100);
    window.location.href="#location_container";    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    var onSuccess = function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        alert('latitude: ' + latitude + ' longitude: ' + longitude + '');
        //heremapview(latitude,longitude);        
    };
    function onError(error) {
        //heremapview(latitude,longitude); 
        //$("#location_container").html('code: ' + error.code + 'message: ' + error.message + '');
 
        alert('code: ' + error.code + 'message: ' + error.message + '');
    } */
    //navigator.geolocation.getCurrentPosition(onSuccess, onError); 
}
function heremapview(latitude,longitude) {
    $('#app-cover-spin').show(0);
    $.ajax({
        url: 'https://image.maps.ls.hereapi.com/mia/1.6/mapview',
        type: 'GET',
        data: {
            c: '' + latitude + ',' + longitude + '',
            z: '14',
            apiKey: '46q01OAMcax9dvSziSM9fEF8biYPSF5F4dPje-QCZ9Q'
        },
        success: function (data) {
            //var add_heremap = document.getElementById('main_heremap');
            //add_heremap.src = "http://image.maps.cit.api.here.com/mia/1.6/mapview?" +JSON.stringify(data);
            //alert(data);          
        }
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
            try {
               // response.data = JSON.parse(response.data);
                if (response.message == "success") {
                    $("#login_button_help").html("Welcome " + response.username);
                    username = response.username;
                    role = response.role;
                    email = response.email;

                    first = response.first_name;
                    last = response.last_name;
                    phone = response.phone_number;
                    
                    var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;

                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    localStorage.setItem("email", email);

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
                    email = response.email;

                    first = response.first_name;
                    last = response.last_name;
                    phone = response.phone_number;

                    var location = JSON.parse(response.location_name);
                        postal = location.postal;
                        country = location.country;
                        city = location.city;
                        address = location.address;

                    altitude = response.altitude;
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    localStorage.setItem("email", email);

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

$("#forgot_password").click(function(){
    $("#login").removeClass("active");
    $("#regis").removeClass("active");

    $("#forgot").addClass("active");
});
$("#login_pill").click(function(){
    $("#reset_code").removeClass("active");
    $("#forgot").removeClass("active");
    $("#regis").removeClass("active");
    $("#reset_code").removeClass("active");
    $("#new_password").removeClass("active");
    $("#login").addClass("active");
});
var forgot_login_email = "";
$("#forgot").keypress(function (e){
    if(e.keyCode == 13){
        forgot_login_button();
    }
});
function forgot_login_button() {
    var forgot_email_format =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    forgot_login_email = $("#forgot_login_email").val();
    if (forgot_login_email != "" && forgot_login_email != "name@example.com" && forgot_login_email != null) {
        if (forgot_email_format.test(forgot_login_email)) {
            $("#forgot_login_email_help").html(forgot_login_email);
            $("#forgot_login_email").removeClass("is-invalid");
            $("#forgot_login_email").addClass("is-valid");

            forgot_login_password(forgot_login_email);
        } else {
            $("#forgot_login_email_help").html("Enter a valid email address, e.g name@example.com");
            $("#forgot_login_email").removeClass("is-valid");
            $("#forgot_login_email").addClass("is-invalid");
        }
    } else {
        $("#forgot_login_email_help").html("Email address should be provided");
        $("#forgot_login_email").removeClass("is-valid");
        $("#forgot_login_email").addClass("is-invalid");
    }
}
$("#forgot_login_button").click(function(){
    forgot_login_button();
});
function forgot_login_password(forgot_login_email) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { forgot_login_password: 12, forgot_login_email: forgot_login_email},
        processData: true,
        url: api_server_url + '/cordova/forgot_login_password.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                if (response.message == "success") {
                    $("#code_email").html(forgot_login_email);
                    if (response.validate_message == 'Your mail has been sent successfully.') {
                        $("#forgot").removeClass("active");
                        //$("#regis").removeClass("active");
                        //$("#login").removeClass("active");
                        $("#reset_code").addClass("active");

                        $("#forgot_login_button_help").html(response.validate_message);
                    } else {
                        $("#forgot_login_button_help").html(response.validate_message);
                    }
                    

                }
                else if(response.message == "fail validate"){                    
                    $("#forgot_login_button_help").html(response.validate_message);
                } else {
                    $("#forgot_login_button_help").html(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                $("#forgot_login_button_help").html('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          $('#app-cover-spin').hide(0);
          $("#forgot_login_button_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
    

}
$("#reset_code").keypress(function (e){
    if(e.keyCode == 13){
        code_button();
    }
});
function code_button() {
    var forgot_code_email = $("#forgot_code_email").val();
    if (forgot_code_email != "" && forgot_code_email != null) {
        $("#forgot_code_email_help").html(forgot_code_email);
        $("#forgot_code_email").removeClass("is-invalid");
        $("#forgot_code_email").addClass("is-valid");
        
        code_verification(forgot_code_email,forgot_login_email);
        //alert(Number.isInteger(forgot_code_email) + forgot_code_email);
        /**if (Number.isInteger(forgot_code_email)) {
            $("#forgot_code_email_help").html(forgot_code_email);
            $("#forgot_code_email").removeClass("is-invalid");
            $("#forgot_code_email").addClass("is-valid");
            
            code_verification(forgot_code_email);
        } else {
            $("#forgot_code_email_help").html("Enter a valid code");
            $("#forgot_code_email").removeClass("is-valid");
            $("#forgot_code_email").addClass("is-invalid");
        } */
    } else {
        $("#forgot_code_email_help").html("Enter the code sent to " + forgot_login_email + "");
        $("#forgot_code_email").removeClass("is-valid");
        $("#forgot_code_email").addClass("is-invalid");
    }
}
$("#code_button").click(function(){
    code_button();
});
function code_verification(code, email) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { code_verification: 12, code: code, email:email},
        processData: true,
        url: api_server_url + '/cordova/code_verification.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                if (response.message == "success") {
                    $("#forgot_code_email_help").html(code);

                    $("#reset_code").removeClass("active");
                    //$("#forgot").removeClass("active");
                    //$("#regis").removeClass("active");
                    //$("#login").removeClass("active");
                    $("#new_password").addClass("active");

                    $("#code_button_help").html(response.validate_message);

                }
                else if(response.message == "fail validate"){                    
                    $("#code_button_help").html(response.validate_message);
                } else {
                    $("#code_button_help").html(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                $("#code_button_help").html('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          $('#app-cover-spin').hide(0);
          $("#code_button_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}
$("#new_password").keypress(function (e){
    if(e.keyCode == 13){
        new_password_button();
    }
}); 
function new_password_button() {
    var create_new_password = $("#create_new_password").val();
    var confirm_new_password = $("#confirm_new_password").val();

    if (create_new_password != "" && create_new_password != null) {
        if (create_new_password.length >= 8) {
            $("#create_new_password_help").html(create_new_password.length);
            $("#create_new_password").removeClass("is-invalid");
            $("#create_new_password").addClass("is-valid");
        } else {
            $("#create_new_password_help").html("Password should be atleast 8 characters");
            $("#create_new_password").removeClass("is-valid");
            $("#create_new_password").addClass("is-invalid");
        }        
    } else {
        $("#create_new_password_help").html("Create new password");
        $("#create_new_password").removeClass("is-valid");
        $("#create_new_password").addClass("is-invalid");
    }

    if (confirm_new_password != "" && confirm_new_password != null) {
        if (confirm_new_password.length >= 8) {
            if (create_new_password == confirm_new_password) {
                $("#confirm_new_password_help").html(confirm_new_password.length);
                $("#confirm_new_password").removeClass("is-invalid");
                $("#confirm_new_password").addClass("is-valid");
                create_new_user_password(forgot_login_email,create_new_password);
            } else {
                $("#confirm_new_password_help").html("Password do not match");
                $("#confirm_new_password").removeClass("is-valid");
                $("#confirm_new_password").addClass("is-invalid");
            }
        } else {
            $("#confirm_new_password_help").html("Password should be atleast 8 characters");
            $("#confirm_new_password").removeClass("is-valid");
            $("#confirm_new_password").addClass("is-invalid");
        }        
    } else {
        $("#confirm_new_password_help").html("Confirm new password");
        $("#confirm_new_password").removeClass("is-valid");
        $("#confirm_new_password").addClass("is-invalid");
    }
}
$("#new_password_button").click(function(){
    new_password_button();
});
function create_new_user_password(forgot_login_email,new_password) {
    $('#app-cover-spin').show(0);

    $.ajax({
        type: "POST", // Type of request to be send, called as 
        dataType: 'json',
        data: { create_new_password: 12, forgot_login_email: forgot_login_email, new_password:new_password},
        processData: true,
        url: api_server_url + '/cordova/create_new_password.php',
        success: function searchSuccess(response) {
            $('#app-cover-spin').hide(0);
            try {
                if (response.message == "success") {
                    $("#new_password_button_help").html(forgot_login_email);

                    $("#new_password").removeClass("active");
                    $("#login").addClass("active");

                    $("#new_password_button_help").html(response.validate_message);

                }
                else if(response.message == "fail validate"){                    
                    $("#new_password_button_help").html(response.validate_message);
                } else {
                    $("#new_password_button_help").html(response.signup_email + " or " + response.signup_password);
                }
            } catch(e) {
                $("#new_password_button_help").html('JSON parsing error');
            }          
        },
        error: function searchError(xhr, err) {
          $('#app-cover-spin').hide(0);
          $("#new_password_button_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        }
    });
}

function agent_location_map(add_client,username) {
    localStorage.setItem("add_client", add_client);
    localStorage.setItem("username", username);

    /**navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 30000
    });

    function onSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;
        alert('latitude: ' + position.coords.latitude + '\n' +
        'longitude: ' + position.coords.longitude + '\n');
        //Google Maps
        var myLatlng = new google.maps.LatLng(lat, lang);
        var mapOptions = {
            zoom: 4,
            center: myLatlng
        }
        var map = new google.maps.Map(document.getElementById('agent_location_map'), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    } */
    //google.maps.event.addDomListener(window, 'load', onSuccess);


    //alert('' + path_protocol + '//' + host_name + ':' + port + '/map/');
    document.getElementById("agent_location_map").innerHTML = "";
    //document.getElementById("agent_location_map").innerHTML = '<iframe src="' + path_protocol + '//' + host_name + ':' + port + '/map/agent_location_map.html" height="400px" width="100%" title="map"></iframe>';
    document.getElementById("agent_location_map").innerHTML = '<iframe src="' + path_protocol + '//' + host_name + ':' + port + '/map/" height="400px" width="100%" title="map"></iframe>';
    //document.getElementById("agent_location_map").innerHTML = '<iframe src="http://oramla.onlinewebshop.net/" height="400px" width="100%" title="map"></iframe>';
    //var ref = ;

    //$(cordova.InAppBrowser.open(path_protocol + '//' + host_name + ':' + port + '/map/', '_self', 'useWideViewPort=yes,fullscreen=no')).appendTo('#agent_location_map');
    /**cordova.plugin.google.maps.LocationService.getMyLocation(function(result) {
        alert(["Your current location:\n",
            "latitude:" + location.latLng.lat.toFixed(3),
            "longitude:" + location.latLng.lng.toFixed(3),
            "speed:" + location.speed,
            "time:" + location.time,
            "bearing:" + location.bearing].join("\n"));
    }); */
    /**$.getScript( "" + path_protocol + "//" + host_name +  ':' + port + "/map/agent_location_map.js", function( data, textStatus, jqxhr ) {
        //alert(data);
    }); 
    cordova.plugin.http.sendRequest(api_server_url + '/cordova/signup_user.php', options, function(response) {
        $('#app-cover-spin').hide(0);
        $("#signup_button_help").html(response.status);
        
    }, function(response) {
        $('#app-cover-spin').hide(0);
        $("#signup_button_help").html(response.status + " : " + response.error);
        main();        
    });*/
}
var upload_from_url = 0;
var upload_from_file = 1;
$("#upload_from_url").click(function(){
    $("#upload_from_url").hide();
    $("#upload_from_file_container").hide();
    $("#upload_from_file").show();
    $("#upload_from_url_container").show();
    upload_from_url = 1;
    upload_from_file = 0;
    $("#product_save").removeClass("btn-danger");
    $("#product_save").removeClass("btn-success");
    $("#product_save").removeClass("btn-info");
    $("#product_save").removeClass("btn-warning");

    $("#product_save").addClass("btn-primary");
    $("#product_save").html('Add');
    $("#upload_from_help").html('');


});
$("#upload_from_file").click(function(){
    $("#upload_from_file").hide();
    $("#upload_from_url_container").hide();
    $("#upload_from_url").show();
    $("#upload_from_file_container").show();
    upload_from_url = 0;
    upload_from_file = 1;
    $("#product_save").removeClass("btn-danger");
    $("#product_save").removeClass("btn-success");
    $("#product_save").removeClass("btn-info");
    $("#product_save").removeClass("btn-warning");

    $("#product_save").addClass("btn-primary");
    $("#product_save").html('Add');
    $("#upload_from_help").html('');


});
$(".imgAdd").click(function(){
    if (upload_from_file == 1) {
        $(this).closest(".row").find('.imgAdd').before('<div class="col imgUp"><div class="imagePreview"></div>' +
        '<label class="btn btn-primary">' +
          'Choose file ' +
          '<input type="file" name="fileToUpload[]" class="uploadFile img" value="Upload Photo" style="width: 0px;height: 0px;overflow: hidden;">' +
        '</label> <i class="fa fa-times del"></i></div>');
    } else {
        $(this).closest(".row").find('.imgAdd').before('<div class="col imgUp"><div class="imagePreview"></div><div class="control"><input type="url" class="uploadUrl img input is-success" placeholder="Enter url i.e http://oramla.com" style="width:auto;height:0px;overflow:hidden;"></div><i class="fa fa-times del"></i></div>');
    }
});
$(document).on("click", "i.del" , function() {
    $(this).parent().remove();
});
$(function() {
      $(document).on("change",".uploadFile", function() {
        $("#product_save").removeClass("btn-danger");
        $("#product_save").removeClass("btn-success");
        $("#product_save").removeClass("btn-info");
        $("#product_save").removeClass("btn-warning");
    
        $("#product_save").addClass("btn-primary");
        $("#product_save").html('Add');
        $("#upload_from_help").html('');
          var uploadFile = $(this);
          if (upload_from_file == 1) {
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
     
            if (/^image/.test( files[0].type)){ // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
     
                reader.onloadend = function(){ // set image data as background of div
                  //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
                  uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
                  $("#upload_from_file_container_help").html('<span class= "text-success" >image file selected</span>');

                }
            } else {
                $("#upload_from_file_container_help").html('<span class= "text-danger" >only image file</span>');
            }
          } else {
           // uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+$(this).val()+")");

          }
          
      });
      $(document).on("change",".uploadUrl", function() {
        $("#product_save").removeClass("btn-danger");
        $("#product_save").removeClass("btn-success");
        $("#product_save").removeClass("btn-info");
        $("#product_save").removeClass("btn-warning");
    
        $("#product_save").addClass("btn-primary");
        $("#product_save").html('Add');
        $("#upload_from_help").html('');
        var uploadUrl = $(this);
        if (upload_from_file == 1) {
          
        } else {            
            if ($(this).val() != '') {
                var this_url_image = $(this).val();
                var url_image = new Image();
                url_image.onload = function() {
                    // image exists and is loaded
                    uploadUrl.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this_url_image+")");
                    $("#upload_from_url_container_help").html('<span class= "text-success" >Image loaded</span>');
                }
                url_image.onerror = function() {
                    $("#upload_from_url_container_help").html('<span class= "text-warning" >Image does not exist</span>');
                }                
                url_image.src = this_url_image;
                
            } else {
                $("#upload_from_url_container_help").html('<span class= "text-danger" >Invalid url</span>');
            }            
        }
        
    });
});

$("#product_save").click(function(){
    $("#api_server_url").val(api_server_url);

    var product_save = 0;
    var product_quantity = $("#product_quantity").val();
    var product_description = $("#product_description").val();
    var product_type = $("#product_type").val();
    var product_title = $("#product_title").val();
    var product_industry = $("#product_industry").val();
    var product_category = $("#product_category").val();
    

    if (product_title == '') {
        window.location.href="#product_title";
        product_save = 1;
        $("#product_title").removeClass("is-valid");
        $("#product_title").addClass("is-invalid");
    } else {
        product_save = 0;
        $("#product_title").removeClass("is-invalid");
        $("#product_title").addClass("is-valid");
        $("#product_title_help").html(product_title);
        if (product_price == '') {
            window.location.href="#product_price";
            product_save = 1;
            $("#product_price").removeClass("is-valid");
            $("#product_price").addClass("is-invalid");
        } else {
            product_save = 0;
            $("#product_price").removeClass("is-invalid");
            $("#product_price").addClass("is-valid");
            $("#product_price_help").html(product_price);
            if (product_industry == '') {
                window.location.href="#product_industry";
                product_save = 1;
                $("#product_industry").removeClass("is-valid");
                $("#product_industry").addClass("is-invalid");
                $("#product_industry_help").html('<span class="text-danger">Choose Oramla-defined product Industry/Department for your product</span> ');
            } else {
                product_save = 0;
                $("#product_industry").removeClass("is-invalid");
                $("#product_industry").addClass("is-valid");
                $("#product_industry_help").html(product_industry);
                if (product_category == '') {
                    window.location.href="#product_category";
                    product_save = 1;
                    $("#product_category").removeClass("is-valid");
                    $("#product_category").addClass("is-invalid");
                    $("#product_category_help").html('<span class="text-danger">Choose Oramla-defined product Industry/Department for your product</span> ');
                } else {
                    product_save = 0;
                    $("#product_category").removeClass("is-invalid");
                    $("#product_category").addClass("is-valid");
                    $("#product_category_help").html(product_category);
                    if (product_type == '') {
                        window.location.href="#product_type";
                        product_save = 1;
                        $("#product_type").removeClass("is-valid");
                        $("#product_type").addClass("is-invalid");
                    } else {
                        product_save = 0;
                        $("#product_type").removeClass("is-invalid");
                        $("#product_type").addClass("is-valid");
                        $("#product_type_help").html(product_type);
                        if (shipping == '') {
                            window.location.href="#product_shipping";
                            product_save = 1;
                            $("#product_shipping").removeClass("is-valid");
                            $("#product_shipping").addClass("is-invalid");
                        } else {
                            product_save = 0;
                            $("#product_shipping").removeClass("is-invalid");
                            $("#product_shipping").addClass("is-valid");
                            $("#product_shipping_help").html(shipping);
                            if (product_description == '') {
                                window.location.href="#product_description";
                                product_save = 1;
                                $("#product_description").removeClass("is-valid");
                                $("#product_description").addClass("is-invalid");
                            } else {
                                product_save = 0;
                                $("#product_description").removeClass("is-invalid");
                                $("#product_description").addClass("is-valid");
                                $("#product_description_help").html(product_description);
                                if (availability == '') {
                                    window.location.href="#product_availability";
                                    product_save = 1;
                                    $("#product_availability").removeClass("is-valid");
                                    $("#product_availability").addClass("is-invalid");
                                } else {
                                    product_save = 0;
                                    $("#product_availability").removeClass("is-invalid");
                                    $("#product_availability").addClass("is-valid");
                                    $("#product_availability_help").html(availability);
                                    if (brand == '') {
                                        window.location.href="#product_brand";
                                        product_save = 1;
                                        $("#product_brand").removeClass("is-valid");
                                        $("#product_brand").addClass("is-invalid");
                                    } else {
                                        product_save = 0;
                                        $("#product_brand").removeClass("is-invalid");
                                        $("#product_brand").addClass("is-valid");
                                        $("#product_brand").html(brand);
                                        if (condition == '') {
                                            window.location.href="#product_condition";
                                            product_save = 1;
                                            $("#product_condition").removeClass("is-valid");
                                            $("#product_condition").addClass("is-invalid");
                                        } else {
                                            product_save = 0;
                                            $("#product_condition").removeClass("is-invalid");
                                            $("#product_condition").addClass("is-valid");
                                            $("#product_condition_help").html(condition);
                                            if (tax == '') {
                                                window.location.href="#product_tax";
                                                product_save = 1;
                                                $("#product_tax").removeClass("is-valid");
                                                $("#product_tax").addClass("is-invalid");
                                            } else {
                                                product_save = 0;
                                                $("#product_tax").removeClass("is-invalid");
                                                $("#product_tax").addClass("is-valid");
                                                $("#product_tax_help").html(tax);
                                                if (product_quantity == '') {
                                                    window.location.href="#product_quantity";
                                                    product_save = 1;
                                                    $("#product_quantity").removeClass("is-valid");
                                                    $("#product_quantity").addClass("is-invalid");
                                                } else {
                                                    product_save = 0;
                                                    $("#product_quantity").removeClass("is-invalid");
                                                    $("#product_quantity").addClass("is-valid");
                                                    $("#product_quantity_help").html(product_quantity);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    $("#product_data_tax").val(tax);
    $("#product_data_shipping_rates").val(shipping_rates);
    $("#product_data_shipping_strategies").val(shipping_strategies);
    $("#product_data_product_type").val(product_type);
    $("#product_data_pricing_strategy").val(pricing_strategy);
    $("#product_data_product_price").val(product_price);
    $("#product_data_product_list_price").val(product_list_price);

    $("#product_data_net_price").val(net_price);
    $("#product_data_sale_price").val(sale_price);
    $("#product_data_tax_category").val(tax_category);   

    $("#product_data_shipping").val(shipping);
    $("#product_data_shipping_label").val(shipping_label);
    $("#product_data_shipping_weight").val(shipping_weight);
    $("#product_data_shipping_length").val(shipping_length);
    $("#product_data_shipping_width").val(shipping_width);
    $("#product_data_shipping_height").val(shipping_height);
    $("#product_data_ships_from_country").val(ships_from_country);
    $("#product_data_transit_time_label").val(transit_time_label);
    $("#product_data_max_handling_time").val(max_handling_time);
    $("#product_data_min_handling_time").val(min_handling_time);
    $("#product_data_excluded_destination").val(excluded_destination);
    $("#product_data_included_destination").val(included_destination);
    $("#product_data_shopping_ads_excluded_country").val(shopping_ads_excluded_country);
    $("#product_data_condition").val(condition);
    $("#product_data_adult").val(adult);
    $("#product_data_multipack").val(multipack);
    $("#product_data_is_bundle").val(is_bundle);
    $("#product_data_energy_efficiency_class").val(energy_efficiency_class);
    $("#product_data_min_energy_efficiency_class").val(min_energy_efficiency_class);
    $("#product_data_max_energy_efficiency_class").val(max_energy_efficiency_class);
    $("#product_data_age_group").val(age_group);
    $("#product_data_color").val(color);
    $("#product_data_gender").val(gender);
    $("#product_data_material").val(material);
    $("#product_data_pattern").val(pattern);
    $("#product_data_size").val(size);
    $("#product_data_size_system").val(size_system);
    $("#product_data_item_group_id").val(item_group_id);
    $("#product_data_product_detail").val(product_detail);
    $("#product_data_product_highlight").val(product_highlight);
    $("#product_data_brand").val(brand);

    $("#product_data_gtin").val(gtin);
    $("#product_data_MPN").val(MPN);
    $("#product_data_identifier_exists").val(identifier_exists);
    $("#product_data_availability").val(availability);
    $("#product_data_availability_date").val(availability_date);
    $("#product_data_cost_of_goods_sold").val(cost_of_goods_sold);
    $("#product_data_expiration_date").val(expiration_date);
    $("#product_data_sale_price_effective_date").val(sale_price_effective_date);
    $("#product_data_unit_pricing_measure").val(unit_pricing_measure);
    $("#product_data_unit_price_base_measure").val(unit_price_base_measure);
    $("#product_data_installment").val(installment);
    $("#product_data_subscription_cost").val(subscription_cost);
    $("#product_data_loyalty_points").val(loyalty_points);
    $("#product_data_product_title").val(product_title);
    $("#product_data_product_industry").val(product_industry);
    $("#product_data_product_category").val(product_category);

    $("#product_data_product_description").val(product_description);
    $("#product_data_product_quantity").val(product_quantity);

    if (upload_from_file == 1) {
        var uploadFile_arr = $('.uploadFile').map(function(){ return  $(this).val() }).get()
        var i;
        var upload_from_check = 0;
        for (i = 0; i < uploadFile_arr.length; i++) {
            if (uploadFile_arr[i] != '') {
                upload_from_check = 1;      
            } else {
                upload_from_check = 0;
            }
        }
        if (product_save == 0) {
            if (upload_from_check == 1) {
                $("#product_save").removeClass("btn-primary");
                $("#product_save").removeClass("btn-success");
                $("#product_save").removeClass("btn-danger");
                $("#product_save").removeClass("btn-warning");
    
                $("#product_save").addClass("btn-info");
                $("#product_save").html('Uploading...');
                $("#upload_from_file_container_help").html('Please wait...');
                $("#upload_from_help").html('Please wait...');
                upload_image_from_file(uploadFile_arr);      
            } else {
                window.location.href="#upload_from_file_container";
    
                $("#product_save").removeClass("btn-primary");
                $("#product_save").removeClass("btn-success");
                $("#product_save").removeClass("btn-danger");
                $("#product_save").removeClass("btn-info");
    
                $("#product_save").addClass("btn-warning");
                $("#product_save").html('Error');
                $("#upload_from_file_container_help").html("No file selected");
                $("#upload_from_help").html("No file selected");
    
            } 
        } else {
            $("#upload_from_help").html("Correct the error(s)");
        }
                
        
    } else {
        var uploadUrl_arr = $('.uploadUrl').map(function(){ return  $(this).val() }).get();
        var i;
        var upload_from_check = 0;
        for (i = 0; i < uploadUrl_arr.length; i++) {
            if (uploadUrl_arr[i] != '') {
                upload_from_check = 1;      
            } else {
                upload_from_check = 0;
            }
        }
        if (upload_from_check == 1) {
            upload_image_from_url(uploadUrl_arr);      
        } else {
            $("#upload_from_url_container_help").html("No Url To the image");
            $("#upload_from_help").html("No Url To the image");
        }
    }
    
});


function upload_image_from_url(uploadUrl_arr) {
    
}

function upload_image_from_file(uploadFile_arr) {
    $('#app-cover-spin').show(0);
    // Create an FormData object 
    var formData = $(".fileToUploadForm").submit(function (e) {
        return;
    });
    //formData[0] contain form data only 
    // You can directly make object via using form id but it require all ajax operation inside $("form").submit(<!-- Ajax Here   -->)
    var formData = new FormData(formData[0]);
    $.ajax({
        url: api_server_url + '/cordova/upload_image_from_file.php?q=',
        type: 'POST',
        data: formData,
        success: function (response) {
            try {
                if (response.message == "success") {
                    if (response.uploadFile_arr.message == "success") {
                        $("#product_save").removeClass("btn-primary");
                        $("#product_save").removeClass("btn-info");
                        $("#product_save").removeClass("btn-danger");
                        $("#product_save").removeClass("btn-warning");

                        $("#product_save").addClass("btn-success");
                        $('#app-cover-spin').hide(0);
                        var imageurl = response.imageurl;
                        var response_imageurl = '<ul>';
                        for (i = 0; i < imageurl.length; i++) {
                            response_imageurl += "<li>" + imageurl[i] + "</li>";
                        }
                        response_imageurl += '</ul>';
                        $("#upload_from_file_container_help").html(response.uploadFile_arr.message + '. Image url : <span class="text-success">' + response_imageurl + '</span>');
                        //imageurl
                        $("#product_save").html(response.uploadFile_arr.message);
                        $("#upload_from_help").html(response.product_title + ' uploaded successfuly');
                        cat_id = '';
                        brand_id = '';
                        startlimit = 0;
                        endlimit = 24;
                        product_main_container(startlimit,endlimit,cat_id,brand_id);
                    } else {                        
                        $("#product_save").removeClass("btn-primary");
                        $("#product_save").removeClass("btn-success");
                        $("#product_save").removeClass("btn-info");
                        $("#product_save").removeClass("btn-warning");

                        $("#product_save").addClass("btn-danger");
                        $('#app-cover-spin').hide(0);
                        $("#product_save").html('fail');
                        if (response.uploadOk == 0) {
                            $("#upload_from_file_container_help").html(response.uploadFile_arr);

                            $("#upload_from_help").html(response.uploadFile_arr);
                        } else {
                            $("#upload_from_file_container_help").html(response.uploadFile_arr.message);

                            $("#upload_from_help").html(response.uploadFile_arr.message);
                        }
                    }
                } else {
                    $('#app-cover-spin').hide(0);
                    $("#upload_from_file_container_help").html(response.message);

                    $("#upload_from_help").html(response.message);
                }
            } catch(e) {
                $('#app-cover-spin').hide(0);
                $("#upload_from_file_container_help").html('JSON parsing error');

                $("#upload_from_help").html('JSON parsing error');
            }
        },
        error: function searchError(xhr, err) {
            $('#app-cover-spin').hide(0);
            $("#upload_from_file_container_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));

            $("#upload_from_help").html("Error on ajax call: " + err  + " " + JSON.stringify(xhr));
        },
        contentType: false,
        processData: false,
        cache: false
    });
    
}