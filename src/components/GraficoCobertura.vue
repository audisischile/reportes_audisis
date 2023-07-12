<template>
  <div v-if="dataLoaded" class="grafico">
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
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
  props: {
    apiResponse: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
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
        const labels = props.apiResponse.porcentaje_cadena.map((item) => item.NombreCadenaReal);
        const coberturaData = props.apiResponse.porcentaje_cadena.map((item) => parseFloat(item.Porcentaje_Cobertura_Mensual));
        const permanenciaData = props.apiResponse.porcentaje_cadena.map((item) => parseFloat(item.Porcentaje_Permanencia_Mensual));

        chartData.value = {
          labels,
          datasets: [
            {
              label: 'Porcentaje de Cobertura',
              data: coberturaData,
              backgroundColor: 'rgba(63, 121, 229, 1)',
              borderWidth: 1,
              barThickness: 10,
            },
            {
              label: 'Porcentaje de Permanencia',
              data: permanenciaData,
              backgroundColor: 'rgba(9, 194, 156, 1)',
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
  overflow-y: auto; /* Agregar scroll vertical */
}

.chart-container {
  height: 100%; /* Asegurar que el contenedor ocupe todo el espacio disponible */
}
</style>
