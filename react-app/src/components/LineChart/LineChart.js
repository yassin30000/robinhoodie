import './LineChart.css'
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LineElement, LinearScale, Tooltip, PointElement } from 'chart.js'

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Tooltip)

function LineChart({dates, prices, price_change}) {

    const data = {
        labels: dates,
        datasets: [{
            label: '$',
            data: prices,
            borderColor: price_change > 0 ? 'rgb(0, 200, 5)' : 'rgb(255, 0, 0)',
            pointRadius: 0,
            borderWidth: 1
        }]

    }
  

    // chartData = {

    //     label: '$',
    //     data: prices_array,
    //     borderColor: price_change > 0 ? 'rgb(0, 200, 5)' : 'rgb(255, 0, 0)',
    //     pointStyle: false,
    //     borderWidth: 2,
    //     pointStyle: false,
    // }]


const options = {
    scales: {
        x: { display: false },
        y: { display: false }
    }
}

return <Line data={data} options={options} />
}

export default LineChart