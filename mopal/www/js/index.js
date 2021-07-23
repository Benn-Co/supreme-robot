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
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    $("#sentiment_form").show(100); 

}
$("#sentiment_text_btn").click(function(){
    var text = $("#sentiment_text").show(100);
    var request = $("#sentiment_request").show(100);
    if (text != '' && request != '') {
        mopal(request,text);
    } else {
        $(".received").html('<div class="message stark">Provide the text</div>');
    }
});
var request = "sentiment";
const sentiment_text_strategy = document.querySelector('#sentiment_request');
sentiment_text_strategy.addEventListener('change', (event) => {
    if ($("#sentiment_text").val() != '' && $("#sentiment_text").val() != null) {
        $("#sentiment_text").removeClass("is-invalid");
        $("#sentiment_text").addClass("is-valid"); 
        request = event.target.value;
        var text = $("#sentiment_text").val();
        mopal(request,text);      
    } else {
        $(".received").html('<div class="message stark">Provide the text</div>');
        $("#sentiment_text").removeClass("is-valid");
        $("#sentiment_text").addClass("is-invalid");
    }    
});
const sentiment_text_input = document.querySelector('#sentiment_text');
sentiment_text_input.addEventListener('input', sentiment_text);
function sentiment_text(e) {
    if (e.target.value != "" && e.target.value != null) {
        $("#sentiment_text").removeClass("is-invalid");
        $("#sentiment_text").addClass("is-valid");
        var text = e.target.value;
        mopal(request,text);
    } else {
        $(".received").html('<div class="message stark">Provide the text</div>');
        $("#sentiment_text").removeClass("is-valid");
        $("#sentiment_text").addClass("is-invalid");
    }
}

//$(".objectclass").click(function(){
$("body").delegate(".objectclasslist","click",function(event){
    event.preventDefault();
    $("#"+ $(this).attr('classlist_id') + "").toggle(100);
});

function mopal(request,text) {
    var mopaltext = text;    
    var mopalrequestt = request;
    $(".received").html('<div class="message stark">Initializing ' + mopalrequestt + '.</div>');
    $.ajax({
        type: "POST", // Type of request to be send, called as
        dataType: 'json',
        data: { mopal: 12,request: mopalrequestt,text: mopaltext },
        processData: true,
        url: 'https://oramla.com/sentiment.php',
        success: function searchSuccess(response) {
            try {
                if (response.message != "fail") {                    
                    $(".received").html('');
                    receivedobj(response.result);
                } else {
                    $(".received").html('<div class="message stark">' + response.text + '</div>');
                 
                }           
            } catch(e) {
                $(".received").html('<div class="message stark">Json persing error</div>');
            }
        },
        error: function searchError(xhr, err) {
            $(".received").html('<div class="message stark">Error on ajax call: ' + err  + ' ' + JSON.stringify(xhr) + '</div>');
        }
    });

}

function receivedobj(obj) {
    const myObj = JSON.parse(obj);
    var myJSON = myObj;                       
    for (let x in myObj) {
        if (typeof myObj[x] == 'object') {
            var myJSON = JSON.stringify(myObj[x]);                    
            const myObj1 = JSON.parse(myJSON);

            var received = '<li class="objectclasslist" classlist_id="' + x + '" >' +
            '<a>' +
            //'<img src="https://oramla.com/img/logo.png">' +
            '<h5>' + x + '</h5>' +
            '<div id="' + x + '" class=""></div>' +
            '</a>' +
            '</li>';
            $(".received").append(received);

            for (let x1 in myObj1) {
                if (typeof myObj1[x1] == 'object') {
                    var myJSON = JSON.stringify(myObj1[x1]);                    
                    const myObj2 = JSON.parse(myJSON);
                    var received = '<span class="objectclasslist" classlist_id="' + x1 + '" >' +
                    '<a>' +
                    //'<img src="https://oramla.com/img/logo.png">' +
                    '<h5>' + x1 + '</h5>' +
                    '<div id="' + x1 + '" class=""></div>' +
                    '</a>' +
                    '</span>';
                    $("#" + x + "").append(received);
                    for (let x2 in myObj2) {
                        if (typeof myObj2[x2] == 'object') {
                            var myJSON = JSON.stringify(myObj2[x2]);                    
                            const myObj3 = JSON.parse(myJSON);
                            var received = '<span class="objectclasslist" classlist_id="' + x1 + '" >' +
                            '<a>' +
                            //'<img src="https://oramla.com/img/logo.png">' +
                            '<h5>' + x2 + '</h5>' +
                            '<div id="' + x2 + '" class=""></div>' +
                            '</a>' +
                            '</span>';
                            $("#" + x1 + "").append(received);
                            for (let x3 in myObj3) { 
                                if (typeof myObj3[x3] == 'object') {
                                    var myJSON = JSON.stringify(myObj3[x3]);                    
                                    const myObj4 = JSON.parse(myJSON);
                                    var received = '<span class="objectclasslist" classlist_id="' + x2 + '" >' +
                                    '<a>' +
                                    //'<img src="https://oramla.com/img/logo.png">' +
                                    '<h5>' + x3 + '</h5>' +
                                    '<div id="' + x3 + '" class=""></div>' +
                                    '</a>' +
                                    '</span>';
                                    $("#" + x2 + "").append(received);
                                    for (let x4 in myObj4) { 
                                        if (typeof myObj4[x4] == 'object') {
                                            var myJSON = JSON.stringify(myObj4[x4]);                    
                                            const myObj5 = JSON.parse(myJSON);
                                            var received = '<span class="objectclasslist" classlist_id="' + x3 + '" >' +
                                            '<a>' +
                                            //'<img src="https://oramla.com/img/logo.png">' +
                                            '<h5>' + x4 + '</h5>' +
                                            '<div id="' + x4 + '" class=""></div>' +
                                            '</a>' +
                                            '</span>';
                                            $("#" + x3 + "").append(received);
                                            for (let x5 in myObj5) {                                                
                                                var received = '<span>' +
                                                '<h5>' + x5 + ' <strong>' + myObj5[x5] + '</strong></h5>' +
                                                '</span>' +
                                                '<br>';
                                                $("#" + x4 + "").append(received);
                                            };
                                        } else {                                                    
                                            var received = '<span>' +
                                            '<h5>' + x4 + ' <strong>' + myObj4[x4] + '</strong></h5>' +
                                            '</span>' +
                                            '<br>';
                                            $("#" + x3 + "").append(received);
                                        }
                                        
                                    };
                                } else {                                                    
                                    var received = '<span>' +
                                    '<h5>' + x3 + ' <strong>' + myObj3[x3] + '</strong></h5>' +
                                    '</span>' +
                                    '<br>';
                                    $("#" + x2 + "").append(received);
                                }                                                
                            };
                        } else {
                            var received = '<span>' +
                            '<h5>' + x2 + ' <strong>' + myObj2[x2] + '</strong></h5>' +
                            '</span>' +
                            '<br>';
                            $("#" + x1 + "").append(received);
                        }
                    };
                } else {
                    var received = '<span>' +
                    '<h5>' + x1 + ' <strong>' + myObj1[x1] + '</strong></h5>' +
                    '</span>' +
                    '<br>';
                    $("#" + x + "").append(received);
                }                                
            }


        } else {
            var received = '<li>' +
            '<a>' +
            //'<img src="https://oramla.com/img/logo.png">' +
            '<h5>' + x + '</h5>' +
            '<p>' + myObj[x] + '</p>' +
            '</a>' +
            '</li>';
            $(".received").append(received);
        }                      
    }
}