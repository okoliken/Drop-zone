export default {
    donut: {
        // height: "100%",
        series: [32, 30, 25, 13],
        series2: ['3000'],
        options: {
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                            },
                        },
                    },
                },
            },
            chart: {
                type: "donut",
            },
            legend: {
                show: false,
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            }, ],

        },
    },

    line: {
        series: [{
                name: "Contracted Suppliers",
                data: [5, 20, 25, 30],
            },
            {
                name: "Unlisted Suppliers",
                data: [5, 25, 10, 8],
            },
        ],

        // options: {
        //   chart: {
        //     zoom: {
        //       enabled: false,
        //     },
        //     toolbar: {
        //       show: false,
        //     },
        //   },
        //   dataLabels: {
        //     enabled: false,
        //   },
        //   stroke: {
        //     curve: "straight",
        //   },
        //   grid: {
        //     row: {
        //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //       opacity: 0.5,
        //     },
        //     padding: {
        //       left: 0,
        //       right: 0,
        //     },
        //   },
        //   xaxis: {
        //     categories: [
        //       "Apr",
        //       "May",
        //       "Jun",
        //       "Jul",
        //     ],
        //   },
        // },
        options: {
            grid: {
                show: true,
                // padding: {
                //   left: 0,
                //   right: 0,
                // },
            },

            chart: {
                fontFamily: "Poppins, sans-serif",
                toolbar: {
                    show: false,
                },
                // sparkline: {
                //   enabled: true,
                // },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            xaxis: {
                categories: ["Apr", "May", "Jun", "Jul"],
                // type: "numeric",
                // lines: {
                //   show: false,
                // },
                // axisBorder: {
                //   show: false,
                // },
                // labels: {
                //   show: true,
                // },
            },
            yaxis: [{
                labels: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    rotate: 0,
                    //style: "border: 1px solid",
                },
            }, ],
            // tooltip: {
            //   x: {
            //     show: false,
            //     format: "dd/MM/yy HH:mm",
            //   },
            // },
        },
    },
};