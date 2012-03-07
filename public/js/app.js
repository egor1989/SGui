var ctx;

$().ready(function () {
});

function startMath() {
	$('#mathCondition').text("Working on Math");
	$.ajax({
            type: 'POST',
			url: '/start/',
            data: ' ',
            success: function (r) { 
				$('#mathCondition').text("Math finished");
				console.log(r.log);
				buildReport(r.log);
				$.ajax({ url: '/stop' });
			}
        });
}
function buildReport(report){
  console.log("asfaf");
  var i, j;
  var fullContent;
  var stringContent = new Array;
  var reportArr=report.split("\n");
  fullContent = "<table><tr><th>index</th><th>start time</th><th>duration</th><th>result</th></tr>"
  for ( i = 0; i<reportArr.length - 1; i++){
    var reportEl = reportArr[i].split(";");
    fullContent += "<tr><td>"+ i +"</td>";
	for (j = 0; j<reportEl.length; j++){
		fullContent+="<td>"+ reportEl[j] +"</td>"
	}
	fullContent += "</tr>";
  }
  fullContent+="</table>";
  $("#reportItem").html(fullContent);
  console.log(fullContent);
}  