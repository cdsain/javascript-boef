(function() {
    describe("De Boef namespace", function() {
        it("zou moeten bestaan", function() {
            expect(Boef).toBeDefined();
        });
    });

    describe("Een emitter", function(){
        it("zou toegevoegd moeten zijn", function(){
            Boef.plaatsEmitter(52.102403, 5.175269);
            expect(Boef.emitters().length).toBe(1);
        });
    });

    describe("De sensoren", function(){
        it("zouden moeten zijn toegevoegd", function(){
            Boef.plaatsSensor(52.102001, 5.173681);
            Boef.plaatsSensor(52.101388, 5.176438);
            Boef.plaatsSensor(52.101019, 5.175151);
            expect(Boef.sensors().length).toBe(3);
        });
    });

    describe("Een emitter", function(){
        beforeEach(function(){
            Boef.reset();
        })
        it("zou op ongeveer 100 meter afstand van de sensor moeten staan", function(){
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.101448,5.175354);
            expect(Boef.sensors()[0].afstand()).toBeCloseTo(100, 0);
        });
        it("zou op ongeveer 200 meter afstand van de sensor moeten staan", function(){
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.100552,5.175363);
            expect(Boef.sensors()[0].afstand()).toBeCloseTo(200, 0);
        });
        it("zou op ongeveer 300 meter afstand van de sensor moeten staan", function(){
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.099647,5.175377);
            expect(Boef.sensors()[0].afstand()).toBeCloseTo(300, 0);
        });
    });

    describe("De sensor", function() {
        beforeEach(function(){
            Boef.reset();
        })
        it("zou 100 meter normale grond moeten detecteren", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0239463601532567);
            expect(Boef.sensors()[0].aantalMeterGrondstof()).toBeCloseTo(0.00, 0);
        });

        it("zou 100 meter grondstof moeten detecteren", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0669792364367046);
            expect(Boef.sensors()[0].aantalMeterGrondstof()).toBeCloseTo(100.00, 0);
        });

        it("zou 50 meter grondstof moeten detecteren", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0454627982949807);
            expect(Boef.sensors()[0].aantalMeterGrondstof()).toBeCloseTo(50.00, 0);
        });

        it("zou 20 meter grondstof moeten detecteren", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0325529354099463);
            expect(Boef.sensors()[0].aantalMeterGrondstof()).toBeCloseTo(20.00, 0);
        });

        it("zou 83 meter grondstof moeten detecteren", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0596636474685185);
            expect(Boef.sensors()[0].aantalMeterGrondstof()).toBeCloseTo(83.00, 0);
        });
    });

    describe("De rij", function() {
        beforeEach(function(){
            Boef.reset();
        })
        it("zou moeten bestaan", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensoren(52.101448, 5.175354, 1);
            expect(Boef.rijen().length).toBe(1);
        });
        it("zou 1 sensor moeten bevatten", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensoren(52.101448, 5.175354, 1);
            expect(Boef.rijen()[0].length).toBe(1);
        });
        it("zou 10 sensoren moeten bevatten", function () {
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensoren(52.101448, 5.175354, 10);
            expect(Boef.rijen()[0].length).toBe(10);
        });
        it("zou sensoren op 100 meter van elkaar moeten bevatten", function(){
            Boef.plaatsEmitter(52.102346, 5.175269);
            Boef.plaatsSensoren(52.101448,5.175354, 10);
            expect(Boef.rijen()[0][0].afstand()).toBeCloseTo(100, 0);
            expect(Boef.rijen()[0][1].afstand()).toBeCloseTo(200, 0);
            expect(Boef.rijen()[0][2].afstand()).toBeCloseTo(300, 0);
            expect(Boef.rijen()[0][3].afstand()).toBeCloseTo(400, 0);
            expect(Boef.rijen()[0][4].afstand()).toBeCloseTo(500, 0);
            expect(Boef.rijen()[0][5].afstand()).toBeCloseTo(600, 0);
            expect(Boef.rijen()[0][6].afstand()).toBeCloseTo(700, 0);
            expect(Boef.rijen()[0][7].afstand()).toBeCloseTo(800, 0);
            expect(Boef.rijen()[0][8].afstand()).toBeCloseTo(900, 0);
            expect(Boef.rijen()[0][9].afstand()).toBeCloseTo(1000, 0);
        });
    });

})();
