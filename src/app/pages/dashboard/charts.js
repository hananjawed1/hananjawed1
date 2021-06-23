// const init = () => {

//   /* Dashboard content */
//   $('#compositeline').sparkline('html', {
//     lineColor: 'rgba(255, 255, 255, 0.6)',
//     lineWidth: 2,
//     spotColor: false,
//     minSpotColor: false,
//     maxSpotColor: false,
//     highlightSpotColor: null,
//     highlightLineColor: null,
//     fillColor: 'rgba(255, 255, 255, 0.2)',
//     chartRangeMin: 0,
//     chartRangeMax: 20,
//     width: '100%',
//     height: 30,
//     disableTooltips: true
//   });
//   $('#compositeline2').sparkline('html', {
//     lineColor: 'rgba(255, 255, 255, 0.6)',
//     lineWidth: 2,
//     spotColor: false,
//     minSpotColor: false,
//     maxSpotColor: false,
//     highlightSpotColor: null,
//     highlightLineColor: null,
//     fillColor: 'rgba(255, 255, 255, 0.2)',
//     chartRangeMin: 0,
//     chartRangeMax: 20,
//     width: '100%',
//     height: 30,
//     disableTooltips: true
//   });
//   $('#compositeline3').sparkline('html', {
//     lineColor: 'rgba(255, 255, 255, 0.6)',
//     lineWidth: 2,
//     spotColor: false,
//     minSpotColor: false,
//     maxSpotColor: false,
//     highlightSpotColor: null,
//     highlightLineColor: null,
//     fillColor: 'rgba(255, 255, 255, 0.2)',
//     chartRangeMin: 0,
//     chartRangeMax: 30,
//     width: '100%',
//     height: 30,
//     disableTooltips: true
//   });
//   $('#compositeline4').sparkline('html', {
//     lineColor: 'rgba(255, 255, 255, 0.6)',
//     lineWidth: 2,
//     spotColor: false,
//     minSpotColor: false,
//     maxSpotColor: false,
//     highlightSpotColor: null,
//     highlightLineColor: null,
//     fillColor: 'rgba(255, 255, 255, 0.2)',
//     chartRangeMin: 0,
//     chartRangeMax: 20,
//     width: '100%',
//     height: 30,
//     disableTooltips: true
//   });
//   /* Dashboard content closed*/


//   /* Apexcharts (#bar) */
//   var optionsBar = {
//     chart: {
//       height: 249,
//       type: 'bar',
//       toolbar: {
//         show: false,
//       },
//       fontFamily: 'Nunito, sans-serif',
//       // dropShadow: {
//       //   enabled: true,
//       //   top: 1,
//       //   left: 1,
//       //   blur: 2,
//       //   opacity: 0.2,
//       // }
//     },
//     colors: ["#036fe7", '#f93a5a', '#f7a556'],
//     plotOptions: {
//       bar: {
//         dataLabels: {
//           enabled: false
//         },
//         columnWidth: '42%',
//         endingShape: 'rounded',
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       endingShape: 'rounded',
//       colors: ['transparent'],
//     },
//     responsive: [{
//       breakpoint: 576,
//       options: {
//         stroke: {
//           show: true,
//           width: 1,
//           endingShape: 'rounded',
//           colors: ['transparent'],
//         },
//       },


//     }],
//     series: [{
//       name: 'Impressions',
//       data: [74, 85, 57, 56, 76, 35, 61, 98, 36, 50, 48, 29, 57]
//     }, {
//       name: 'Turnover',
//       data: [46, 35, 101, 98, 44, 55, 57, 56, 55, 34, 79, 46, 76]
//     }, {
//       name: 'In progress',
//       data: [26, 35, 41, 78, 34, 65, 27, 46, 37, 65, 49, 23, 49]
//     }],
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
//     },
//     fill: {
//       opacity: 1
//     },
//     legend: {
//       show: false,
//       floating: true,
//       position: 'top',
//       horizontalAlign: 'left',


//     },

//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return "$ " + val + " thousands"
//         }
//       }
//     }
//   }
//   if (document.querySelector('#bar'))
//     new ApexCharts(document.querySelector('#bar'), optionsBar).render();

//   /* Apexcharts (#bar) closed */


