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
var imageUrl = 'https://oramla.com/product_images/H121fa0bddd504568b36829a6f4355b81.jpg';

function onDeviceReady() {
    var uploadUrl = 'img/logo.png';
    var getuploadUrl = document.getElementById('uploadUrl')
    getuploadUrl.src= uploadUrl;
    $(document).on("change",".uploadUrl", function() {
        $("#upload_from_url_container_help").html('');
        var uploadUrl = $(this);
        if ($(this).val() != '') {
            var this_url_image = $(this).val();
            var url_image = new Image();
            url_image.onload = function() {
                // image exists and is loaded
                getuploadUrl.src= uploadUrl;
                $("#upload_from_url_container_help").html('<span class= "text-success" >Image loaded</span>');
                dowload(uploadUrl);
            }
            url_image.onerror = function() {
                $("#upload_from_url_container_help").html('<span class= "text-warning" >Image does not exist</span>');
            }                
            url_image.src = this_url_image;            
        } else {
            $("#upload_from_url_container_help").html('<span class= "text-danger" >Invalid url</span>');
        }        
    });
    $("body").delegate(".preview_link","click",function(e){
        e.preventDefault();        
        $("#upload_from_url_container_help").html('');
        $("#uploadUrlimage").val(imageUrl);

        var uploadUrl = $(".uploadUrl").val();
        if ($(".uploadUrl").val() != '') {
            var this_url_image = $(".uploadUrl").val();
            var url_image = new Image();
            url_image.onload = function() {
                // image exists and is loaded
                getuploadUrl.src= uploadUrl;
                $("#upload_from_url_container_help").html('<span class= "text-success" >Image loaded</span>');
                dowload(uploadUrl);
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
        var uploadUrl = $(".uploadUrl").val();
        if ($(".uploadUrl").val() != '') {
            var this_url_image = $(".uploadUrl").val();
            var url_image = new Image();
            url_image.onload = function() {
                // image exists and is loaded
                getuploadUrl.src= uploadUrl;

                $("body").append("<a id='hiddenLink' href='" +uploadUrl + "' style='display:none;' download>Download Pic</a>");
                $("#hiddenLink")[0].click();
                $("#hiddenLink").remove();
                $("#upload_from_url_container_help").html(uploadUrl);

            }
            url_image.onerror = function() {
                $("#upload_from_url_container_help").html('<span class= "text-warning" >Image does not exist</span>');
            }                
            url_image.src = this_url_image;            
        } else {
            $("#upload_from_url_container_help").html('<span class= "text-danger" >Invalid url</span>');
        }

    });

    $("body").delegate(".navbartoggle","click",function(event){
        event.preventDefault();
        $("#navbarSupportedContent").toggle(100,function(){});
    });

}
  

function dowload(params) {
    var myCanvas = document.getElementById("uploadUrl");
    $("#upload_from_url_container_help").html(typeof myCanvas.getContext());

    if (typeof myCanvas.getContext() == "undefined") {
        $("#upload_from_url_container_help").html("device does not support this action, sorry");
    } else {
        $("body").append("<a id='hiddenLink' href='" + myCanvas.toDataURL() + "' style='display:none;' download>Download Pic</a>");
        $("#hiddenLink")[0].click();
        $("#hiddenLink").remove();
        $("#upload_from_url_container_help").html(myCanvas.toDataURL());
    }
}





























/**function DownloadImage(imageURL) {
    $("#upload_from_url_container_help").html('URL');
    var oImage = document.getElementById(imageURL);
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
        $("#upload_from_url_container_help").html("device does not support this action, sorry");
        return false;
    }

    try {
        var context = canvas.getContext("2d");
        var width = oImage.width;
        var height = oImage.height;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        context.drawImage(oImage, 0, 0, width, height);
        var rawImageData = canvas.toDataURL("image/png;base64");
        rawImageData = rawImageData.replace("image/png", "image/octet-stream");
        document.location.href = rawImageData;
        document.body.removeChild(canvas);
    }
    catch (err) {
        document.body.removeChild(canvas);
        $("#upload_from_url_container_help").html("Sorry, can't download");
    }

    return true;
} */

/**function HandleRelatedImage(oButton, sRelatedImage) {
    var oImage = document.getElementById(sRelatedImage);
    $("#upload_from_url_container_help").html('sRelatedImage');

    if (!oImage) {
        $("#upload_from_url_container_help").html("related image '" + sRelatedImage + "' does not exist");
        return false;
    }

    return DownloadImage(sRelatedImage);
} */
