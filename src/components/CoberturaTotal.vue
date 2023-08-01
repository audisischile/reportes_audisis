<template>
    <div class="card tabla-por-usuario shadow">
        <div style="background-color: #BA0011;" class="row">
            <div class="col">
                <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
                    <span style="color: rgb(244, 244, 244)">COBERTURA TOTAL</span>
                </h6>
            </div>
            <div class="col-1">
                <button @click="toggleOrden" class="icon-button mt-2" style="color: wh¡ite;">
                    <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button>
            </div>
            <!-- <div :class="mostrarSearchInput ? 'col-3 nput-group input-group-sm wrapper' : 'd-none'">
                <input id="slide" class="searchInput input-group-text" v-if="mostrarSearchInput" type="text" placeholder="Busqueda">
            </div>
            <div class="col-1">
                <button @click="mostrarSearchInput = !mostrarSearchInput" class="icon-button mt-2" style="color: white;">
                    <i class="bi bi-search"></i>
                </button>
            </div> -->
        </div>

        <div class="table-responsive">
            <table class="table titulo-tabla table-hover table-striped"
                style="font-size: 11px; font-family: Roboto, sans-serif;">
                <thead>
                    <tr>
                        <th scope="col" class="sticky-top">Día</th>
                        <th scope="col" class="sticky-top">Usuario</th>
                        <th scope="col" class="sticky-top">Locales programados</th>
                        <th scope="col" class="sticky-top">Locales completados</th>
                        <th scope="col" class="sticky-top">Locales iniciados</th>
                        <th scope="col" class="sticky-top">Pendientes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in apiResponse.porcentaje_locales"
                        :class="{ 'table-success': item.locales_programadas === item.locales_completados }">
                        <td
                            style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px;">
                            {{ convertirFecha(item.Fecha) }}</td>
                        <td class="usuario" style="font-size: 11px; font-weight: 500; font-family: 'Roboto', sans-serif;">{{
                            item.Usuario }}
                        </td>
                        <td>{{ item.locales_programadas }}</td>
                        <td>{{ item.locales_completados !== 0 ? item.locales_completados : '-' }}</td>
                        <td>{{ item.locales_iniciados !== 0 ? item.locales_iniciados : '-' }}</td>
                        <td :class="{ 'table-danger': item.locales_pendientes > 0 }">{{ item.locales_pendientes !== 0 ?
                            item.locales_pendientes : '-' }}</td>
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
const mostrarSearchInput = ref(false);

const convertirFecha = (fecha) => {
    let fechaConvertida = fecha.split('-')
    return fechaConvertida[2] + '/' + fechaConvertida[1] + '/' + fechaConvertida[0]
}

const ordenarData = () => {
    // Si ordenAscendente es true, ordenar de forma ascendente
    // Si ordenAscendente es false, ordenar de forma descendente
    props.apiResponse.porcentaje_locales.sort((a, b) => {
        const fechaA = new Date(a.Fecha);
        const fechaB = new Date(b.Fecha);

        return ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
    });
};

ordenarData();

const toggleOrden = () => {
    ordenAscendente = !ordenAscendente;
    ordenarData();
};

</script>

<style scoped>
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-in-div {
  animation-name: slide-in;
  animation-duration: 1s;
}
.icon-button {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    color: white;
}

input::placeholder {
  color: rgb(232, 230, 230);
}

.searchInput {
    background-color: #BA0011;
    margin-top: 5px;
    color: white;
    border-color: white;
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


</style>