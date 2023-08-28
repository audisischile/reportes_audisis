<template>
    <div v-if="useStore.apiResponse">
        <div class="card contenedor shadow">
            <div class="row">
                <div class="col-2 align-self-start d-flex flex-column justify-content-between">
                    <div class="kpi-cobertura align-items-center mt-4">
                        <div class="kpi-cobertura-titulo">
                            Cobertura
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-6 indicador-numero" style="display: flex; align-items: baseline;">
                                {{ useStore.apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual
                                }}<span>%</span>
                            </div>
                            <div class="col-6 kpi-cobertura-num-chico align-self-center" style="visibility: hidden;">
                                <i class="bi bi-arrow-up-circle flecha-arriba"></i>
                                <span class="flecha"> 12%</span>
                            </div>
                        </div>
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50"
                            aria-valuemin="0" aria-valuemax="100" style="height: 8px">
                            <div class="progress-bar custom-progress-bar"
                                :style="{ width: useStore.apiResponse.indicadores_globales[0].Porcentaje_Cobertura_Mensual + '%', backgroundColor: '#f97013' }">
                            </div>
                        </div>
                    </div>
                    <div class="kpi-cobertura mt-5 align-items-center">
                        <div class="kpi-cobertura-titulo">
                            Permanencia
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-6 indicador-numero" style="display: flex; align-items: baseline;">
                                {{ useStore.apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual
                                }}<span>%</span>
                            </div>
                            <div class="col-6 kpi-cobertura-num-chico align-self-center" style="visibility: hidden;">
                                <i class="bi bi-arrow-down-circle flecha-abajo"></i>
                                <span class="flecha"> 12%</span>
                            </div>
                        </div>
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50"
                            aria-valuemin="0" aria-valuemax="100" style="height: 10px;">
                            <div class="progress-bar"
                                :style="{ width: useStore.apiResponse.indicadores_globales[0].Porcentaje_Permanencia_Mensual + '%', backgroundColor: '#47A8BD' }">
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-6">
                    <GraficoCobertura :apiResponse="apiResponse" />
                </div>

                <div class="col-4">
                    <div class="card caja">
                        <div class="table-responsive">
                            <table class="table tabla-datos-periodo table-striped">
                                <thead class="sticky-header">
                                    <tr class="tabla-datos-periodo-titulos">
                                        <th scope="col">Cadena</th>
                                        <th scope="col">Cobertura</th>
                                        <th scope="col">Permanencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in useStore.apiResponse.porcentaje_cadena">
                                        <td>
                                            <div class="cadena-info">
                                                <img :src="item.Logo_cadena" style="width: 40px;" class="logo-cadena">
                                                <span class="nombre-cadena">{{ item.NombreCadenaReal === 'INDEPENDIENTES' ?
                                                    'INDEPEN..' :
                                                    item.NombreCadenaReal }}</span>
                                            </div>
                                        </td>
                                        <td class="tabla-cadenas-num text-center align-middle">{{
                                            item.Porcentaje_Cobertura_Mensual }}%</td>
                                        <td class="tabla-cadenas-num text-center align-middle">{{
                                            item.Porcentaje_Permanencia_Mensual }}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import GraficoCobertura from '@/components/GraficoCobertura.vue'
import { useApiStore } from '@/stores/conexiones.js';

const useStore = useApiStore();

const props = defineProps({
    apiResponse: {
        type: Object,
        required: true,
        default: () => ({})  // Valor por defecto: un objeto vacío
    }
})


</script>

<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    /* Color de fondo del encabezado fijo */
    z-index: 1;
    /* Asegurar que el encabezado esté en la capa superior */
}

/* Ajuste de estilos para que el contenido se desplace debajo del encabezado fijo */
.table-responsive {
    position: relative;
    overflow: auto;
    height: 400px;
    /* Altura máxima del contenedor de la tabla */
}

.table {
    margin-bottom: 0;
    /* Evitar que la tabla se desplace fuera del contenedor */
}

.caja {
    color: #727272;
    height: 260px;
    overflow-y: auto;
}

.tabla-datos-periodo-titulos th {
    font-size: 9px;
    font-weight: 600;
    color: rgb(136, 136, 136);
    text-transform: uppercase;
    font-family: "Roboto", sans-serif;
    text-align: center;
}

.cadena-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nombre-cadena {
    font-size: 10px;
    display: block;
    color: rgb(136, 136, 136);
}


.logo-cadena {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
}

.contenedor {
    padding: 1em;
    ;
}

.kpi-cobertura {
    color: #727272;
}

.kpi-cobertura-titulo {
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    color: gray;
    margin-bottom: 0px;
}

.kpi-cobertura-num-grande {
    font-size: 20px;
    font-family: "Oswald", sans-serif;
}

.flecha-arriba {
    color: green;
}

.flecha-abajo {
    color: red;
}

.tabla-cadenas-num {
    font-size: 15px;
    font-weight: 400;
    color: #727272;
    font-family: "Oswald", sans-serif;
}

.indicador-icono {
    font-size: 30px;
    background-image: linear-gradient(to bottom, rgba(250, 250, 250, 0.5), rgba(255, 255, 255, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}

.card {
    border-radius: 0px;
}

.progress-bar {
    font-size: 10px;
}

.progress {
    border-radius: 0;
}

.custom-progress-bar {
    border-radius: 0;
    height: 100%;
}

.indicador-numero {
    font-size: 30px;
    color: rgb(136, 136, 136);
    font-family: "Oswald", sans-serif;
}
</style>