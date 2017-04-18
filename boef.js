// Module Boef
Boef = (function() {
    var emitters = [];
    var sensors = [];
    var rijen = [];
    var normaleGrondGeluidsSnelheid = 4176;
    var grondStofGeluidsSnelheid = 1493;
    var reactieTijd;

    function haversineDistance(emit, sens) {
        function toRad(x) {
            return x * Math.PI / 180;
        }
        var lon1, lon2, lat1, lat2, d, R;
        lon1 = toRad(emit.longitude);
        lat1 = toRad(emit.latitude);
        lon2 = toRad(sens.longitude);
        lat2 = toRad(sens.latitude);
        R = 6371;

        d = R*inverseHaversine(haversine(lat2-lat1) +
        Math.cos(lat1)*Math.cos(lat2)*haversine(lon2-lon1));

        return d*1000;
    }

    function haversine(x) {
        return Math.pow(Math.sin(x/2),2);
    }

    function inverseHaversine(x) {
        return 2*Math.asin(Math.sqrt(x));
    }

    return {
        plaatsEmitter: function(latitude, longitude) {
            emitters.push({ latitude:latitude, longitude:longitude })
        },
        plaatsSensoren: function(latitude, longitude, aantal){
            for(var i = 0; i<aantal; i++){
                sensors.push({ latitude:latitude+i*(latitude-emitters[0].latitude), longitude:longitude+i*(longitude-emitters[0].longitude),
                    afstand: function(){
                        return haversineDistance(emitters[0], this);
                    },
                    pulse: function(reactieTijd){
                        this.reactieTijd = reactieTijd;
                    },
                    aantalMeterGrondstof: function(){
                        var meterGrondstof = (this.reactieTijd - (this.afstand()/normaleGrondGeluidsSnelheid))/
                            (1/grondStofGeluidsSnelheid -1/normaleGrondGeluidsSnelheid);
                        return meterGrondstof;
                    }
                })
            }
            rijen.push(sensors);
        },
        plaatsSensor: function(latitude, longitude) {
            sensors.push({ latitude:latitude, longitude:longitude,
                afstand: function(){
                    return haversineDistance(emitters[0], this);
                },
                pulse: function(reactieTijd){
                    this.reactieTijd = reactieTijd;
                },
                aantalMeterGrondstof: function(){
                   var meterGrondstof = (this.reactieTijd - (this.afstand()/normaleGrondGeluidsSnelheid))/
                        (1/grondStofGeluidsSnelheid -1/normaleGrondGeluidsSnelheid);
                   return meterGrondstof;
                }
            })
        },
        emitters: function(){
            return emitters;
        },
        sensors: function(){
            return sensors;
        },
        rijen: function() {
            return rijen;
        },
        reset: function(){
            emitters = [];
            sensors = [];
            rijen = [];
        }
    }
})();
