<template>
  consultas API
</template>
 

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const testResponse = ref('');

const conexionTest = async () => {
  try {
    const response = await axios.post(
      "http://test.iaudisis.com/audisis/dashboard/adm_dashboard/vista_cobertura",
      {
        id_cliente: 82,
        fecha_inicio: "2023-01-04",
        fecha_fin: "2023-01-10",
        id_usuarios: [],
        id_locales: [],
        id_cadenas: [],
      }
    );
    const reg = /\uFEFF/g;
    const newResponse = response.data.trim().replace(reg, "");
    testResponse.value = JSON.parse(newResponse);
    console.log(testResponse.value);

  } catch (error) {
    console.log(error);
  }

}


const conexionProd = async () => {
  try {
    const response = await axios.post(
      "http://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
      {
        id_cliente: 82,
        fecha_inicio: "2023-01-04",
        fecha_fin: "2023-01-10",
        id_usuarios: [],
        id_locales: [],
        id_cadenas: [],
      }
    );
    const reg = /\uFEFF/g;
    const newResponse = response.data.trim().replace(reg, "");
    testResponse.value = JSON.parse(newResponse);
    console.log(testResponse.value);

  } catch (error) {
    console.log('Error Produccion ' + error);
  }
}


// const conexionProd = async () => {
//   try {
//     const response = await fetch(
//       "https://172.23.122.37/audisis/dashboard/adm_dashboard/vista_cobertura",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id_cliente: 82,
//           fecha_inicio: "2023-01-04",
//           fecha_fin: "2023-01-10",
//           id_usuarios: [],
//           id_locales: [],
//           id_cadenas: [],
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     const reg = /\uFEFF/g;
//     const newResponse = (await response.text()).trim().replace(reg, "");
//     testResponse.value = JSON.parse(newResponse);
//     console.log(testResponse.value);
//   } catch (error) {
//     console.log("Error Produccion " + error);
//   }
// };


// conexionTest();
conexionProd();

</script>

<style scoped>
.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  color: white;
  font-size: 20px;
  margin-left: 0.7em;

}
</style>
