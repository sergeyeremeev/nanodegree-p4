onmessage = function (e) {
    var scrolledTop = e.data,
        phaseCalc,
        // use formula from main.js to calculate maximum number of pizzas needed
        maxPizzasTotal = 8 * Math.ceil(1280 / (256 + 74));

    for (var i = 0; i < maxPizzasTotal; i++) {
        phase = Math.sin((scrolledTop / 1250) + (i % 5));
    }
    postMessage(phase);
};
