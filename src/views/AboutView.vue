<template>
  <div class="dropdown">
    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
      aria-expanded="false">
      Seleccionar opción
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <form class="mx-2 my-2">
        <input class="form-control" type="search" placeholder="Buscar" aria-label="Buscar">
      </form>
      <a class="dropdown-item" href="#">Opción 1</a>
      <a class="dropdown-item" href="#">Opción 2</a>
      <a class="dropdown-item" href="#">Opción 3</a>
      <a class="dropdown-item" href="#">Opción 4</a>
      <!-- Agrega más opciones según sea necesario -->
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped></style>