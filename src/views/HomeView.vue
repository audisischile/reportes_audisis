<template>
  <div v-if="useStore.loading">
    <div class="d-flex align-items-center justify-content-center mt-5">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      </div>
      <h4 class="ms-3">Generando reporte ...</h4>
    </div>
  </div>
  <div v-else class="container">
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
          <div class="shadow" style="overflow-y: auto; height: 100%;">
            <div class="">
              <GraficoUsuarios :datosUsuarios="useStore.apiResponse.porcentaje_locales" class="shadow" />
            </div>
          </div>
        </div>
      </div>
      <PermanenciaPorLocal :apiResponse="useStore.apiResponse"></PermanenciaPorLocal>
      <JornadaDiaria :apiResponse="useStore.apiResponse"></JornadaDiaria>
    </div>
  </div>

</template>

<script setup>
import { useApiStore } from '@/stores/conexiones.js';
import { onBeforeUnmount, onMounted  } from 'vue'
import Chart from 'chart.js/auto';
import IndicadoresGlobales from '@/components/IndicadoresGlobales.vue'
import CoberturaPermanencia from '@/components/CoberturaPermanencia.vue'
import CoberturaTotal from '@/components/CoberturaTotal.vue'
import GraficoUsuarios from '@/components/GraficoUsuarios.vue'
import PermanenciaPorLocal from '@/components/PermanenciaPorLocal.vue'
import JornadaDiaria from '@/components/JornadaDiaria.vue'
import ModuloFiltrosVue from '@/components/ModuloFiltros.vue'

const useStore = useApiStore();

const props = defineProps({
  clientId: Number,
});

useStore.getData();

onMounted(() =>{
  useStore.updateClientId(props.clientId)
})

onBeforeUnmount(()=>{
  useStore.resetData()
})



</script>

<style scoped>

</style>