//   /*--- Apex (#spark1) ---*/
//   var spark1 = {
//     chart: {
//       id: 'spark1',
//       group: 'sparks',
//       type: 'line',
//       height: 38,
//       sparkline: {
//         enabled: true
//       },
//       dropShadow: {
//         enabled: true,
//         top: 1,
//         left: 1,
//         blur: 1,
//         opacity: 0.1,
//       }
//     },
//     series: [{
//       data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
//     }],
//     stroke: {
//       curve: 'smooth'
//     },
//     markers: {
//       size: 0
//     },
//     grid: {
//       padding: {
//         top: 10,
//         bottom: 10,
//         left: 50
//       }
//     },
//     colors: ['#0a9ae1'],
//     stroke: {
//       width: 2
//     },
//     tooltip: {
//       x: {
//         show: false,
//         width: 1,
//       },
//       y: {
//         title: {
//           formatter: function formatter(val) {
//             return '';
//           }
//         }
//       }
//     }
//   }
//   /*--- Apex (#spark1) closed ---*/

//   /*--- Apex (#spark2) ---*/
//   var spark2 = {
//     chart: {
//       id: 'spark2',
//       group: 'sparks',
//       type: 'line',
//       height: 38,
//       sparkline: {
//         enabled: true
//       },
//       dropShadow: {
//         enabled: true,
//         top: 1,
//         left: 1,
//         blur: 1,
//         opacity: 0.1,
//       }
//     },
//     series: [{
//       data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
//     }],
//     stroke: {
//       curve: 'smooth'
//     },
//     grid: {
//       padding: {
//         top: 10,
//         bottom: 10,
//         left: 50
//       }
//     },
//     markers: {
//       size: 0
//     },
//     colors: ['#ff516e'],
//     stroke: {
//       width: 2
//     },
//     tooltip: {
//       x: {
//         show: false
//       },
//       y: {
//         title: {
//           formatter: function formatter(val) {
//             return '';
//           }
//         }
//       }
//     }
//   }
//   /*--- Apex (#spark2) closed ---*/

//   /*--- Apex (#spark3) ---*/
//   var spark3 = {
//     chart: {
//       id: 'spark3',
//       group: 'sparks',
//       type: 'line',
//       height: 38,
//       sparkline: {
//         enabled: true
//       },
//       dropShadow: {
//         enabled: true,
//         top: 1,
//         left: 1,
//         blur: 1,
//         opacity: 0.1,
//       }
//     },
//     series: [{
//       data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
//     }],
//     stroke: {
//       curve: 'smooth'
//     },
//     markers: {
//       size: 0
//     },
//     grid: {
//       padding: {
//         top: 10,
//         bottom: 10,
//         left: 50
//       }
//     },
//     colors: ['#28b98a'],
//     xaxis: {
//       crosshairs: {
//         width: 1
//       },
//     },
//     stroke: {
//       width: 2
//     },
//     tooltip: {
//       x: {
//         show: false
//       },
//       y: {
//         title: {
//           formatter: function formatter(val) {
//             return '';
//           }
//         }
//       }
//     }
//   }
//   /*--- Apex (#spark3) closed ---*/

//   /*--- Apex (#spark4) ---*/

//   var spark4 = {
//     chart: {
//       id: 'spark4',
//       group: 'sparks',
//       type: 'line',
//       height: 38,
//       sparkline: {
//         enabled: true
//       },
//       dropShadow: {
//         enabled: true,
//         top: 1,
//         left: 1,
//         blur: 1,
//         opacity: 0.1,
//       }
//     },
//     series: [{
//       data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
//     }],
//     stroke: {
//       curve: 'smooth'
//     },
//     markers: {
//       size: 0
//     },
//     grid: {
//       padding: {
//         top: 10,
//         bottom: 10,
//         left: 50
//       }
//     },
//     colors: ['#f48846'],
//     xaxis: {
//       crosshairs: {
//         width: 1
//       },
//     },
//     stroke: {
//       width: 2
//     },
//     tooltip: {
//       x: {
//         show: false
//       },
//       y: {
//         title: {
//           formatter: function formatter(val) {
//             return '';
//           }
//         }
//       }
//     }
//   }
//   /*--- Apex (#spark4) closed ---*/

