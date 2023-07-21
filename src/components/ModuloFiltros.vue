<template>
  <div class="row align-items-center">
    <div class="col-5">
      <div class="row align-items-center">
        <div class="col-7">
          <img :src="apiResponse.indicadores_globales[0].logo" class="logo">
        </div>
        <div class="col-5">
        </div>
      </div>
    </div>
    <div class="col-7">
      <div class="row">
        <div class="col-5">
          <label for="datepicker">Fecha inicio:</label>
          <VueDatePicker v-model="useStore.fechaInicio" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
            selectText="Seleccionar" :format="diaFormateado"></VueDatePicker>
        </div>
        <div class="col-5">
          <label for="datepicker">Fecha de fin:</label>
          <VueDatePicker v-model="useStore.fechaFin" :enable-time-picker="false" locale="es-ES" cancelText="Cancelar"
            selectText="Seleccionar" :format="diaFormateado"></VueDatePicker>
        </div>
        <div class="col-2">
          <button class="btn"
            style="border-radius: 0; background-color: white; margin-top: 22px; border-color: #BA0011; color: #BA0011;"
            @click="useStore.getData()">Generar</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <select class="form-select w-100 filtro-select botonera" v-model="useStore.cadenaSeleccionada">
            <option value="0">Cadenas</option>
            <option v-for="item in useStore.cadenas" :value="item.FK_Cadena_ID_cadena">{{ item.NombreCadenaReal }}</option>
          </select>
        </div>
        <div class="col-4">
          <select class="form-select w-100 filtro-select botonera" v-model="useStore.localSeleccionado">
            <option value="0">PDO</option>
            <option v-for="item in useStore.localesFiltrados" :value="item.ID_Local">{{ item.PDO }}</option>
          </select>
        </div>
        <div class="col-4">
          <select class="form-select w-100 filtro-select botonera" v-model="useStore.usuarioSeleccionado">
            <option value="0">Usuario</option>
            <option v-for="item in useStore.UsuarioFiltrado" :value="item.Id_usuario">{{ item.Usuario }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApiStore } from '@/stores/conexiones.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
    apiResponse: {
        type: Object,
        required: true
    }
})

const useStore = useApiStore();

function formatFecha(inputFecha) {
  // Paso 1: Convertir la fecha en un objeto Date
  const fecha = new Date(inputFecha);

  // Paso 2: Extraer el día, mes y año del objeto Date
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por lo que sumamos 1.
  const anio = fecha.getFullYear();

  // Paso 3: Formatear a dos dígitos si es necesario
  const diaFormateado = dia.toString().padStart(2, '0');
  const mesFormateado = mes.toString().padStart(2, '0');

  // Paso 4: Construir la cadena de fecha en formato "DD-MM-YYYY"
  const fechaFormateada = `${diaFormateado}-${mesFormateado}-${anio}`;

  return fechaFormateada;
}

function diaFormateado(date) {
  // Paso 1: Convertir la fecha en un objeto Date
  const fecha = new Date(date);

  // Paso 2: Extraer el día, mes y año del objeto Date
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por lo que sumamos 1.
  const anio = fecha.getFullYear();

  // Paso 3: Formatear a dos dígitos si es necesario
  const diaFormateado = dia.toString().padStart(2, '0');
  const mesFormateado = mes.toString().padStart(2, '0');

  // Paso 4: Construir la cadena de fecha en formato "DD/MM/YYYY"
  const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
}
</script>

<style scoped>
.logo {
  width: 250px;
}

.botonera {
  border-radius: 0;
  background-color: #BA0011;
  color: rgb(239, 239, 239);
}

</style>