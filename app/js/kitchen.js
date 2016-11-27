$(document).ready(function () {
    var gauge = new Gauge(document.getElementById('kitchenTemp'));
    var currentGauge = 0.75;
    gauge.value(currentGauge);

    var plusButton = $('#kitchen .plus-button');
    var negButton = $('#kitchen .neg-button');

    plusButton.on('click', function(event) {
        if (currentGauge >= 1) return;
        currentGauge += 0.05
        gauge.value(currentGauge);

        if (currentGauge >= 1)  {
            $(this).attr('disabled', true);
        } else {
            negButton.attr('disabled', false);
        }
    });

    negButton.on('click', function(event) {
        if (currentGauge <= 0) return;

        currentGauge -= 0.05
        gauge.value(currentGauge);

        if (currentGauge <= 0)  {
            $(this).attr('disabled', true);
        } else {
            plusButton.attr('disabled', false);
        }

    });
});
