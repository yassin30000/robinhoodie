import './LineChart.css'
import React from 'react'
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LineElement, LinearScale, PointElement} from 'chart.js'

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement)

function LineChart(data) {
    return <Line data={data.data} />
}

export default LineChart