import React from 'react'
import Chart from "react-apexcharts";

function BabyLineChart({ dates, prices, price_change }) {
    let options = {
        chart: {
            id: 'line-chart',
            animations: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            height: '50px',
            width: '100px'
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
            width: 1,
        },
        grid: {
            show: false
        },
        tooltip: {
            enabled: false,
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
            // width="100px"
            height='40px'
        />
    )
}

export default BabyLineChart