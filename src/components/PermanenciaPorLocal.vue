<template>
    <div class="card tabla-por-usuario shadow mb-4">
        <div style="background-color: #BA0011;" class="row">
            <div class="col-11">
                <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
                    <span style="color: rgb(244, 244, 244)">PERMANENCIA POR LOCAL</span>
                </h6>
            </div>
            <div class="col-1">
                <button @click="toggleOrden" class="icon-button mt-2" style="color: wh¡ite;">
                    <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table titulo-tabla table-hover table-striped"
                style="font-size: 11px; font-family: Roboto, sans-serif;">
                <thead>
                    <tr>
                        <th scope="col" class="sticky-top col-1">Día</th>
                        <th scope="col" class="sticky-top col-3">PDO</th>
                        <th scope="col" class="sticky-top col-3">Usuario</th>
                        <th scope="col" class="sticky-top">MarcaEntrada</th>
                        <th scope="col" class="sticky-top">MarcaSalida</th>
                        <th scope="col" class="sticky-top">Permanencia Establecida</th>
                        <th scope="col" class="sticky-top">Permanencia Real</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in apiResponse.Detalle_Total">
                        <td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{
                            convertirFecha(item.fecha) }}</td>
                        <td>{{ item.PDO.toUpperCase() }}</td>
                        <td>{{ item.Usuario.toUpperCase() }}</td>
                        <td style="font-size: 13px; font-family: Roboto, sans-serif;">{{ item.MarcaEntrada }}</td>
                        <td style="font-size: 13px; font-family: Roboto, sans-serif;">{{ item.MarcaSalida }}</td>
                        <td style="font-size: 13px;"> {{
                            transformarMinutos(item.TiempoPermanenciaEstablecida) }}</td>
                        <td style="font-size: 13px;" class="table-success">{{
                            transformarMinutos(item.TiempoPermanenciaMinutos)
                        }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    apiResponse: {
        type: Object,
        required: true
    }
})

let ordenAscendente = ref(true);

const ordenarData = () => {
  // Si ordenAscendente es true, ordenar de forma ascendente
  // Si ordenAscendente es false, ordenar de forma descendente
  props.apiResponse.Detalle_Total.sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return ordenAscendente.value ? fechaA - fechaB : fechaB - fechaA;
  });
};

// Llamada inicial para ordenar los datos de manera ascendente
ordenarData();

const transformarMinutos = (minutos) => {
    let horas = Math.floor(minutos / 60);
    let minutosRestantes = minutos % 60;
    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutosRestantes < 10) {
        minutosRestantes = "0" + minutosRestantes;
    }
    return horas + ":" + minutosRestantes;
}
const convertirFecha = (fecha) => {
    let fechaConvertida = fecha.split('-')
    return fechaConvertida[2] + '/' + fechaConvertida[1] + '/' + fechaConvertida[0]
}

const toggleOrden = () => {
  ordenAscendente.value = !ordenAscendente.value;
  ordenarData();
};

</script>

<style scoped>
.icon-button {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    color: white;
}
.tabla-por-usuario {
    max-height: 390px;
    overflow-y: auto
}

.titulo-por-usuario {
    font-size: 16px;
    font-weight: 600;
    margin-top: 13px;
    margin-left: 10px;
}

.card {
    border-radius: 0px;
}

.table thead th.sticky-top {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
}

.table tfoot td {
    position: sticky;
    bottom: 0;
    background-color: #f8f9fa;
}
</style>