// Load the Visualization API and the piechart package.
google.load('visualization', '1', {
  'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

function drawChart() {
  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Posts');

  {% for post in site.posts %}
  data.addRow([new Date({{ post.date | date: '%s' }} * 1000), 1]);
  {% endfor %}

  function floorDate(date) {
    var newDate = new Date(date);
    newDate.setDate(1);
    newDate.setHours(0);
    return newDate;
  }

  var aggregate = google.visualization.data.group(data, [{
    column: 0,
    modifier: floorDate,
    type: 'date'
  }], [{
    column: 1,
    aggregation: google.visualization.data.sum,
    type: 'number'
  }]);

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

  var options = {
    title: 'Posts/month',
    legend: {
      position: 'none'
    },
    hAxis: {
      gridlines: {
        color: 'transparent'
      }
    },
    vAxis: {
      gridlines: {
        color: 'transparent'
      }
    },
    animation:{
      startup: true,
      duration: 2000,
      easing: 'out',
    }
  };

  chart.draw(aggregate, options);
}

$(document).ready(function() {
  $(window).resize(function() {
    drawChart();
  });
});
