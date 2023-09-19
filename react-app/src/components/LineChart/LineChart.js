import './LineChart.css'
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, Tooltip, PointElement } from 'chart.js'

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Tooltip)

function LineChart(data) {
    const options = {
        hover: {
            mode: 'y'
        },
        scales: {
            x: { display: false },
            y: { display: false }
        },
        responsive: true,
        plugins: {
            tooltip: {
                yAlign: 'bottom',
            }
        }
    }

    return <Line data={data.data} options={options} />
}

export default LineChart