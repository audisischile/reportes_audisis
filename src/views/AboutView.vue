<template>
 {{ apiResponse }}
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const apiResponse = ref(null);
const dataLoaded = ref(false);
const cadenas = ref([]);
const dateInicio = ref(null);
const dateFin = ref(null);
const delayLoading = ref(1000);
const debbugMode = ref(false);
const clientId = ref(82);

onMounted(async () => {
      try {
        if (debbugMode.value) {
          await new Promise(resolve => setTimeout(resolve, delayLoading.value));
          apiResponse.value = store.datosCobertura
        } else {
          const response = await axios.post("https://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura", {
            id_cliente: clientId.value,
            // fecha_inicio: formatFechaSQL(new Date()),
            // fecha_fin: formatFechaSQL(new Date()),
            fecha_inicio: "2023-01-04",
            fecha_fin: "2023-01-10",
            id_usuarios: [],
            id_locales: [],
            id_cadenas: []
          });

          apiResponse.value = JSON.parse(response.data.trim());
        }

        dataLoaded.value = true;
        const labels = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
        cadenas.value = apiResponse.value.porcentaje_cadena.map(item => item.NombreCadenaReal);
        const coberturaData = apiResponse.value.porcentaje_cadena.map(item => item.Cobertura_Programada_Mensual);
        const permanenciaData = apiResponse.value.porcentaje_cadena.map(item => item.Permanencia_Programada_Mensual);
        createChart(labels, coberturaData, permanenciaData);
        dateInicio.value = new Date();
        dateFin.value = new Date();
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    });

</script>
  
<style scoped>

</style>
  