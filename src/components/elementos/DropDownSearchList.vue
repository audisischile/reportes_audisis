<template>
  <div class="dropdown dropdown-custom">
    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      Cadena
    </button>
    <div class="dropdown-menu dropdown-menu-custom" aria-labelledby="dropdownMenuButton">
      <form class="mx-2 my-2">
        <input class="form-control" type="search" placeholder="Buscar" aria-label="Buscar" v-model="searchQuery">
      </form>
      <a class="dropdown-item" href="#" v-for="item in filteredData" :value="item.FK_Cadena_ID_cadena" :key="item.FK_Cadena_ID_cadena">
        {{ item.NombreCadenaReal }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const searchQuery = ref('');

const filteredData = computed(() => {
  if (!searchQuery.value) {
    return props.data;
  } else {
    return props.data.filter(item => item.NombreCadenaReal.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
});

</script>

<style scoped>
/* Estilos personalizados */
.dropdown-custom {
  display: block;
  width: 100%;
}

.dropdown-menu-custom {
  background-color: #fff;
  border: none;
  border-radius: 0;
}
</style>
