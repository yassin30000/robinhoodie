import React from 'react'
import Chart from "react-apexcharts";
import './LineChart2.css'

function LineChart2({ dates, prices, price_change }) {


    const options = {
        chart: {
            id: 'line-chart',
            animations: {
                enabled: false
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
            }
        },
        colors: price_change > 0 ? ['rgb(0, 200, 5)'] : ['rgb(255, 0, 0)'],
        stroke: {
            show: true,
            curve: 'straight',
            width: 2,
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
                    "<span>" +
                    
                    "$" +
                    series[seriesIndex][dataPointIndex] +
                    "</span>" +
                    "</div>"
                );
            }

        }
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
            width="100%"
        />
    )
}

export default LineChart2