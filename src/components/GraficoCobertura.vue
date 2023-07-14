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

    const truncateLabel = (label) => {
      const maxLength = 6;
      if (label.length > maxLength) {
        return label.slice(0, maxLength) + '...';
      }
      return label;
    };

    const chartData = ref({});
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        tooltip: {
          fontFamily: 'Arial, sans-serif',
        },
        legend: {
          labels: {
            fontFamily: 'Arial, sans-serif',
          },
        },
        title: {
          display: false,
          text: 'Gráfico de cobertura y permanencia',
          font: {
            family: 'Arial, sans-serif',
          },
        },
      },

    };

    onMounted(async () => {
      try {
        const labels = props.apiResponse.porcentaje_cadena.map((item) => truncateLabel(item.NombreCadenaReal));
        const coberturaData = props.apiResponse.porcentaje_cadena.map((item) => parseFloat(item.Porcentaje_Cobertura_Mensual));
        const permanenciaData = props.apiResponse.porcentaje_cadena.map((item) => parseFloat(item.Porcentaje_Permanencia_Mensual));

        chartData.value = {
          labels,
          datasets: [
            {
              label: '% Cobertura',
              data: coberturaData,
              backgroundColor: 'rgba(63, 121, 229, 1)',
              borderWidth: 1,
              barThickness: 20,
            },
            {
              label: '% Permanencia',
              data: permanenciaData,
              backgroundColor: 'rgba(9, 194, 156, 1)',
              borderWidth: 1,
              barThickness: 20,
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
  overflow-y: auto;
}

.chart-container {
  height: 100%;
}
</style>
