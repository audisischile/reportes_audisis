<template>
  <div style="background-color: red;">
    <div class="card tabla-por-usuario shadow">
      <div style="background-color: #BA0011;" class="row">
        <div class="col-10">
          <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
            <span style="color: rgb(244, 244, 244)">COBERTURA POR USUARIO</span>
          </h6>
        </div>
        <div class="col-2">
          <button @click="toggleOrden" class="icon-button mt-2" style="color: white;">
            <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
          </button>
        </div>
      </div>

      <div class="scroll-container ps-2 pe-2 mt-2">
        <table class="tabla-cobertura">
          <tbody>
            <tr v-for="(item, index) in usuariosCobertura" :key="index">
              <td class="usuario">{{ item.nombre ? obtenerPrimerasDosPalabras(corregirCaracter(item.nombre.toUpperCase()))
                :
                '' }}</td>
              <td>
                <div class="progress custom-progress-bar" role="progressbar" aria-label="Example with label"
                  :aria-valuenow="item.coberturaPromedio" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar"
                    :style="{ width: item.coberturaPromedio + '%', backgroundColor: '#f97013', height: '16px' }"><span
                      style="color: rgb(230, 230, 230);">{{ aproximar(item.coberturaPromedio) }}%</span> </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

 
<script setup>
import { ref } from 'vue';
import { useApiStore } from '@/stores/conexiones.js';


const useStore = useApiStore();

const usuariosCobertura = ref([]);
const ordenAscendente = ref(false);

function toggleOrden() {
  ordenAscendente.value = !ordenAscendente.value;
  ordenarUsuariosCobertura();
}

// const crearUsuariosCobertura = () => {
//   const usuarios = {};

//   useStore.apiResponse.porcentaje_locales.forEach((usuario) => {
//     // Verificar si el usuario ya existe en el objeto "usuarios"
//     if (usuarios.hasOwnProperty(usuario.Usuario)) {
//       // Si existe, actualizar el promedio
//       usuarios[usuario.Usuario].locales_completados += usuario.locales_completados;
//       usuarios[usuario.Usuario].locales_programadas += usuario.locales_programadas;
//       usuarios[usuario.Usuario].diasContados += 1;
//     } else {
//       // Si no existe, agregarlo al objeto "usuarios" con los datos del primer día
//       usuarios[usuario.Usuario] = {
//         nombre: usuario.Usuario,
//         locales_completados: usuario.locales_completados,
//         locales_programadas: usuario.locales_programadas,
//         diasContados: 1,
//       };
//     }
//   });

//   // Calcular el promedio para cada usuario
//   for (const key in usuarios) {
//     if (usuarios.hasOwnProperty(key)) {
//       const usuario = usuarios[key];
//       usuario.coberturaPromedio = (usuario.locales_completados / usuario.locales_programadas) * 100;
//     }
//   }

//   // Convertir el objeto "usuarios" en un arreglo para mostrarlo en la tabla
//   usuariosCobertura.value = Object.values(usuarios);
// };

const crearUsuariosCobertura = () => {
  const usuarios = {};

  // Check if useStore.apiResponse and useStore.apiResponse.porcentaje_locales exist
  if(useStore.apiResponse && useStore.apiResponse.porcentaje_locales) {
    useStore.apiResponse.porcentaje_locales.forEach((usuario) => {
      // Verificar si el usuario ya existe en el objeto "usuarios"
      if (usuarios.hasOwnProperty(usuario.Usuario)) {
        // Si existe, actualizar el promedio
        usuarios[usuario.Usuario].locales_completados += usuario.locales_completados;
        usuarios[usuario.Usuario].locales_programadas += usuario.locales_programadas;
        usuarios[usuario.Usuario].diasContados += 1;
      } else {
        // Si no existe, agregarlo al objeto "usuarios" con los datos del primer día
        usuarios[usuario.Usuario] = {
          nombre: usuario.Usuario,
          locales_completados: usuario.locales_completados,
          locales_programadas: usuario.locales_programadas,
          diasContados: 1,
        };
      }
    });

    // Calcular el promedio para cada usuario
    for (const key in usuarios) {
      if (usuarios.hasOwnProperty(key)) {
        const usuario = usuarios[key];
        usuario.coberturaPromedio = (usuario.locales_completados / usuario.locales_programadas) * 100;
      }
    }

    // Convertir el objeto "usuarios" en un arreglo para mostrarlo en la tabla
    usuariosCobertura.value = Object.values(usuarios);
  }
};


crearUsuariosCobertura();

const ordenarUsuariosCobertura = () => {
  usuariosCobertura.value.sort((a, b) => {
    if (ordenAscendente.value) {
      return a.coberturaPromedio - b.coberturaPromedio;
    } else {
      return b.coberturaPromedio - a.coberturaPromedio;
    }
  });
};

const aproximar = (numero) => {
  return Math.round(numero * 10) / 10;
};

function obtenerPrimerasDosPalabras(nombre) {
  const palabras = nombre.trim().split(' ');
  const primerasDosPalabras = palabras.slice(0, 2);
  const resultado = primerasDosPalabras.join(' ');

  return resultado;
}

const corregirCaracter = (texto) => {
  return texto.replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/ÃÁ/g, 'Á')
    .replace(/Ã‰/g, 'É')
    .replace(/ÃÍ/g, 'Í')
    .replace(/Ã“/g, 'Ó')
    .replace(/Ãš/g, 'Ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã‘/g, 'Ñ');
}
// Ordenar los usuarios inicialmente
ordenarUsuariosCobertura();

</script>

<style scoped>
.scroll-container {
  max-height: 350px;
  overflow-y: auto;
}

.col {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tabla-por-usuario {
  max-height: 390px;
  overflow-y: auto;
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

.align-center {
  align-items: center;
}

.tabla-cobertura {
  width: 100%;
  border-collapse: collapse;
  border: none;
}

.usuario {
  font-size: 11px;
  font-family: Roboto, sans-serif;
}

.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
}

.custom-progress-bar {
  border-radius: 0;
  height: 15px;
  min-width: 100px;
  border: none;
}

.titulo-tabla-cobertura {
  font-size: 16px;
  font-weight: 600;
  margin-left: 0px;
}
</style>