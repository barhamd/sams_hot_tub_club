$(document).foundation();

$(document).ready(function() {

  var waterId = '5727c2c67625421538f0c89d';
  var airId = '5727cc0e76254261927edb50';
  var token = 'ehZ7AgQeVZd0zI2HbYeraxdlCEQcgx';
  var waterUrl = 'http://things.ubidots.com/api/v1.6/variables/' + waterId + '/?token=' + token;
  var airUrl = 'http://things.ubidots.com/api/v1.6/variables/' + airId + '/?token=' + token;

  var logTemp = function() {
    $.ajax({
      url: waterUrl,
      error: function() {
        console.log('ERROR');
      },
      dataType: 'json',
      success: function(data) {
        var $waterTemp = data.last_value.value;
        $('#water-temp').html(Math.round($waterTemp));
      },
      type: 'GET'
    });

    $.ajax({
      url: airUrl,
      error: function() {
        console.log('ERROR');
      },
      dataType: 'json',
      success: function(data) {
        var $waterTemp = data.last_value.value;
        $('#air-temp').html($waterTemp);
      },
      type: 'GET'
    });
  };
  logTemp();
  setInterval(logTemp, 60000);
});
