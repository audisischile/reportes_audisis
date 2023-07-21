<template>
  <div class="col align-center">
    <h6 class="card-subtitle mb-4 text-body-secondary titulo-tabla-cobertura">
      <!-- <i class="bi bi-table"></i>  -->
      <span style="color: #BA0011">COBERTURA POR USUARIO</span></h6>
    <button @click="toggleOrden" class="icon-button">
      <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
    </button>
  </div>
  <div class="scroll-container">
    <table class="tabla-cobertura">
      <tbody>
        <tr v-for="(item, index) in usuariosCobertura" :key="index">
          <td class="usuario">{{ obtenerPrimerasDosPalabras(item.usuario.toUpperCase()) }}</td>
          <td>
            <div class="progress custom-progress-bar" role="progressbar" aria-label="Example with label" :aria-valuenow="item.cobertura"
              aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar" :style="{ width: item.cobertura + '%', backgroundColor: '#BA0001' }"><span style="color: rgb(230, 230, 230);">{{
                aproximar(item.cobertura) }}%</span> </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

 
<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  datosUsuarios: {
    type: Array,
    required: true,
  },
});

const usuariosCobertura = ref([]);
const ordenAscendente = ref(false);

const crearUsuariosCobertura = () => {
  usuariosCobertura.value = props.datosUsuarios.map((usuario) => ({
    usuario: usuario.Usuario,
    cobertura: (usuario.locales_completados / usuario.locales_programadas) * 100,
  }));
};

crearUsuariosCobertura();

const ordenarUsuariosCobertura = () => {
  usuariosCobertura.value.sort((a, b) => {
    if (ordenAscendente.value) {
      return a.cobertura - b.cobertura;
    } else {
      return b.cobertura - a.cobertura;
    }
  });
};

const toggleOrden = () => {
  ordenAscendente.value = !ordenAscendente.value;
  ordenarUsuariosCobertura();
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
// Ordenar los usuarios inicialmente
ordenarUsuariosCobertura();

</script>

<style scoped>
.scroll-container {
  max-height: 315px;
  overflow-y: auto;
}

.col {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.custom-progress-bar{
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

.card {
  border-radius: 0px;
}

</style>