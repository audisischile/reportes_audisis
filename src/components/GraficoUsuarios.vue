<template>
  <div class="scroll-container">
    <div class="col align-center">
      <h6 class="card-subtitle mb-2 text-body-secondary titulo-tabla-cobertura">% COBERTURA POR USUARIO</h6>
      <button @click="toggleOrden" class="icon-button">
        <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
      </button>
    </div>
    <div class="usuarios-container">
      <div class="row align-items-center" v-for="(item, index) in usuariosCobertura" :key="index">
        <div class="col-5 nombreUsuario">{{ item.usuario }}</div>
        <div class="col-7">
          <div class="progress" role="progressbar" aria-label="Example with label" :aria-valuenow="item.cobertura" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" :style="{ width: item.cobertura + '%' }">{{ aproximar(item.cobertura) }}%</div>
          </div>
        </div>
      </div>
    </div>
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

.align-center {
  align-items: center; 
}

.color-rectangle {
  width: 20px;
  height: 10px;
  background-color: blue;
  margin-right: 10px;
}

.cobertura-label {
  font-size: 14px;
  color: darkgray;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 5px;
  z-index: 1;
}

.usuarios-container {
  margin-top: 10px;
}

.nombreUsuario {
  font-size: 10px;
  margin-top: 2px;
  margin-bottom: 2px;
  color: darkgray;
}

.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
}
.progress-bar {
  border-radius: 0;
}

.titulo-tabla-cobertura{
  margin-top: 5px;
  margin-left: 5px;

}

</style>