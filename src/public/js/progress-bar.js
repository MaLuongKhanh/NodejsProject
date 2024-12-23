(function ($) {
    'use strict';
    // ProgressBar JS Starts Here

    if ($('#circleProgress1').length) {
        var bar = new ProgressBar.Circle(circleProgress1, {
            color: '#ffffff',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: '#0090e7',
                width: 4,
            },
            to: {
                color: '#0090e7',
                width: 4,
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }
            },
        });

        bar.text.style.fontSize = '1rem';
        bar.animate(0.34); // Number from 0.0 to 1.0
    }

    if ($('#circleProgress2').length) {
        var bar = new ProgressBar.Circle(circleProgress2, {
            color: '#ffffff',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: '#00d25b',
                width: 4,
            },
            to: {
                color: '#00d25b',
                width: 4,
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }
            },
        });

        bar.text.style.fontSize = '1rem';
        bar.animate(0.54); // Number from 0.0 to 1.0
    }

    if ($('#circleProgress3').length) {
        var bar = new ProgressBar.Circle(circleProgress3, {
            color: '#ffffff',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: '#aaa',
                width: 4,
            },
            to: {
                color: '#f96868',
                width: 4,
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }
            },
        });

        bar.text.style.fontSize = '1rem';
        bar.animate(0.45); // Number from 0.0 to 1.0
    }

    if ($('#circleProgress4').length) {
        var bar = new ProgressBar.Circle(circleProgress4, {
            color: '#ffffff',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: '#fc424a',
                width: 4,
            },
            to: {
                color: '#fc424a',
                width: 4,
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }
            },
        });

        bar.text.style.fontSize = '1rem';
        bar.animate(0.27); // Number from 0.0 to 1.0
    }

    if ($('#circleProgress5').length) {
        var bar = new ProgressBar.Circle(circleProgress5, {
            color: '#ffffff',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: '#ffab00',
                width: 4,
            },
            to: {
                color: '#ffab00',
                width: 4,
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }
            },
        });

        bar.text.style.fontSize = '1rem';
        bar.animate(0.67); // Number from 0.0 to 1.0
    }

    if ($('#circleProgress6').length) {
        var bar = new ProgressBar.Circle(circleProgress6, {
            color: '#ffffff',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false,
            },
            from: {
                color: '#8f5fe8',
                width: 4,
            },
            to: {
                color: '#8f5fe8',
                width: 4,
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }
            },
        });

        bar.text.style.fontSize = '1rem';
        bar.animate(0.95); // Number from 0.0 to 1.0
    }
})(jQuery);
