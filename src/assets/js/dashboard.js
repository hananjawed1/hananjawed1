

new Morris.Bar({
    element: "monthly-chart",
    data: [{
        y: 'Jan', a: 10, b: 5
    }, {
        y: 'Feb', a: 15, b: 2
    }, {
        y: 'Mar', a: 40, b: 6
    }, {
        y: 'Apr', a: 50, b: 80
    }, {
        y: 'May', a: 80, b: 10
    }, {
        y: 'Jun', a: 100, b: 20
    }, {
        y: 'Jul', a: 50, b: 0
    }, {
        y: 'Aug', a: 30, b: 11
    }, {
        y: 'Sep', a: 45, b: 22
    }, {
        y: 'Oct', a: 33, b: 3
    }, {
        y: 'Nov', a: 88, b: 60
    }, {
        y: 'Dec', a: 81, b: 20
    }
    ],
    xkey: "y",
    ykeys: ["a", "b"],
    labels: ["Approved", "Rejected"],
    barColors: ['#3D5B43', '#F07621'],
    gridLineColor: 'rgba(77, 138, 240, .2)',
});



new Morris.Bar({
    element: "monthly-chart-1",
    data: [{
        y: 'Jan', a: 10, b: 5, c: 5
    }, {
        y: 'Feb', a: 15, b: 2, c: 2
    }, {
        y: 'Mar', a: 40, b: 6, c: 8
    }, {
        y: 'Apr', a: 50, b: 80, c: 10
    }, {
        y: 'May', a: 80, b: 10, c: 10
    }, {
        y: 'Jun', a: 100, b: 20, c: 50
    }, {
        y: 'Jul', a: 50, b: 0, c: 20
    }, {
        y: 'Aug', a: 30, b: 11, c: 22
    }, {
        y: 'Sep', a: 45, b: 22, c: 25
    }, {
        y: 'Oct', a: 33, b: 3, c: 30
    }, {
        y: 'Nov', a: 88, b: 60, c: 28
    }, {
        y: 'Dec', a: 81, b: 20, c: 29
    }
    ],
    xkey: "y",
    ykeys: ["a", "b", "c"],
    labels: ["Economic", "Police", "Military"],
    barColors: ['#3D5B43', '#F07621', '#FFB22B'],
    gridLineColor: 'rgba(77, 138, 240, .2)',
});
