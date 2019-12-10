let ProgressBar = require('progressbar.js');

if ($('#currentBalanceCircle').length > 0) {
    var bar = new ProgressBar.Circle(currentBalanceCircle, {
        color: '#aaa',
        strokeWidth: 9,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {color: '#aa3026', width: 1},
        to: {color: '#29b92b', width: 9},
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + '%');
            }

        }
    });
    bar.text.style.fontFamily = '"Futura-Pt", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';

    bar.animate(externalModule);
}
