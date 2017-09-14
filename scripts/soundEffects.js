/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupAudio() {
    var audiotag = '<audio class="audio" id="audio1" controls="controls" src="http://192.168.1.100/EVpos/Sounds/button7.mp3" type="audio/mpeg">';
    var audiotag2 = '<audio class="audio" id="audio2" controls="controls" src="http://192.168.1.100/EVpos/Sounds/button6.mp3" type="audio/mpeg">';

    
    $(audiotag).appendTo("body");
    $(audiotag2).appendTo("body");

    $(".audio").hide();
}

function playButtonAudio() {
    var val = getRandomInt(0, 1);
    if (val === 0) {
            var audio = document.getElementById("audio1");
            audio.play();
    }
    else
    {
            var audio = document.getElementById("audio1");
            audio.play();
    }
}


$(document).ready(function() {
    setupAudio();
    $('.sfx').live('click', function(e){ 
        //We use the filename of our link as our id
        playButtonAudio();
        
        //alert(e.target.id);
    });
});