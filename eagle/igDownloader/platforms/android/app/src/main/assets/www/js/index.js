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

function onDeviceReady() {
    
    $(document).on("change",".uploadUrl", function() {
        $("#upload_from_url_container_help").html('');
        var uploadUrl = $(this);
        if ($(this).val() != '') {
            var this_url_image = $(this).val();
            var url_image = new Image();
            url_image.onload = function() {
                // image exists and is loaded
                $(".appmain").attr("style", "background-image: url('" + uploadUrl + "');background-size: center");

                $("#upload_from_url_container_help").html('<span class= "text-success" >Image loaded</span>');
            }
            url_image.onerror = function() {
                $("#upload_from_url_container_help").html('<span class= "text-warning" >Image does not exist</span>');
            }                
            url_image.src = this_url_image;
            
        } else {
            $("#upload_from_url_container_help").html('<span class= "text-danger" >Invalid url</span>');
        }
        
    });
    $("body").delegate(".paste_link","click",function(event){
        event.preventDefault();
        $("#upload_from_url_container_help").html('');
        var uploadUrl = $(".uploadUrl").val();
        if ($(".uploadUrl").val() != '') {
            var this_url_image = $(".uploadUrl").val();
            var url_image = new Image();
            url_image.onload = function() {
                // image exists and is loaded
                $(".appmain").attr("style", "background-image: url('" + uploadUrl + "');background-size: center");

                $("#upload_from_url_container_help").html('<span class= "text-success" >Image loaded</span>');
            }
            url_image.onerror = function() {
                $("#upload_from_url_container_help").html('<span class= "text-warning" >Image does not exist</span>');
            }                
            url_image.src = this_url_image;
            
        } else {
            $("#upload_from_url_container_help").html('<span class= "text-danger" >Invalid url</span>');
        }
    });
    $("body").delegate(".download_link","click",function(event){
        event.preventDefault();
        $("#upload_from_url_container_help").html('');
        var uploadUrl = $(".uploadUrl").val();
        if ($(".uploadUrl").val() != '') {
            var this_url_image = $(".uploadUrl").val();
            var url_image = new Image();
            url_image.onload = function() {
                // image exists and is loaded
                $(".appmain").attr("style", "background-image: url('" + uploadUrl + "');background-size: center");

                $("#upload_from_url_container_help").html('<span class= "text-success" >Image loaded</span>');
            }
            url_image.onerror = function() {
                $("#upload_from_url_container_help").html('<span class= "text-warning" >Image does not exist</span>');
            }                
            url_image.src = this_url_image;
            
        } else {
            $("#upload_from_url_container_help").html('<span class= "text-danger" >Invalid url</span>');
        }
    });
}
