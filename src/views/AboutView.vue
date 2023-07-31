<template>
  <div style="background-color: #BA0011;" class="row">
    <div class="col">
      <h6 class="card-subtitle text-body-secondary titulo-por-usuario sticky-top mb-2">
        <span style="color: rgb(244, 244, 244)">COBERTURA TOTAL</span>
      </h6>
    </div>
    <div class="col">
      <input v-if="mostrarSearchInput" type="text">
      <button @click="mostrarSearchInput = !mostrarSearchInput" class="icon-button mt-2" style="color: white;">
        <i class="bi bi-search"></i>
      </button>
    </div>
    <div class="col-1">
      <button @click="toggleOrden" class="icon-button mt-2" style="color: white;">
        <i :class="ordenAscendente ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
      </button>
    </div>
  </div>
</template>
 

<script setup>
import { ref } from 'vue';

const mostrarSearchInput = ref(true);

const toggleOrden = () => {
  ordenAscendente = !ordenAscendente;
  ordenarData();
};
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
