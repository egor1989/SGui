var ctx;

$().ready(function () {
});

function startMath() {
	$('#crowlerCondition').text("Запущен");
	$.ajax({
            type: 'POST',
			url: '/start/',
            data: ' ',
            success: function () { 
			}
        });
}
