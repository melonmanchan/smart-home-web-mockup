function createGauge(gaugeSelector, plusButtonSelector, negativeButtonSelector) {
    var gauge = new Gauge(document.getElementById(gaugeSelector));
    var currentGauge = 0.75;
    gauge.value(currentGauge);

    var plusButton = $(plusButtonSelector);
    var negButton = $(negativeButtonSelector);

    var plusButtonTimeout = Math.ceil(Math.random() * 10000);
    var negButtonTimeout = Math.ceil(Math.random() * 10000);

    var posClick = function() {
        if (currentGauge >= 1) return;
        currentGauge += 0.05
        gauge.value(currentGauge);

        if (currentGauge >= 1)  {
            plusButton.attr('disabled', true);
            clearInterval(plusButtonTimeout);
        } else {
            negButton.attr('disabled', false);
        }
    }

    var negClick = function() {
        if (currentGauge <= 0) return;

        currentGauge -= 0.05
        gauge.value(currentGauge);

        if (currentGauge <= 0)  {
            negButton.attr('disabled', true);
            clearInterval(negButtonTimeout);
        } else {
            plusButton.attr('disabled', false);
        }
    }

    plusButton.on('mousedown', function(e) {
        posClick();
        plusButtonTimeout = setInterval(posClick, 500);

        return false;
    }).on('mouseup mouseleave', function() {
        clearInterval(plusButtonTimeout);
    });

    negButton.on('mousedown', function(e) {
        negClick();
        negButtonTimeout = setInterval(negClick, 500);

        return false;
    }).on('mouseup mouseleave', function() {
        clearInterval(negButtonTimeout);
    });


}
