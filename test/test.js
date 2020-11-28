var assert = require('assert');
const fs = require('fs');

const decode = require("../public/decode");

var expect = require('chai').expect;

var outobj = {
    "sequence": {},
    "voltage1": {},
    "voltage2": {},
    "temperature": {},
    "humidity": {},
    "luxmeter": {},
    "motion_count": {},
    "co2": {}
}

describe('JSON', function() {
  describe('#compare', function() {
    it('should return -1 when the value is not present', function() {
        
        var files = ["payload_pb_sensor.json", "payload_sensors.json"];

        for(file in files)
        {
            filename = files[file];
            msg =  JSON.parse(fs.readFileSync(filename, 'utf8'));
            

            global.document = {getElementById: (id) => {
                console.log("set " + id)
                return outobj[id];
            }};

            decode.decode(msg);

            if (msg.data.hasOwnProperty("frame") && msg.data.frame.hasOwnProperty("sequence"))
                document.getElementById("sequence").innerText = msg.data.frame.sequence;

            console.log(JSON.stringify(outobj));

            cmp_msg =  JSON.parse(fs.readFileSync('test/compare/' + filename, 'utf8'));
            console.log(JSON.stringify(cmp_msg));

            expect(outobj).to.deep.equal(cmp_msg);
        }

    });
  });
});


function tableCreate(width, height, cell) {

}