//   /*--- Apex (#spark5) ---*/
//   var spark5 = {
//     chart: {
//       id: 'spark5',
//       group: 'sparks',
//       type: 'line',
//       height: 38,
//       sparkline: {
//         enabled: true
//       },
//       dropShadow: {
//         enabled: true,
//         top: 1,
//         left: 1,
//         blur: 1,
//         opacity: 0.1,
//       }
//     },
//     series: [{
//       data: [12, 25, 76, 35, 17, 43, 10, 26, 69, 31]
//     }],
//     stroke: {
//       curve: 'smooth'
//     },
//     markers: {
//       size: 0
//     },
//     grid: {
//       padding: {
//         top: 10,
//         bottom: 10,
//         left: 50
//       }
//     },
//     colors: ['#673ab7'],
//     xaxis: {
//       crosshairs: {
//         width: 1
//       },
//     },
//     stroke: {
//       width: 2
//     },
//     tooltip: {
//       x: {
//         show: false
//       },
//       y: {
//         title: {
//           formatter: function formatter(val) {
//             return '';
//           }
//         }
//       }
//     }
//   }


//   document.querySelector("#spark1") && new ApexCharts(document.querySelector("#spark1"), spark1).render();
//   document.querySelector("#spark2") && new ApexCharts(document.querySelector("#spark2"), spark2).render();
//   document.querySelector("#spark3") && new ApexCharts(document.querySelector("#spark3"), spark3).render();
//   document.querySelector("#spark4") && new ApexCharts(document.querySelector("#spark4"), spark4).render();
//   document.querySelector("#spark5") && new ApexCharts(document.querySelector("#spark5"), spark5).render();

//   /*--- Apex (#spark5) closed ---*/

//   /*--- Apex (#chart) ---*/
//   var options = {
//     chart: {
//       height: 205,
//       type: 'radialBar',
//       offsetX: 0,
//       offsetY: 0,
//     },
//     plotOptions: {
//       radialBar: {
//         startAngle: -135,
//         endAngle: 135,
//         size: 120,
//         imageWidth: 50,
//         imageHeight: 50,

//         track: {
//           strokeWidth: "80%",
//           background: '#ecf0fa',
//         },
//         dropShadow: {
//           enabled: false,
//           top: 0,
//           left: 0,
//           bottom: 0,
//           blur: 3,
//           opacity: 0.5
//         },
//         dataLabels: {
//           name: {
//             fontSize: '16px',
//             color: undefined,
//             offsetY: 30,
//           },
//           hollow: {
//             size: "60%"
//           },
//           value: {
//             offsetY: -10,
//             fontSize: '22px',
//             color: undefined,
//             formatter: function (val) {
//               return val + "%";
//             }
//           }
//         }
//       }
//     },
//     colors: ['#0db2de'],
//     fill: {
//       type: "gradient",
//       gradient: {
//         shade: "dark",
//         type: "horizontal",
//         shadeIntensity: .5,
//         gradientToColors: ['#005bea'],
//         inverseColors: !0,
//         opacityFrom: 1,
//         opacityTo: 1,
//         stops: [0, 100]
//       }
//     },
//     stroke: {
//       dashArray: 4
//     },
//     series: [83],
//     labels: [""]
//   };

//   if (document.querySelector("#chart")) {
//     var chart = new ApexCharts(document.querySelector("#chart"), options);
//     chart.render();
//   }
//   /*--- Apex (#chart)closed ---*/

//   /*--- Map ---*/
//   // $('#vmap2').vectorMap({
//   //   map: 'usa_en',
//   //   showTooltip: true,
//   //   backgroundColor: '#fff',
//   //   color: '#60adff',
//   //   colors: {
//   //     mo: '#9fceff',
//   //     fl: '#60adff',
//   //     or: '#409cff',
//   //     ca: '#005cbf',
//   //     tx: '#005cbf',
//   //     wy: '#005cbf',
//   //     ny: '#007bff'
//   //   },
//   //   hoverColor: '#222',
//   //   enableZoom: false,
//   //   borderWidth: 1,
//   //   borderColor: '#fff',
//   //   hoverOpacity: .85
//   // });
//   /*--- Map closed ---*/


//   var morrisData2 = [{
//     y: 'January',
//     a: 100,

