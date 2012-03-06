var ctx;

$().ready(function () {
});

function startUpload() {
	$('#fileCondition').text("Upload");
	$.ajax({
            type: 'POST',
			url: '/start/',
            data: ' ',
            success: function () { 
			}
        });
}

function startMath() {
	$('#mathCondition').text("Working on Math");
	$.ajax({
            type: 'POST',
			url: '/start/',
            data: ' ',
            success: function () { 
			$('#mathCondition').text("Math finished");
			}
        });
}
