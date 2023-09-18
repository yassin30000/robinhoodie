import './LineChart.css'
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement } from 'chart.js'

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement)

function LineChart(data) {
    const options = {
        hover: {
            mode: 'x'
        },
        scales: {
            x: { display: false },
            y: { display: false }
        },
        // interaction: {
        //     mode: 'x'
        // },


    }
    return <Line data={data.data} options={options} />
}

export default LineChart