//   }, {
//     y: 'Febuarary',
//     a: 75,

//   }, {
//     y: 'March',
//     a: 50,

//   }, {
//     y: 'April',
//     a: 75,

//   }, {
//     y: 'May',
//     a: 100,

//   }, {
//     y: 'June',
//     a: 75,

//   }, {
//     y: 'June',
//     a: 50,

//   }, {
//     y: 'August',
//     a: 75,

//   }, {
//     y: 'September',
//     a: 75,

//   }, {
//     y: 'October',
//     a: 80,

//   }, {
//     y: 'November',
//     a: 90,

//   }, {
//     y: 'December',
//     a: 100,

//   }];

// };
// module.exports = init;

export const agetSalesPointChart = (agentTotal, SalesPointTotal) => {
  if ($("#morrisDonut1").length) {
    new Morris.Donut({
      element: 'morrisDonut1',
      data: [{
        label: 'Agent',
        value: agentTotal
      }, {
        label: 'Salespoint',
        value: SalesPointTotal
      }],
      colors: ['#00592d', '#008757'],
      resize: true,
      labelColor: "#000000"
    });
  }
};

export const membershipTypeStatistics = (residents, tourists, diplomats) => {
    if ($("#morrisDonut2").length) {
      new Morris.Donut({
        element: 'morrisDonut2',
        data: [{
          label: 'RESIDENTS',
          value: residents
        }, {
          label: 'TOURISTS',
          value: tourists
        }, {
          label: 'DIPLOMATS',
          value: diplomats
        }],
        colors: ['#00592d', '#008757', '#f7557a'],
        resize: true,
        labelColor: "#000000"
      });
    }
};



//   /* LINE CHART */
export const membershipRequestPerWeekStatus = () => {
  var ctx8 = document.getElementById('chartLine1');
  if (ctx8) {
    new Chart(ctx8, {
      type: 'line',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          data: [12, 15, 18, 40, 35, 38, 32],
          borderColor: '#f7557a ',
          borderWidth: 1,
          fill: false
        }, {
          data: [10, 20, 25, 55, 50, 45, 35],
          borderColor: '#007bff',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              max: 80,
              fontColor: "rgba(171, 167, 167,0.9)",
            },
            gridLines: {
              display: true,
              color: 'rgba(171, 167, 167,0.2)',
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "rgba(171, 167, 167,0.9)",
            },
            gridLines: {
              display: true,
              color: 'rgba(171, 167, 167,0.2)',
              drawBorder: false
            },
          }]
        }
      }
    });
  }
};

export const recentTaskUpdateForEmpAndClient = () => {
//   /*--- Apex (#chart) ---*/
  var options = {
    chart: {
      height: 205,
      type: 'radialBar',
      offsetX: 0,
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        size: 120,
        imageWidth: 50,
        imageHeight: 50,

        track: {
          strokeWidth: "80%",
          background: '#ecf0fa',
        },
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          bottom: 0,
          blur: 3,
          opacity: 0.5
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 30,
          },
          hollow: {
            size: "60%"
          },
          value: {
            offsetY: -10,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    },
    colors: ['#0db2de'],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: .5,
        gradientToColors: ['#005bea'],
        inverseColors: !0,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      dashArray: 4
    },
    series: [83],
    labels: [""]
  };

  if (document.querySelector("#chart")) {
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
//   /*--- Apex (#chart)closed ---*/

}

export const membershipRequestPerSixMonth = () => {
  var ctx9 = document.getElementById('chartArea1');
  if (ctx9) {
    new Chart(ctx9, {
      type: 'line',
      data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        datasets: [{
          data: [15, 12, 20, 45, 50, 80],
          borderColor: '#f7557a ',
          borderWidth: 1,
          fill: false
        }, {
          data: [10, 20, 25, 55, 50, 45],
          borderColor: '#007bff',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              max: 80,
              fontColor: "rgba(171, 167, 167,0.9)",
            },
            gridLines: {
              display: true,
              color: 'rgba(171, 167, 167,0.2)',
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "rgba(171, 167, 167,0.9)",
            },
            gridLines: {
              display: true,
              color: 'rgba(171, 167, 167,0.2)',
              drawBorder: false
            },
          }]
        }
      }
    });
  }
};

