<template>
    <div class="row d-flex justify-content-center align-items-center">
        <div class="col-5">
            <label for="datepicker" class="titulo-fecha">Fecha inicio</label>
            <VueDatePicker v-model="useStore.fechaInicio" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
                selectText="Seleccionar" :format="diaFormateado" class="w-100" auto-apply></VueDatePicker>
        </div>
        <div class="col-5">
            <label for="datepicker" class="titulo-fecha">Fecha de fin</label>
            <VueDatePicker v-model="useStore.fechaFin" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
                selectText="Seleccionar" :date-format="'dd/mm/yyyy'" :format="diaFormateado" class="w-100" auto-apply></VueDatePicker>
        </div>
        <div class="col-2">
          <button class="btn mt-4 w-100"
            style="border-radius: 0; background-color: #ED3632; border-color: #BA0011; color: white;"
            @click="useStore.updateData()" :disabled="useStore.updating">Generar</button>
        </div>
    </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import { useApiStore } from '@/stores/conexiones.js';

const useStore = useApiStore();

const diaFormateado = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

</script>

<style scoped>
.row {
    margin: 0;
    padding: 0;
}
</style>