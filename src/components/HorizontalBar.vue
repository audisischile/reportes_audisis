<template>
    <div>
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
    type: 'bar',
    labels: ['LOREM IPSUM', 'LOREM IPSUM', 'LOREM IPSUM', 'LOREM IPSUM', 'LOREM IPSUM', 'LOREM IPSUM'],
    datasets: [{
        label: '% Cobertura por usuario',
        data: [40, 20, 12],
        backgroundColor: '#f87979',
    }]
}

const chartOptions = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 7,
        }
    }
}


</script>

<style scoped></style>