<template>
    <div class="card tabla-por-usuario shadow">
        <div style="background-color: #BA0011;">
            <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
                <span style="color: rgb(244, 244, 244)">COBERTURA TOTAL</span>
            </h6>
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
                    <tr v-for="item in apiResponse.porcentaje_locales">
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
const props = defineProps({
    apiResponse: {
        type: Object,
        required: true
    }
})

const convertirFecha = (fecha) => {
    let fechaConvertida = fecha.split('-')
    return fechaConvertida[2] + '/' + fechaConvertida[1] + '/' + fechaConvertida[0]
}

</script>

<style scoped>
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