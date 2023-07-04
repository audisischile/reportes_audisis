<template>
    Vista de prueba
    <hr>
    {{ data }}
</template>

<script>
import axios from "axios";
import { ref } from 'vue'

const data = ref([])  


const options = {
    method: 'POST',
    url: 'https://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura',
    headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*"
    },
    data: {
        id_cliente: 82,
        fecha_inicio: '2023-04-01',
        fecha_fin: '2023-04-01',
        id_usuarios: [],
        id_locales: [],
        id_cadenas: []
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
    data.value = response.data
}).catch(function (error) {
    console.error(error);
});
</script>

<style></style>
