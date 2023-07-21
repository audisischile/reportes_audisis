<template>
  <div v-if="useStore.loading">
    <div class="d-flex align-items-center justify-content-center mt-5">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      </div>
      <h4 class="ms-3">Generando reporte ...</h4>
    </div>
  </div>
  <div v-else>
    <ModuloFiltrosVue :apiResponse="useStore.apiResponse"></ModuloFiltrosVue>
    <div v-if="useStore.updating">
      <div class="d-flex align-items-center justify-content-center mt-5">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        </div>
        <h4 class="ms-3">Filtrando reporte ...</h4>
      </div>
    </div>
    <div v-else>
      <IndicadoresGlobales :apiResponse="useStore.apiResponse" class="mb-4"></IndicadoresGlobales>
      <CoberturaPermanencia :apiResponse="useStore.apiResponse" class="mb-4"></CoberturaPermanencia>
      <div class="row mb-4">
        <div class="col-8">
          <CoberturaTotal :apiResponse="useStore.apiResponse"></CoberturaTotal>
        </div>
        <div class="col-4">
          <div class="card shadow" style="overflow-y: auto; height: 100%;">
            <div class="card-body">
              <GraficoUsuarios :datosUsuarios="useStore.apiResponse.porcentaje_locales" class="shadow" />
            </div>
          </div>
        </div>
      </div>
      <PermanenciaPorLocal :apiResponse="useStore.apiResponse"></PermanenciaPorLocal>
      <!-- <JornadaDiaria :apiResponse="useStore.apiResponse"></JornadaDiaria> -->
    </div>
  </div>
  <!-- {{ useStore.apiResponse }} -->
</template>

<script setup>
import { useApiStore } from '@/stores/conexiones.js';
import { onBeforeUnmount } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto';
import IndicadoresGlobales from '@/components/IndicadoresGlobales.vue'
import CoberturaPermanencia from '@/components/CoberturaPermanencia.vue'
import CoberturaTotal from '@/components/CoberturaTotal.vue'
import GraficoUsuarios from '@/components/GraficoUsuarios.vue'
import PermanenciaPorLocal from '@/components/PermanenciaPorLocal.vue'
import JornadaDiaria from '@/components/JornadaDiaria.vue'
import ModuloFiltrosVue from '@/components/ModuloFiltros.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const useStore = useApiStore();
useStore.getData();

onBeforeUnmount(()=>{
  useStore.resetData()
})

</script>

<style scoped>
.spinner-border-custom {
  border-color: #BA0011;
  /* Cambia 'your-color' por el color deseado en formato hexadecimal o RGB */
  background-color: transparent;
  /* Esto es opcional, puedes mantenerlo transparente o establecer un color de fondo */
}
</style>
