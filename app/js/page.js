$(document).ready(function () {
    $('.light-slider').on('input', function (e) {
        var val = this.value;
        var elem = $(this).data('room')
        $('.' + elem).html(val + '%');
        $('.' + elem + '-card').css({ boxShadow: '0px 0px ' + val / 3 + 'px #fff' });
    });
});
