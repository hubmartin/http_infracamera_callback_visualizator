

function decode(msg)
{

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("infrared"))
    {
      infrared = msg.data.sensor.infrared;
      samples = infrared.temperature.samples;

      min = infrared.temperature.min;
      max = infrared.temperature.max;

      var cell = new Array();
      tableCreate(infrared.width, infrared.height, cell);
      //console.log(samples);
      var i = 0;
      for (var k in samples) {
        value = samples[k];
        cell[i].innerText = value;
        colorIndex = Math.floor(map(Number(value), min, max, 0, 255));
        cell[i].style.background = colorMap[colorIndex];
        i++;
      }
    }        

    if (msg.data.hasOwnProperty("frame") && msg.data.frame.hasOwnProperty("sequence"))
      document.getElementById("sequence").innerText = msg.data.frame.sequence;

    if (msg.data.hasOwnProperty("battery"))
      document.getElementById("voltage1").innerText = msg.data.battery.voltage1;

    if (msg.data.hasOwnProperty("battery"))
      document.getElementById("voltage2").innerText = msg.data.battery.voltage2;
    
    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("hygrometer"))
    {
      document.getElementById("temperature").innerText = msg.data.sensor.hygrometer.temperature;
      document.getElementById("humidity").innerText = msg.data.sensor.hygrometer.humidity;
    }

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("luxmeter"))
      document.getElementById("luxmeter").innerText = msg.data.sensor.luxmeter.luminance;
/*
    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("pir"))
      document.getElementById("motion_count").innerText = msg.data.sensor.pir.count;

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("co2") && msg.data.sensor.co2.hasOwnProperty("concentration"))
      document.getElementById("co2").innerText = msg.data.sensor.co2.concentration;
*/
    // Protobuf
    // ------------------

    // sequence is the same

    // Battery
    if (msg.data.hasOwnProperty("voltage"))
      document.getElementById("voltage1").innerText = msg.data.voltage.battery;

    if (msg.data.hasOwnProperty("external"))
      document.getElementById("voltage2").innerText = msg.data.voltage.external;

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("temperature"))
      document.getElementById("temperature").innerText = msg.data.sensor.temperature;

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("humidity"))
      document.getElementById("humidity").innerText = msg.data.sensor.humidity;

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("luminance"))
      document.getElementById("luxmeter").innerText = msg.data.sensor.luminance;

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("pir"))
      document.getElementById("motion_count").innerText = msg.data.sensor.pir;

    if (msg.data.hasOwnProperty("sensor") && msg.data.sensor.hasOwnProperty("co2"))
      document.getElementById("co2").innerText = msg.data.sensor.co2;

    // Infra
    if (msg.data.hasOwnProperty("infrared"))
    {
      infrared = msg.data.infrared;
      samples = infrared.temperature.samples;

      min = infrared.temperature.min;
      max = infrared.temperature.max;

      var cell = new Array();
      tableCreate(infrared.width, infrared.height, cell);
      //console.log(samples);
      var i = 0;
      for (var k in samples) {
        value = samples[k];
        cell[i].innerText = value.toFixed(2);
        colorIndex = Math.floor(map(Number(value), min, max, 0, 255));
        cell[i].style.background = colorMap[colorIndex];
        i++;
      }
    }     
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { decode };
}