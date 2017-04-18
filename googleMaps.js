var map, marker;
var aantal = 10;
Boef.plaatsEmitter(52.102346, 5.175269);
Boef.plaatsSensoren(52.101448,5.175354, aantal);
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: (Boef.emitters()[0].latitude + Boef.rijen()[0][aantal-1].latitude)/2,
                 lng: (Boef.emitters()[0].longitude + Boef.rijen()[0][aantal-1].longitude)/2},
        zoom: 15
    });
    marker = new google.maps.Marker({
        position: {lat: Boef.emitters()[0].latitude, lng: Boef.emitters()[0].longitude},
        map: map
    });
    for(var i=0; i<aantal; i++){
            marker = new google.maps.Marker({
            position: {lat: Boef.rijen()[0][i].latitude, lng: Boef.rijen()[0][i].longitude},
            map: map
        });

    }
}
