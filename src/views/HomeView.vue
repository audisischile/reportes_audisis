<template>
  <!-- {{ useStore.clientId }} -->
  <div v-if="useStore.loading" class="loading-container">
    <div class="d-flex align-items-center justify-content-center">
      <div class="spinner-border" role="status"></div>
      <h4 class="ms-3 mensaje">{{ message }} ...</h4>
    </div>
  </div>
  <div class="container" v-else="!useStore.loading">
    <!-- <ModuloFiltrosVue ></ModuloFiltrosVue> -->
    <ModuloFiltrosNew />
    <!-- <div v-if="useStore.updating"> -->
    <div v-if="cargaDatos || useStore.updating">
      <div class="d-flex align-items-center justify-content-center mt-5 updating-container">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        </div>
        <h4 class="ms-3 mensaje">{{ message }} ...</h4>
      </div>
    </div>
    <div v-else>
      <IndicadoresGlobales :apiResponse="useStore.apiResponse" class="mb-4"></IndicadoresGlobales>
      <CoberturaPermanencia :apiResponse="useStore.apiResponse" class="mb-4"></CoberturaPermanencia>
      <div class="row mb-4">
        <div class="col-8">
          <CoberturaTotal :apiResponse="useStore.apiResponse" v-if="useStore.apiResponse"></CoberturaTotal>
        </div>
        <div class="col-4">
          <div class="shadow" style="overflow-y: auto;"
            v-if="useStore.apiResponse && useStore.apiResponse.porcentaje_locales">
            <div class="">
              <GraficoUsuarios />
            </div>
          </div>
        </div>
      </div>
      <PermanenciaPorLocal :apiResponse="useStore.apiResponse" v-if="useStore.apiResponse"></PermanenciaPorLocal>
      <JornadaDiaria :apiResponse="useStore.apiResponse"></JornadaDiaria>
      <!-- <JornadaDiariaNew /> -->
      <div class="text-center">
        <img src="https://iaudisis.com/audisis//PNG/logo-iaudisis-header.png" class="logo-footer">
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useApiStore } from '@/stores/conexiones.js';
import { onBeforeUnmount, onMounted } from 'vue'

import IndicadoresGlobales from '@/components/IndicadoresGlobales.vue'
import CoberturaPermanencia from '@/components/CoberturaPermanencia.vue'
import CoberturaTotal from '@/components/CoberturaTotal.vue'
import GraficoUsuarios from '@/components/GraficoUsuarios.vue'
import PermanenciaPorLocal from '@/components/PermanenciaPorLocal.vue'
import JornadaDiaria from '@/components/JornadaDiaria.vue'
// import ModuloFiltrosVue from '@/components/ModuloFiltros.vue'
import ModuloFiltrosNew from '../components/ModuloFiltrosNew.vue';
// import JornadaDiariaNew from '../components/JornadaDiariaNew.vue';

const useStore = useApiStore();

const cargaDatos = ref(true);
const timerCargaDatos = () => {
  setTimeout(() => {
    cargaDatos.value = false;
  }, 10000);
}
timerCargaDatos();

const props = defineProps({
  clientId: Number,
});

useStore.getData();

const message = ref('Generando reporte actualizado');
let intervalId;

// onMounted(() =>{
//   useStore.updateClientId(props.clientId)
// })
onMounted(() => {
  useStore.setClientId(props.clientId);
  // console.log("useStore.clientId: ", useStore.clientId)
  useStore.getData();

  let counter = 0;
  intervalId = setInterval(() => {
    switch (counter % 4) {
      case 0:
        message.value = 'Generando reporte actualizado';
        break;
      case 1:
        message.value = 'Descargando información en tiempo real';
        break;
      case 2:
        message.value = 'Creando tablas y gráficos';
        break;
      case 3:
        message.value = 'Por favor espere un momento';
        break;
    }
    counter++;
  }, 10000);
});

onBeforeUnmount(() => {
  useStore.resetData()
  clearInterval(intervalId);
})

// Zona de pruebas
// console.log("useStore.clientId: ", useStore.clientId)

</script>

<style scoped>
.loading-container {
  width: 100vw;
  /* Ocupar todo el ancho del viewport */
  height: 100vh;
  /* Ocupar todo el alto del viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  /* Color de fondo blanco con un poco de transparencia para que se vea el contenido detrás, si es necesario */
}

.updating-container {
  height: 60vh;
  /* Ocupar todo el alto del viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  /* Color de fondo blanco con un poco de transparencia para que se vea el contenido detrás, si es necesario */
}

.mensaje {
  color: #919191;
  font-weight: bold;
}

.spinner-border {
  color: #919191;
}

.logo-footer {
  width: 7%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
