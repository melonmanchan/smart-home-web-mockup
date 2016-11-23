$(document).ready(function () {
    $('.light-slider').on('input', function (e) {
        var val = this.value;
        var elem = $(this).data('room')
        $('.' + elem).html(val + '%');
    });
});
