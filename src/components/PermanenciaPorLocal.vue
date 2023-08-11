<template>
    <div class="card tabla-por-usuario shadow mb-4">
        <div style="background-color: #BA0011;" class="row">
            <div class="col-11">
                <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
                    <span style="color: rgb(244, 244, 244)">PERMANENCIA POR LOCAL</span>
                </h6>
            </div>
            <div class="col-1">
                <!-- <button @click="toggleOrden" class="icon-button mt-2" style="color: wh¡ite;">
                    <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                </button> -->
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
                        <th scope="col" class="sticky-top">MarcaSalida
                            <button @click="ordenarMarcaSalida" class="icon-button">
                                <i
                                    :class="ordenAscendenteMarcasalida ? 'bi bi-sort-down icon-button' : 'bi bi-sort-up icon-button'"></i>
                            </button>
                        </th>
                        <th scope="col" class="sticky-top">Permanencia Establecida
                            <button @click="ordenarPermanenciaEstablecida" class="icon-button">
                                <i :class="ordenAscendentePermanencia ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                            </button>
                        </th>
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
                        <!-- {{ convertirHoraAMinutos(item.MarcaSalida) }} -->
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
let ordenAscendenteMarcasalida = ref(true);
let ordenAscendentePermanencia = ref(true);

const ordenarData = () => {
    // Si ordenAscendente es true, ordenar de forma ascendente
    // Si ordenAscendente es false, ordenar de forma descendente
    props.apiResponse.Detalle_Total.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return ordenAscendente.value ? fechaA - fechaB : fechaB - fechaA;
    });
};
// ordenarData();

// crea una función que ordene de menor a mayor o viceversa segun item.marcasalida
// const ordenarColumna = (columna) => {
//     props.apiResponse.Detalle_Total.sort((a, b) => {
//         return ordenAscendente.value ? a[columna] - b[columna] : b[columna] - a[columna];
//     });
//     if (columna == 'MarcaSalida') {
//         ordenAscendenteMarcasalida.value = !ordenAscendenteMarcasalida.value;
//     } else {
//         ordenAscendentePermanencia.value = !ordenAscendentePermanencia.value;
//     }
// };

const ordenarMarcaSalida = () => {
    props.apiResponse.Detalle_Total.sort((a, b) => {
        const marcaSalidaA = convertirHoraAMinutos(a.MarcaSalida);
        const marcaSalidaB = convertirHoraAMinutos(b.MarcaSalida);

        if (marcaSalidaA === "-" || marcaSalidaA === "") {
            marcaSalidaA = Number.MIN_SAFE_INTEGER; // Considerar como mínimo
        }
        if (marcaSalidaB === "-" || marcaSalidaB === "") {
            marcaSalidaB = Number.MIN_SAFE_INTEGER; // Considerar como mínimo
        }

        // Comparar valores numéricos primero, luego los "-"
        if (!isNaN(marcaSalidaA) && !isNaN(marcaSalidaB)) {
            return ordenAscendenteMarcasalida.value ? marcaSalidaA - marcaSalidaB : marcaSalidaB - marcaSalidaA;
        } else if (isNaN(marcaSalidaA)) {
            return 1;
        } else {
            return -1;
        }
    });

    ordenAscendenteMarcasalida.value = !ordenAscendenteMarcasalida.value;
};

const ordenarPermanenciaEstablecida = () => {
    props.apiResponse.Detalle_Total.sort((a, b) => {
        const permanenciaA = convertirHoraAMinutos(a.TiempoPermanenciaEstablecida);
        const permanenciaB = convertirHoraAMinutos(b.TiempoPermanenciaEstablecida);

        if (permanenciaA === "-" || permanenciaA === "") {
            permanenciaA = Number.MIN_SAFE_INTEGER; // Considerar como mínimo
        }
        if (permanenciaB === "-" || permanenciaB === "") {
            permanenciaB = Number.MIN_SAFE_INTEGER; // Considerar como mínimo
        }

        if (!isNaN(permanenciaA) && !isNaN(permanenciaB)) {
            return ordenAscendentePermanencia.value ? permanenciaA - permanenciaB : permanenciaB - permanenciaA;
        } else if (isNaN(permanenciaA)) {
            return 1;
        } else {
            return -1;
        }
    });

    ordenAscendentePermanencia.value = !ordenAscendentePermanencia.value;

};

// const ordenarPermanenciaEstablecida = () => {
//     props.apiResponse.Detalle_Total.sort((a, b) => {
//         const permanenciaEstablecidaA = convertirHoraAMinutos(a.TiempoPermanenciaEstablecida);
//         const permanenciaEstablecidaB = convertirHoraAMinutos(b.TiempoPermanenciaEstablecida);

//         // Manejar valores vacíos o inválidos
//         if (isNaN(permanenciaEstablecidaA)) {
//             return 1;
//         }
//         if (isNaN(permanenciaEstablecidaB)) {
//             return -1;
//         }

//         // Comparar valores de permanencia en minutos
//         return ordenAscendentePermanencia.value ? permanenciaEstablecidaA - permanenciaEstablecidaB : permanenciaEstablecidaB - permanenciaEstablecidaA;
//     });

//     // Cambiar la dirección de ordenamiento
//     ordenAscendentePermanencia.value = !ordenAscendentePermanencia.value;
// };


const ordenarColumna = (columna) => {
    props.apiResponse.Detalle_Total.sort((a, b) => {
        if (!a[columna]) {
            return ordenAscendente.value ? -1 : 1;
        }
        if (!b[columna]) {
            return ordenAscendente.value ? 1 : -1;
        }

        if (columna === "MarcaSalida") {
            const minutosA = convertirHoraAMinutos(a[columna]);
            const minutosB = convertirHoraAMinutos(b[columna]);
            return ordenAscendente.value ? minutosA - minutosB : minutosB - minutosA;
        }

        return ordenAscendente.value ? a[columna] - b[columna] : b[columna] - a[columna];
    });

    if (columna === "MarcaSalida") {
        ordenAscendenteMarcasalida.value = !ordenAscendenteMarcasalida.value;
    } else {
        ordenAscendentePermanencia.value = !ordenAscendentePermanencia.value;
    }
};

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

const convertirHoraAMinutos = (horaString) => {
    if (!horaString || horaString === "-" || typeof horaString !== "string") {
        return "sin hora";
    }

    const partes = horaString.split(":");
    if (partes.length !== 2) {
        throw new Error("Formato de hora inválido");
    }

    const horas = parseInt(partes[0], 10);
    const minutos = parseInt(partes[1], 10);

    if (isNaN(horas) || isNaN(minutos) || horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
        throw new Error("Formato de hora inválido");
    }

    return horas * 60 + minutos;
}

const tiempoString = "10:08";
const minutos = convertirHoraAMinutos(tiempoString);
console.log(minutos); // Resultado: 90

</script>

<style scoped>
.icon-button {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    color: #BA0011;
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