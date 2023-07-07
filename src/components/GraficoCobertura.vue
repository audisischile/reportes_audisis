<template>
    <div v-if="dataLoaded" class="grafico">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>
  
<script>
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import { ref, onMounted } from 'vue';

export default {
    name: 'ChainCoverageChart',
    components: {
        Bar,
    },
    setup() {
        const apiResponse = ref(null);
        const dataLoaded = ref(false);

        const chartData = ref({});
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        onMounted(async () => {
            try {
                const response = await axios.post('https://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura', {
                    id_cliente: 82,
                    fecha_inicio: '2023-01-04',
                    fecha_fin: '2023-01-04',
                    id_usuarios: [],
                    id_locales: [],
                    id_cadenas: [],
                });

                apiResponse.value = JSON.parse(response.data.trim());

                const labels = apiResponse.value.porcentaje_cadena.map((item) => item.NombreCadenaReal);
                const coberturaData = apiResponse.value.porcentaje_cadena.map((item) =>
                    parseFloat(item.Porcentaje_Cobertura_Mensual)
                );
                const permanenciaData = apiResponse.value.porcentaje_cadena.map((item) =>
                    parseFloat(item.Porcentaje_Permanencia_Mensual)
                );

                chartData.value = {
                    labels,
                    datasets: [
                        {
                            label: 'Porcentaje de Cobertura',
                            data: coberturaData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            barThickness: 10,
                        },
                        {
                            label: 'Porcentaje de Permanencia',
                            data: permanenciaData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            barThickness: 10,
                        },
                    ],
                };

                dataLoaded.value = true;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        return { chartData, chartOptions, dataLoaded };
    },
};
</script>
  
<style scoped>
.grafico {
    height: 100%;
}
</style>