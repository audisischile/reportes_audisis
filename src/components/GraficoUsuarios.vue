<template>
  <div>
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
              <td class="usuario">{{ item.nombre ? corregirCaracter(item.nombre.toUpperCase()) : '' }}</td>
              <td class="progress-container">
                <ProgressBar :initialValue="aproximar(item.coberturaPromedio)"/>
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
import ProgressBar from '@/components/elementos/ProgressBar.vue';


const useStore = useApiStore();

const usuariosCobertura = ref([]);
const ordenAscendente = ref(false);

function toggleOrden() {
  ordenAscendente.value = !ordenAscendente.value;
  ordenarUsuariosCobertura();
}


const crearUsuariosCobertura = () => {
  const usuarios = {};

  if (useStore.apiResponse && useStore.apiResponse.porcentaje_locales) {
    useStore.apiResponse.porcentaje_locales.forEach((usuario) => {
      if (usuarios.hasOwnProperty(usuario.Usuario)) {
        usuarios[usuario.Usuario].locales_completados += usuario.locales_completados;
        usuarios[usuario.Usuario].locales_iniciados += usuario.locales_iniciados;  // Nueva línea
        usuarios[usuario.Usuario].locales_programadas += usuario.locales_programadas;
        usuarios[usuario.Usuario].diasContados += 1;
      } else {
        usuarios[usuario.Usuario] = {
          nombre: usuario.Usuario,
          locales_completados: usuario.locales_completados,
          locales_iniciados: usuario.locales_iniciados,  // Nueva línea
          locales_programadas: usuario.locales_programadas,
          diasContados: 1,
        };
      }
    });

    for (const key in usuarios) {
      if (usuarios.hasOwnProperty(key)) {
        const usuario = usuarios[key];
        usuario.coberturaPromedio = ((usuario.locales_completados + usuario.locales_iniciados) / usuario.locales_programadas) * 100;  // Línea modificada
      }
    }

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


function limitarNombresADosPalabras(nombreCompleto) {
  const palabras = nombreCompleto.trim().split(' ');
  if (palabras.length <= 2) {
    return nombreCompleto;
  }
  const primerasDosPalabras = palabras.slice(0, 2).join(' ');
  return primerasDosPalabras;
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

.usuario {
    width: 45%; /* o cualquier otra medida que prefieras */
  }
  .progress-container {
    width: 55%; /* o cualquier otra medida que prefieras */
  }
</style>