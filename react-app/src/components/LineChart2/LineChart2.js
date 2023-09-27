import React from 'react'
import Chart from "react-apexcharts";
import './LineChart2.css'

function LineChart2({ dates, prices, price_change, width }) {

    let options = {
        chart: {
            id: 'line-chart',
            animations: {
                enabled: false
            },
            height: '100%',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: dates,
            labels: {
                show: false,
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }

        },
        yaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false
            },
        },
        colors: price_change > 0 ? ['rgb(0, 200, 5)'] : ['rgb(255, 0, 0)'],
        stroke: {
            show: true,
            curve: 'straight',
            width: 1.5,
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: true,
            marker: {
                show: true
            },
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return (
                    '<div class="arrow_box">' +
                    "<span style='margin: 7px 7px'>" +

                    "$" +
                    series[seriesIndex][dataPointIndex] +
                    "</span>" +
                    "</div>"
                );
            }

        }
    }

    if (prices[0] === 0 && prices[prices.length - 1] === 0) {
        options.yaxis.max = 6
        options.yaxis.min = -6

    }

    const series = [
        {
            name: 'stock-1',
            data: prices
        }
    ]



    return (
            <Chart
                options={options}
                series={series}
                type="line"
                width={width}
                height='400px'
            />

    )
}

export default LineChart2