
export default {
    // LINE CHART
    siteTraffic: {
        series: [{
            name: 'Traffic Rate',
            data: [150, 200, 125, 225, 200, 250]
        }],
        chartOptions: {
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            chart: {
                type: 'line',
                dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 0,
                    blur: 4,
                    opacity: 0.10,
                },
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true
                }
            },
            stroke: {
                width: 5,
                curve: 'smooth'
            },
            xaxis: {
                type: 'numeric',
            },
            colors: ['#7367F0'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#A9A2F6'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                },
            },
            markers: {
                size: 0,
                hover: {
                    size: 5
                }
            },
            tooltip: {
                x: { show: false }
            },
        }
    },
    activeUsers: {
        series: [{
            name: 'Active Users',
            data: [750, 1000, 900, 1250, 1000, 1200, 1100]
        }],
        chartOptions: {
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            chart: {
                type: 'line',
                dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 0,
                    blur: 4,
                    opacity: 0.10,
                },
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true
                }
            },
            stroke: {
                width: 5,
                curve: 'smooth'
            },
            xaxis: {
                type: 'numeric',
            },
            colors: ['#28C76F'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#55DD92'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 75, 100, 100]
                },
            },
            markers: {
                size: 0,
                hover: {
                    size: 5
                }
            },
            tooltip: {
                x: { show: false }
            },
        }
    },
    newsletter: {
        series: [{
            name: 'Newsletter',
            data: [365, 390, 365, 400, 375, 400]
        }],
        chartOptions: {
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0
                }
            },
            chart: {
                type: 'line',
                dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 0,
                    blur: 4,
                    opacity: 0.10,
                },
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true
                }
            },
            stroke: {
                width: 5,
                curve: 'smooth'
            },
            xaxis: {
                type: 'numeric',
            },
            colors: ['#FF9F43'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#ffc085'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 75, 100, 100]
                },
            },
            markers: {
                size: 0,
                hover: {
                    size: 5
                }
            },
            tooltip: {
                x: { show: false }
            },
        }
    },

    revenueComparisonLine: {
        series: [
            {
                name: "This Month",
                data: [45000, 47000, 44800, 47500, 45500, 48000, 46500, 48600]
            },
            {
                name: "Last Month",
                data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000]
            }
         ],
        chartOptions: {
            chart: {
                toolbar: { show: false },
            },
            stroke: {
                curve: 'smooth',
                dashArray: [0, 10],
                width: [4, 3],
            },
            grid: {
                borderColor: '#e7e7e7',
            },
            legend: {
                show: false,
            },
            colors: ['#F97794', '#b8c2cc'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    inverseColors: false,
                    gradientToColors: ['#7367F0', '#b8c2cc'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                },
            },
            markers: {
                size: 0,
                hover: {
                    size: 5
                }
            },
            xaxis: {
                labels: {
                    style: {
                        cssClass: 'text-cloudenly-primary-main fill-current',
                    }
                },
                axisTicks: {
                    show: false,
                },
                categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
                axisBorder: {
                    show: false,
                },
            },
            yaxis: {
                tickAmount: 5,
                labels: {
                    style: {
                        cssClass: 'text-cloudenly-primary-main fill-current',
                    },
                    formatter: function(val) {
                        return val > 999 ? (val / 1000).toFixed(1) + 'k' : val;
                    }
                }
            },
            tooltip: {
                x: { show: true }
            }
        }
    },
}