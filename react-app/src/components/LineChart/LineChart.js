import './LineChart.css'
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement } from 'chart.js'

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement)

function LineChart(data) {
    const options = {
        plugins: {
            legend: false
        },
        scales: {
            x: { display: false },
            y: { display: false }
        },
        datasets: {
            line: {
                backgroundColor: "#008000",
            }
        }
    }
    return <Line data={data.data} options={options} />
}

export default LineChart